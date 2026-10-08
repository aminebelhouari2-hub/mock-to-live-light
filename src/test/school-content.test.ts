import { describe, expect, it } from "vitest";
import { getAcademicYear } from "@/content/academic-year";
import { contact, supportCourses } from "@/content/site";

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
