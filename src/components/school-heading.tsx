import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { schoolPageLabel, type SchoolPageKey } from "@/content/navigation";
import type { Lang } from "@/content/site";
import type { ReactNode } from "react";

export function SchoolHeading({ children, level = 2, compact = false, className = "" }: {
  children: ReactNode;
  level?: 1 | 2;
  compact?: boolean;
  className?: string;
}) {
  const Tag = level === 1 ? "h1" : "h2";
  return <Tag className={`min-w-0 font-bold leading-snug [overflow-wrap:anywhere] ${compact ? "text-xl sm:text-2xl" : "text-[1.75rem] sm:text-[2rem] lg:text-4xl"} ${className}`}>{children}</Tag>;
}

export function SchoolPageHeading({ page, lang }: { page: SchoolPageKey; lang: Lang }) {
  const Separator = lang === "ar" ? ChevronLeft : ChevronRight;
  const title = schoolPageLabel(page)[lang];
  return <div className="mx-auto max-w-7xl px-5 pb-8 pt-7 sm:pb-10 sm:pt-9 lg:px-8">
    <nav aria-label={lang === "ar" ? "مسار الصفحة" : lang === "fr" ? "Fil d’Ariane" : "Breadcrumb"} className="mb-4 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-6 text-forest/65 sm:text-sm">
      <Link to="/" className="hover:text-primary">{schoolPageLabel("home")[lang]}</Link>
      <Separator className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span aria-current="page" className="min-w-0 [overflow-wrap:anywhere]">{title}</span>
    </nav>
    <SchoolHeading level={1} className="text-forest">{title}</SchoolHeading>
  </div>;
}