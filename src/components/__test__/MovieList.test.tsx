import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieList from "../MovieList";
import tmdbApi from "../../api/tmdbApi";

jest.mock("../../api/tmdbApi");

const mockMovies = [
  {
    id: 845781,
    title: "Red One",
    release_date: "2024-10-31",
    poster_path: "/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg",
  },
  {
    id: 912649,
    title: "Venom: The Last Dance",
    release_date: "2024-10-22",
    poster_path: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
  },
];

test("MovieList fetches and displays movies", async () => {
  (tmdbApi.get as jest.Mock).mockResolvedValue({
    data: { results: mockMovies },
  });

  render(
    <BrowserRouter>
      <MovieList />
    </BrowserRouter>
  );

  expect(screen.getByText(/loading movies/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Red One")).toBeInTheDocument();
    expect(screen.getByText("Venom: The Last Dance")).toBeInTheDocument();
  });

  expect(tmdbApi.get).toHaveBeenCalledTimes(1);
  expect(tmdbApi.get).toHaveBeenCalledWith("/movie/popular", {
    params: { page: 1 },
  });
});
