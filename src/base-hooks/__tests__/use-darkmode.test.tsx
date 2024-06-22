import { act, renderHook } from "@testing-library/react";
import { describe, beforeEach, it, vi, expect } from "vitest";
import useDarkMode, { DARK_THEME, LIGHT_THEME, THEME_ITEM } from "../useDarkMode";

describe("check useDarkMode hook", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = "";
  });

  it("should initialize with LIGHT_THEME if localStorage is empty and prefers-color-scheme is light", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === "(prefers-color-scheme: dark)" ? false : true,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      };
    });

    const { result } = renderHook(() => useDarkMode());

    const [themeMode] = result.current;
    expect(themeMode).toBe(LIGHT_THEME);
  });

  it("should initialize with DARK_THEME if localStorage is empty and prefers-color-scheme is dark", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === "(prefers-color-scheme: dark)" ? true : false,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      };
    });

    const { result } = renderHook(() => useDarkMode());

    const [themeMode] = result.current;
    expect(themeMode).toBe(DARK_THEME);
  });

  it("should toggle theme correctly", () => {
    const { result } = renderHook(() => useDarkMode());

    const [initialThemeMode, toggleTheme] = result.current;

    act(() => {
      toggleTheme();
    });

    const [updatedThemeMode] = result.current;
    expect(updatedThemeMode).toBe(
      initialThemeMode === DARK_THEME ? LIGHT_THEME : DARK_THEME
    );
  });

  it("should update localStorage and body class when theme is toggled", () => {
    const { result } = renderHook(() => useDarkMode());
    const [_, toggleTheme] = result.current;

    act(() => {
      toggleTheme();
    });

    const [updatedThemeMode] = result.current;
    expect(localStorage.getItem(THEME_ITEM)).toBe(updatedThemeMode);
    expect(document.body.classList.contains(DARK_THEME)).toBe(
      updatedThemeMode === DARK_THEME
    );
  });

  it("should initialize with theme from localStorage", () => {
    localStorage.setItem(THEME_ITEM, DARK_THEME);
    const { result } = renderHook(() => useDarkMode());

    const [themeMode] = result.current;
    expect(themeMode).toBe(DARK_THEME);
  });
});