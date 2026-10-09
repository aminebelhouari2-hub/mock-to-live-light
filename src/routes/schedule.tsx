import { createFileRoute } from "@tanstack/react-router";
import { SchoolPage } from "@/components/school-page";
import { schoolPageHead } from "@/content/page-meta";

export const Route = createFileRoute("/schedule")({
  head: () => schoolPageHead("schedule"),
  component: Page,
});

function Page() { return <SchoolPage page="schedule" />; }
