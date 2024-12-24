import axios from "axios";

const API_KEY = "9bf28fba9a8c5e7f9dc0c5a5dc94e414";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmYyOGZiYTlhOGM1ZTdmOWRjMGM1YTVkYzk0ZTQxNCIsIm5iZiI6MTczNTAxMjQ2MS43OTcsInN1YiI6IjY3NmEzMDZkNDE2YTM0NDNiNWE5ZTkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gY32le4xQFgJb6WdfaFtrJs3_coIrRwgHGxjfLF3e_8",
  },
});

export default tmdbApi;
