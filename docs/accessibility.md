# Acessibilidade

Meta: WCAG AA. Testes automatizados nao certificam acessibilidade de todo produto.
Use elementos nativos e nomes acessiveis; nao dependa somente de cor ou placeholder.

## Implementacao

Radix gerencia dialog focus trap, Escape, portais e restauracao de foco;
Tabs usa roving focus; Tooltip responde a hover, foco e Escape.
Inputs usam labels e erros associados. Botoes preservam disabled e aria-busy.
Temas compartilham contratos de contraste e foco. Movimento reduzido e
forced-colors tem regras explicitas.

## Verificacao

npm run test:unit verifica quatro contratos de interacao.
npm test verifica tokens, referencias, temas e contraste.
npm run test:visual compara baselines e executa axe em todos os exemplos
iniciais, nos temas claro/escuro e desktop/mobile, alem dos estados abertos de
Dialog e Tooltip e teclado em Tabs.
O addon Storybook pode ser executado manualmente; os testes Playwright sao o
executor automatizado de axe para evitar scans simultaneos na mesma pagina.
npm run test:browser preserva a validacao dos exemplos HTML e da marca.

Antes de promover para stable, revisar leitor de tela, zoom e fluxos reais.
Nenhuma certificacao manual de leitor de tela e reivindicada nesta entrega.
