import { createRoot } from 'react-dom/client';
import { DiagramEditor, DiagramKit } from '../../packages/ui/src/diagrams';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';

const root = document.getElementById('diagram-root');
if (root) {
  const theme = new URLSearchParams(location.search).get('theme') === 'dark' ? 'dark' : 'light';
  createRoot(root).render(
    root.dataset.view === 'catalog' ? (
      <DiagramKit initialTheme={theme} />
    ) : (
      <DiagramEditor
        initialTheme={theme}
        persist
        brandSrc="../packages/brand/svg/axiom-symbol-mono.svg"
      />
    ),
  );
}
