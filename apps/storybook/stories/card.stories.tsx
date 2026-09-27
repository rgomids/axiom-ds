import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../../packages/ui/src/react/card';
import { Button } from '../../../packages/ui/src/react/button';
const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'Agrupa uma entidade repetida ou ferramenta delimitada. Nao aninhe cards nem use cards como estrutura de pagina. Escolha a hierarquia de headings no consumidor.',
      },
    },
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Project: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Orion</CardTitle>
        <CardDescription>Threat intelligence</CardDescription>
      </CardHeader>
      <CardContent>
        <p>12 evidencias coletadas</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <a href="https://github.com/rgomids/axiom">Abrir projeto</a>
        </Button>
      </CardFooter>
    </Card>
  ),
};
