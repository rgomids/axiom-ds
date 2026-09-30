# Axiom Design System

Design system do **Axiom Project**, no repositorio dedicado
[rgomids/axiom-ds](https://github.com/rgomids/axiom-ds).
[rgomids/axiom](https://github.com/rgomids/axiom) continua responsavel pelo produto.
Git e a fonte tecnica; Penpot explora decisoes; Storybook documenta codigo executavel.

## Desenvolvimento

Node.js 22.16+ e npm. Os mesmos comandos atendem Codex local e Cloud:

```sh
npm ci
npx playwright install chromium
npm run storybook
```

Storybook: http://localhost:6006. Se essa porta estiver ocupada, execute o CLI
com outra porta. Para visualizar o build estatico, use npm run serve:storybook
(http://127.0.0.1:6108).

## Validacao

```sh
npm run validate
npm run test:browser
npm run test:visual
```

validate inclui formatacao, lint, TypeScript, build, testes de tokens, testes
de componentes e build Storybook. O teste visual compara baselines versionadas
nos temas light/dark, desktop/mobile, e executa axe e checks de teclado.
Atualize baselines apenas apos revisar as imagens: npm run test:visual:update.

## Estrutura

| Caminho                    | Responsabilidade                                          |
| -------------------------- | --------------------------------------------------------- |
| packages/tokens/src        | DTCG: primitivos, semanticos, componentes e tema dark     |
| packages/ui/src/react      | Button, Input, Badge, Card, Dialog, Tooltip e Tabs        |
| packages/ui/src/lib        | Composicao de classes tipada                              |
| packages/ui/src/components | Catalogo HTML anterior, mantido como compatibilidade      |
| packages/brand/svg         | Marca aprovada em SVG, sem alteracao de desenho           |
| apps/storybook             | Documentacao executavel, fundamentos, variantes e estados |
| tests/components           | Interacoes e contratos React                              |
| tests/visual               | Navegador, acessibilidade e baselines de regressao        |
| docs/adr                   | Decisoes duraveis                                         |
| .github/workflows          | Validacao e publicacao Pages                              |

## Consumir

A biblioteca React usa codigo shadcn/ui mantido no repositorio, Radix Primitives
e Tailwind CSS. No consumidor com bundler:

```tsx
import { Button } from '@axion/ui';
import '@axion/ui/theme.css';

export function Save() {
  return <Button type="button">Salvar projeto</Button>;
}
```

Defina data-theme="light" ou data-theme="dark" no html para incluir portais.
A versao e 0.2.0, ainda nao estavel. React 19 e peer dependency.
npm run build gera JavaScript, declaracoes TypeScript, CSS e tokens.
npm pack --workspace @axion/ui prepara um pacote local; publicacao npm nao e necessaria.

O catalogo [index.html](index.html) e o [indice HTML](resources.html) preservam
os modelos aprovados anteriores. Nao substituem o Storybook na aceitacao da issue #2.
A grafia AXIOM dos SVGs foi preservada; o namespace @axion permanece por compatibilidade.

O [Diagram Kit](packages/ui/src/diagrams/README.md) reúne os componentes do editor
de fluxos. Abra o [catálogo](examples/diagram-kit.html) ou o
[exemplo funcional](examples/diagram-editor.html), também disponíveis com
`?theme=dark`. No Storybook: `Patterns/Diagrams`.

Os controles e os contêineres de ícones usam o token `component.icon.radius`
para manter o formato quadrado sem alterar os desenhos da marca ou dos ícones.

## Regras e entrega

O [PR de bootstrap #4](https://github.com/rgomids/axiom-ds/pull/4) atende apenas
a issue #1. O [PR de implementacao #3](https://github.com/rgomids/axiom-ds/pull/3)
e revisado sobre essa base, mas continua bloqueado pela aceitacao da #1.
Leia a [ordem de entrega](docs/delivery-sequence.md); nao faca merge da
implementacao na branch de bootstrap.

Leia [AGENTS.md](AGENTS.md), [contribuicao](CONTRIBUTING.md),
[governanca](docs/governance.md), [seguranca](SECURITY.md),
[dependencias](docs/dependencies.md), [temas](docs/themes.md) e
[publicacao](docs/publication.md).

A publicacao usa GitHub Pages e GitHub Actions, sem SaaS pago obrigatorio.
PRs de forks nao publicam. O workflow Pages e executado na main canonica
apos aprovacao do mantenedor. O criterio externo do Notion esta em
[docs/discovery.md](docs/discovery.md); nao e considerado atendido sem verificacao.

Licenca Apache-2.0; codigo shadcn/ui conserva o aviso MIT. Veja
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
