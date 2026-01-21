import { FALLBACK_DEFAULT_THEME } from "./consts";

export const THEME_STORAGE_KEY = "theme";

type ThemeMode = "light" | "dark";

export const getThemeParts = (theme: string) => {
  const lastDashIndex = theme.lastIndexOf("-");
  const palette = lastDashIndex > 0 ? theme.slice(0, lastDashIndex) : theme;
  const modeValue = theme.slice(lastDashIndex + 1);
  const mode: ThemeMode = modeValue === "dark" ? "dark" : "light";

  return { palette, mode };
};

export const getStoredTheme = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(THEME_STORAGE_KEY);
};

export const getCurrentTheme = () => {
  if (typeof document === "undefined") return FALLBACK_DEFAULT_THEME;
  return (
    document.documentElement.dataset.theme ||
    getStoredTheme() ||
    FALLBACK_DEFAULT_THEME
  );
};

export const applyThemeClass = (theme: string) => {
  const root = document.documentElement;
  const previousTheme = root.dataset.theme;
  const previousMode = root.dataset.themeMode;
  const { mode } = getThemeParts(theme);
  if (previousTheme) root.classList.remove(previousTheme);
  if (previousMode) root.classList.remove(previousMode);
  root.classList.add(theme);
  root.classList.add(mode);
  root.dataset.theme = theme;
  root.dataset.themeMode = mode;
};

export const setTheme = (theme: string) => {
  if (typeof window === "undefined") return;
  applyThemeClass(theme);
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme } }));
};

export const setPalette = (palette: string) => {
  const { mode } = getThemeParts(getCurrentTheme());
  setTheme(`${palette}-${mode}`);
};

export const toggleMode = () => {
  const { palette, mode } = getThemeParts(getCurrentTheme());
  const nextMode = mode === "dark" ? "light" : "dark";
  setTheme(`${palette}-${nextMode}`);
};

export const onThemeChange = (handler: (theme: string) => void) => {
  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<{ theme: string }>;
    if (customEvent.detail?.theme) handler(customEvent.detail.theme);
  };

  window.addEventListener("theme-change", listener);
  return () => window.removeEventListener("theme-change", listener);
};
