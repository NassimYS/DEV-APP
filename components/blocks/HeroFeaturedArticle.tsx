import Image from "next/image";
import Link from "next/link";
import type { MappedHeroProps } from "@/lib/mappers/types";

export default function HeroFeaturedArticle(props: MappedHeroProps) {
  const article = props.article;
  if (!article) return null;

  const author = article.author;

  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{ backgroundColor: props.color }}
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="flex flex-col justify-center p-8 md:p-12">
          {props.highlightText && (
            <span
              className="mb-4 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white"
              {...(props.$ && props.$.highlightText)}
            >
              {props.highlightText}
            </span>
          )}

          {article.title && (
            <h1
              className="mb-4 text-3xl font-bold text-white md:text-4xl"
              {...(article.$ && article.$.title)}
            >
              <Link
                href={article.url}
                className="no-underline text-white hover:text-gray-200"
              >
                {article.title}
              </Link>
            </h1>
          )}

          {article.summary && (
            <p
              className="mb-6 text-lg text-white/80"
              {...(article.$ && article.$.summary)}
            >
              {article.summary}
            </p>
          )}

          <div className="flex items-center gap-4">
            {author?.photo?.url && (
              <Image
                src={author.photo.url}
                alt={author.photo.alt}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            {author?.title && (
              <span className="text-sm text-white/70">{author.title}</span>
            )}
            {article.readingTime && (
              <span
                className="text-sm text-white/70"
                {...(article.$ && article.$.readingTime)}
              >
                {article.readingTime} min
              </span>
            )}
          </div>
        </div>

        {article.image?.url && (
          <div className="relative min-h-[300px]">
            <Image
              src={article.image.url}
              alt={article.image.alt}
              fill
              className="object-cover"
              {...(article.image.$ && article.image.$.image)}
            />
          </div>
        )}
      </div>
    </section>
  );
}
