import { createFileRoute } from "@tanstack/react-router";
import { SchoolPage } from "@/components/school-page";
import { schoolPageHead } from "@/content/page-meta";

export const Route = createFileRoute("/founder")({
  head: () => schoolPageHead("founder"),
  component: Page,
});

function Page() { return <SchoolPage page="founder" />; }
