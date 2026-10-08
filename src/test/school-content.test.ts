import { describe, expect, it } from "vitest";
import { getAcademicYear } from "@/content/academic-year";
import { contact, supportCourses, teachingStages, primarySchedule, primaryScheduleSubjects } from "@/content/site";

describe("Academic year starts in September", () => {
  it("shows 2026/2027 in October 2026", () => {
    expect(getAcademicYear(new Date(2026, 9, 8))).toBe("2026/2027");
  });
  it("retains 2026/2027 through August 2027", () => {
    expect(getAcademicYear(new Date(2027, 7, 31, 23, 59))).toBe("2026/2027");
  });
  it("switches to 2027/2028 from September 2027", () => {
    expect(getAcademicYear(new Date(2027, 8, 1))).toBe("2027/2028");
  });
  it("uses the previous calendar year in January", () => {
    expect(getAcademicYear(new Date(2027, 0, 1))).toBe("2026/2027");
  });
});

describe("Requested support levels", () => {
  it("offers the exact five AP subjects", () => {
    expect(supportCourses.find(course => course.shortLevel === "AP")).toMatchObject({
      level: "المستوى الابتدائي",
      subjects: ["اللغة العربية", "الرياضيات", "اللغة الفرنسية", "اللغة الإنجليزية", "التربية الإسلامية"],
    });
  });
  it("offers the exact seven AM subjects", () => {
    expect(supportCourses.find(course => course.shortLevel === "AM")).toMatchObject({
      level: "المستوى المتوسط",
      subjects: ["اللغة العربية", "الرياضيات", "اللغة الفرنسية", "اللغة الإنجليزية", "العلوم الفيزيائية", "علوم الطبيعة والحياة", "التاريخ والجغرافيا"],
    });
  });
  it("offers the exact eight AS subjects", () => {
    expect(supportCourses.find(course => course.shortLevel === "AS")).toMatchObject({
      level: "المستوى الثانوي",
      subjects: ["الرياضيات", "العلوم الطبيعية", "العلوم الفيزيائية", "اللغة العربية", "اللغة الفرنسية", "اللغة الإنجليزية", "الفلسفة", "التاريخ والجغرافيا"],
    });
  });
  it("preserves the existing WhatsApp number", () => {
    expect(contact.whatsapp).toBe("213556057176");
  });
});
 it("uses the supplied official GPS destination", () => {
   expect(contact.mapLink).toBe("https://maps.app.goo.gl/nqn6h7fU5Y6y9R2T7?g_st=ac");
 });

describe("Subject teachers across the three school stages", () => {
  it.each([
    ["AP", "المستوى الابتدائي", 5],
    ["AM", "المستوى المتوسط", 7],
    ["AS", "المستوى الثانوي", 8],
  ])("assigns each %s subject its own generic teacher role", (shortLevel, level, count) => {
    const stage = teachingStages.find(item => item.shortLevel === shortLevel);
    expect(stage?.level).toBe(level);
    expect(stage?.subjects).toHaveLength(count as number);
    const expectedSubjects = supportCourses.find(item => item.shortLevel === shortLevel)?.subjects;
    expect(stage?.subjects.map(item => item.subject)).toEqual(expectedSubjects);
    expect(stage?.subjects.map(item => item.teacher.ar)).toEqual(expectedSubjects?.map(subject => `أستاذ ${subject}`));
  });
});

describe("Uploaded primary timetable", () => {
  it("keeps the supplied subject column order", () => {
    expect(primaryScheduleSubjects).toEqual(["اللغة العربية", "الرياضيات", "اللغة الفرنسية", "اللغة الإنجليزية"]);
  });
  it.each([
    { year: 1, expected: [["الأحد", "17:00"], ["الأربعاء", "17:00"], null, null] },
    { year: 2, expected: [["الخميس", "13:30"], ["الإثنين", "15:30"], null, null] },
    { year: 3, expected: [["الأربعاء", "15:30"], ["الخميس", "15:00"], null, ["الإثنين", "17:00"]] },
    { year: 4, expected: [["الثلاثاء", "13:00"], ["السبت", "10:30"], ["الخميس", "15:00"], ["السبت", "12:00"]] },
    { year: 5, expected: [["السبت", "12:00"], ["الأحد", "15:30"], ["الثلاثاء", "14:30"], ["السبت", "10:30"]] },
  ])("matches all supplied year $year times without inventing missing slots", ({ year, expected }) => {
    expect(primarySchedule.find(row => row.year === year)?.lessons.map(lesson => lesson ? [lesson.day.ar, lesson.time] : null)).toEqual(expected);
  });
});
