export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface CSLPAttribute {
  "data-cslp"?: string;
  "data-cslp-parent-field"?: string;
}

export type CSLPFieldMapping = CSLPAttribute;

export interface SystemFields {
  uid: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: PublishDetails;
}

// Helper to extract href from URL field
export function getUrl(url?: string | UrlField): string {
  if (!url) return "#";
  if (typeof url === "string") return url;
  return url.href || "#";
}

// Color Picker field returns an object with hex, rgb, hsl, hsv
export interface ColorPicker {
  hex?: string;
  rgb?: { r: number; g: number; b: number; a: number };
  hsl?: { h: number; s: number; l: number; a: number };
  hsv?: { h: number; s: number; v: number; a: number };
  oldHue?: number;
  source?: string;
}

// Helper to extract hex color from ColorPicker field
export function getColor(color?: string | ColorPicker, fallback = "#6366f1"): string {
  if (!color) return fallback;
  if (typeof color === "string") return color;
  return color.hex || fallback;
}

// Global Fields

export interface File {
  uid: string;
  url: string;
  title: string;
  filename: string;
  content_type?: string;
  file_size?: string;
  dimension?: { height: number; width: number };
  $?: Record<string, CSLPFieldMapping | undefined>;
}

export interface ImageWithAlt {
  image?: File;
  alt_text?: string;
  caption?: string;
  $?: {
    image?: CSLPFieldMapping;
    alt_text?: CSLPFieldMapping;
    caption?: CSLPFieldMapping;
  };
}

export interface SeoMeta {
  meta_title?: string;
  meta_description?: string;
  $?: {
    meta_title?: CSLPFieldMapping;
    meta_description?: CSLPFieldMapping;
  };
}

export interface SocialLink {
  platform?: "github" | "linkedin" | "twitter" | "instagram" | "youtube";
  url?: string;
  $?: {
    platform?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
  };
}

export interface ContactInfo {
  email?: string;
  social_links?: SocialLink[];
  $?: {
    email?: CSLPFieldMapping;
    social_links?: CSLPFieldMapping;
  };
}

// Content Types

export interface Article extends SystemFields {
  title: string;
  url?: string | UrlField;
  summary?: string;
  content?: string;
  image?: ImageWithAlt;
  author?: Author | Author[];
  category?: Category | Category[];
  published_date?: string;
  reading_time?: number;
  seo?: SeoMeta;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    summary?: CSLPFieldMapping;
    content?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    author?: CSLPFieldMapping;
    category?: CSLPFieldMapping;
    published_date?: CSLPFieldMapping;
    reading_time?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined;
  };
}

export interface Author extends SystemFields {
  title: string;
  url?: string | UrlField;
  bio?: string;
  photo?: ImageWithAlt;
  contact?: ContactInfo;
  seo?: SeoMeta;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    bio?: CSLPFieldMapping;
    photo?: CSLPFieldMapping;
    contact?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined;
  };
}

export interface Category extends SystemFields {
  title: string;
  url?: string | UrlField;
  description?: string;
  image?: ImageWithAlt;
  color?: string | ColorPicker;
  button_label?: string;
  seo?: SeoMeta;
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    image?: CSLPFieldMapping;
    color?: CSLPFieldMapping;
    button_label?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined;
  };
}

// Modular Block Data Types

export interface HeroFeaturedArticleData {
  featured_article?: Article | Article[];
  highlight_text?: string;
  color?: string | ColorPicker;
  _metadata?: { uid: string };
  $?: {
    featured_article?: CSLPFieldMapping;
    highlight_text?: CSLPFieldMapping;
    color?: CSLPFieldMapping;
  };
}

export interface RecentArticlesSectionData {
  section_title?: string;
  filter_category?: Category | Category[];
  show_auteur?: boolean;
  show_date?: boolean;
  _metadata?: { uid: string };
  $?: {
    section_title?: CSLPFieldMapping;
    filter_category?: CSLPFieldMapping;
    show_auteur?: CSLPFieldMapping;
    show_date?: CSLPFieldMapping;
  };
}

export interface ArticlesListSectionData {
  section_title?: string;
  filter_category?: Category | Category[];
  articles_per_page?: number;
  _metadata?: { uid: string };
  $?: {
    section_title?: CSLPFieldMapping;
    filter_category?: CSLPFieldMapping;
    articles_per_page?: CSLPFieldMapping;
  };
}

export interface CategoriesSectionData {
  section_title?: string;
  display_type?: "grid" | "list";
  button_label?: string;
  _metadata?: { uid: string };
  $?: {
    section_title?: CSLPFieldMapping;
    display_type?: CSLPFieldMapping;
    button?: CSLPFieldMapping;
  };
}

export interface AuthorsSectionData {
  section_title?: string;
  display?: string;
  _metadata?: { uid: string };
  $?: {
    section_title?: CSLPFieldMapping;
    display?: CSLPFieldMapping;
  };
}

export interface Section {
  hero_featured_article?: HeroFeaturedArticleData;
  recent_articles_section?: RecentArticlesSectionData;
  articles_list_section?: ArticlesListSectionData;
  categories_section?: CategoriesSectionData;
  authors_section?: AuthorsSectionData;
}

// Page Component (Modular Blocks Page)

export interface PageComponent extends SystemFields {
  title: string;
  url?: string | UrlField;
  seo?: SeoMeta;
  sections?: Section[];
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    sections?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined;
  };
}

// Singletons

export interface UrlField {
  title?: string;
  href?: string;
}

export interface NavigationItem {
  title?: string;
  url?: string | UrlField;
  _metadata?: { uid: string };
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
  };
}

export interface Header extends SystemFields {
  logo?: ImageWithAlt;
  site_name?: string;
  navigation?: NavigationItem[];
  $?: {
    logo?: CSLPFieldMapping;
    site_name?: CSLPFieldMapping;
    navigation?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined;
  };
}

export interface Footer extends SystemFields {
  description?: string;
  categories_links?: Category[];
  social_links?: SocialLink[];
  $?: {
    description?: CSLPFieldMapping;
    categories_links?: CSLPFieldMapping;
    social_links?: CSLPFieldMapping;
    [key: string]: CSLPFieldMapping | undefined;
  };
}
