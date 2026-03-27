import type { RecentArticlesSectionData } from "@/types";
import { getAllArticles } from "@/lib/contentstack";
import ArticleCard from "@/components/ui/ArticleCard";

export default async function RecentArticlesSection(
  props: RecentArticlesSectionData
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

  articles.sort((a, b) => {
    const dateA = a.published_date ? new Date(a.published_date).getTime() : 0;
    const dateB = b.published_date ? new Date(b.published_date).getTime() : 0;
    return dateB - dateA;
  });

  const recentArticles = articles.slice(0, 3);

  console.log("[RecentArticles] show_auteur:", JSON.stringify(props.show_auteur), "show_date:", JSON.stringify(props.show_date));

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
        {recentArticles.map((article) => (
          <ArticleCard
            key={article.uid}
            article={article}
            showAuthor={props.show_auteur === true}
            showDate={props.show_date === true}
          />
        ))}
      </div>
    </section>
  );
}
