interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
