import { FAQ } from "@src/components/faq";
import { HowDoesItWork } from "@src/components/how-does-it-work";
import { SellingPoints } from "@src/components/selling-points";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <h1 className="page-title">Welcome to Journal Me</h1>
      <SellingPoints />
      <section className="mt-4 p-8 rounded-2xl text-center">
        <Link to="/user/profile" className="text-2xl">
          Start now
        </Link>
      </section>
      <HowDoesItWork />
      <FAQ />
    </>
  );
}
