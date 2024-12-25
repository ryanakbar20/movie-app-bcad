import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header Component", () => {
  it("renders the header with title and toggle button", () => {
    const mockToggleDarkMode = jest.fn();
    render(<Header isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />);

    const title = screen.getByText("Movie App");
    expect(title).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Dark Mode/i });
    expect(button).toBeInTheDocument();
  });

  it("renders Light Mode when isDarkMode is true", () => {
    const mockToggleDarkMode = jest.fn();
    render(<Header isDarkMode={true} toggleDarkMode={mockToggleDarkMode} />);

    const button = screen.getByRole("button", { name: /Light Mode/i });
    expect(button).toBeInTheDocument();
  });

  it("calls toggleDarkMode when the button is clicked", () => {
    const mockToggleDarkMode = jest.fn();
    render(<Header isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />);

    const button = screen.getByRole("button", { name: /Dark Mode/i });
    fireEvent.click(button);

    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
  });
});
