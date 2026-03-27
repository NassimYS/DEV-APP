import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import type { Article } from "@/types";
import { getUrl, getColor } from "@/types";
import ArticleCard from "@/components/ui/ArticleCard";

interface ArticleDetailProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleDetail({
  article,
  relatedArticles,
}: ArticleDetailProps) {
  const author = Array.isArray(article.author)
    ? article.author[0]
    : article.author;
  const category = Array.isArray(article.category)
    ? article.category[0]
    : article.category;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      {category && (
        <Link
          href={getUrl(category.url)}
          className="mb-4 inline-block text-sm font-semibold uppercase tracking-wide no-underline"
          style={{ color: getColor(category.color) }}
          {...(category.$ && category.$.title)}
        >
          {category.title}
        </Link>
      )}

      {article.title && (
        <h1
          className="mb-4 text-4xl font-bold text-gray-900"
          {...(article.$ && article.$.title)}
        >
          {article.title}
        </h1>
      )}

      {article.summary && (
        <p
          className="mb-6 text-xl text-gray-600"
          {...(article.$ && article.$.summary)}
        >
          {article.summary}
        </p>
      )}

      <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-6">
        {author && (
          <Link
            href={getUrl(author.url)}
            className="flex items-center gap-3 no-underline"
          >
            {author.photo?.image?.url && (
              <Image
                src={author.photo.image.url}
                alt={author.photo.alt_text || ""}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <div>
              <p
                className="font-medium text-gray-900"
                {...(author.$ && author.$.title)}
              >
                {author.title}
              </p>
            </div>
          </Link>
        )}

        <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
          {article.published_date && (
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

      {article.image?.image?.url && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <Image
            src={article.image.image.url}
            alt={article.image.alt_text || ""}
            width={1200}
            height={630}
            className="h-auto w-full object-cover"
            {...(article.image.$ && article.image.$.image)}
          />
          {article.image.caption && (
            <p
              className="mt-2 text-center text-sm text-gray-500"
              {...(article.image.$ && article.image.$.caption)}
            >
              {article.image.caption}
            </p>
          )}
        </div>
      )}

      {article.content && (
        <div
          className="prose prose-lg max-w-none"
          {...(article.$ && article.$.content)}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.content),
          }}
        />
      )}

      {relatedArticles.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.uid} article={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
