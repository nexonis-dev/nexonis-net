/**
 * Theme color scheme detection — site override (light only).
 *
 * This file shadows the FixIt theme's `assets/js/head/color-scheme.ts`
 * (project assets take precedence over theme assets).
 *
 * Responsibilities:
 * - Force `data-theme-mode="light"` on <html> before body rendering.
 * - Ignore stored visitor preferences (localStorage "theme-mode") and the
 *   system color scheme: dark and auto modes are disabled site-wide.
 */
export function initColorScheme() {
  document.documentElement.dataset.themeMode = 'light'
}
