"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { initLivePreview } from "@/lib/contentstack";

export default function LivePreviewInit() {
  const router = useRouter();

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(() => {
      router.refresh();
    });
  }, [router]);

  return null;
}
