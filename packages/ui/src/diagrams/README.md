# Axiom Diagram Kit

Extensão do design system Axiom para criação de diagramas. Preserva tipografia,
marca e papéis semânticos da base. Os tokens `component.diagram.*` definem
superfícies, conectores, seleção, controles e geometria quadrada.

- Exemplo: `examples/diagram-editor.html` (também `?theme=dark`).
- Catálogo separado: `examples/diagram-kit.html` (também `?theme=dark`).
- Storybook: `Patterns/Diagrams`, histórias Light, Dark e Kit.
- Código fonte: `packages/ui/src/diagrams`; saídas geradas com `npm run build`.

## Integração

```tsx
import { DiagramEditor } from '@axion/ui/diagrams';
import '@axion/ui/theme.css';
import '@axion/ui/diagrams.css';

<DiagramEditor initialTheme="light" persist={false} />;
```

React Flow fornece drag, seleção, conexões múltiplas, teclado, minimapa e viewport.
Dagre organiza o grafo em eixos vertical/horizontal. O motor é gratuito, MIT,
sem serviço externo. Os blocos podem ser criados pela barra lateral, conectados
arrastando de uma saída (inferior/direita) para uma entrada (superior/esquerda),
editados pelas propriedades, duplicados e excluídos. Seleção múltipla aceita Shift.

Histórico limitado às últimas 80 operações. Zoom de 5% a 400%, pan sem limite de
canvas fixo, encaixe na grade opcional e ajuste ao conteúdo. Campos longos preservam
o conteúdo nas propriedades e usam elipse no bloco para manter dimensões estáveis.

O painel Código utiliza JSON versionado (não sintaxe Mermaid). O parser valida IDs,
tipos, posições e referências antes de aplicar. JSON inválido mantém o último
diagrama válido. Importação/exportação preserva rótulos, posições e portas das
conexões. Máximo por arquivo: 2 MB, 1.000 nós e 4.000 conexões. Esses limites são de
validação, não uma garantia de desempenho para qualquer grafo.

`persist` salva automaticamente apenas neste navegador, na chave
`axiom-diagram-v1`. Exportação JSON é a cópia portátil. O exemplo não executa agentes,
não tem colaboração em tempo real e não envia conteúdo a um backend.

## Verificação

`npm run validate`, `npm run test:browser`, `npm run test:visual` e
`node tests/diagrams.mjs`. As imagens geradas em test-results permitem revisão
clara/escura, desktop e mobile. As histórias de diagramas não alteram as baselines
dos componentes existentes.
