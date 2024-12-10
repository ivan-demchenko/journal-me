import type { NewEmploymentPayload } from "@server/src/shared/types";
import { saveEmployment } from "@src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from '@tanstack/react-router'
import { FormEvent, useState } from "react";

type FormState = Omit<NewEmploymentPayload, 'started' | 'ended'> & {
  started: Date,
  ended: Date | null
}

const formToPayload = (form: FormState): NewEmploymentPayload => ({
  ...form,
  started: form.started.toISOString(),
  ended: form.ended?.toISOString(),
});

export const Route = createFileRoute('/_authenticated/user/employment/new')({
  component: () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [form, setForm] = useState<FormState>({
      companyName: '',
      position: '',
      started: new Date(),
      ended: new Date(),
    });
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: saveEmployment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["employment-stories"] });
      },
    });

    const handleAddTodo = (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDisabled(true);
      mutation.mutate(formToPayload(form));
    };

    const handleStillAtTheCompanyStatus = () => {
      if (form.ended === null) {
        setForm(prev => ({ ...prev, ended: new Date() }))
      } else {
        setForm(prev => ({ ...prev, ended: null }))
      }
    }

    return (
      <form onSubmit={handleAddTodo}>
        <h2 className="page-title">Add employment</h2>
        <div>
          <Link to="/user/profile">Go back</Link>
        </div>
        <label className="form-field-label" htmlFor="company-name">
          Company name:
        </label>
        <input type="text"
          disabled={isDisabled}
          value={form.companyName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, companyName: e.target.value }))
          }
          className="form-field-textarea"
          id="company-name"
          name="company-name"
        />

        <label className="form-field-label" htmlFor="position">
          Position:
        </label>
        <input
          type="text"
          value={form.position}
          disabled={isDisabled}
          onChange={(e) => setForm((prev) => ({ ...prev, position: e.target.value }))}
          className="form-field-textarea"
          id="position"
          name="position"
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="form-field-label" htmlFor="started">
              What month you started?
            </label>
            <input
              type="month"
              value={form.started.toISOString().substring(0, "yyyy-mm".length)}
              disabled={isDisabled}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, started: new Date(e.target.value) }))
              }
              className="form-field-textarea"
              id="started"
              name="started"
              placeholder="What steps did you take to achieve the goal?"
            />
            <label>
              <input type="checkbox" checked={form.ended === null} onChange={handleStillAtTheCompanyStatus} />
              I still work here
            </label>
          </div>
          <div className="flex-1">
            { form.ended !== null &&
              <>
                <label className="form-field-label" htmlFor="ended">
                  What month it ended in?
                </label>
                <input
                  type="month"
                  disabled={isDisabled}
                  value={form.ended!.toISOString().substring(0, "yyyy-mm".length)}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, ended: new Date(e.target.value) }))
                  }
                  className="form-field-textarea"
                  id="ended"
                  name="ended"
                  placeholder="What was the outcome, and what impact did it have?"
                />
              </>
            }
          </div>
        </div>

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
  },
})
