import { useEffect, useState } from "react";

export const THEME_ITEM = "theme";
export const DARK_THEME = "dark";
export const LIGHT_THEME = "light";

export type useDarkModeReturnType = [
  themeMode: string,
  toggleTheme: () => void,
];

const useDarkMode = (): useDarkModeReturnType => {
  const [themeMode, setThemeMode] = useState(() => {
    if (THEME_ITEM in localStorage) {
      return localStorage.getItem(THEME_ITEM) === DARK_THEME
        ? DARK_THEME
        : LIGHT_THEME;
    }

    // Operating system preference.
    if (!window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return LIGHT_THEME;
    }

    // Default theme
    return DARK_THEME;
  });

  useEffect(() => {
    const bodyClassList = document.body.classList;

    if (themeMode === DARK_THEME) {
      bodyClassList.add(DARK_THEME);
      localStorage.setItem(THEME_ITEM, DARK_THEME);
    } else {
      bodyClassList.remove(DARK_THEME);
      localStorage.setItem(THEME_ITEM, LIGHT_THEME);
    }
  }, [themeMode]);

  const toggleTheme = (): void => {
    setThemeMode((prev) => (prev === DARK_THEME ? LIGHT_THEME : DARK_THEME));
  };

  return [themeMode, toggleTheme];
};

export default useDarkMode;