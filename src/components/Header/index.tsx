interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="p-4 bg-gray-200 dark:bg-gray-800 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Movie App
      </h1>
      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-600"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}
