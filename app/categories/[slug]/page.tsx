import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  isPreview,
  getCategory,
  getArticlesByCategory,
  getAllCategories,
} from "@/lib/contentstack";
import { mapCategory, mapArticle } from "@/lib/mappers";
import CategoryDetail from "@/components/CategoryDetail";
import CategoryPreview from "@/components/CategoryPreview";
import { getUrl } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (isPreview) return [];
  const categories = await getAllCategories();
  return categories
    .filter((c) => c.url)
    .map((c) => ({ slug: getUrl(c.url).replace("/categories/", "") }))
    .filter((c) => c.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = await getCategory(slug);
  if (!raw) return {};
  return {
    title: raw.seo?.meta_title || raw.title,
    description: raw.seo?.meta_description || raw.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  if (isPreview) {
    return <CategoryPreview slug={slug} />;
  }

  const raw = await getCategory(slug);
  if (!raw) return notFound();

  const category = mapCategory(raw);
  const rawArticles = await getArticlesByCategory(raw.uid);
  const articles = rawArticles.map(mapArticle);

  return (
    <CategoryDetail category={category} articles={articles} />
  );
}

