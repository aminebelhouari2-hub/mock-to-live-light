import { founder } from "@/content/founder";
import { homepagePhotos, contact } from "@/content/site";
import { getAcademicYear } from "@/content/academic-year";
import { getSchoolFaq } from "@/content/faq";
import type { SchoolPageKey } from "@/content/navigation";

const pageDescriptions: Record<SchoolPageKey, { title: string; description: string }> = {
  home: { title: "صلوانجي سكول — مدرسة خاصة بسيدي سعيد، تلمسان", description: `روضة وأقسام تحضيرية ودروس دعم للابتدائي والمتوسط والثانوي بإدارة ${founder.name.ar} في سيدي سعيد، تلمسان.` },
  about: { title: "من نحن", description: "تعرّف على صلوانجي سكول، فضاء التعلّم والأنشطة التربوية للأطفال في سيدي سعيد، تلمسان." },
  subjects: { title: "المواد والأقسام التحضيرية", description: "المواد حسب الأطوار الثلاثة وأنشطة الروضة والأقسام التحضيرية في صلوانجي سكول بتلمسان." },
  support: { title: "دروس الدعم في تلمسان", description: "دروس دعم في صلوانجي سكول للمستوى الابتدائي والمتوسط والثانوي، مع المواد المتوفرة والتسجيل عبر واتساب." },
  teachers: { title: "الفريق التربوي والأساتذة", description: "أساتذة المواد حسب الأطوار الثلاثة ومربية الروضة في صلوانجي سكول بسيدي سعيد، تلمسان." },
  activities: { title: "أنشطة المدرسة", description: "صور أنشطة الكتابة والأعمال اليدوية والألعاب التعليمية والتعلّم الجماعي في صلوانجي سكول." },
  gallery: { title: "معرض الصور والفيديوهات", description: "محطات من أجواء التعلم ورحلات وشهادات واحتفالات المدرسة بالصور والفيديوهات في صلوانجي سكول." },
  schedule: { title: "برنامج دروس المستوى الابتدائي", description: "أوقات بداية دروس العربية والرياضيات والفرنسية والإنجليزية للسنوات الأولى إلى الخامسة ابتدائي في صلوانجي سكول." },
  faq: { title: "الأسئلة الشائعة", description: "إجابات عن موقع صلوانجي سكول، المستويات والمواد، التسجيل والبرنامج والأنشطة في سيدي سعيد، تلمسان." },
  registration: { title: "التسجيل والاستفسار", description: "تواصل مع صلوانجي سكول للاستفسار عن تسجيل طفلك في الأقسام التحضيرية أو دروس الدعم عبر واتساب والهاتف." },
  contact: { title: "التواصل وموقع المدرسة", description: "عنوان ورقم هاتف صلوانجي سكول وروابط التواصل وموقع المدرسة الدقيق في سيدي سعيد، تلمسان." },
  founder: { title: "صاحبة المؤسسة", description: `تعرّف على ${founder.name.ar}، مؤسِّسة ومديرة صلوانجي سكول، أخصائية نفسانية إكلينيكية ومدرّبة معتمدة، ومؤهلاتها الأكاديمية والتدريبية.` },
};

export function schoolPageHead(page: SchoolPageKey) {
  const data = pageDescriptions[page];
  const title = `${data.title} | Salaouandji School`;
  const description = `${data.description} الموسم الدراسي ${getAcademicYear()}.`;
  const path = page === "home" ? "/" : page === "registration" ? "/registration" : `/${page}`;
  const url = `https://salaouandjschool.lovable.app${path}`;
  const image = page === "home" ? homepagePhotos[0]?.src : undefined;
  return {
    meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, { property: "og:url", content: url }, ...(image?.startsWith("https://") ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : [])],
    links: [{ rel: "canonical", href: url }],
    scripts: page === "faq" ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: getSchoolFaq("ar").map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }) }] : page === "home" ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "School", name: "Salaouandji School — صلوانجي سكول", url, telephone: contact.phoneTel, address: { "@type": "PostalAddress", addressLocality: "Sidi Said, Tlemcen", addressCountry: "DZ" }, founder: { "@type": "Person", name: founder.name.ar } }) }] : [],
  };
}