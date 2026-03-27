import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import type { Author, Article } from "@/types";
import ArticleCard from "@/components/ui/ArticleCard";

const socialIcons: Record<string, string> = {
  github: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  youtube: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z",
};

interface AuthorDetailProps {
  author: Author;
  articles: Article[];
}

export default function AuthorDetail({ author, articles }: AuthorDetailProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 flex flex-col items-center gap-6 md:flex-row md:items-start">
        {author.photo?.image?.url && (
          <Image
            src={author.photo.image.url}
            alt={author.photo.alt_text || ""}
            width={160}
            height={160}
            className="h-40 w-40 rounded-full object-cover"
            {...(author.photo.$ && author.photo.$.image)}
          />
        )}

        <div className="flex-1 text-center md:text-left">
          {author.title && (
            <h1
              className="mb-4 text-3xl font-bold text-gray-900"
              {...(author.$ && author.$.title)}
            >
              {author.title}
            </h1>
          )}

          {author.bio && (
            <div
              className="prose mb-4"
              {...(author.$ && author.$.bio)}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(author.bio),
              }}
            />
          )}

          {author.contact?.email && (
            <a
              href={`mailto:${author.contact.email}`}
              className="mb-4 inline-block text-sm text-gray-600 hover:text-gray-900"
              {...(author.contact.$ && author.contact.$.email)}
            >
              {author.contact.email}
            </a>
          )}

          {author.contact?.social_links &&
            author.contact.social_links.length > 0 && (
              <div className="mt-4 flex gap-3 justify-center md:justify-start">
                {author.contact.social_links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                    {...(link.$ && link.$.url)}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={socialIcons[link.platform || ""] || ""} />
                    </svg>
                  </a>
                ))}
              </div>
            )}
        </div>
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
