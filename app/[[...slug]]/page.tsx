import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  isPreview,
  getPage,
  getArticle,
  getRelatedArticles,
  getAuthor,
  getArticlesByAuthor,
  getCategory,
  getArticlesByCategory,
} from "@/lib/contentstack";
import {
  mapPage,
  enrichPageSections,
  mapArticle,
  mapAuthor,
  mapCategory,
} from "@/lib/mappers";
import Page from "@/components/Page";
import Preview from "@/components/Preview";
import ArticleDetail from "@/components/ArticleDetail";
import ArticlePreview from "@/components/ArticlePreview";
import AuthorDetail from "@/components/AuthorDetail";
import AuthorPreview from "@/components/AuthorPreview";
import CategoryDetail from "@/components/CategoryDetail";
import CategoryPreview from "@/components/CategoryPreview";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug?: string[] }> };

type Route =
  | { type: "page"; url: string }
  | { type: "article"; slug: string }
  | { type: "author"; slug: string }
  | { type: "category"; slug: string };

function resolveRoute(slug?: string[]): Route {
  if (!slug || slug.length === 0) {
    return { type: "page", url: "/" };
  }

  const [first, second] = slug;

  if (first === "articles" && second) {
    return { type: "article", slug: second };
  }
  if (first === "auteurs" && second) {
    return { type: "author", slug: second };
  }
  if (first === "categories" && second) {
    return { type: "category", slug: second };
  }

  return { type: "page", url: `/${slug.join("/")}` };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = resolveRoute(slug);

  switch (route.type) {
    case "article": {
      const raw = await getArticle(route.slug);
      if (!raw) return {};
      return {
        title: raw.seo?.meta_title || raw.title,
        description: raw.seo?.meta_description || raw.summary,
      };
    }
    case "author": {
      const raw = await getAuthor(route.slug);
      if (!raw) return {};
      return {
        title: raw.seo?.meta_title || raw.title,
        description: raw.seo?.meta_description || raw.bio,
      };
    }
    case "category": {
      const raw = await getCategory(route.slug);
      if (!raw) return {};
      return {
        title: raw.seo?.meta_title || raw.title,
        description: raw.seo?.meta_description || raw.description,
      };
    }
    default:
      return {};
  }
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const route = resolveRoute(slug);

  switch (route.type) {
    case "article": {
      if (isPreview) return <ArticlePreview slug={route.slug} />;

      const raw = await getArticle(route.slug);
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

    case "author": {
      if (isPreview) return <AuthorPreview slug={route.slug} />;

      const raw = await getAuthor(route.slug);
      if (!raw) return notFound();

      const author = mapAuthor(raw);
      const rawArticles = await getArticlesByAuthor(raw.uid);
      const articles = rawArticles.map(mapArticle);

      return <AuthorDetail author={author} articles={articles} />;
    }

    case "category": {
      if (isPreview) return <CategoryPreview slug={route.slug} />;

      const raw = await getCategory(route.slug);
      if (!raw) return notFound();

      const category = mapCategory(raw);
      const rawArticles = await getArticlesByCategory(raw.uid);
      const articles = rawArticles.map(mapArticle);

      return <CategoryDetail category={category} articles={articles} />;
    }

    case "page": {
      if (isPreview) return <Preview path={route.url} />;

      const raw = await getPage(route.url);
      if (!raw) return notFound();

      const page = await enrichPageSections(mapPage(raw));
      return <Page page={page} />;
    }
  }
}
