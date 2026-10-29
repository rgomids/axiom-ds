import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback, AvatarGroup } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const people = ['RG', 'AL', 'MS', 'JP', 'TC', 'LN'];
const meta = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Imagem de pessoa ou agente com fallback de iniciais. AvatarGroup sobrepõe e resume excedentes em "+N".',
          a11y: 'Com imagem, informe `alt`; fallback de iniciais deve acompanhar o nome em texto próximo ou `aria-label`.',
        }),
      },
    },
  },
} satisfies Meta<typeof Avatar>;
export default meta;
export const Sizes: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid gap-6">
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback>RG</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>RG</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>RG</AvatarFallback>
        </Avatar>
      </div>
      <AvatarGroup max={4} aria-label="Revisores">
        {people.map((p) => (
          <Avatar key={p}>
            <AvatarFallback>{p}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  ),
};
