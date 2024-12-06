import { userQueryOptions } from "../lib/api";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

type RouterCtx = {
  queryClient: QueryClient;
};

function RootComponent() {
  const { user } = Route.useRouteContext();
  return (
    <>
      <header className="border-b border-b-gray-400 dark:border-b-gray-600">
        <nav className="container mx-auto p-4 flex">
          <section className="flex-1">
            <Link to="/" className="[&.active]:font-bold">
              Journal Me
            </Link>
          </section>
          {!user && (
            <section className="flex gap-2">
              <a href="/api/register">Register</a>
              <a href="/api/login">Login</a>
            </section>
          )}
          {user && (
            <section className="flex gap-2">
              <Link to="/user/profile" className="[&.active]:font-bold">
                Your profile
              </Link>
              <a href="/api/logout">Logout</a>
            </section>
          )}
        </nav>
      </header>
      <main className="my-4">
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}

export const Route = createRootRouteWithContext<RouterCtx>()({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch {
      return { user: null };
    }
  },
  component: RootComponent,
});
