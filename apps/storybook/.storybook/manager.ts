import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Axiom Design System',
    brandUrl: 'https://github.com/rgomids/axiom-ds',
    brandImage: 'axiom-horizontal-light.svg',
    brandTarget: '_blank',
  }),
});
