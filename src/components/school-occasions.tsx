import { SchoolCarousel } from "@/components/school-carousel";
import { homepagePhotos, eventPhotos, occasionTitle, type Lang } from "@/content/site";

export function SchoolOccasions({ lang, hero = false }: { lang: Lang; hero?: boolean }) {
  return <SchoolCarousel lang={lang} label={occasionTitle[lang]} single={hero}>
    {(hero ? homepagePhotos : eventPhotos).map((photo, index) => <img key={photo.src} src={photo.src} alt={photo.alt[lang]}
      loading={hero ? "eager" : "lazy"} decoding="async" fetchPriority={hero && index === 0 ? "high" : "auto"}
      width={1365} height={1024} className="aspect-[4/3] w-full rounded-lg bg-sand object-contain" />)}
  </SchoolCarousel>;
}