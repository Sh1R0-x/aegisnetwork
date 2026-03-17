/**
 * SSR entry point — used only at build time by scripts/prerender.ts.
 * Never loaded by the browser.
 *
 * Renders the React app to an HTML string so prerender.ts can inject it
 * into dist/index.html before deployment. The browser then hydrates this
 * pre-rendered HTML via hydrateRoot (see main.tsx).
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
