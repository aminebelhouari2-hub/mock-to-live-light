import { SchoolCarousel } from "@/components/school-carousel";
import { homepagePhotos, eventPhotos, occasionTitle, type Lang, type SchoolPhoto } from "@/content/site";

export function SchoolOccasions({ lang, hero = false, photos = hero ? homepagePhotos : eventPhotos }: { lang: Lang; hero?: boolean; photos?: SchoolPhoto[] }) {
  return <SchoolCarousel lang={lang} label={occasionTitle[lang]} single={hero}>
    {photos.map((photo, index) => <img key={photo.src} src={photo.src} alt={photo.alt[lang]}
      loading={hero ? "eager" : "lazy"} decoding="async" fetchPriority={hero && index === 0 ? "high" : "auto"}
      width={1365} height={1024} className="aspect-[4/3] w-full rounded-3xl border border-glass-border bg-glass-surface object-contain shadow-glass" />)}
  </SchoolCarousel>;
}