import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") {
      throw redirect({ to: "/auth" });
    }

    const token = window.localStorage.getItem("studio-admin-token");
    if (!token) {
      throw redirect({ to: "/auth" });
    }

    return {};
  },
  component: () => <Outlet />,
});
