import { useLayoutEffect, type ReactNode } from 'react';
import type { Preview } from '@storybook/react-vite';
import '../../../packages/ui/src/react/theme.css';
import '../../../packages/ui/src/react/fonts.css';

function Theme({
  theme,
  fullBleed,
  children,
}: {
  theme: string;
  fullBleed?: boolean;
  children: ReactNode;
}) {
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = 'pt-BR';
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  // Full-page examples render their own landmarks (DashboardShell has <main>).
  if (fullBleed) return <div data-testid="story-surface">{children}</div>;
  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-8" data-testid="story-surface">
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
      <Theme theme={context.globals.theme ?? 'light'} fullBleed={context.parameters.fullBleed}>
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: [
          'Introduction',
          ['Getting Started', 'Installation', 'Principles', 'Accessibility'],
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Motion', 'Icons'],
          'Components',
          ['Actions', 'Forms', 'Data Display', 'Navigation', 'Overlays', 'Feedback'],
          'Patterns',
          ['Dashboard', 'Execution Graph', 'Workflow', 'Logs', 'Evidence'],
          'Examples',
        ],
      },
    },
  },
};
export default preview;
