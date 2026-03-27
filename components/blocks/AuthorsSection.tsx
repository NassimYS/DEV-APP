import type { AuthorsSectionData } from "@/types";
import { getAllAuthors } from "@/lib/contentstack";
import AuthorCard from "@/components/ui/AuthorCard";

export default async function AuthorsSection(props: AuthorsSectionData) {
  const authors = await getAllAuthors();

  return (
    <section className="py-12">
      {props.section_title && (
        <h2
          className="mb-8 text-2xl font-bold text-gray-900"
          {...(props.$ && props.$.section_title)}
        >
          {props.section_title}
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
