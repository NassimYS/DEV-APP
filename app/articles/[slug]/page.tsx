import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticle,
  getRelatedArticles,
  getAllArticles,
} from "@/lib/contentstack";
import { mapArticle } from "@/lib/mappers";
import ArticleDetail from "@/components/ArticleDetail";
import { getUrl } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles
    .filter((a) => a.url)
    .map((a) => ({ slug: getUrl(a.url).replace("/articles/", "") }))
    .filter((a) => a.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = await getArticle(slug);
  if (!raw) return {};
  return {
    title: raw.seo?.meta_title || raw.title,
    description: raw.seo?.meta_description || raw.summary,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const raw = await getArticle(slug);
  if (!raw) return notFound();

  const article = mapArticle(raw);

  const rawCategory = Array.isArray(raw.category)
    ? raw.category[0]
    : raw.category;

  const rawRelated = rawCategory
    ? await getRelatedArticles(rawCategory.uid, raw.uid)
    : [];

  const relatedArticles = rawRelated.map(mapArticle);

  return (
    <ArticleDetail article={article} relatedArticles={relatedArticles} />
  );
}
