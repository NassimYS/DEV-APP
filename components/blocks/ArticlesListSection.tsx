import type { MappedArticlesListProps } from "@/lib/mappers/types";
import { getAllArticles } from "@/lib/contentstack";
import { mapArticle } from "@/lib/mappers";
import ArticleCard from "@/components/ui/ArticleCard";

export default async function ArticlesListSection(
  props: MappedArticlesListProps
) {
  const rawArticles = await getAllArticles();
  let articles = rawArticles.map(mapArticle);

  if (props.filterCategoryUid) {
    articles = articles.filter(
      (article) => article.category?.uid === props.filterCategoryUid
    );
  }

  const displayedArticles = articles.slice(0, props.articlesPerPage);

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
