import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAuthor,
  getArticlesByAuthor,
  getAllAuthors,
  isPreview,
} from "@/lib/contentstack";
import Preview from "@/components/Preview";
import AuthorDetail from "@/components/AuthorDetail";
import { getUrl } from "@/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors
    .filter((a) => a.url)
    .map((a) => ({ slug: getUrl(a.url).replace("/auteurs/", "") }))
    .filter((a) => a.slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) return {};
  return {
    title: author.seo?.meta_title || author.title,
    description: author.seo?.meta_description || author.bio,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;

  if (isPreview) {
    return <Preview path={`/auteurs/${slug}`} />;
  }

  const author = await getAuthor(slug);
  if (!author) return notFound();

  const articles = await getArticlesByAuthor(author.uid);

  return <AuthorDetail author={author} articles={articles} />;
}
