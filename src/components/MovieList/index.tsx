import React, { useEffect, useState } from "react";
import tmdbApi from "@/api/tmdbApi";

import { MovieCard, SearchBar, FilterMenu } from "@/components";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchMovies = async (
    endpoint: string,
    append: boolean = false,
    params: object = {}
  ) => {
    if (isFetching) return;
    setIsFetching(true);
    setLoading(true);

    try {
      const response = await tmdbApi.get(endpoint, {
        params: { page, ...params },
      });
      const newMovies = response.data.results;

      setMovies((prev) => (append ? [...prev, ...newMovies] : newMovies));
      setFilteredMovies((prev) =>
        append ? [...prev, ...newMovies] : newMovies
      );
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const endpoint = `/movie/${activeCategory}`;
    fetchMovies(endpoint, page > 1);
  }, [page, activeCategory]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchMovies("/search/movie", false, { query: searchQuery });
      } else {
        const endpoint = `/movie/${activeCategory}`;
        fetchMovies(endpoint, false);
      }
    }, 200);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery, activeCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    setPage(1);
    setMovies([]);
    setFilteredMovies([]);
  };

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100;

      if (nearBottom && !isFetching && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, page, totalPages]);

  if (loading && movies.length === 0) {
    return <p>Loading movies...</p>;
  }

  return (
    <div>
      <div className="sticky top-0 bg-gray-100 dark:bg-gray-900 py-4 -mx-2">
        <SearchBar onSearch={handleSearch} />
        <FilterMenu onFilter={handleFilter} activeCategory={activeCategory} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
      {loading && <p>Loading more movies...</p>}
    </div>
  );
};

export default MovieList;
