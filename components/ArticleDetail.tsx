import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import type { MappedArticle } from "@/lib/mappers/types";
import ArticleCard from "@/components/ui/ArticleCard";

interface ArticleDetailProps {
  article: MappedArticle;
  relatedArticles: MappedArticle[];
}

export default function ArticleDetail({
  article,
  relatedArticles,
}: ArticleDetailProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      {article.category && (
        <Link
          href={article.category.url}
          className="mb-4 inline-block text-sm font-semibold uppercase tracking-wide no-underline"
          style={{ color: article.category.color }}
          {...(article.category.$ && article.category.$.title)}
        >
          {article.category.title}
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
        {article.author && (
          <Link
            href={article.author.url}
            className="flex items-center gap-3 no-underline"
          >
            {article.author.photo && (
              <Image
                src={article.author.photo.url}
                alt={article.author.photo.alt}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <div>
              <p
                className="font-medium text-gray-900"
                {...(article.author.$ && article.author.$.title)}
              >
                {article.author.title}
              </p>
            </div>
          </Link>
        )}

        <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
          {article.publishedDate && (
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

      {article.image && (
        <div className="mb-8 overflow-hidden rounded-xl">
          <Image
            src={article.image.url}
            alt={article.image.alt}
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
