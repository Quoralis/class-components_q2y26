import { screen, render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

const CrashComponent = () => {
  throw new Error("Test crash");
};

const NormalComponent = () => <p>All good</p>;

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  test("renders error UI when child throws", () => {
    render(
      <ErrorBoundary>
        <CrashComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Error boundary caught an error.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh Page" })).toBeInTheDocument();
  });

  test("calls console.error when child throws", () => {
    render(
      <ErrorBoundary>
        <CrashComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
  });
});