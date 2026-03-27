import Image from "next/image";
import Link from "next/link";
import type { MappedArticle } from "@/lib/mappers/types";

interface ArticleCardProps {
  article: MappedArticle;
  showAuthor?: boolean;
  showDate?: boolean;
}

export default function ArticleCard({
  article,
  showAuthor = true,
  showDate = true,
}: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      {article.image && (
        <Link href={article.url} className="block overflow-hidden">
          <Image
            src={article.image.url}
            alt={article.image.alt}
            width={600}
            height={340}
            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
            {...(article.image.$ && article.image.$.image)}
          />
        </Link>
      )}

      <div className="p-5">
        {article.category && (
          <Link
            href={article.category.url}
            className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide no-underline"
            style={{ color: article.category.color }}
            {...(article.category.$ && article.category.$.title)}
          >
            {article.category.title}
          </Link>
        )}

        {article.title && (
          <h3 className="mb-2 text-lg font-bold text-gray-900">
            <Link
              href={article.url}
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
          {showAuthor && article.author && (
            <div className="flex items-center gap-2">
              {article.author.photo && (
                <Image
                  src={article.author.photo.url}
                  alt={article.author.photo.alt}
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}
              <Link
                href={article.author.url}
                className="font-medium text-gray-700 no-underline hover:text-indigo-600"
                {...(article.author.$ && article.author.$.title)}
              >
                {article.author.title}
              </Link>
            </div>
          )}

          {showDate && article.publishedDate && (
            <time
              dateTime={article.publishedDate}
              {...(article.$ && article.$.published_date)}
            >
              {new Date(article.publishedDate).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          )}

          {article.readingTime && (
            <span {...(article.$ && article.$.reading_time)}>
              {article.readingTime} min
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
