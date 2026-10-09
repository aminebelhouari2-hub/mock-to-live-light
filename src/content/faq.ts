import { contact, supportCourses, translateSupport, type L, type Lang } from "@/content/site";

export const faqUi = {
  title: { ar: "الأسئلة الشائعة", fr: "Questions fréquentes", en: "Frequently asked questions" },
  label: { ar: "أسئلة الأولياء", fr: "Questions des parents", en: "Parents’ questions" },
  contact: { ar: "لديك سؤال آخر؟", fr: "Une autre question ?", en: "Have another question?" },
} satisfies Record<string, L>;

export function getSchoolFaq(lang: Lang): { id: string; question: string; answer: string }[] {
  const subjects = supportCourses.map(course => `${translateSupport(course.level, lang)}: ${course.subjects.map(subject => translateSupport(subject, lang)).join(lang === "ar" ? "، " : ", ")}`).join(". ");
  const items: { id: string; question: L; answer: L }[] = [
    { id: "location", question: { ar: "أين تقع صلوانجي سكول؟", fr: "Où se trouve Salaouandji School ?", en: "Where is Salaouandji School?" }, answer: contact.address },
    { id: "levels", question: { ar: "ما المستويات الدراسية المتوفرة؟", fr: "Quels niveaux sont proposés ?", en: "Which school levels are offered?" }, answer: { ar: "أقسام تحضيرية وروضة، ودروس دعم للمستوى الابتدائي والمتوسط والثانوي.", fr: "Classes préparatoires et maternelle, ainsi que des cours de soutien pour les niveaux primaire, moyen et secondaire.", en: "Preparatory and kindergarten classes, with support classes for primary, middle and secondary levels." } },
    { id: "subjects", question: { ar: "ما المواد المتوفرة في دروس الدعم؟", fr: "Quelles matières sont proposées en soutien ?", en: "Which subjects are offered in support classes?" }, answer: { ar: subjects, fr: subjects, en: subjects } },
    { id: "registration", question: { ar: "كيف أستفسر عن تسجيل طفلي؟", fr: "Comment se renseigner sur l’inscription ?", en: "How can I enquire about registration?" }, answer: { ar: `يمكنك التواصل عبر واتساب أو الاتصال على ${contact.phoneDisplay}، أو إرسال بيانات ولي الأمر والمستوى الدراسي من صفحة التسجيل عبر واتساب للتواصل مع المدرسة.`, fr: `Contactez l’école par WhatsApp ou au ${contact.phoneDisplay}. La page Inscription permet aussi d’envoyer les coordonnées du parent et le niveau scolaire par WhatsApp.`, en: `Contact the school on WhatsApp or call ${contact.phoneDisplay}. The Registration page also lets you send the parent’s details and school level through WhatsApp.` } },
    { id: "schedule", question: { ar: "أين أجد أوقات دروس المستوى الابتدائي؟", fr: "Où consulter les horaires du soutien primaire ?", en: "Where can I find primary support class times?" }, answer: { ar: "تعرض صفحة البرنامج أوقات بداية الحصص للسنوات الأولى إلى الخامسة ابتدائي. للاستفسار عن الأوقات غير المحددة، تواصل مع المدرسة.", fr: "La page Emploi du temps présente les heures de début des cours de la première à la cinquième année primaire. Contactez l’école pour les créneaux non précisés.", en: "The Schedule page shows class start times for primary years one to five. Contact the school about any unspecified times." } },
    { id: "activities", question: { ar: "ما الأنشطة التي يمكن الاطلاع عليها في الموقع؟", fr: "Quelles activités peut-on découvrir sur le site ?", en: "Which activities can I see on the website?" }, answer: { ar: "تجد في صفحات الأنشطة والمعرض صورًا للكتابة والأعمال اليدوية والألعاب التعليمية والتعلّم الجماعي والرحلات، إلى جانب فيديوهات ومناسبات المدرسة.", fr: "Les pages Activités et Galerie présentent l’écriture, les travaux manuels, les jeux éducatifs, l’apprentissage en groupe et les sorties, ainsi que les vidéos et événements de l’école.", en: "The Activities and Gallery pages feature writing, crafts, educational games, group learning and outings, alongside school videos and occasions." } },
  ];
  return items.map(item => ({ id: item.id, question: item.question[lang], answer: item.answer[lang] }));
}