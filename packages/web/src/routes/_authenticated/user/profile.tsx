import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userEmploymentStoriesQueryOptions } from "@src/lib/api";
import { EmploymentCard } from "@src/components/employment-card";

export const Route = createFileRoute("/_authenticated/user/profile")({
  beforeLoad: ({ context }) => {
    return { user: context.user };
  },
  component: UserProfile,
});

function UserProfile() {
  const { user } = Route.useRouteContext();
  const { data, isLoading, error } = useQuery(
    userEmploymentStoriesQueryOptions,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || error || !data) {
    console.log(error);
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
      <section className="flex gap-4">
        <Link to="/user/start-writing">Write a new story</Link>
        <Link to="/user/employment/new">Add employment</Link>
      </section>
      <section className="divide-gray-500">
        {data.employments.map((employment) => {
          return <EmploymentCard key={employment.id} employment={employment} />;
        })}
      </section>
    </>
  );
}
