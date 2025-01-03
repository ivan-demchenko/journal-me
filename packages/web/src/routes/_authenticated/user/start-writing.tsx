import type { NewRecordPayload } from "@jm/server/shared";
import { topicsNameMapping } from "@src/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/start-writing")({
  component: UserHome,
});

export default function UserHome() {
  return (
    <>
      <h1 className="page-title">Track your moments with Journal Me</h1>
      <article className="inspiration">Pick a topic to write about</article>
      <ul className="categories">
        {Object.keys(topicsNameMapping).map((key) => {
          return (
            <li key={key} className="category">
              <a className="category-link" href={`/user/write-about/${key}`}>
                {topicsNameMapping[key as NewRecordPayload["topic"]]}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
