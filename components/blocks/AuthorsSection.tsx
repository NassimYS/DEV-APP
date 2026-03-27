import type { MappedAuthorsProps } from "@/lib/mappers/types";
import { getAllAuthors } from "@/lib/contentstack";
import { mapAuthor } from "@/lib/mappers";
import AuthorCard from "@/components/ui/AuthorCard";

export default async function AuthorsSection(props: MappedAuthorsProps) {
  const rawAuthors = await getAllAuthors();
  const authors = rawAuthors.map(mapAuthor);

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
        {authors.map((author) => (
          <AuthorCard
            key={author.uid}
            author={author}
          />
        ))}
      </div>
    </section>
  );
}
