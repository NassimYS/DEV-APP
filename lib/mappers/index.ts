import { getUrl, getColor } from "@/types";
import type {
  Article,
  Author,
  Category,
  ImageWithAlt,
  SeoMeta,
  SocialLinkEntry,
  Header,
  Footer,
  PageComponent,
  Section,
  HeroFeaturedArticleData,
  RecentArticlesSectionData,
  ArticlesListSectionData,
  CategoriesSectionData,
  AuthorsSectionData,
} from "@/types";
import type {
  MappedImage,
  MappedSocialLink,
  MappedSeo,
  MappedArticle,
  MappedAuthor,
  MappedCategory,
  MappedHeroProps,
  MappedRecentArticlesProps,
  MappedArticlesListProps,
  MappedCategoriesProps,
  MappedAuthorsProps,
  MappedSection,
  MappedPage,
  MappedNavItem,
  MappedHeader,
  MappedFooter,
} from "./types";

// ── Primitives ──

function mapImage(img?: ImageWithAlt): MappedImage | undefined {
  if (!img?.image?.url) return undefined;
  return {
    url: img.image.url,
    alt: img.alt_text || "",
    caption: img.caption,
    $: img.$,
  };
}

function mapSeo(seo?: SeoMeta): MappedSeo | undefined {
  if (!seo) return undefined;
  return {
    metaTitle: seo.meta_title,
    metaDescription: seo.meta_description,
  };
}

function mapSocialLinks(entries?: SocialLinkEntry[]): MappedSocialLink[] {
  if (!entries) return [];
  return entries
    .filter((e) => e.social_link)
    .map((e) => {
      const sl = e.social_link!;
      return {
        platform: sl.plateforme?.[0]?.toLowerCase() || "",
        url: sl.url || "#",
        $: sl.$,
      };
    });
}

// ── Content Types ──

export function mapCategory(raw: Category): MappedCategory {
  return {
    uid: raw.uid,
    title: raw.title,
    url: getUrl(raw.url),
    description: raw.description,
    image: mapImage(raw.image),
    color: getColor(raw.color),
    buttonLabel: raw.button_label,
    seo: mapSeo(raw.seo),
    $: raw.$,
  };
}

export function mapAuthor(raw: Author): MappedAuthor {
  return {
    uid: raw.uid,
    title: raw.title,
    url: getUrl(raw.url),
    bio: raw.bio,
    photo: mapImage(raw.photo),
    socialLinks: mapSocialLinks(raw.contact),
    seo: mapSeo(raw.seo),
    $: raw.$,
  };
}

export function mapArticle(raw: Article): MappedArticle {
  const rawAuthor = Array.isArray(raw.author) ? raw.author[0] : raw.author;
  const rawCategory = Array.isArray(raw.category)
    ? raw.category[0]
    : raw.category;

  return {
    uid: raw.uid,
    title: raw.title,
    url: getUrl(raw.url),
    summary: raw.summary,
    content: raw.content,
    image: mapImage(raw.image),
    author: rawAuthor ? mapAuthor(rawAuthor) : undefined,
    category: rawCategory ? mapCategory(rawCategory) : undefined,
    publishedDate: raw.published_date,
    readingTime: raw.reading_time,
    seo: mapSeo(raw.seo),
    $: raw.$,
  };
}

// ── Modular Blocks ──

function mapHero(data: HeroFeaturedArticleData): MappedHeroProps {
  const raw = Array.isArray(data.featured_article)
    ? data.featured_article[0]
    : data.featured_article;
  return {
    article: raw ? mapArticle(raw) : undefined,
    highlightText: data.highlight_text,
    color: getColor(data.color),
    _metadata: data._metadata,
    $: data.$,
  };
}

function mapRecentArticles(
  data: RecentArticlesSectionData
): MappedRecentArticlesProps {
  const cat = Array.isArray(data.filter_category)
    ? data.filter_category[0]
    : data.filter_category;
  return {
    sectionTitle: data.section_title,
    filterCategoryUid: cat?.uid,
    showAuthor: data.show_auteur === true,
    showDate: data.show_date === true,
    _metadata: data._metadata,
    $: data.$,
  };
}

function mapArticlesList(
  data: ArticlesListSectionData
): MappedArticlesListProps {
  const cat = Array.isArray(data.filter_category)
    ? data.filter_category[0]
    : data.filter_category;
  return {
    sectionTitle: data.section_title,
    filterCategoryUid: cat?.uid,
    articlesPerPage: data.articles_per_page || 6,
    _metadata: data._metadata,
    $: data.$,
  };
}

function mapCategoriesSection(
  data: CategoriesSectionData
): MappedCategoriesProps {
  const raw = Array.isArray(data.display_type)
    ? data.display_type[0]
    : data.display_type;
  return {
    sectionTitle: data.section_title,
    displayType: raw === "list" ? "list" : "grid",
    buttonLabel: data.button,
    _metadata: data._metadata,
    $: data.$,
  };
}

function mapAuthorsSection(data: AuthorsSectionData): MappedAuthorsProps {
  return {
    sectionTitle: data.section_title,
    display: data.display,
    _metadata: data._metadata,
    $: data.$,
  };
}

function mapSection(section: Section, index: number): MappedSection | null {
  if (section.hero_featured_article) {
    return {
      type: "hero",
      key: section.hero_featured_article._metadata?.uid || `block-${index}`,
      props: mapHero(section.hero_featured_article),
    };
  }
  if (section.recent_articles_section) {
    return {
      type: "recentArticles",
      key:
        section.recent_articles_section._metadata?.uid || `block-${index}`,
      props: mapRecentArticles(section.recent_articles_section),
    };
  }
  if (section.articles_list_section) {
    return {
      type: "articlesList",
      key:
        section.articles_list_section._metadata?.uid || `block-${index}`,
      props: mapArticlesList(section.articles_list_section),
    };
  }
  if (section.categories_section) {
    return {
      type: "categories",
      key: section.categories_section._metadata?.uid || `block-${index}`,
      props: mapCategoriesSection(section.categories_section),
    };
  }
  if (section.authors_section) {
    return {
      type: "authors",
      key: section.authors_section._metadata?.uid || `block-${index}`,
      props: mapAuthorsSection(section.authors_section),
    };
  }
  return null;
}

// ── Page ──

export function mapPage(raw: PageComponent): MappedPage {
  return {
    uid: raw.uid,
    title: raw.title,
    url: getUrl(raw.url),
    seo: mapSeo(raw.seo),
    sections: (raw.sections || [])
      .map((s, i) => mapSection(s, i))
      .filter((s): s is MappedSection => s !== null),
    $: raw.$,
  };
}

// ── Singletons ──

export function mapHeader(raw: Header): MappedHeader {
  return {
    logoUrl: raw.logo?.image?.url,
    logoAlt: raw.logo?.alt_text || "",
    siteName: raw.site_name,
    navigation: (raw.navigation || []).map(
      (item): MappedNavItem => ({
        title: item.title || "",
        url: getUrl(item.url),
        $: item.$,
      })
    ),
    logo$: raw.logo?.$,
    $: raw.$,
  };
}

export function mapFooter(raw: Footer): MappedFooter {
  return {
    description: raw.description,
    categories: (raw.categories_link || []).map(mapCategory),
    socialLinks: mapSocialLinks(raw.social_links),
    $: raw.$,
  };
}
