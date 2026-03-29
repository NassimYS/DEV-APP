"use client";

import { useState, useEffect, useCallback } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getCategory, getArticlesByCategory, initLivePreview } from "@/lib/contentstack";
import { mapCategory, mapArticle } from "@/lib/mappers";
import type { MappedCategory, MappedArticle } from "@/lib/mappers/types";
import CategoryDetail from "./CategoryDetail";

export default function CategoryPreview({ slug }: { slug: string }) {
  const [category, setCategory] = useState<MappedCategory | null>(null);
  const [articles, setArticles] = useState<MappedArticle[]>([]);

  const getContent = useCallback(async () => {
    const raw = await getCategory(slug);
    if (!raw) return;

    setCategory(mapCategory(raw));

    const rawArticles = await getArticlesByCategory(raw.uid);
    setArticles(rawArticles.map(mapArticle));
  }, [slug]);

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [slug, getContent]);

  if (!category) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <CategoryDetail category={category} articles={articles} />;
}
