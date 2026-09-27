# Contribuir

Para a biblioteca atual, acrescente componentes React/TypeScript em
packages/ui/src/react, exporte-os no index e adicione stories em apps/storybook.
Use tokens semanticos e primitivas Radix quando houver comportamento complexo.
Execute npm run validate, npm run test:browser e npm run test:visual.
Preserve o aviso MIT nos componentes derivados de shadcn/ui.

O fluxo abaixo se aplica ao catalogo HTML de compatibilidade:

1. Crie packages/ui/src/components/nome/ com CSS, markup.html e README.md.
2. Documente finalidade, anatomia, variantes, estados, contrato e acessibilidade.
3. Registre o CSS em packages/ui/sources.json na ordem de cascata apropriada.
4. Registre o recurso em registry.json.
5. Reutilize tokens; novos valores devem ter um papel claro.
6. Execute npm run check e npm run test:browser.
7. Revise desktop/mobile e atualize CHANGELOG.md.

Gerados acompanham fontes na mesma alteracao. Nunca corrija o bundle diretamente.

## Maturidade

Prototype: referencia visual sem contrato funcional completo.
Beta: contrato documentado e testes do exemplo, sujeito a ajustes.
Stable: uso comprovado em produto, estados completos, revisao manual de
acessibilidade e compatibilidade definida. Nenhum recurso atual e stable.

## Versoes

Os pacotes seguem versao conjunta. Quebra de classes, tokens ou comportamento
exige migracao e incremento major. Recursos compativeis incrementam minor;
correcoes compativeis, patch. Durante 0.x, quebras incrementam minor.
Nao declare testes de leitor de tela ou de temas que nao foram realizados.
