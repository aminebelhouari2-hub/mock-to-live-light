import founderPhoto from "@/assets/founder-certificate-presentation.jpg.asset.json";
import type { L } from "@/content/site";

export const founder = {
  photo: founderPhoto.url,
  photoAlt: { ar: "تقديم شهادة خلال لقاء بالمدرسة", fr: "Remise d’un certificat lors d’une rencontre à l’école", en: "Certificate presentation at a school gathering" } satisfies L,
  label: { ar: "صاحبة المؤسسة", fr: "La fondatrice", en: "The founder" } satisfies L,
  name: { ar: "الأستاذة صلوانجي هيبة منال", fr: "Mme Salaouandji Hiba Manal", en: "Ms Salaouandji Hiba Manal" } satisfies L,
  role: {
    ar: 'مؤسسة ومديرة "صلوانجي سكول" | أخصائية نفسانية إكلينيكية ومدرّبة معتمدة',
    fr: 'Fondatrice et directrice de « Salaouandji School » | Psychologue clinicienne et formatrice certifiée',
    en: 'Founder and director of Salaouandji School | Clinical psychologist and certified trainer',
  } satisfies L,
  intro: {
    ar: "تجمع الأستاذة صلوانجي هيبة منال بين التخصص الأكاديمي الدقيق والخبرة الميدانية الشاملة في الإدارة التربوية والدعم النفسي للطفل.",
    fr: "Mme Salaouandji Hiba Manal associe une spécialisation académique approfondie à une expérience de terrain en administration éducative et en soutien psychologique de l’enfant.",
    en: "Ms Salaouandji Hiba Manal combines in-depth academic specialisation with practical experience in educational management and psychological support for children.",
  } satisfies L,
  groups: [
    {
      title: { ar: "المؤهلات الأكاديمية والتخصصية", fr: "Qualifications académiques et spécialisées", en: "Academic and specialist qualifications" } satisfies L,
      items: [
        { title: { ar: "ماستر في علم النفس العيادي", fr: "Master en psychologie clinique", en: "Master’s in clinical psychology" }, description: { ar: "تخصص الصحة العقلية: علم الأمراض النفسية والصعوبات المدرسية (جامعة تلمسان).", fr: "Spécialité santé mentale : psychopathologie et difficultés scolaires (Université de Tlemcen).", en: "Mental health specialisation: psychopathology and school difficulties (University of Tlemcen)." } },
        { title: { ar: "ليسانس في علم النفس الإكلينيكي", fr: "Licence en psychologie clinique", en: "Bachelor’s in clinical psychology" }, description: { ar: "جامعة تلمسان.", fr: "Université de Tlemcen.", en: "University of Tlemcen." } },
        { title: { ar: "أخصائية في التشخيص النفسي", fr: "Spécialiste du diagnostic psychologique", en: "Specialist in psychological assessment" }, description: { ar: "شهادات معتمدة في تشخيص واحتواء اضطراب فرط الحركة ونقص الانتباه (ADHD) والعلاج النفسي الحديث (ACT).", fr: "Certifications en diagnostic et accompagnement du trouble du déficit de l’attention avec hyperactivité (ADHD), et en thérapie d’acceptation et d’engagement (ACT).", en: "Certifications in assessing and supporting attention-deficit/hyperactivity disorder (ADHD), and acceptance and commitment therapy (ACT)." } },
      ],
    },
    {
      title: { ar: "الشهادات التدريبية والتربوية المعتمدة (IATHCD)", fr: "Certifications en formation et éducation (IATHCD)", en: "Certified training and educational qualifications (IATHCD)" } satisfies L,
      items: [
        { title: { ar: "مدربة مدربين (TOT)", fr: "Formation de formateurs (TOT)", en: "Training of trainers (TOT)" }, description: { ar: "معتمدة في تدريب الكوادر وتنمية القدرات البشرية.", fr: "Certifiée en formation des équipes et développement des capacités humaines.", en: "Certified in staff training and human capacity development." } },
        { title: { ar: "مدربة معتمدة في الحساب الذهني (السوروبان - Soroban)", fr: "Formatrice certifiée en calcul mental (Soroban)", en: "Certified mental arithmetic trainer (Soroban)" }, description: { ar: "لتنمية ذكاء الطفل والقدرات الذهنية.", fr: "Pour développer l’intelligence et les capacités cognitives de l’enfant.", en: "Supporting children’s intelligence and cognitive abilities." } },
        { title: { ar: "مشهود لها في تسيير الروضات وتربية الأطفال", fr: "Qualification en gestion de maternelles et éducation des enfants", en: "Qualified in nursery management and child education" }, description: { ar: "تأهيل متخصص في الإدارة التربوية والتعامل مع المرحلة المدرسية الأولى.", fr: "Qualification spécialisée en administration éducative et accompagnement de la première étape scolaire.", en: "Specialist qualification in educational management and support during the first stage of schooling." } },
        { title: { ar: "مختصة في تحليل رسم الأطفال", fr: "Spécialiste de l’analyse des dessins d’enfants", en: "Specialist in analysing children’s drawings" }, description: { ar: "أداة نفسية وتربوية وفحص سلوكي لفهم شخصية الطفل واحتياجاته النفسية.", fr: "Outil psychologique, éducatif et d’observation comportementale pour comprendre la personnalité et les besoins psychologiques de l’enfant.", en: "A psychological, educational and behavioural observation tool for understanding children’s personalities and psychological needs." } },
      ],
    },
  ],
};