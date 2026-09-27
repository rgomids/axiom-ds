# Busca

O exemplo filtra nomes localmente. Busca remota deve implementar estados de carregamento, falha e nenhum resultado no produto.

## Contrato

`.search`, `.search.compact`; input nativo type=search. Script de demonstracao em docs/site/examples.js.

## Acessibilidade

Label associado e resultado anunciado por role=status, sem alterar foco durante a busca.

## Arquivos

- Exemplo executavel: `examples/search.html`
- HTML de referencia: `markup.html`
- Estado: beta. Validar no contexto do produto antes de adotar.
