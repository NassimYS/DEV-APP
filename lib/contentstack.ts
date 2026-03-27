import contentstack, { QueryOperation, Region } from "@contentstack/delivery-sdk";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import type {
  PageComponent,
  Article,
  Author,
  Category,
  Header,
  Footer,
} from "@/types";

export const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";

const apiKey = (process.env.CONTENTSTACK_API_KEY || process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY) as string;
const deliveryToken = (process.env.CONTENTSTACK_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN) as string;
const environment = (process.env.CONTENTSTACK_ENVIRONMENT || process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT) as string;
const previewToken = process.env.CONTENTSTACK_PREVIEW_TOKEN || process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN;
const regionKey = process.env.CONTENTSTACK_REGION || process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "EU";

const regionMap: Record<string, Region> = {
  NA: Region.US,
  US: Region.US,
  EU: Region.EU,
  AZURE_NA: Region.AZURE_NA,
  AZURE_EU: Region.AZURE_EU,
  GCP_NA: Region.GCP_NA,
};

const region = regionMap[regionKey] || Region.EU;

export const stack = contentstack.stack({
  apiKey,
  deliveryToken,
  environment,
  region,
  locale: "fr",
  live_preview: {
    enable: isPreview,
    preview_token: previewToken,
    host: region === Region.EU ? "eu-rest-preview.contentstack.com" : "rest-preview.contentstack.com",
  },
});

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: true,
    enable: isPreview,
    mode: "builder",
    stackSdk: stack.config as IStackSdk,
    stackDetails: {
      apiKey,
      environment,
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"],
    },
  });
}

// Page Component
export async function getPage(url: string): Promise<PageComponent | null> {
  try {
    const result = await stack
      .contentType("page_component")
      .entry()
      .locale("fr")
      .includeReference([
        "sections.hero_featured_article.featured_article",
        "sections.hero_featured_article.featured_article.author",
        "sections.hero_featured_article.featured_article.category",
        "sections.recent_articles_section.filter_category",
        "sections.articles_list_section.filter_category",
      ])
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<PageComponent>();

    console.log("[getPage]", url, "entries:", result.entries?.length ?? 0);

    if (result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "page_component", true);
      }
      return entry;
    }
    return null;
  } catch (err) {
    console.error("[getPage] error:", err);
    return null;
  }
}

// Article
export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const result = await stack
      .contentType("article")
      .entry()
      .locale("fr")
      .includeReference(["author", "category"])
      .query()
      .where("url", QueryOperation.EQUALS, `/articles/${slug}`)
      .find<Article>();

    if (result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "article", true);
      }
      return entry;
    }
    return null;
  } catch {
    return null;
  }
}

// Author
export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const result = await stack
      .contentType("author")
      .entry()
      .locale("fr")
      .query()
      .where("url", QueryOperation.EQUALS, `/auteurs/${slug}`)
      .find<Author>();

    if (result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "author", true);
      }
      return entry;
    }
    return null;
  } catch {
    return null;
  }
}

// Category
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const result = await stack
      .contentType("category")
      .entry()
      .locale("fr")
      .query()
      .where("url", QueryOperation.EQUALS, `/categories/${slug}`)
      .find<Category>();

    if (result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "category", true);
      }
      return entry;
    }
    return null;
  } catch {
    return null;
  }
}

// All Articles
export async function getAllArticles(): Promise<Article[]> {
  try {
    const result = await stack
      .contentType("article")
      .entry()
      .locale("fr")
      .includeReference(["author", "category"])
      .query()
      .find<Article>();

    if (result.entries) {
      if (isPreview) {
        result.entries.forEach((entry) => {
          contentstack.Utils.addEditableTags(entry, "article", true);
        });
      }
      return result.entries;
    }
    return [];
  } catch {
    return [];
  }
}

// All Authors
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const result = await stack
      .contentType("author")
      .entry()
      .locale("fr")
      .query()
      .find<Author>();

    if (result.entries) {
      if (isPreview) {
        result.entries.forEach((entry) => {
          contentstack.Utils.addEditableTags(entry, "author", true);
        });
      }
      return result.entries;
    }
    return [];
  } catch {
    return [];
  }
}

// All Categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const result = await stack
      .contentType("category")
      .entry()
      .locale("fr")
      .query()
      .find<Category>();

    if (result.entries) {
      if (isPreview) {
        result.entries.forEach((entry) => {
          contentstack.Utils.addEditableTags(entry, "category", true);
        });
      }
      return result.entries;
    }
    return [];
  } catch {
    return [];
  }
}

// Articles By Author
export async function getArticlesByAuthor(authorUid: string): Promise<Article[]> {
  try {
    const articles = await getAllArticles();
    return articles.filter((article) => {
      const authors = Array.isArray(article.author)
        ? article.author
        : article.author
          ? [article.author]
          : [];
      return authors.some((a) => a.uid === authorUid);
    });
  } catch {
    return [];
  }
}

// Articles By Category
export async function getArticlesByCategory(categoryUid: string): Promise<Article[]> {
  try {
    const articles = await getAllArticles();
    return articles.filter((article) => {
      const categories = Array.isArray(article.category)
        ? article.category
        : article.category
          ? [article.category]
          : [];
      return categories.some((c) => c.uid === categoryUid);
    });
  } catch {
    return [];
  }
}

// Related Articles (same category, excluding current, max 3)
export async function getRelatedArticles(
  categoryUid: string,
  excludeUid: string
): Promise<Article[]> {
  try {
    const articles = await getAllArticles();
    return articles
      .filter((article) => {
        if (article.uid === excludeUid) return false;
        const categories = Array.isArray(article.category)
          ? article.category
          : article.category
            ? [article.category]
            : [];
        return categories.some((c) => c.uid === categoryUid);
      })
      .slice(0, 3);
  } catch {
    return [];
  }
}

// Header (singleton)
export async function getHeader(): Promise<Header | null> {
  try {
    const result = await stack
      .contentType("header")
      .entry()
      .locale("fr")
      .query()
      .find<Header>();

    console.log("[getHeader] entries:", result.entries?.length ?? 0);
    if (result.entries?.[0]) {
      console.log("[getHeader] data:", JSON.stringify(result.entries[0], null, 2));
    }

    if (result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "header", true);
      }
      return entry;
    }
    return null;
  } catch (err) {
    console.error("[getHeader] error:", err);
    return null;
  }
}

// Footer (singleton, with category references)
export async function getFooter(): Promise<Footer | null> {
  try {
    const result = await stack
      .contentType("footer")
      .entry()
      .locale("fr")
      .includeReference(["categories_link"])
      .query()
      .find<Footer>();

    if (result.entries && result.entries.length > 0) {
      const entry = result.entries[0];
      if (isPreview) {
        contentstack.Utils.addEditableTags(entry, "footer", true);
      }
      return entry;
    }
    return null;
  } catch {
    return null;
  }
}