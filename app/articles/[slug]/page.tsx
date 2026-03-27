import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticle,
  getRelatedArticles,
  getAllArticles,
  isPreview,
} from "@/lib/contentstack";
import Preview from "@/components/Preview";
import ArticleDetail from "@/components/ArticleDetail";
import { getUrl } from "@/types";
import type { Article } from "@/types";

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
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.seo?.meta_title || article.title,
    description: article.seo?.meta_description || article.summary,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  if (isPreview) {
    return <Preview path={`/articles/${slug}`} />;
  }

  const article = await getArticle(slug);
  if (!article) return notFound();

  const category = Array.isArray(article.category)
    ? article.category[0]
    : article.category;

  const relatedArticles = category
    ? await getRelatedArticles(category.uid, article.uid)
    : [];

  return (
    <ArticleDetail article={article} relatedArticles={relatedArticles} />
  );
}
