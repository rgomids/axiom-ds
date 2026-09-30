import type { Meta, StoryObj } from '@storybook/react-vite';
import { DiagramEditor } from '../../../packages/ui/src/diagrams/editor';
import { DiagramKit } from '../../../packages/ui/src/diagrams/catalog';

const meta = {
  title: 'Patterns/Diagrams',
  component: DiagramEditor,
  parameters: { layout: 'fullscreen' },
  args: { persist: false },
} satisfies Meta<typeof DiagramEditor>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Light: Story = { args: { initialTheme: 'light' } };
export const Dark: Story = { args: { initialTheme: 'dark' } };
export const Kit: Story = { render: () => <DiagramKit /> };
