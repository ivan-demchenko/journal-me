import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userRecordsPreviewQueryOptions } from "@src/lib/api";
import { RecordCard } from "@src/components/record-card";

export const Route = createFileRoute("/_authenticated/user/profile")({
  beforeLoad: ({ context }) => {
    return { user: context.user };
  },
  component: UserProfile,
});

function UserProfile() {
  const { user } = Route.useRouteContext();
  const { data, isLoading, error } = useQuery(userRecordsPreviewQueryOptions);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data || !user) {
    console.log(error);
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <h1 className="page-title">
        Welcome, {user.given_name} {user.family_name}
      </h1>
      <article className="inspiration">
        Here you'll find your notes as you add them.{" "}
        <Link to="/user">Go ahead!</Link>
      </article>
      {data.records.map((rec) => {
        return <RecordCard key={rec.id} record={rec} />;
      })}
    </>
  );
}
