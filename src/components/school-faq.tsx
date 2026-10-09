import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqUi, getSchoolFaq } from "@/content/faq";
import type { Lang } from "@/content/site";

export function SchoolFaq({ lang }: { lang: Lang }) {
  return <div className="mx-auto max-w-3xl">
    <Accordion type="single" collapsible className="border-t border-forest/15">
      {getSchoolFaq(lang).map(item => <AccordionItem key={item.id} value={item.id} className="border-forest/15">
        <AccordionTrigger className="gap-5 py-6 text-start text-base font-semibold leading-8 text-forest hover:no-underline">{item.question}</AccordionTrigger>
        <AccordionContent className="pe-8 pb-6 text-start text-sm leading-8 text-forest/75">{item.answer}</AccordionContent>
      </AccordionItem>)}
    </Accordion>
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-forest/15 pt-6">
      <p className="font-semibold text-forest">{faqUi.contact[lang]}</p>
      <Button asChild variant="outline" className="h-auto max-w-full whitespace-normal py-3"><Link to="/contact"><MessageCircle />{lang === "ar" ? "تواصل معنا" : lang === "fr" ? "Contactez-nous" : "Contact us"}<ArrowUpRight /></Link></Button>
    </div>
  </div>;
}