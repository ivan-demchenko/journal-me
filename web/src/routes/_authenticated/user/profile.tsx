import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { userEmploymentsQueryOptions, userRecordsPreviewQueryOptions } from "@src/lib/api";
import { RecordCard } from "@src/components/record-card";

export const Route = createFileRoute("/_authenticated/user/profile")({
  beforeLoad: ({ context }) => {
    return { user: context.user };
  },
  component: UserProfile,
});

function UserProfile() {
  const { user } = Route.useRouteContext();
  const [
    memories,
    employments
  ] = useQueries({
    queries: [
      userRecordsPreviewQueryOptions,
      userEmploymentsQueryOptions
    ]
  });

  if (
    memories.isLoading
    || employments.isLoading
  ) {
    return <div>Loading...</div>;
  }

  if (
    !user
    || memories.error
    || !memories.data
    || employments.error
    || !employments.data
  ) {
    console.log(memories.error);
    // console.log(employments.error);
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <h1 className="page-title">
        Welcome, {user.given_name} {user.family_name}
      </h1>
      <article className="inspiration">
        Here you'll find your notes as you add them.
      </article>
      <section className="grid gap-8 grid-cols-2">
        <div>
          <div className="flex">
            <h3 className="flex-1">Your Memories</h3>
            <Link to="/user">Add a new one</Link>
          </div>
          {memories.data.records.map((rec) => {
            return <RecordCard key={rec.id} record={rec} />;
          })}
        </div>
        <div>
          <div className="flex">
            <h3 className="flex-1">Your Employments</h3>
            <Link to="/user/employment/new">Add one</Link>
          </div>
          {employments.data.employments.map((rec) => {
            return (
              <div>
                <h4 className="text-xl">{rec.companyName}</h4>
                <div>
                  {rec.started} - {rec.ended}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  );
}
