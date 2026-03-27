import { notFound } from "next/navigation";
import { getPage, isPreview } from "@/lib/contentstack";
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

  const page = await getPage(url);
  if (!page) return notFound();

  return <Page page={page} />;
}
