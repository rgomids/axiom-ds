import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// The Storybook chrome follows the OS color scheme; the toolbar "Theme"
// global only switches the components rendered in the preview.
const scheme = window.matchMedia('(prefers-color-scheme: dark)');

function apply(dark: boolean) {
  addons.setConfig({
    theme: create({
      base: dark ? 'dark' : 'light',
      brandTitle: 'Axiom Design System',
      brandUrl: 'https://github.com/rgomids/axiom-ds',
      brandImage: dark ? 'axiom-horizontal-dark.svg' : 'axiom-horizontal-light.svg',
      brandTarget: '_blank',
    }),
  });
}

apply(scheme.matches);
scheme.addEventListener('change', (event) => apply(event.matches));
