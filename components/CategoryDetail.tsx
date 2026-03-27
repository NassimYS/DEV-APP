import Image from "next/image";
import type { Category, Article } from "@/types";
import { getColor } from "@/types";
import ArticleCard from "@/components/ui/ArticleCard";

interface CategoryDetailProps {
  category: Category;
  articles: Article[];
}

export default function CategoryDetail({
  category,
  articles,
}: CategoryDetailProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12">
        {category.image?.image?.url && (
          <div className="relative mb-6 h-48 overflow-hidden rounded-xl">
            <Image
              src={category.image.image.url}
              alt={category.image.alt_text || ""}
              fill
              className="object-cover"
              {...(category.image.$ && category.image.$.image)}
            />
            <div
              className="absolute inset-0 opacity-40"
              style={{ backgroundColor: getColor(category.color) }}
            />
          </div>
        )}

        <h1
          className="mb-4 text-3xl font-bold"
          style={{ color: category.color ? getColor(category.color) : undefined }}
          {...(category.$ && category.$.title)}
        >
          {category.title}
        </h1>

        {category.description && (
          <p
            className="text-lg text-gray-600"
            {...(category.$ && category.$.description)}
          >
            {category.description}
          </p>
        )}
      </div>

      {articles.length > 0 && (
        <section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.uid} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
