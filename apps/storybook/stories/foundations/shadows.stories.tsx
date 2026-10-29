import type { Meta, StoryObj } from '@storybook/react-vite';
import { Shadows } from './pages';

const meta = { title: 'Foundations/Shadows', component: Shadows } satisfies Meta<typeof Shadows>;
export default meta;
export const Elevation: StoryObj<typeof meta> = {};
