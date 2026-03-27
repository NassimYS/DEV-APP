import { notFound } from "next/navigation";
import { getPage } from "@/lib/contentstack";
import { mapPage } from "@/lib/mappers";
import Page from "@/components/Page";

export default async function PageRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const url = `/${slug.join("/")}`;

  const raw = await getPage(url);
  if (!raw) return notFound();

  const page = mapPage(raw);
  return <Page page={page} />;
}
