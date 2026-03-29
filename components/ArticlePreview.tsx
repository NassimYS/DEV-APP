"use client";

import { useState, useEffect, useCallback } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getArticle, getRelatedArticles, initLivePreview } from "@/lib/contentstack";
import { mapArticle } from "@/lib/mappers";
import type { MappedArticle } from "@/lib/mappers/types";
import ArticleDetail from "./ArticleDetail";

export default function ArticlePreview({ slug }: { slug: string }) {
  const [article, setArticle] = useState<MappedArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<MappedArticle[]>([]);

  const getContent = useCallback(async () => {
    const raw = await getArticle(slug);
    if (!raw) return;

    const mapped = mapArticle(raw);
    setArticle(mapped);

    const rawCategory = Array.isArray(raw.category) ? raw.category[0] : raw.category;
    const rawRelated = rawCategory
      ? await getRelatedArticles(rawCategory.uid, raw.uid)
      : [];
    setRelatedArticles(rawRelated.map(mapArticle));
  }, [slug]);

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [slug, getContent]);

  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <ArticleDetail article={article} relatedArticles={relatedArticles} />;
}
