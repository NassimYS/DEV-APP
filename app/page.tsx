import { getPage, isPreview } from "@/lib/contentstack";
import Page from "@/components/Page";
import Preview from "@/components/Preview";

export default async function Home() {
  if (isPreview) {
    return <Preview path="/" />;
  }

  const page = await getPage("/");
  return <Page page={page} />;
}
