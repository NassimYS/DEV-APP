import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategory,
  getArticlesByCategory,
  getAllCategories,
  isPreview,
} from "@/lib/contentstack";
import Preview from "@/components/Preview";
import CategoryDetail from "@/components/CategoryDetail";
import { getUrl } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories
    .filter((c) => c.url)
    .map((c) => ({ slug: getUrl(c.url).replace("/categories/", "") }))
    .filter((c) => c.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return {
    title: category.seo?.meta_title || category.title,
    description: category.seo?.meta_description || category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  if (isPreview) {
    return <Preview path={`/categories/${slug}`} />;
  }

  const category = await getCategory(slug);
  if (!category) return notFound();

  const articles = await getArticlesByCategory(category.uid);

  return (
    <CategoryDetail category={category} articles={articles} />
  );
}
