import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../packages/ui/src/react/tooltip';
import { Button } from '../../../packages/ui/src/react/button';
function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Informacoes do projeto">
            <Info aria-hidden />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Informacoes do projeto</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
const meta = {
  title: 'Components/Tooltip',
  component: Example,
  parameters: {
    docs: {
      description: {
        component:
          'Informacao complementar no hover e foco; Escape dispensa o tooltip. Nao coloque controles dentro dele. O gatilho precisa de nome mesmo quando o tooltip estiver fechado.',
      },
    },
  },
} satisfies Meta<typeof Example>;
export default meta;
type Story = StoryObj<typeof meta>;
export const KeyboardAndPointer: Story = {};
