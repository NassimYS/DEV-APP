"use client";

import { useState, useEffect, useCallback } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getAuthor, getArticlesByAuthor, initLivePreview } from "@/lib/contentstack";
import { mapAuthor, mapArticle } from "@/lib/mappers";
import type { MappedAuthor, MappedArticle } from "@/lib/mappers/types";
import AuthorDetail from "./AuthorDetail";

export default function AuthorPreview({ slug }: { slug: string }) {
  const [author, setAuthor] = useState<MappedAuthor | null>(null);
  const [articles, setArticles] = useState<MappedArticle[]>([]);

  const getContent = useCallback(async () => {
    const raw = await getAuthor(slug);
    if (!raw) return;

    setAuthor(mapAuthor(raw));

    const rawArticles = await getArticlesByAuthor(raw.uid);
    setArticles(rawArticles.map(mapArticle));
  }, [slug]);

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [slug, getContent]);

  if (!author) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <AuthorDetail author={author} articles={articles} />;
}
