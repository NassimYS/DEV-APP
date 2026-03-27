import { getPage } from "@/lib/contentstack";
import { mapPage } from "@/lib/mappers";
import Page from "@/components/Page";

export default async function Home() {
  const raw = await getPage("/");
  const page = raw ? mapPage(raw) : null;
  return <Page page={page} />;
}
