import type { ArticlesListSectionData } from "@/types";
import { getAllArticles } from "@/lib/contentstack";
import ArticleCard from "@/components/ui/ArticleCard";

export default async function ArticlesListSection(
  props: ArticlesListSectionData
) {
  let articles = await getAllArticles();

  const filterCategory = Array.isArray(props.filter_category)
    ? props.filter_category[0]
    : props.filter_category;

  if (filterCategory) {
    articles = articles.filter((article) => {
      const categories = Array.isArray(article.category)
        ? article.category
        : article.category
          ? [article.category]
          : [];
      return categories.some((c) => c.uid === filterCategory.uid);
    });
  }

  const perPage = props.articles_per_page || 6;
  const displayedArticles = articles.slice(0, perPage);

  return (
    <section className="py-12">
      {props.section_title && (
        <h2
          className="mb-8 text-2xl font-bold text-gray-900"
          {...(props.$ && props.$.section_title)}
        >
          {props.section_title}
        </h2>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedArticles.map((article) => (
          <ArticleCard
            key={article.uid}
            article={article}
            showAuthor
            showDate
          />
        ))}
      </div>
    </section>
  );
}
