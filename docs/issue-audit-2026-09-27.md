# Auditoria das issues do axiom-ds

> **SUPERSEDED: auditoria historica, nao representa o estado atual.**
> Os resultados abaixo descrevem o levantamento anterior a implementacao.
> Consulte [acceptance.md](acceptance.md) para evidencias atuais e
> [delivery-sequence.md](delivery-sequence.md) para a separacao das entregas.

Data: 2026-09-27. Resultado: parcialmente alinhado; nao pronto para encerrar as issues.

Fontes:

- https://github.com/rgomids/axiom-ds/issues/1
- https://github.com/rgomids/axiom-ds/issues/2

A API retornou duas issues abertas, sem comentarios, e nenhum outro item nesta consulta.
O repositorio remoto e publico, tem main como branch padrao e contem somente
LICENSE e README.md na arvore consultada. Esta avaliacao compara os requisitos
com os arquivos locais; nao confunde arquivos presentes com entregas no remoto.

## Issue 1: bootstrap e regras de agentes

| Requisito                                  | Resultado e evidencia                                                                                                |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Repositorio publico e main padrao          | Confirmado no GitHub                                                                                                 |
| Licenca e contribuicao                     | Presentes localmente: LICENSE e CONTRIBUTING.md                                                                      |
| Proposito, limite e relacao com Axiom      | Parcial: README e arquitetura descrevem o kit, mas falta formalizar a relacao entre rgomids/axiom e rgomids/axiom-ds |
| Estrutura para UI/tokens                   | Presente: packages/tokens, packages/ui, docs, tests                                                                  |
| Governanca e politica de dependencias      | Parcial: CONTRIBUTING define fluxo e versoes; faltam responsabilidades de decisao e politica de atualizacoes         |
| Baseline de seguranca                      | Ausente como politica: nao ha SECURITY.md nem processo de reporte definido                                           |
| Instrucoes compartilhadas de agentes       | Ausentes: nao ha AGENTS.md ou equivalente com comandos, limites e regras do projeto                                  |
| Codex e Cloud explicitamente suportados    | Nao documentado; scripts sao portaveis, mas isso nao satisfaz o requisito de regras compartilhadas                   |
| Comandos reproduziveis                     | Presentes: lockfile, README e scripts; executados com sucesso localmente                                             |
| CI existente e passando                    | Workflow presente localmente; nenhuma execucao remota foi validada e o workflow nao esta na main remota consultada   |
| Discovery/decisao no Notion                | Nao verificavel a partir do repositorio; nao foi acessado o workspace Notion                                         |
| Bootstrap concluido antes da implementacao | Nao atendido: ha implementacao visual enquanto regras e governanca do bootstrap ainda faltam                         |

## Issue 2: tokens, componentes e Storybook

| Requisito                                         | Resultado e evidencia                                                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dependencia da issue 1 concluida                  | Nao atendido                                                                                                                                     |
| Estrategia e nomes de tokens                      | Presentes em docs/foundations.md, docs/architecture.md e packages/tokens/src                                                                     |
| Tokens primitivos, semanticos e de componentes    | Presentes: 71 tokens; ainda sem commit local                                                                                                     |
| Modelo de tema claro/escuro                       | Nao atendido: README.md e docs/architecture.md explicitam que o escuro e apenas da marca                                                         |
| Primeiro recorte coerente de componentes          | Parcial: HTML/CSS com Button, campos, Badge e outros exemplos; nao ha implementacao da stack proposta nem decisao reconciliando essa divergencia |
| Componentes usando tokens compartilhados          | Parcial: variaveis compartilhadas e aliases existem; ainda ha valores visuais literais nos estilos                                               |
| Storybook com fundamentos, variantes e estados    | Ausente: ha catalogo HTML proprio, nao Storybook                                                                                                 |
| Acessibilidade inicial                            | Verificada automaticamente nos nove exemplos base com axe; nao e auditoria completa do produto                                                   |
| Validacao de navegador                            | Presente e passou em quatro larguras, com busca, formulario, foco e geometria da marca                                                           |
| Regressao visual com baseline                     | Ausente: tests/browser.mjs salva screenshots, mas nao compara com imagens de referencia aprovadas                                                |
| Lint/format e checagem de tipos                   | Ausentes nos scripts e CI atuais                                                                                                                 |
| Storybook build reproduzivel em CI                | Ausente                                                                                                                                          |
| Publicacao de docs/Storybook sem custo recorrente | HTML e estatico, mas falta fluxo de publicacao GitHub Pages                                                                                      |
| Comandos locais documentados                      | Atendido localmente                                                                                                                              |
| Sem servico pago obrigatorio                      | Nenhuma dependencia paga obrigatoria identificada no manifesto                                                                                   |
| Decisoes duraveis reconciliadas                   | Parcial: ha arquitetura documentada, mas nao justifica a divergencia em relacao a stack das issues                                               |

Penpot, Tailwind, shadcn/ui e Radix aparecem como stack proposta na issue 2.
Sua ausencia requer alinhamento ou decisao documentada, nao migracao automatica
sem avaliar o recorte. A issue permite um conjunto inicial menor de componentes:
a ausencia de Dialog, Tooltip e Tabs, isoladamente, nao reprova esse recorte.
Storybook e o baseline claro/escuro, por outro lado, estao explicitamente na
definicao de concluido.

## Validacao executada

- npm run check: geracao concluida e seis testes passaram.
- npm run test:browser: nove auditorias axe, quatro larguras e checks de interacao passaram.
- As verificacoes nao cobrem requisitos ainda nao implementados.

## Estado Git e branch

HEAD ja aponta para design-system, preparado em uma solicitacao anterior.
Nao ha primeiro commit; portanto, ainda nao existe uma referencia de branch
com historico para comparar com a main remota ou abrir PR.
Nao ha remoto configurado localmente. Nenhum push ou PR foi feito.
O nome literal "Design System" nao e valido no Git por conter espaco.

A condicao "caso esteja ok" nao foi satisfeita. Nenhuma nova branch remota
foi criada como entrega aprovada.

## Ordem sugerida de adequacao

1. Concluir o bootstrap da issue 1: regras compartilhadas, governanca, seguranca,
   politica de dependencias, relacao com Axiom e confirmacao do registro no Notion.
2. Integrar o trabalho ao historico da main remota preservando os arquivos locais.
3. Alinhar a stack e implementar um recorte pequeno com temas e Storybook.
4. Adicionar lint/format, verificacao de tipos aplicavel, comparacao visual
   com baselines e publicacao Pages.
5. Revalidar os criterios e so entao submeter as entregas para revisao.
