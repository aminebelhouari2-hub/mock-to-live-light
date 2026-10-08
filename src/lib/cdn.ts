// Asset files are served by the Lovable host; absolute URLs keep photos working on any custom domain.
const ASSET_ORIGIN = "https://salaouandjschool.lovable.app";
export const cdn = (url: string) => (url.startsWith("/__l5e/") ? ASSET_ORIGIN + url : url);
