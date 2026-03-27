import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";
import { getUrl, getColor } from "@/types";

interface ArticleCardProps {
  article: Article;
  showAuthor?: boolean;
  showDate?: boolean;
}

export default function ArticleCard({
  article,
  showAuthor = true,
  showDate = true,
}: ArticleCardProps) {
  const author = Array.isArray(article.author)
    ? article.author[0]
    : article.author;
  const category = Array.isArray(article.category)
    ? article.category[0]
    : article.category;

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      {article.image?.image?.url && (
        <Link href={getUrl(article.url)} className="block overflow-hidden">
          <Image
            src={article.image.image.url}
            alt={article.image.alt_text || ""}
            width={600}
            height={340}
            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
            {...(article.image.$ && article.image.$.image)}
          />
        </Link>
      )}

      <div className="p-5">
        {category && (
          <Link
            href={getUrl(category.url)}
            className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide no-underline"
            style={{ color: getColor(category.color) }}
            {...(category.$ && category.$.title)}
          >
            {category.title}
          </Link>
        )}

        {article.title && (
          <h3 className="mb-2 text-lg font-bold text-gray-900">
            <Link
              href={getUrl(article.url)}
              className="no-underline text-gray-900 hover:text-indigo-600"
              {...(article.$ && article.$.title)}
            >
              {article.title}
            </Link>
          </h3>
        )}

        {article.summary && (
          <p
            className="mb-4 line-clamp-2 text-sm text-gray-600"
            {...(article.$ && article.$.summary)}
          >
            {article.summary}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-500">
          {showAuthor && author && (
            <div className="flex items-center gap-2">
              {author.photo?.image?.url && (
                <Image
                  src={author.photo.image.url}
                  alt={author.photo.alt_text || ""}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}
              <Link
                href={getUrl(author.url)}
                className="font-medium text-gray-700 no-underline hover:text-indigo-600"
                {...(author.$ && author.$.title)}
              >
                {author.title}
              </Link>
            </div>
          )}

          {showDate && article.published_date && (
            <time
              dateTime={article.published_date}
              {...(article.$ && article.$.published_date)}
            >
              {new Date(article.published_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}

          {article.reading_time && (
            <span {...(article.$ && article.$.reading_time)}>
              {article.reading_time} min
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
