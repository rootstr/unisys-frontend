import { renderHook, fireEvent, render, screen } from "@testing-library/react";
import { describe, beforeEach, it, vi, expect, afterEach } from "vitest";
import useInterceptOutsideClick, { OnClickOutsideCallback } from "../useInterceptOutsideClick";

describe("check useInterceptOutsideClick hook", () => {
  let callback: OnClickOutsideCallback;

  beforeEach(() => {
    callback = vi.fn();
    vi.spyOn(document, "addEventListener");
    vi.spyOn(document, "removeEventListener");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call the callback when clicking outside the element", () => {
    const { result } = renderHook(() => useInterceptOutsideClick<HTMLDivElement>(callback));

    const ref = result.current;
    render(
      <div>
        <div data-testid="element" ref={ref} />
        <div data-testid="outside-element" />
      </div>);

    // Simulate click outside the element
    fireEvent.mouseDown(screen.getByTestId("outside-element"));

    expect(callback).toHaveBeenCalled();
  });

  it("should not call the callback when clicking inside the element", () => {
    const { result } = renderHook(() => useInterceptOutsideClick<HTMLDivElement>(callback));

    const ref = result.current;
    render(<div data-testid="element" ref={ref} />);

    // Simulate click outside the element
    fireEvent.mouseDown(screen.getByTestId("element"));

    expect(callback).not.toHaveBeenCalled();
  });

  it("should remove the event listener on unmount", () => {
    const { unmount } = renderHook(() => useInterceptOutsideClick(callback));

    // Check that event listener was added
    expect(document.addEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function));

    unmount();

    // Check that event listener was removed
    expect(document.removeEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function));
  });
});