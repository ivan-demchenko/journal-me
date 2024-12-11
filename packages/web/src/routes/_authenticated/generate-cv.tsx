import type { GenerateCVPayload } from "@jm/server/shared";
import { generateCV } from "@src/lib/api";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";

export const Route = createFileRoute("/_authenticated/generate-cv")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [cv, setCV] = useState("");
  const [form, setForm] = useState<GenerateCVPayload>({
    jobDescription: "",
    aboutCompany: "",
  });
  const mutation = useMutation({
    mutationFn: generateCV,
    onSuccess: (data) => {
      setCV(data.cv);
    },
    onSettled: () => {
      setIsDisabled(false);
    },
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDisabled(true);
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className="page-title">Generate a CV</h2>
      <article className="inspiration">
        It will be based on your stories
      </article>
      <label className="form-field-label" htmlFor="jobDescription">
        Job Description
      </label>
      <textarea
        disabled={isDisabled}
        value={form.jobDescription}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            jobDescription: e.target.value,
          }))
        }
        className="form-field-textarea"
        id="jobDescription"
        name="jobDescription"
        placeholder="Copy-paste a job description"
      />

      <label className="form-field-label" htmlFor="aboutCompany">
        About the company
      </label>
      <textarea
        disabled={isDisabled}
        value={form.aboutCompany}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            aboutCompany: e.target.value,
          }))
        }
        className="form-field-textarea"
        id="aboutCompany"
        name="aboutCompany"
        placeholder="Enter a few words about a company"
      />

      <div className="form-action">
        <button
          className="form-action-submit"
          type="submit"
          disabled={isDisabled}
        >
          Go ahead!
        </button>
      </div>

      <div className="">
        <h3 className="text-xl text-center">You CV will appear here</h3>
        <pre>{cv}</pre>
      </div>
    </form>
  );
}
