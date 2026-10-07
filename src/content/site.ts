// ============================================================
// SALAOUANDJI SCHOOL — single source of editable site content.
// Edit names, subjects, activities, schedule, photos and contact here.
// Every text is { ar, fr }. Arabic is the primary language.
// ============================================================
import actScience from "@/assets/act-science.jpg";
import actKids from "@/assets/act-kids.jpg";
import actStudy from "@/assets/act-study.jpg";
import actEnglish from "@/assets/act-english.jpg";
import actWorkshop from "@/assets/act-workshop.jpg";
import heroImg from "@/assets/hero.jpg";

export type Lang = "ar" | "fr";
export type L = { ar: string; fr: string };

export const contact = {
  phoneDisplay: "0556 05 71 76",
  phoneTel: "+213556057176",
  whatsapp: "213556057176",
  email: "hibasalaouandji@gmail.com",
  address: { ar: "سيدي سعيد، تلمسان — مقابل العيادة البيطرية", fr: "Sidi Saïd, Tlemcen — en face de la clinique vétérinaire" },
  // MAP: replace mapQuery with exact "lat,lng" (e.g. "34.88,-1.31") once the precise location is known.
  mapQuery: "Sidi Said, Tlemcen, Algeria",
  // Optional: paste the exact Google Maps share link here.
  mapLink: "",
  social: {
    facebook: "https://www.facebook.com/search/top?q=Salaouandji%20School%20Tlemcen", // replace with the official page URL
    instagram: "", // add when available
  },
  waMessage: {
    ar: "مرحبًا، أرغب في الاستفسار عن التسجيل في صلوانجي سكول",
    fr: "Bonjour, je souhaite me renseigner sur l'inscription à Salaouandji School",
  },
};

export const images = { hero: heroImg };

export const ui = {
  ar: {
    tagline: "مدرسة خاصة — سيدي سعيد، تلمسان",
    nav: { about: "من نحن", subjects: "المواد", teachers: "الأساتذة", activities: "الأنشطة", gallery: "المعرض", schedule: "البرنامج", register: "التسجيل", contact: "تواصل" },
    heroBadge: "التسجيل مفتوح — الموسم الدراسي 2025/2026",
    heroTitle: ["تعلّم، تطوّر،", "وابدأ رحلتك نحو النجاح"],
    heroText: "مدرسة خاصة في حي سيدي سعيد بتلمسان. نرافق الأطفال في الأقسام التحضيرية بمنهج يراعي نموّهم الذهني والحركي والعاطفي، مع ورشات في اللغة الإنجليزية وأنشطة تربوية متنوّعة.",
    ctaRegister: "سجّل طفلك الآن",
    ctaWhatsapp: "راسلنا على واتساب",
    heroPoints: ["أقسام تحضيرية", "ورشات إنجليزية", "أنشطة بيداغوجية"],
    aboutLabel: "من نحن",
    aboutTitle: "فضاء آمن، منهج واضح، ومتابعة مستمرّة لكل طفل",
    aboutP1: "صلوانجي سكول مدرسة خاصة تقع في حي سيدي سعيد بولاية تلمسان. نستقبل الأطفال ضمن الأقسام التحضيرية بمنهج تربوي يراعي النمو الذهني والحركي والعاطفي للطفل.",
    aboutP2: "نرافق كل طفل بفريق تربوي متفانٍ، في بيئة دافئة تجمع بين التعلّم واللعب والاكتشاف.",
    pillars: [
      { t: "بيئة آمنة", d: "فضاء هادئ ومنظّم يشعر فيه الطفل بالراحة." },
      { t: "منهج متوازن", d: "تعلّم يراعي الجانب الذهني والحركي والعاطفي." },
      { t: "تواصل مع الأولياء", d: "متابعة مستمرة وتواصل مباشر مع العائلة." },
    ],
    subjectsLabel: "المواد والدروس", subjectsTitle: "ما يتعلّمه طفلك عندنا",
    teachersLabel: "الفريق التربوي", teachersTitle: "أساتذة يرافقون طفلك خطوة بخطوة", teachersNote: "سيتم نشر أسماء وصور الفريق التربوي قريبًا.",
    activitiesLabel: "الأنشطة", activitiesTitle: "أنشطة تصنع الفرق كل أسبوع",
    galleryLabel: "معرض الصور", galleryTitle: "لمحات من أجواء التعلّم", galleryNote: "صور توضيحية مؤقتة — ستُستبدل بصور المدرسة قريبًا.",
    scheduleLabel: "البرنامج الأسبوعي", scheduleTitle: "أسبوع منظّم ومتوازن", scheduleNote: "برنامج نموذجي للتوضيح — يُعلن البرنامج الرسمي عند الدخول.",
    time: "التوقيت",
    testimonialsLabel: "آراء الأولياء", testimonialsTitle: "ماذا يقول الأولياء", testimonialsNote: "نماذج توضيحية — ستُنشر شهادات الأولياء الحقيقية بعد موافقتهم.",
    regLabel: "التسجيل", regTitle: "التسجيل مفتوح للموسم الدراسي 2025/2026",
    regText: "الأماكن في الأقسام التحضيرية محدودة. تواصل معنا اليوم لحجز مكان طفلك والتعرّف على المدرسة عن قرب.",
    regSteps: [
      { t: "تواصل معنا", d: "عبر واتساب أو الهاتف." },
      { t: "زيارة المدرسة", d: "تعرّف على الفضاء والفريق." },
      { t: "تأكيد التسجيل", d: "نحجز مكان طفلك للموسم." },
    ],
    regCall: "اتصل بنا",
    contactLabel: "التواصل والموقع", contactTitle: "نسعد بزيارتك واستقبال أسئلتك",
    addressLabel: "العنوان", phoneLabel: "الهاتف", emailLabel: "البريد الإلكتروني",
    openMap: "فتح في الخرائط", mapNote: "الخريطة تُظهر منطقة سيدي سعيد — سيتم تحديد الموقع الدقيق قريبًا.",
    footerAbout: "مدرسة خاصة في سيدي سعيد، تلمسان — أقسام تحضيرية، ورشات لغة إنجليزية وأنشطة تربوية للأطفال.",
    footerLinks: "روابط", footerContact: "اتصل بنا", follow: "تابعنا",
    rights: "© 2026 صلوانجي سكول — جميع الحقوق محفوظة",
    sample: "صورة توضيحية", menu: "القائمة", close: "إغلاق", prev: "السابق", next: "التالي",
  },
  fr: {
    tagline: "École privée — Sidi Saïd, Tlemcen",
    nav: { about: "À propos", subjects: "Matières", teachers: "Enseignants", activities: "Activités", gallery: "Galerie", schedule: "Emploi du temps", register: "Inscription", contact: "Contact" },
    heroBadge: "Inscriptions ouvertes — Année 2025/2026",
    heroTitle: ["Apprends, progresse,", "et commence ton voyage vers la réussite"],
    heroText: "École privée à Sidi Saïd, Tlemcen. Nous accompagnons les enfants en classes préparatoires avec un programme respectant leur développement intellectuel, moteur et émotionnel, avec des ateliers d'anglais et des activités éducatives variées.",
    ctaRegister: "Inscrire mon enfant",
    ctaWhatsapp: "Écrire sur WhatsApp",
    heroPoints: ["Classes préparatoires", "Ateliers d'anglais", "Activités pédagogiques"],
    aboutLabel: "À propos",
    aboutTitle: "Un espace sûr, un programme clair, un suivi continu pour chaque enfant",
    aboutP1: "Salaouandji School est une école privée située à Sidi Saïd, Tlemcen. Nous accueillons les enfants en classes préparatoires avec un programme qui respecte leur développement intellectuel, moteur et émotionnel.",
    aboutP2: "Chaque enfant est accompagné par une équipe pédagogique dévouée, dans un cadre chaleureux qui allie apprentissage, jeu et découverte.",
    pillars: [
      { t: "Cadre sécurisé", d: "Un espace calme et organisé où l'enfant se sent bien." },
      { t: "Programme équilibré", d: "Un apprentissage intellectuel, moteur et émotionnel." },
      { t: "Lien avec les parents", d: "Un suivi régulier et une communication directe." },
    ],
    subjectsLabel: "Matières & cours", subjectsTitle: "Ce que votre enfant apprend chez nous",
    teachersLabel: "Équipe pédagogique", teachersTitle: "Des enseignants qui accompagnent votre enfant", teachersNote: "Les noms et photos de l'équipe seront publiés prochainement.",
    activitiesLabel: "Activités", activitiesTitle: "Des activités qui font la différence",
    galleryLabel: "Galerie", galleryTitle: "Instants d'apprentissage", galleryNote: "Images d'illustration temporaires — bientôt remplacées par des photos de l'école.",
    scheduleLabel: "Emploi du temps", scheduleTitle: "Une semaine organisée et équilibrée", scheduleNote: "Programme type à titre indicatif — le programme officiel sera communiqué à la rentrée.",
    time: "Horaire",
    testimonialsLabel: "Avis des parents", testimonialsTitle: "Ce que disent les parents", testimonialsNote: "Exemples d'illustration — les témoignages réels seront publiés avec l'accord des parents.",
    regLabel: "Inscription", regTitle: "Inscriptions ouvertes — année 2025/2026",
    regText: "Les places en classes préparatoires sont limitées. Contactez-nous dès aujourd'hui pour réserver la place de votre enfant et découvrir l'école.",
    regSteps: [
      { t: "Contactez-nous", d: "Par WhatsApp ou téléphone." },
      { t: "Visitez l'école", d: "Découvrez l'espace et l'équipe." },
      { t: "Confirmez", d: "Nous réservons la place de votre enfant." },
    ],
    regCall: "Appelez-nous",
    contactLabel: "Contact & localisation", contactTitle: "Au plaisir de vous accueillir",
    addressLabel: "Adresse", phoneLabel: "Téléphone", emailLabel: "E-mail",
    openMap: "Ouvrir dans Maps", mapNote: "La carte montre le quartier de Sidi Saïd — l'emplacement exact sera précisé bientôt.",
    footerAbout: "École privée à Sidi Saïd, Tlemcen — classes préparatoires, ateliers d'anglais et activités éducatives.",
    footerLinks: "Liens", footerContact: "Contact", follow: "Suivez-nous",
    rights: "© 2026 Salaouandji School — Tous droits réservés",
    sample: "Image d'illustration", menu: "Menu", close: "Fermer", prev: "Précédent", next: "Suivant",
  },
};

export type IconKey = "letters" | "numbers" | "english" | "arts" | "stories" | "music" | "review" | "workshop" | "science" | "kids" | "exam" | "games";

export const subjects: { icon: IconKey; title: L; desc: L }[] = [
  { icon: "letters", title: { ar: "الحروف والقراءة", fr: "Lettres & lecture" }, desc: { ar: "التعرّف على الحروف وتهيئة الطفل للقراءة.", fr: "Découverte des lettres et préparation à la lecture." } },
  { icon: "numbers", title: { ar: "الأرقام والحساب", fr: "Nombres & calcul" }, desc: { ar: "الأرقام والعدّ بأسلوب حسّي ممتع.", fr: "Nombres et comptage par la manipulation." } },
  { icon: "english", title: { ar: "اللغة الإنجليزية", fr: "Anglais" }, desc: { ar: "ورشات تفاعلية للحروف والكلمات الأولى والنطق.", fr: "Ateliers interactifs : lettres, premiers mots, prononciation." } },
  { icon: "arts", title: { ar: "الرسم والفنون", fr: "Dessin & arts" }, desc: { ar: "تنمية الخيال والمهارات الحركية الدقيقة.", fr: "Imagination et motricité fine." } },
  { icon: "stories", title: { ar: "القصص والحكايات", fr: "Contes & histoires" }, desc: { ar: "جلسات قراءة تنمّي حب الاستطلاع.", fr: "Séances de lecture qui éveillent la curiosité." } },
  { icon: "music", title: { ar: "الموسيقى والإيقاع", fr: "Musique & rythme" }, desc: { ar: "أنشطة صوتية وحركية ممتعة.", fr: "Activités sonores et motrices ludiques." } },
];

// Replace name with the real teacher name; set photo to an imported image when available.
export const teachers: { name: L; role: L; photo?: string }[] = [
  { name: { ar: "الاسم قريبًا", fr: "Nom à venir" }, role: { ar: "أستاذة القسم التحضيري", fr: "Enseignante — classe préparatoire" } },
  { name: { ar: "الاسم قريبًا", fr: "Nom à venir" }, role: { ar: "أستاذة اللغة الإنجليزية", fr: "Enseignante d'anglais" } },
  { name: { ar: "الاسم قريبًا", fr: "Nom à venir" }, role: { ar: "منشّطة الأنشطة الفنية", fr: "Animatrice — activités artistiques" } },
  { name: { ar: "الاسم قريبًا", fr: "Nom à venir" }, role: { ar: "مرافقة تربوية", fr: "Accompagnatrice pédagogique" } },
];

export const activities: { icon: IconKey; image: string; title: L; desc: L }[] = [
  { icon: "review", image: actStudy, title: { ar: "المراجعة والدعم", fr: "Révision & soutien" }, desc: { ar: "حصص مراجعة منظّمة لترسيخ المكتسبات.", fr: "Séances de révision pour consolider les acquis." } },
  { icon: "workshop", image: actWorkshop, title: { ar: "ورشات تعليمية", fr: "Ateliers éducatifs" }, desc: { ar: "تعلّم بالممارسة عبر الألعاب التربوية والتركيب.", fr: "Apprendre en manipulant : jeux éducatifs et construction." } },
  { icon: "english", image: actEnglish, title: { ar: "الإنجليزية والنطق", fr: "Anglais & prononciation" }, desc: { ar: "كلمات أولى ونطق سليم في جوّ تفاعلي.", fr: "Premiers mots et bonne prononciation, en interaction." } },
  { icon: "science", image: actScience, title: { ar: "العلوم والتجارب", fr: "Sciences & expériences" }, desc: { ar: "تجارب بسيطة تنمّي الفضول وروح الاكتشاف.", fr: "Des expériences simples qui nourrissent la curiosité." } },
  { icon: "kids", image: actKids, title: { ar: "أنشطة الأطفال", fr: "Activités enfants" }, desc: { ar: "الرسم، القصص والموسيقى في جوّ من المرح.", fr: "Dessin, contes et musique dans la bonne humeur." } },
  { icon: "exam", image: actStudy, title: { ar: "التحضير للامتحانات", fr: "Préparation aux examens" }, desc: { ar: "تمارين منهجية لبناء الثقة قبل الامتحان.", fr: "Exercices méthodiques pour aborder l'examen en confiance." } },
];

// Placeholder images — replace with real school photos (import them at the top of this file).
export const gallery: { src: string; alt: L }[] = [
  { src: actScience, alt: { ar: "أطفال يجرون تجربة علمية", fr: "Enfants réalisant une expérience" } },
  { src: actEnglish, alt: { ar: "حصة لغة إنجليزية", fr: "Cours d'anglais" } },
  { src: actKids, alt: { ar: "أطفال يرسمون", fr: "Enfants qui dessinent" } },
  { src: actWorkshop, alt: { ar: "ورشة ألعاب تربوية", fr: "Atelier de jeux éducatifs" } },
  { src: heroImg, alt: { ar: "فضاء مكتبة ومطالعة", fr: "Espace bibliothèque" } },
  { src: actStudy, alt: { ar: "جلسة مراجعة", fr: "Séance de révision" } },
];

// Weekly schedule (sample). Each row = one time slot; each cell = subject key for that day (or "" for free).
export const schedule = {
  days: [
    { ar: "الأحد", fr: "Dimanche" }, { ar: "الإثنين", fr: "Lundi" }, { ar: "الثلاثاء", fr: "Mardi" },
    { ar: "الأربعاء", fr: "Mercredi" }, { ar: "الخميس", fr: "Jeudi" },
  ],
  slots: [
    { time: "08:30 – 09:30", cells: ["letters", "numbers", "letters", "numbers", "letters"] },
    { time: "09:45 – 10:45", cells: ["english", "arts", "english", "stories", "english"] },
    { time: "11:00 – 12:00", cells: ["stories", "music", "games", "arts", "music"] },
  ] as { time: string; cells: string[] }[],
  labels: {
    letters: { ar: "الحروف", fr: "Lettres" },
    numbers: { ar: "الأرقام", fr: "Nombres" },
    english: { ar: "الإنجليزية", fr: "Anglais" },
    arts: { ar: "الرسم", fr: "Dessin" },
    stories: { ar: "القصص", fr: "Contes" },
    music: { ar: "الموسيقى", fr: "Musique" },
    games: { ar: "ألعاب تربوية", fr: "Jeux éducatifs" },
  } as Record<string, L>,
};

// Illustrative testimonials — replace with real, approved parent quotes.
export const testimonials: { quote: L; author: L }[] = [
  { quote: { ar: "مكان لشهادة وليّ أمر حقيقية بعد موافقته على النشر.", fr: "Emplacement pour un témoignage réel d'un parent, après son accord." }, author: { ar: "وليّ أمر — نموذج", fr: "Parent — exemple" } },
  { quote: { ar: "يمكن هنا عرض رأي عائلة حول تجربة طفلها في القسم التحضيري.", fr: "Ici, l'avis d'une famille sur l'expérience de son enfant en classe préparatoire." }, author: { ar: "وليّة أمر — نموذج", fr: "Maman — exemple" } },
  { quote: { ar: "مساحة لشهادة حول ورشات اللغة الإنجليزية والأنشطة.", fr: "Espace pour un avis sur les ateliers d'anglais et les activités." }, author: { ar: "وليّ أمر — نموذج", fr: "Papa — exemple" } },
];
