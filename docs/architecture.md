# Arquitetura

Axiom tem dois repositorios: rgomids/axiom integra produto; rgomids/axiom-ds
mantem tokens, componentes, marca, Storybook e validacao.

## Fonte da verdade

Primitivos DTCG -> papeis semanticos -> tokens concretos de componentes ->
CSS variables -> Tailwind/React -> Storybook -> consumidores.
Penpot auxilia exploracao; decisoes aceitas retornam ao Git.

## Pacotes

- @axion/tokens: fontes DTCG, valores resolvidos e variaveis CSS.
- @axion/ui: codigo React/TypeScript proprio derivado de shadcn/ui, Radix,
  tema compilado Tailwind e catalogo HTML de compatibilidade.
- @axion/brand: SVGs aprovados.
- apps/storybook: documentacao executavel.

O tema e selecionado no html, incluindo portais Radix. Leia docs/themes.md.
Estilos React e estilos do catalogo legado sao exports distintos.
Nao carregue os dois bundles indiscriminadamente na mesma pagina.

## Execucao

Codex e Cloud compartilham AGENTS.md e comandos npm. CI roda os mesmos checks.
Storybook e estatico, usa fontes locais e nao requer servico pago.
ADR 0001 descreve o limite do repositorio; ADR 0002 registra a stack.

O dashboard HTML antigo continua prototipo de referencia. A landing pertence ao
produto (ADR 0005). A biblioteca React segue a direcao Geist v0.2 (ADR 0006):
componentes em packages/ui/src/react, padroes de apresentacao em
packages/ui/src/react/patterns, sem regras de negocio do produto. O compilador
implementa o subconjunto DTCG usado, nao uma ferramenta generica de conversao.
