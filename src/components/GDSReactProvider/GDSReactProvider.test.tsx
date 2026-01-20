import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GDSReactProvider, useGDSReact } from "./GDSReactProvider.js";

// Mock govuk-frontend
vi.mock("govuk-frontend", () => ({
  initAll: vi.fn(),
}));

// Test component that uses the hook
function TestConsumer() {
  const { isInitialised } = useGDSReact();
  return (
    <div>
      <span data-testid="initialised">{isInitialised.toString()}</span>
    </div>
  );
}

describe("GDSReactProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children", () => {
    render(
      <GDSReactProvider>
        <div>Test content</div>
      </GDSReactProvider>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });


  it("initialises GOV.UK Frontend when autoInit is true", async () => {
    const { initAll } = await import("govuk-frontend");

    render(
      <GDSReactProvider>
        <TestConsumer />
      </GDSReactProvider>
    );

    await waitFor(() => {
      expect(initAll).toHaveBeenCalledTimes(1);
    });
  });

  it("does not initialise when autoInit is false", async () => {
    const { initAll } = await import("govuk-frontend");

    render(
      <GDSReactProvider autoInit={false}>
        <TestConsumer />
      </GDSReactProvider>
    );

    // Give it time to potentially initialise
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(initAll).not.toHaveBeenCalled();
  });
});

describe("useGDSReact", () => {
  it("throws when used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestConsumer />);
    }).toThrow("useGDSReact must be used within a GDSReactProvider");

    consoleSpy.mockRestore();
  });
});
