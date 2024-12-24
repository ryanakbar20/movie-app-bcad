import { MovieList } from "@/components";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4 text-center bg-gray-200 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">Movie App</h1>
      </header>
      <main className="p-4">
        <MovieList />
      </main>
    </div>
  );
}

export default Home;
