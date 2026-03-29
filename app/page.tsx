import { isPreview, getPage } from "@/lib/contentstack";
import { mapPage, enrichPageSections } from "@/lib/mappers";
import Page from "@/components/Page";
import Preview from "@/components/Preview";

export default async function Home() {
  if (isPreview) {
    return <Preview path="/" />;
  }
  const raw = await getPage("/");
  if (!raw) return null;
  const page = await enrichPageSections(mapPage(raw));
  return <Page page={page} />;
}

