import Image from "next/image";
import Link from "next/link";
import type { MappedCategory } from "@/lib/mappers/types";

interface CategoryCardProps {
  category: MappedCategory;
  buttonLabel?: string;
  displayMode?: "grid" | "list";
}

export default function CategoryCard({
  category,
  buttonLabel,
  displayMode = "grid",
}: CategoryCardProps) {
  if (displayMode === "list") { 
    return (
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg">
        {category.image && (
          <Image
            src={category.image.url}
            alt={category.image.alt}
            width={64}
            height={64}
            className="h-16 w-16 rounded-lg object-cover"
            {...(category.image.$ && category.image.$.image)}
          />
        )}

        <div className="flex-1">
          <h3
            className="text-lg font-bold text-gray-900"
            {...(category.$ && category.$.title)}
          >
            {category.title}
          </h3>
          {category.description && (
            <p
              className="mt-1 line-clamp-1 text-sm text-gray-600"
              {...(category.$ && category.$.description)}
            >
              {category.description}
            </p>
          )}
        </div>

        {(buttonLabel || category.buttonLabel) && (
          <Link
            href={category.url}
            className="shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-white no-underline"
            style={{ backgroundColor: category.color }}
          >
            {buttonLabel || category.buttonLabel}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      {category.image && (
        <div className="relative h-40 overflow-hidden">
          <Image
            src={category.image.url}
            alt={category.image.alt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            {...(category.image.$ && category.image.$.image)}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundColor: category.color }}
          />
        </div>
      )}

      <div className="p-5">
        <h3
          className="mb-2 text-lg font-bold text-gray-900"
          {...(category.$ && category.$.title)}
        >
          {category.title}
        </h3>

        {category.description && (
          <p
            className="mb-4 line-clamp-2 text-sm text-gray-600"
            {...(category.$ && category.$.description)}
          >
            {category.description}
          </p>
        )}

        {(buttonLabel || category.buttonLabel) && (
          <Link
            href={category.url}
            className="inline-block rounded-lg px-4 py-2 text-sm font-medium text-white no-underline"
            style={{ backgroundColor: category.color }}
          >
            {buttonLabel || category.buttonLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
