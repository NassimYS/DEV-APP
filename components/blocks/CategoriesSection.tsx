import type { CategoriesSectionData } from "@/types";
import { getAllCategories } from "@/lib/contentstack";
import CategoryCard from "@/components/ui/CategoryCard";

export default async function CategoriesSection(props: CategoriesSectionData) {
  const categories = await getAllCategories();
  const isGrid = props.display_type !== "list";

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
            buttonLabel={props.button}
            displayMode={props.display_type}
          />
        ))}
      </div>
    </section>
  );
}
