import { notFound } from "next/navigation";
import { isPreview, getPage } from "@/lib/contentstack";
import { mapPage, enrichPageSections } from "@/lib/mappers";
import Page from "@/components/Page";
import Preview from "@/components/Preview";

export default async function PageRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const url = `/${slug.join("/")}`;

  if (isPreview) {
    return <Preview path={url} />;
  }

  const raw = await getPage(url);
  if (!raw) return notFound();

  const page = await enrichPageSections(mapPage(raw));
  return <Page page={page} />;
}

