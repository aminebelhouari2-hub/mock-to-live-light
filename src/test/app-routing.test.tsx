import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { schoolNavigation, schoolFooterGroups } from "@/content/navigation";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("retains the twelve existing public URLs without introducing or removing pages", () => {
    expect(schoolNavigation.map(item => item.to)).toEqual([
      "/", "/about", "/subjects", "/support", "/teachers", "/activities",
      "/gallery", "/schedule", "/registration", "/faq", "/contact", "/founder",
    ]);
  });
  it("organizes all existing URLs into the requested footer groups without duplicates", () => {
    expect(schoolFooterGroups.map(group => [...group.paths])).toEqual([
      ["/", "/about", "/teachers", "/gallery", "/founder"],
      ["/subjects", "/support", "/activities", "/schedule", "/faq"],
      ["/registration", "/contact"],
    ]);
    const links = schoolFooterGroups.flatMap(group => [...group.paths]);
    expect(new Set(links).size).toBe(12);
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it.each(schoolNavigation.map(item => item.to))("matches the school navigation page %s", path => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
  });
});
