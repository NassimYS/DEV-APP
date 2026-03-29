import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  isPreview,
  getAuthor,
  getArticlesByAuthor,
  getAllAuthors,
} from "@/lib/contentstack";
import { mapAuthor, mapArticle } from "@/lib/mappers";
import AuthorDetail from "@/components/AuthorDetail";
import AuthorPreview from "@/components/AuthorPreview";
import { getUrl } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (isPreview) return [];
  const authors = await getAllAuthors();
  return authors
    .filter((a) => a.url)
    .map((a) => ({ slug: getUrl(a.url).replace("/auteurs/", "") }))
    .filter((a) => a.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const raw = await getAuthor(slug);
  if (!raw) return {};
  return {
    title: raw.seo?.meta_title || raw.title,
    description: raw.seo?.meta_description || raw.bio,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;

  if (isPreview) {
    return <AuthorPreview slug={slug} />;
  }

  const raw = await getAuthor(slug);
  if (!raw) return notFound();

  const author = mapAuthor(raw);
  const rawArticles = await getArticlesByAuthor(raw.uid);
  const articles = rawArticles.map(mapArticle);

  return <AuthorDetail author={author} articles={articles} />;
}

