import type { CSLPFieldMapping } from "@/types";

// ── Shared ──

export interface MappedImage {
  url: string;
  alt: string;
  caption?: string;
  $?: {
    image?: CSLPFieldMapping;
    alt_text?: CSLPFieldMapping;
    caption?: CSLPFieldMapping;
  };
}

export interface MappedSocialLink {
  platform: string;
  url: string;
  $?: { url?: CSLPFieldMapping };
}

export interface MappedSeo {
  metaTitle?: string;
  metaDescription?: string;
}

// ── Content Types ──

export interface MappedArticle {
  uid: string;
  title: string;
  url: string;
  summary?: string;
  content?: string;
  image?: MappedImage;
  author?: MappedAuthor;
  category?: MappedCategory;
  publishedDate?: string;
  readingTime?: number;
  seo?: MappedSeo;
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface MappedAuthor {
  uid: string;
  title: string;
  url: string;
  bio?: string;
  photo?: MappedImage;
  socialLinks: MappedSocialLink[];
  seo?: MappedSeo;
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface MappedCategory {
  uid: string;
  title: string;
  url: string;
  description?: string;
  image?: MappedImage;
  color: string;
  buttonLabel?: string;
  seo?: MappedSeo;
  $?: Record<string, CSLPFieldMapping | undefined>;
}

// ── Modular Block Props ──

export interface MappedHeroProps {
  article?: MappedArticle;
  highlightText?: string;
  color: string;
  _metadata?: { uid: string };
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface MappedRecentArticlesProps {
  sectionTitle?: string;
  filterCategoryUid?: string;
  showAuthor: boolean;
  showDate: boolean;
  articles: MappedArticle[];
  _metadata?: { uid: string };
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface MappedArticlesListProps {
  sectionTitle?: string;
  filterCategoryUid?: string;
  articlesPerPage: number;
  articles: MappedArticle[];
  _metadata?: { uid: string };
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface MappedCategoriesProps {
  sectionTitle?: string;
  displayType: "grid" | "list";
  buttonLabel?: string;
  categories: MappedCategory[];
  _metadata?: { uid: string };
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface MappedAuthorsProps {
  sectionTitle?: string;
  display?: string;
  authors: MappedAuthor[];
  _metadata?: { uid: string };
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface MappedSection {
  type:
    | "hero"
    | "recentArticles"
    | "articlesList"
    | "categories"
    | "authors";
  key: string;
  props:
    | MappedHeroProps
    | MappedRecentArticlesProps
    | MappedArticlesListProps
    | MappedCategoriesProps
    | MappedAuthorsProps;
}

export interface MappedPage {
  uid: string;
  title: string;
  url: string;
  seo?: MappedSeo;
  sections: MappedSection[];
  $?: Record<string, CSLPFieldMapping | undefined>;
}

// ── Singletons ──

export interface MappedNavItem {
  title: string;
  url: string;
  $?: { title?: CSLPFieldMapping; url?: CSLPFieldMapping };
}

export interface MappedHeader {
  logoUrl?: string;
  logoAlt?: string;
  siteName?: string;
  navigation: MappedNavItem[];
  logo$?: { image?: CSLPFieldMapping };
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface MappedFooter {
  description?: string;
  categories: MappedCategory[];
  socialLinks: MappedSocialLink[];
  $?: Record<string, CSLPFieldMapping | undefined>;
}
