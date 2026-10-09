import { createFileRoute } from "@tanstack/react-router";
import { SchoolPage } from "@/components/school-page";
import { schoolPageHead } from "@/content/page-meta";

export const Route = createFileRoute("/contact")({
  head: () => schoolPageHead("contact"),
  component: Page,
});

function Page() { return <SchoolPage page="contact" />; }
