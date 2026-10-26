import { describe, expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { mergeSchedule } from "@/lib/school-cms";
import { primarySchedule } from "@/content/site";

describe("dashboard schedule edits", () => {
  it("replaces a lesson time edited from the dashboard", () => {
    const merged = mergeSchedule(primarySchedule, [{ year: 1, subject_index: 0, day: "monday", time: "09:00" }]);
    expect(merged[0]!.lessons[0]).toEqual({ day: { ar: "الإثنين", fr: "Lundi", en: "Monday" }, time: "09:00" });
  });
  it("clears a lesson when the dashboard empties it", () => {
    const merged = mergeSchedule(primarySchedule, [{ year: 4, subject_index: 1, day: null, time: null }]);
    expect(merged[3]!.lessons[1]).toBeNull();
  });
  it("keeps the original timetable where nothing was edited", () => {
    expect(mergeSchedule(primarySchedule, [])[4]!.lessons[0]?.time).toBe("12:00");
  });
});
