import type { PageComponent, Section } from "@/types";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import HeroFeaturedArticle from "@/components/blocks/HeroFeaturedArticle";
import RecentArticlesSection from "@/components/blocks/RecentArticlesSection";
import ArticlesListSection from "@/components/blocks/ArticlesListSection";
import CategoriesSection from "@/components/blocks/CategoriesSection";
import AuthorsSection from "@/components/blocks/AuthorsSection";

function renderBlock(section: Section, index: number) {
  if (section.hero_featured_article) {
    return (
      <HeroFeaturedArticle
        key={section.hero_featured_article._metadata?.uid || `block-${index}`}
        {...section.hero_featured_article}
      />
    );
  }
  if (section.recent_articles_section) {
    return (
      <RecentArticlesSection
        key={section.recent_articles_section._metadata?.uid || `block-${index}`}
        {...section.recent_articles_section}
      />
    );
  }
  if (section.articles_list_section) {
    return (
      <ArticlesListSection
        key={section.articles_list_section._metadata?.uid || `block-${index}`}
        {...section.articles_list_section}
      />
    );
  }
  if (section.categories_section) {
    return (
      <CategoriesSection
        key={section.categories_section._metadata?.uid || `block-${index}`}
        {...section.categories_section}
      />
    );
  }
  if (section.authors_section) {
    return (
      <AuthorsSection
        key={section.authors_section._metadata?.uid || `block-${index}`}
        {...section.authors_section}
      />
    );
  }
  return null;
}

export default function Page({ page }: { page: PageComponent | null }) {
  if (!page) return null;

  return (
    <div
      className={`space-y-12 ${
        !page.sections || page.sections.length === 0
          ? VB_EmptyBlockParentClass
          : ""
      }`}
      {...(page.$ && page.$.sections)}
    >
      {page.sections?.map((section, index) => renderBlock(section, index))}
    </div>
  );
}
