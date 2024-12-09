import type { NewRecordPayload } from "@server/src/shared/types";
import { saveRecord } from "@src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";

export const Route = createFileRoute("/_authenticated/user/write-about/$topic")(
  {
    component: RouteComponent,
  },
);

function FormComponent(props: {
  topic: NewRecordPayload["topic"];
  title: string;
  inspiration: string;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [form, setForm] = useState<NewRecordPayload>({
    topic: props.topic,
    action: "",
    result: "",
    situation: "",
    task: "",
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user-records-preview"] });
    },
  });

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDisabled(true);
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleAddTodo}>
      <h2 className="page-title">{props.title}</h2>
      <div>
        <Link to="/user">Pick another topic</Link>
      </div>
      <article className="inspiration">{props.inspiration}</article>
      <label className="form-field-label" htmlFor="situation">
        Situation:
      </label>
      <textarea
        disabled={isDisabled}
        value={form.situation}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, situation: e.target.value }))
        }
        className="form-field-textarea"
        id="situation"
        name="situation"
        placeholder="Describe the context or background"
      />

      <label className="form-field-label" htmlFor="task">
        Task:
      </label>
      <textarea
        value={form.task}
        disabled={isDisabled}
        onChange={(e) => setForm((prev) => ({ ...prev, task: e.target.value }))}
        className="form-field-textarea"
        id="task"
        name="task"
        placeholder="What was your specific role or goal?"
      />

      <label className="form-field-label" htmlFor="action">
        Action:
      </label>
      <textarea
        value={form.action}
        disabled={isDisabled}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, action: e.target.value }))
        }
        className="form-field-textarea"
        id="action"
        name="action"
        placeholder="What steps did you take to achieve the goal?"
      />

      <label className="form-field-label" htmlFor="result">
        Result:
      </label>
      <textarea
        value={form.result}
        disabled={isDisabled}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, result: e.target.value }))
        }
        className="form-field-textarea"
        id="result"
        name="result"
        placeholder="What was the outcome, and what impact did it have?"
      />

      <div className="form-action">
        <button
          className="form-action-submit"
          type="submit"
          disabled={isDisabled || mutation.isPending}
        >
          Submit
        </button>
        {mutation.isError && (
          <div className="bg-red-200 text-center p-4 mt-4">
            <span className="font-bold text-red-800">
              Something went wrong...
            </span>
            <br />
            Please, try again later.
          </div>
        )}
        {mutation.isSuccess && (
          <div className="bg-green-100 text-center p-4 mt-4 rounded border-green-600 w-full">
            <span className="font-bold text-green-800">Well done!</span>
            <br />
            You story has been saved. Back to your{" "}
            <Link to="/user/profile">profile</Link>
          </div>
        )}
      </div>
    </form>
  );
}

function RouteComponent() {
  const { topic } = Route.useParams();
  switch (topic) {
    case "collaboration-and-teamwork": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Think of a time you worked closely with others to achieve a shared goal. Focus on your role, how you contributed to the team's success, and how the collaboration made a difference."
          title="Collaboration and teamwork"
        />
      );
    }
    case "feedback-and-recognition": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Feedback can be a powerful tool for growth. Reflect on feedback you've received—positive or constructive—or a time you were recognized for your efforts. What did you take away from the experience?"
          title="Feedback and recognition"
        />
      );
    }
    case "goals-and-progress": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Think about a goal you set for yourself. It could be personal growth, a skill you wanted to master, or a career milestone. Share the steps you've taken toward achieving it and the progress you're proud of."
          title="Goals and progress"
        />
      );
    }
    case "innovation-and-creativity": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Have you ever had a creative idea that made a difference? Maybe you improved a process, solved a tricky problem, or introduced something new. Share how you turned your idea into action and what it achieved."
          title="Innovation and creativity"
        />
      );
    }
    case "key-achievements": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Think of a moment when you accomplished something you're proud of at work. It could be hitting a major milestone, completing a project, or achieving a personal career goal. Describe how you got there and what it meant for you or your team."
          title="Key achievements"
        />
      );
    }
    case "leadership-and-mentorship": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Have you ever guided others, led a team, or mentored a colleague? Reflect on a time when you helped others succeed, made decisions as a leader, or inspired those around you to perform their best."
          title="Leadership and mentorship"
        />
      );
    }
    case "learning-and-skill-development": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Think about something new you've learned recently. Maybe you developed a technical skill, learned a new process, or gained knowledge through a project. Highlight how you applied this learning to your work."
          title="Learning and skill development"
        />
      );
    }
    case "mistakes-and-recovery": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Mistakes happen, but how you handle them is what matters. Recall a moment when something didn't go as planned. Share how you took responsibility, fixed the issue, and grew from the experience."
          title="Mistakes and recovery"
        />
      );
    }
    case "overcoming-challenges": {
      return (
        <FormComponent
          topic={topic}
          inspiration="We all face obstacles at work. Reflect on a time when you encountered a tough situation, like solving a complex problem or managing a conflict. Focus on how you tackled it and the lessons you learned."
          title="Overcoming challenges"
        />
      );
    }
    case "productivity-and-efficiency": {
      return (
        <FormComponent
          topic={topic}
          inspiration="Reflect on ways you've worked smarter, not harder. Have you optimized a workflow, streamlined a process, or found tools that boosted productivity? Highlight the impact of these improvements."
          title="Productivity and efficiency"
        />
      );
    }
    default: {
      throw redirect({ to: "/user/profile" });
    }
  }
}
