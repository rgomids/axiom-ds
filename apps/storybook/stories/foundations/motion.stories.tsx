import type { Meta, StoryObj } from '@storybook/react-vite';
import { Motion } from './pages';

const meta = { title: 'Foundations/Motion', component: Motion } satisfies Meta<typeof Motion>;
export default meta;
export const Durations: StoryObj<typeof meta> = {};
