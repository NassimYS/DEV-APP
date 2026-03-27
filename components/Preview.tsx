"use client";

import { useState, useEffect, useCallback } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getPage, initLivePreview } from "@/lib/contentstack";
import { mapPage } from "@/lib/mappers";
import type { MappedPage } from "@/lib/mappers/types";
import Page from "./Page";

export default function Preview({ path }: { path: string }) {
  const [page, setPage] = useState<MappedPage | null>(null);

  const getContent = useCallback(async () => {
    const data = await getPage(path);
    setPage(data ? mapPage(data) : null);
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
