import { render, screen, fireEvent } from "@testing-library/react";
import FilterMenu from "../FilterMenu";

test("FilterMenu renders buttons and applies active style correctly", () => {
  const onFilterMock = jest.fn();
  const activeCategory = "popular";

  render(
    <FilterMenu onFilter={onFilterMock} activeCategory={activeCategory} />
  );

  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(4);

  expect(buttons[0]).toHaveClass("bg-blue-500");
  expect(buttons[0]).toHaveTextContent("POPULAR");

  expect(buttons[1]).not.toHaveClass("bg-blue-500");
  expect(buttons[2]).not.toHaveClass("bg-blue-500");
  expect(buttons[3]).not.toHaveClass("bg-blue-500");

  fireEvent.click(buttons[1]);
  expect(onFilterMock).toHaveBeenCalledWith("now_playing");
});
