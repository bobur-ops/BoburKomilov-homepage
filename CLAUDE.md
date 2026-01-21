# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
npm run astro    # Run Astro CLI commands
```

## Architecture Overview

### Hybrid Astro + React Setup

This is an Astro-based personal homepage with React components for interactive features. The architecture uses:

- **Astro (.astro files)**: Static pages, layouts, and non-interactive components
- **React (.tsx files)**: Interactive UI components (theme switcher, dropdowns, modals)
- **MDX (.mdx files)**: Content pages with component support (uses `mdx-layout.astro`)

The integration is configured in `astro.config.mjs` with both `@astrojs/react` and `@astrojs/mdx`.

### Layout System

Two primary layouts:
1. **root-layout.astro**: Base HTML structure with navbar, theme initialization, and global styles
2. **mdx-layout.astro**: Wraps root-layout, adds prose styling for MDX content pages

The root layout includes an inline script in `<head>` that immediately applies stored theme to prevent flash of unstyled content (FOUC).

### Theme System Architecture

The theme system is a key feature with several interconnected parts:

**Theme Structure**: Themes follow a `{palette}-{mode}` naming convention (e.g., `vintage-paper-light`, `claude-dark`). The fallback default is `vintage-paper-light`.

**Components**:
- `src/features/theme/theme.ts`: Core theme utilities (setTheme, toggleMode, setPalette, onThemeChange)
- `src/features/theme/consts.ts`: Theme options array with color definitions
- `src/themes/*.css`: Individual CSS files defining CSS custom properties for each theme
- `src/themes/themes.css`: Imports all theme CSS files

**Theme Application Flow**:
1. Inline script in root-layout reads localStorage on page load
2. Applies theme class to `<html>` element immediately (prevents FOUC)
3. React components use `setTheme()` to update both DOM and localStorage
4. Custom `theme-change` event allows components to react to theme changes

**Theme State Management**:
- Stored in localStorage with key `"theme"`
- Applied via CSS classes on `<html>` element (both full theme name and mode)
- Accessed via `data-theme` and `data-theme-mode` attributes on document root

### React Components in Astro

React components must use `client:load` directive in `.astro` files to hydrate:
```astro
<ThemeSwitcher client:load />
```

UI components are in `src/components/ui/` and follow shadcn/ui patterns with Tailwind CSS v4 and class-variance-authority for variants.

### Styling System

- **Tailwind CSS v4**: Configured via Vite plugin in `astro.config.mjs`
- **CSS Custom Properties**: Theme colors defined as CSS variables in theme files
- **Global Styles**: `src/styles/global.css` imports Tailwind, themes, and defines base styles
- Color tokens (e.g., `bg-primary`, `text-muted-foreground`) map to theme-specific CSS variables

### Path Aliases

TypeScript is configured with `@/*` mapping to `src/*` for cleaner imports:
```ts
import { Button } from "@/components/ui/button";
import { FALLBACK_DEFAULT_THEME } from "@/features/theme/consts";
```

## Project Structure Conventions

- `src/pages/`: Route pages (Astro, MDX)
  - `.astro` files for full pages with custom layouts
  - `.mdx` files automatically use `mdx-layout.astro`
- `src/layouts/`: Page layout wrappers
- `src/components/`: Astro components (navbar, links)
- `src/components/ui/`: React UI components (buttons, cards, etc.)
- `src/features/`: Feature-specific modules (e.g., theme system)
- `src/themes/`: Theme CSS files
- `public/`: Static assets served at root

## Adding New Themes

1. Create CSS file in `src/themes/{name}.css` with both `-light` and `-dark` variants
2. Import it in `src/themes/themes.css`
3. Add entry to `themeOptions` array in `src/features/theme/consts.ts` with color preview values
4. Use OKLCH color space for color definitions

## Working with React Components

When creating React components that need to be used in Astro:
- Place in `src/components/ui/` or feature-specific directories
- Export as default or named export
- Import in `.astro` files and add `client:load` (or other client directive)
- React components have access to full React ecosystem but need explicit hydration directive
