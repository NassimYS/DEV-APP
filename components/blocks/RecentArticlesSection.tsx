import type { MappedRecentArticlesProps } from "@/lib/mappers/types";
import { getAllArticles } from "@/lib/contentstack";
import { mapArticle } from "@/lib/mappers";
import ArticleCard from "@/components/ui/ArticleCard";

export default async function RecentArticlesSection(
  props: MappedRecentArticlesProps
) {
  const rawArticles = await getAllArticles();
  let articles = rawArticles.map(mapArticle);

  if (props.filterCategoryUid) {
    articles = articles.filter(
      (article) => article.category?.uid === props.filterCategoryUid
    );
  }

  articles.sort((a, b) => {
    const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
    const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;
    return dateB - dateA;
  });

  const recentArticles = articles.slice(0, 3);

  return (
    <section className="py-12">
      {props.sectionTitle && (
        <h2
          className="mb-8 text-2xl font-bold text-gray-900"
          {...(props.$ && props.$.sectionTitle)}
        >
          {props.sectionTitle}
        </h2>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recentArticles.map((article) => (
          <ArticleCard
            key={article.uid}
            article={article}
            showAuthor={props.showAuthor}
            showDate={props.showDate}
          />
        ))}
      </div>
    </section>
  );
}
