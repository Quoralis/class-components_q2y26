import { screen, render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  test("renders error message", () => {
    render(<ErrorMessage message="Something went wrong" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("renders warning icon", () => {
    render(<ErrorMessage message="Error" />);

    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });

  test("renders different messages", () => {
    const { rerender } = render(<ErrorMessage message="Not found" />);
    expect(screen.getByText("Not found")).toBeInTheDocument();

    rerender(<ErrorMessage message="Server error" />);
    expect(screen.getByText("Server error")).toBeInTheDocument();
  });
});
