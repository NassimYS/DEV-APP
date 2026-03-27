"use client";

import { useState, useEffect, useCallback } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getPage, initLivePreview } from "@/lib/contentstack";
import type { PageComponent } from "@/types";
import Page from "./Page";

export default function Preview({ path }: { path: string }) {
  const [page, setPage] = useState<PageComponent | null>(null);

  const getContent = useCallback(async () => {
    const data = await getPage(path);
    setPage(data);
  }, [path]);

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [path, getContent]);

  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <Page page={page} />;
}
