import type {
  MappedPage,
  MappedSection,
  MappedHeroProps,
  MappedRecentArticlesProps,
  MappedArticlesListProps,
  MappedCategoriesProps,
  MappedAuthorsProps,
} from "@/lib/mappers/types";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import HeroFeaturedArticle from "@/components/blocks/HeroFeaturedArticle";
import RecentArticlesSection from "@/components/blocks/RecentArticlesSection";
import ArticlesListSection from "@/components/blocks/ArticlesListSection";
import CategoriesSection from "@/components/blocks/CategoriesSection";
import AuthorsSection from "@/components/blocks/AuthorsSection";

function renderBlock(section: MappedSection) {
  switch (section.type) {
    case "hero":
      return (
        <HeroFeaturedArticle
          key={section.key}
          {...(section.props as MappedHeroProps)}
        />
      );
    case "recentArticles":
      return (
        <RecentArticlesSection
          key={section.key}
          {...(section.props as MappedRecentArticlesProps)}
        />
      );
    case "articlesList":
      return (
        <ArticlesListSection
          key={section.key}
          {...(section.props as MappedArticlesListProps)}
        />
      );
    case "categories":
      return (
        <CategoriesSection
          key={section.key}
          {...(section.props as MappedCategoriesProps)}
        />
      );
    case "authors":
      return (
        <AuthorsSection
          key={section.key}
          {...(section.props as MappedAuthorsProps)}
        />
      );
    default:
      return null;
  }
}

export default function Page({ page }: { page: MappedPage | null }) {
  if (!page) return null;

  return (
    <div
      className={`space-y-12 ${
        page.sections.length === 0 ? VB_EmptyBlockParentClass : ""
      }`}
      {...(page.$ && page.$.sections)}
    >
      {page.sections.map((section) => renderBlock(section))}
    </div>
  );
}
