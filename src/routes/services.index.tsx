import { createFileRoute, redirect } from "@tanstack/react-router";

// /services has no page of its own: send visitors (and Google) to the services section on the homepage.
export const Route = createFileRoute("/services/")({
  beforeLoad: () => {
    throw redirect({ href: "/#services", statusCode: 301 });
  },
});
