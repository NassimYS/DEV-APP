import type { MappedArticlesListProps } from "@/lib/mappers/types";
import ArticleCard from "@/components/ui/ArticleCard";

export default function ArticlesListSection(
  props: MappedArticlesListProps
) {
  const articles = props.articles ?? [];

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
        {articles.map((article) => (
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

