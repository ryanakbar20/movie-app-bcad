import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

test("SearchBar renders and triggers onSearch callback", () => {
  const onSearchMock = jest.fn();
  render(<SearchBar onSearch={onSearchMock} />);

  const input = screen.getByPlaceholderText(/search for a movie/i);
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "Inception" } });
  expect(onSearchMock).toHaveBeenCalledWith("Inception");
});
