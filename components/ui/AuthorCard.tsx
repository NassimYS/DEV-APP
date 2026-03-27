import Image from "next/image";
import Link from "next/link";
import type { MappedAuthor } from "@/lib/mappers/types";

interface AuthorCardProps {
  author: MappedAuthor;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link
      href={author.url}
      className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center no-underline transition-shadow hover:shadow-lg"
    >
      {author.photo && (
        <Image
          src={author.photo.url}
          alt={author.photo.alt}
          width={96}
          height={96}
          className="mb-4 h-24 w-24 rounded-full object-cover"
          {...(author.photo.$ && author.photo.$.image)}
        />
      )}

      {author.title && (
        <h3
          className="mb-2 text-lg font-bold text-gray-900"
          {...(author.$ && author.$.title)}
        >
          {author.title}
        </h3>
      )}

      {author.bio && (
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {author.bio.replace(/<[^>]*>/g, "").slice(0, 120)}
        </p>
      )}
    </Link>
  );
}
