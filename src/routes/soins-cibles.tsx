import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/soins-cibles")({
  beforeLoad: () => {
    throw redirect({ to: "/formules", hash: "soins-cibles" });
  },
  component: () => null,
});
