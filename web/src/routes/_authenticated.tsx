import { userQueryOptions } from "../lib/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function Login() {
  return (
    <section className="py-10 bg-gray-100 dark:bg-slate-700 rounded-2xl sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Looks like you're logged out
          </h2>

          <div className="flex flex-col items-center justify-center px-16 mt-8 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row lg:mt-12 sm:px-0">
            <a
              href="/api/register"
              className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold transition-all duration-200 bg-transparent border border-black dark:border-gray-400 rounded-md sm:w-auto hover:bg-slate-600 hover:text-white focus:bg-black focus:text-white dark:focus:bg-gray-500"
            >
              Create an account
            </a>
          </div>

          <p className="mt-6 text-base">
            Already have an account? <a href="/api/login">Log in </a>
          </p>
        </div>
      </div>
    </section>
  );
}

const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch {
      return { user: null };
    }
  },
  component: Component,
});
