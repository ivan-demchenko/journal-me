import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getUser } from "../kinde";
import type { Logger } from "@logtape/logtape";
import type { Repository } from "@jm/db/repository";
import { generateNewCVSchema } from "./input.validation";
import OpenAI from "openai";
import { Config } from "../config";

const client = new OpenAI({
  apiKey: Config.OPENAI_API_KEY,
});

export function makeGenerateRoutes(repository: Repository, logger: Logger) {
  return (
    new Hono()
      /**
       * POST /api/generate/cv
       */
      .post(
        "/cv",
        getUser,
        zValidator("json", generateNewCVSchema),
        async (c) => {
          logger.info("generate new CV {userId}", {
            userId: c.var.user.id,
          });

          const input = c.req.valid("json");
          const result = await repository.getEmploymentStories(c.var.user.id);

          const employmentAsText = result
            .reduce((res, empl) => {
              res.push(`Company: ${empl.companyName}`);
              res.push(`Position: ${empl.position}`);
              res.push(
                `Employment period: ${empl.started} - ${empl.ended || "still work there"}\n`,
              );
              res.push("Track record from this employment:");
              for (const rec of empl.records) {
                res.push(` ${rec.topic}`);
                res.push(` Situation: ${rec.situation}`);
                res.push(` Task: ${rec.task}`);
                res.push(` Action: ${rec.action}`);
                res.push(` Result: ${rec.result}\n`);
              }
              return res;
            }, [] as string[])
            .join("\n");

          const prompt = [
            "Generate a CV for the Job Description based on the Employment History and Stories tracked per each employment",
            "",
            "<Employment History>",
            employmentAsText,
            "</Employment History>",
            "",
            "<Job Description>",
            input.jobDescription,
            "</Job Description>",
            "",
            "<About Company>",
            input.aboutCompany,
            "</About Company>",
          ].join("\n");

          const data = await client.beta.chat.completions.stream({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a professional writer who can help people write perfect CV for a job description.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          });
          try {
            const resp = await data.finalMessage();
            logger.debug("OpenAI responded {resp}", { resp });
            return c.json({
              cv: resp.content || resp.refusal || "Nothing has been returned",
            });
          } catch (e) {
            logger.error("OpenAI error {e}", { e });
            return c.text("Something went wrong", 500);
          }
        },
      )
  );
}
