import { useLayoutEffect, type ReactNode } from 'react';
import type { Preview } from '@storybook/react-vite';
import '../../../packages/ui/src/react/theme.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

function Theme({ theme, children }: { theme: string; children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = 'pt-BR';
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  return (
    <main className="mx-auto max-w-5xl p-6" data-testid="story-surface">
      {children}
    </main>
  );
}

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Tema da interface',
      toolbar: { icon: 'circlehollow', items: ['light', 'dark'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light', a11y: { manual: true } },
  decorators: [
    (Story, context) => (
      <Theme theme={context.globals.theme ?? 'light'}>
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
    options: { storySort: { order: ['Foundations', 'Components'] } },
  },
};
export default preview;
