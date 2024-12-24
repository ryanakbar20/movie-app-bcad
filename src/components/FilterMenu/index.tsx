interface FilterMenuProps {
  onFilter: (category: string) => void;
  activeCategory: string;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  onFilter,
  activeCategory,
}) => {
  const categories = ["popular", "now_playing", "top_rated", "upcoming"];

  return (
    <div className="mb-4 flex gap-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded ${
            category === activeCategory
              ? "bg-blue-500 text-white dark:bg-blue-700"
              : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => onFilter(category)}
        >
          {category.replace("_", " ").toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;
