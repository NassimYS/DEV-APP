import type { MappedCategoriesProps } from "@/lib/mappers/types";
import { getAllCategories } from "@/lib/contentstack";
import { mapCategory } from "@/lib/mappers";
import CategoryCard from "@/components/ui/CategoryCard";

export default async function CategoriesSection(props: MappedCategoriesProps) {
  const rawCategories = await getAllCategories();
  const categories = rawCategories.map(mapCategory);
  const isGrid = props.displayType !== "list";

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

      <div
        className={
          isGrid
            ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-4"
        }
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.uid}
            category={category}
            buttonLabel={props.buttonLabel}
            displayMode={isGrid ? "grid" : "list"}
          />
        ))}
      </div>
    </section>
  );
}
