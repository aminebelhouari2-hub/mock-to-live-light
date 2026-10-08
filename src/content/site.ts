// ============================================================
// SALAOUANDJI SCHOOL — single source of editable site content.
// Edit names, subjects, activities, schedule, photos and contact here.
// Every text is { ar, fr }. Arabic is the primary language.
// ============================================================
import classroomColour from "@/assets/classroom-colour.jpg.asset.json";
import schoolOffice from "@/assets/school-office.jpg.asset.json";
import classroomAlphabet from "@/assets/classroom-alphabet.jpg.asset.json";
import learningGames from "@/assets/learning-games.jpg.asset.json";
import classroomDesks from "@/assets/classroom-desks.jpg.asset.json";
import supportWorkshop from "@/assets/support-workshop.jpg.asset.json";
import schoolCelebration from "@/assets/school-celebration.jpg.asset.json";
import supportLesson from "@/assets/support-lesson.jpg.asset.json";
const actScience = classroomAlphabet.url;
const actKids = schoolCelebration.url;
const actStudy = supportLesson.url;
const actEnglish = classroomAlphabet.url;
const actWorkshop = learningGames.url;
const heroImg = classroomDesks.url;

export type Lang = "ar" | "fr" | "en";
export type L = { ar: string; fr: string; en: string };

export const contact = {
  phoneDisplay: "0556 05 71 76",
  phoneTel: "+213556057176",
  whatsapp: "213556057176",
  email: "hibasalaouandji@gmail.com",
  address: { ar: "سيدي سعيد، تلمسان — مقابل العيادة البيطرية", fr: "Sidi Saïd, Tlemcen — en face de la clinique vétérinaire", en: "Sidi Saïd, Tlemcen — opposite the veterinary clinic" },
  // MAP: replace mapQuery with exact "lat,lng" (e.g. "34.88,-1.31") once the precise location is known.
  mapQuery: "Sidi Said, Tlemcen, Algeria",
  // Optional: paste the exact Google Maps share link here.
  mapLink: "https://maps.app.goo.gl/nqn6h7fU5Y6y9R2T7?g_st=ac",
  social: {
    facebook: "https://www.facebook.com/share/1Ewc71Ywjo/",
    instagram: "https://www.instagram.com/salaouandji_school?stkn=djdyMnVkMWozOWNu",
    tiktok: "https://www.tiktok.com/@salaouandji13?_r=1&_t=ZN-9AMzZKIlB26",
  },
  waMessage: {
    ar: "مرحبًا، أرغب في الاستفسار عن التسجيل في صلوانجي سكول",
    fr: "Bonjour, je souhaite me renseigner sur l'inscription à Salaouandji School", en: "Hello, I would like to ask about registration at Salaouandji School",
  },
};

export const images = { hero: heroImg };

const baseUi = {
  ar: {
    tagline: "مدرسة خاصة — سيدي سعيد، تلمسان",
    nav: { about: "من نحن", subjects: "المواد", teachers: "الأساتذة", activities: "الأنشطة", gallery: "المعرض", schedule: "البرنامج", register: "التسجيل", contact: "تواصل" },
    heroBadge: "التسجيل مفتوح — الموسم الدراسي {academicYear}",
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
    teachersLabel: "الفريق التربوي", teachersTitle: "أساتذة يرافقون طفلك خطوة بخطوة", teachersNote: "",
    activitiesLabel: "الأنشطة", activitiesTitle: "أنشطة الأسبوع",
    galleryLabel: "معرض الصور", galleryTitle: "محطات من أجواء التعلم", galleryNote: "",
    scheduleLabel: "البرنامج الأسبوعي", scheduleTitle: "أسبوع منظّم ومتوازن", scheduleNote: "برنامج نموذجي للتوضيح — يُعلن البرنامج الرسمي عند الدخول.",
    time: "التوقيت",
    testimonialsLabel: "آراء الأولياء", testimonialsTitle: "ماذا يقول الأولياء", testimonialsNote: "نماذج توضيحية — ستُنشر شهادات الأولياء الحقيقية بعد موافقتهم.",
    regLabel: "التسجيل", regTitle: "التسجيل مفتوح للموسم الدراسي {academicYear}",
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
    heroBadge: "Inscriptions ouvertes — Année {academicYear}",
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
    teachersLabel: "Équipe pédagogique", teachersTitle: "Des enseignants qui accompagnent votre enfant", teachersNote: "",
    activitiesLabel: "Activités", activitiesTitle: "Des activités qui font la différence",
    galleryLabel: "Galerie", galleryTitle: "Instants d'apprentissage", galleryNote: "",
    scheduleLabel: "Emploi du temps", scheduleTitle: "Une semaine organisée et équilibrée", scheduleNote: "Programme type à titre indicatif — le programme officiel sera communiqué à la rentrée.",
    time: "Horaire",
    testimonialsLabel: "Avis des parents", testimonialsTitle: "Ce que disent les parents", testimonialsNote: "Exemples d'illustration — les témoignages réels seront publiés avec l'accord des parents.",
    regLabel: "Inscription", regTitle: "Inscriptions ouvertes — année {academicYear}",
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
  { icon: "letters", title: { ar: "الحروف والقراءة", fr: "Lettres & lecture", en: "Letters & reading" }, desc: { ar: "التعرّف على الحروف وتهيئة الطفل للقراءة.", fr: "Découverte des lettres et préparation à la lecture.", en: "Discovering letters and preparing to read." } },
  { icon: "numbers", title: { ar: "الأرقام والحساب", fr: "Nombres & calcul", en: "Numbers & maths" }, desc: { ar: "الأرقام والعدّ بأسلوب حسّي ممتع.", fr: "Nombres et comptage par la manipulation.", en: "Learning numbers and counting through hands-on activities." } },
  { icon: "english", title: { ar: "اللغة الإنجليزية", fr: "Anglais", en: "English" }, desc: { ar: "ورشات تفاعلية للحروف والكلمات الأولى والنطق.", fr: "Ateliers interactifs : lettres, premiers mots, prononciation.", en: "Interactive workshops: letters, first words and pronunciation." } },
  { icon: "arts", title: { ar: "الرسم والفنون", fr: "Dessin & arts", en: "Drawing & arts" }, desc: { ar: "تنمية الخيال والمهارات الحركية الدقيقة.", fr: "Imagination et motricité fine.", en: "Developing imagination and fine motor skills." } },
  { icon: "stories", title: { ar: "القصص والحكايات", fr: "Contes & histoires", en: "Stories & tales" }, desc: { ar: "جلسات قراءة تنمّي حب الاستطلاع.", fr: "Séances de lecture qui éveillent la curiosité.", en: "Reading sessions that spark curiosity." } },
  { icon: "music", title: { ar: "الموسيقى والإيقاع", fr: "Musique & rythme", en: "Music & rhythm" }, desc: { ar: "أنشطة صوتية وحركية ممتعة.", fr: "Activités sonores et motrices ludiques.", en: "Playful sound and movement activities." } },
];

// Generic role titles; no personal names or inferred staff identities.
export const teachers: { name: L; role: L; photo?: string }[] = [
  { name: { ar: "أستاذ الرياضيات", fr: "Enseignant de mathématiques", en: "Mathematics teacher" }, role: { ar: "دروس الدعم المدرسي", fr: "Soutien scolaire", en: "School support" } },
  { name: { ar: "أستاذ الفيزياء", fr: "Enseignant de physique", en: "Physics teacher" }, role: { ar: "دروس الدعم المدرسي", fr: "Soutien scolaire", en: "School support" } },
  { name: { ar: "أستاذ اللغة الإنجليزية", fr: "Enseignant d’anglais", en: "English teacher" }, role: { ar: "اللغة والنطق", fr: "Langue et prononciation", en: "Language and pronunciation" } },
  { name: { ar: "أستاذ القسم التحضيري", fr: "Enseignant de classe préparatoire", en: "Preparatory class teacher" }, role: { ar: "التعلّم والأنشطة التربوية", fr: "Apprentissage et activités éducatives", en: "Learning and educational activities" } },
];

export const activities: { icon: IconKey; image: string; title: L; desc: L }[] = [
  { icon: "review", image: actStudy, title: { ar: "المراجعة والدعم", fr: "Révision & soutien", en: "Revision & support" }, desc: { ar: "حصص مراجعة منظّمة لترسيخ المكتسبات.", fr: "Séances de révision pour consolider les acquis.", en: "Structured revision to consolidate learning." } },
  { icon: "workshop", image: actWorkshop, title: { ar: "ورشات تعليمية", fr: "Ateliers éducatifs", en: "Educational workshops" }, desc: { ar: "تعلّم بالممارسة عبر الألعاب التربوية والتركيب.", fr: "Apprendre en manipulant : jeux éducatifs et construction.", en: "Hands-on learning through educational games and building." } },
  { icon: "english", image: actEnglish, title: { ar: "الإنجليزية والنطق", fr: "Anglais & prononciation", en: "English & pronunciation" }, desc: { ar: "كلمات أولى ونطق سليم في جوّ تفاعلي.", fr: "Premiers mots et bonne prononciation, en interaction.", en: "First words and clear pronunciation through interaction." } },
  { icon: "science", image: actScience, title: { ar: "العلوم والتجارب", fr: "Sciences & expériences", en: "Science & experiments" }, desc: { ar: "تجارب بسيطة تنمّي الفضول وروح الاكتشاف.", fr: "Des expériences simples qui nourrissent la curiosité.", en: "Simple experiments that nurture curiosity." } },
  { icon: "kids", image: actKids, title: { ar: "أنشطة الأطفال", fr: "Activités enfants", en: "Children’s activities" }, desc: { ar: "الرسم، القصص والموسيقى في جوّ من المرح.", fr: "Dessin, contes et musique dans la bonne humeur.", en: "Drawing, stories and music in a cheerful atmosphere." } },
  { icon: "exam", image: actStudy, title: { ar: "التحضير للامتحانات", fr: "Préparation aux examens", en: "Exam preparation" }, desc: { ar: "تمارين منهجية لبناء الثقة قبل الامتحان.", fr: "Exercices méthodiques pour aborder l'examen en confiance.", en: "Methodical practice to approach exams with confidence." } },
];

export type SchoolPhoto = { src: string; alt: L };
export const gallery: SchoolPhoto[] = [
  { src: learningGames.url, alt: { ar: "ألعاب تعليمية للأطفال", fr: "Jeux éducatifs pour enfants", en: "Children’s learning games" } },
  { src: schoolCelebration.url, alt: { ar: "نشاط ترفيهي للأطفال", fr: "Animation pour enfants", en: "Children’s celebration" } },
  { src: classroomColour.url, alt: { ar: "قاعة التعلّم", fr: "Salle d’apprentissage", en: "Learning classroom" } },
  { src: classroomAlphabet.url, alt: { ar: "قاعة الحروف", fr: "Salle des lettres", en: "Alphabet classroom" } },
  { src: classroomDesks.url, alt: { ar: "قاعة دروس الدعم", fr: "Salle de soutien scolaire", en: "Support classroom" } },
];
export const supportPhotos: SchoolPhoto[] = [
  { src: supportWorkshop.url, alt: { ar: "ورشة دروس الدعم", fr: "Atelier de soutien", en: "Support workshop" } },
  { src: supportLesson.url, alt: { ar: "حصة دروس الدعم", fr: "Cours de soutien", en: "Support lesson" } },
  { src: classroomDesks.url, alt: { ar: "قاعة الدراسة", fr: "Salle de classe", en: "School classroom" } },
];
// Only visible scenes are identified; no unprovided awards, birthdays or trips are claimed.
export const occasionPhotos: SchoolPhoto[] = [
  { src: schoolCelebration.url, alt: { ar: "لقاء ترفيهي للأطفال", fr: "Rencontre festive des enfants", en: "Children’s festive gathering" } },
  { src: schoolOffice.url, alt: { ar: "مكتب الإدارة والشهادات", fr: "Bureau et certificats", en: "School office and certificates" } },
  ...supportPhotos.slice(0, 2),
  gallery[0],
].filter((photo): photo is SchoolPhoto => photo !== undefined);
export const occasionTitle: L = { ar: "مناسبات وحياة المدرسة", fr: "Événements et vie de l’école", en: "Occasions and school life" };
export const serviceSeo = [
  { keywords: "روضة، أقسام تحضيرية، تلمسان", description: "روضة وأقسام تحضيرية في سيدي سعيد، تلمسان، للتعلّم والأنشطة التربوية." },
  { keywords: "دعم مدرسي، ابتدائي، متوسط، ثانوي", description: "دروس دعم مدرسي للمستوى الابتدائي والمتوسط والثانوي في سيدي سعيد، تلمسان." },
  { keywords: "عيادة نفسية، سيدي سعيد، تلمسان", description: "تواصل مع إدارة المدرسة للاستفسار عن العيادة النفسية في سيدي سعيد، تلمسان." },
];

// Weekly schedule (sample). Each row = one time slot; each cell = subject key for that day (or "" for free).
export const schedule = {
  days: [
    { ar: "الأحد", fr: "Dimanche", en: "Sunday" }, { ar: "الإثنين", fr: "Lundi", en: "Monday" }, { ar: "الثلاثاء", fr: "Mardi", en: "Tuesday" },
    { ar: "الأربعاء", fr: "Mercredi", en: "Wednesday" }, { ar: "الخميس", fr: "Jeudi", en: "Thursday" },
  ],
  slots: [
    { time: "08:30 – 09:30", cells: ["letters", "numbers", "letters", "numbers", "letters"] },
    { time: "09:45 – 10:45", cells: ["english", "arts", "english", "stories", "english"] },
    { time: "11:00 – 12:00", cells: ["stories", "music", "games", "arts", "music"] },
  ] as { time: string; cells: string[] }[],
  labels: {
    letters: { ar: "الحروف", fr: "Lettres", en: "Letters" },
    numbers: { ar: "الأرقام", fr: "Nombres", en: "Numbers" },
    english: { ar: "الإنجليزية", fr: "Anglais", en: "English" },
    arts: { ar: "الرسم", fr: "Dessin", en: "Drawing" },
    stories: { ar: "القصص", fr: "Contes", en: "Stories" },
    music: { ar: "الموسيقى", fr: "Musique", en: "Music" },
    games: { ar: "ألعاب تربوية", fr: "Jeux éducatifs", en: "Educational games" },
  } as Record<string, L>,
};

// Illustrative testimonials — replace with real, approved parent quotes.
export const testimonials: { quote: L; author: L }[] = [
  { quote: { ar: "مكان لشهادة وليّ أمر حقيقية بعد موافقته على النشر.", fr: "Emplacement pour un témoignage réel d'un parent, après son accord.", en: "Space for a real parent testimonial, published with permission." }, author: { ar: "وليّ أمر — نموذج", fr: "Parent — exemple", en: "Parent — sample" } },
  { quote: { ar: "يمكن هنا عرض رأي عائلة حول تجربة طفلها في القسم التحضيري.", fr: "Ici, l'avis d'une famille sur l'expérience de son enfant en classe préparatoire.", en: "Space for a family’s experience of their child’s preparatory class." }, author: { ar: "وليّة أمر — نموذج", fr: "Maman — exemple", en: "Mother — sample" } },
  { quote: { ar: "مساحة لشهادة حول ورشات اللغة الإنجليزية والأنشطة.", fr: "Espace pour un avis sur les ateliers d'anglais et les activités.", en: "Space for feedback on English workshops and activities." }, author: { ar: "وليّ أمر — نموذج", fr: "Papa — exemple", en: "Father — sample" } },
];


export const ui = {
  ...baseUi,
  en: {
    tagline: "Private school — Sidi Saïd, Tlemcen",
    nav: { about: "About", subjects: "Subjects", teachers: "Teachers", activities: "Activities", gallery: "Gallery", schedule: "Schedule", register: "Register", contact: "Contact" },
    heroBadge: "Registration open — Academic year {academicYear}",
    heroTitle: ["Learn, grow,", "and begin your journey to success"],
    heroText: "A private school in Sidi Saïd, Tlemcen. Our preparatory classes respect children’s intellectual, physical and emotional development, with English workshops and varied educational activities.",
    ctaRegister: "Register my child", ctaWhatsapp: "Message us on WhatsApp",
    heroPoints: ["Preparatory classes", "English workshops", "Educational activities"],
    aboutLabel: "About us", aboutTitle: "A safe space, a balanced programme, and continuous support for every child",
    aboutP1: "Salaouandji School is a private school in Sidi Saïd, Tlemcen. We welcome children in preparatory classes with a programme that respects their intellectual, physical and emotional development.",
    aboutP2: "A dedicated educational team supports each child in a welcoming environment that brings together learning, play and discovery.",
    pillars: [{ t: "A safe environment", d: "A calm, organised space where children feel at ease." }, { t: "Balanced learning", d: "Learning that supports intellectual, physical and emotional development." }, { t: "Connected with families", d: "Regular follow-up and direct communication with parents." }],
    subjectsLabel: "Subjects & lessons", subjectsTitle: "What your child learns with us",
    teachersLabel: "Educational team", teachersTitle: "Teachers who support your child, step by step", teachersNote: "",
    activitiesLabel: "Activities", activitiesTitle: "Activities that make a difference every week",
    galleryLabel: "Photo gallery", galleryTitle: "Moments of learning", galleryNote: "",
    scheduleLabel: "Weekly schedule", scheduleTitle: "An organised, balanced week", scheduleNote: "Illustrative timetable — the official schedule will be announced at the start of term.", time: "Time",
    testimonialsLabel: "Parents’ voices", testimonialsTitle: "What parents say", testimonialsNote: "Illustrative samples — real testimonials will be published with parents’ permission.",
    regLabel: "Registration", regTitle: "Registration open — Academic year {academicYear}",
    regText: "Places in preparatory classes are limited. Contact us to enquire about a place for your child and visit the school.",
    regSteps: [{ t: "Contact us", d: "Via WhatsApp or phone." }, { t: "Visit the school", d: "Meet the team and discover the space." }, { t: "Confirm registration", d: "Reserve your child’s place for the school year." }],
    regCall: "Call us", contactLabel: "Contact & location", contactTitle: "We look forward to welcoming you",
    addressLabel: "Address", phoneLabel: "Phone", emailLabel: "Email", openMap: "Open in Maps", mapNote: "The map shows the Sidi Saïd area — the precise location will be confirmed soon.",
    footerAbout: "Private school in Sidi Saïd, Tlemcen — preparatory classes, English workshops and educational activities.", footerLinks: "Links", footerContact: "Contact us", follow: "Follow us",
    rights: "Salaouandji School — All rights reserved", sample: "Illustrative image", menu: "Menu", close: "Close", prev: "Previous", next: "Next"
  }
};

export const supportCourses = [
  { level: "المستوى الابتدائي", shortLevel: "AP", description: "دروس دعم ومراجعة لمختلف المواد الأساسية.", subjects: ["اللغة العربية", "الرياضيات", "اللغة الفرنسية", "اللغة الإنجليزية", "التربية الإسلامية"] },
  { level: "المستوى المتوسط", shortLevel: "AM", description: "مرافقة التلميذ للتحضير الجيد والرفع من المستوى.", subjects: ["اللغة العربية", "الرياضيات", "اللغة الفرنسية", "اللغة الإنجليزية", "العلوم الفيزيائية", "علوم الطبيعة والحياة", "التاريخ والجغرافيا"] },
  { level: "المستوى الثانوي", shortLevel: "AS", description: "تحضير منهجي ومرافقة موجهة نحو شهادة البكالوريا.", subjects: ["الرياضيات", "العلوم الطبيعية", "العلوم الفيزيائية", "اللغة العربية", "اللغة الفرنسية", "اللغة الإنجليزية", "الفلسفة", "التاريخ والجغرافيا"] }
];

export const supportUi: Record<Lang, { title: string; description: string; year: string; subjects: string; cta: string; name: string; phone: string; level: string }> = {
  ar: { title: "دروس الدعم", description: "مرافقة تربوية منظمة تساعد التلميذ على فهم الدروس، سدّ الثغرات وتحسين مستواه طوال السنة الدراسية.", year: "السنة الدراسية", subjects: "المواد المتوفرة", cta: "التسجيل والاستفسار", name: "اسم ولي الأمر", phone: "رقم الهاتف", level: "المستوى الدراسي" },
  fr: { title: "Cours de soutien", description: "Un accompagnement pédagogique structuré pour comprendre les cours, combler les lacunes et progresser tout au long de l’année scolaire.", year: "Année scolaire", subjects: "Matières disponibles", cta: "Inscription et renseignements", name: "Nom du parent", phone: "Numéro de téléphone", level: "Niveau scolaire" },
  en: { title: "Support classes", description: "Structured educational support to understand lessons, close learning gaps and improve throughout the academic year.", year: "Academic year", subjects: "Available subjects", cta: "Registration & enquiries", name: "Parent’s name", phone: "Phone number", level: "School level" }
};

const supportTranslations: Record<string, L> = {
  "المستوى الابتدائي": {"ar": "المستوى الابتدائي", "fr": "Niveau primaire", "en": "Primary level"},
  "المستوى المتوسط": {"ar": "المستوى المتوسط", "fr": "Niveau moyen", "en": "Middle level"},
  "المستوى الثانوي": {"ar": "المستوى الثانوي", "fr": "Niveau secondaire", "en": "Secondary level"},
  "دروس دعم ومراجعة لمختلف المواد الأساسية.": {"ar": "دروس دعم ومراجعة لمختلف المواد الأساسية.", "fr": "Soutien et révision des matières fondamentales.", "en": "Support and revision across core subjects."},
  "مرافقة التلميذ للتحضير الجيد والرفع من المستوى.": {"ar": "مرافقة التلميذ للتحضير الجيد والرفع من المستوى.", "fr": "Un accompagnement pour bien se préparer et progresser.", "en": "Guided preparation to strengthen understanding and progress."},
  "تحضير منهجي ومرافقة موجهة نحو شهادة البكالوريا.": {"ar": "تحضير منهجي ومرافقة موجهة نحو شهادة البكالوريا.", "fr": "Une préparation méthodique et un accompagnement vers le baccalauréat.", "en": "Methodical preparation and guidance towards the baccalaureate."},
  "اللغة العربية": {"ar": "اللغة العربية", "fr": "Arabe", "en": "Arabic"},
  "الرياضيات": {"ar": "الرياضيات", "fr": "Mathématiques", "en": "Mathematics"},
  "اللغة الفرنسية": {"ar": "اللغة الفرنسية", "fr": "Français", "en": "French"},
  "اللغة الإنجليزية": {"ar": "اللغة الإنجليزية", "fr": "Anglais", "en": "English"},
  "التربية الإسلامية": {"ar": "التربية الإسلامية", "fr": "Éducation islamique", "en": "Islamic education"},
  "العلوم الفيزيائية": {"ar": "العلوم الفيزيائية", "fr": "Sciences physiques", "en": "Physical sciences"},
  "علوم الطبيعة والحياة": {"ar": "علوم الطبيعة والحياة", "fr": "Sciences de la nature et de la vie", "en": "Natural and life sciences"},
  "العلوم الطبيعية": {"ar": "العلوم الطبيعية", "fr": "Sciences naturelles", "en": "Natural sciences"},
  "التاريخ والجغرافيا": {"ar": "التاريخ والجغرافيا", "fr": "Histoire et géographie", "en": "History & geography"},
  "الفلسفة": {"ar": "الفلسفة", "fr": "Philosophie", "en": "Philosophy"},
};

export function translateSupport(text: string, lang: Lang): string {
  return supportTranslations[text]?.[lang] ?? text;
}
