import { createFileRoute } from "@tanstack/react-router";
import { AdminWorkspace } from "@/components/admin-workspace";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | SALAOUANDJI SCHOOL" },
      { name: "description", content: "لوحة تحكم إدارة صلوانجي سكول." },
      { property: "og:title", content: "لوحة التحكم | SALAOUANDJI SCHOOL" },
      { property: "og:description", content: "لوحة تحكم إدارة صلوانجي سكول." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminWorkspace,
});

