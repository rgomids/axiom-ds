# Visual validation

This implementation directory belongs to issue #2. Run npm run test:visual
after npm run build:storybook to compare the reviewed light/dark baselines and
check accessibility and keyboard behavior. See components.spec.ts.

The independent issue-1-bootstrap branch only reserves this directory;
it has no browser baselines or placeholder success command.

## Landing e marketing

`landing.spec.ts` valida a narrativa contínua de cinco cenas em 1280, 390 e 320px:
ideia antes do Axiom, seis nós persistentes, progressão reversível sem histórico,
idioma, tradução como texto, cópia individual, erro de clipboard, teclado,
movimento reduzido, sequência sem JS e axe.

As dez novas baselines mostram S1–S5 em desktop/mobile. As referências anteriores
do workflow isolado foram substituídas; as baselines dos componentes e dos
CommandSnippets permanecem. Inspecione imagens antes de atualizar expectativas.

`test-results/storytelling` recebe 20 capturas por viewport (T12/T23/T34/T45,
p=0/.25/.5/.75/1), além das capturas estáticas e vídeos contínuos desktop/mobile.
O workflow de CI disponibiliza essas evidências no artefato `visual-checks`.
Elas documentam a implementação candidata; não substituem aceite visual nem
teste de compreensão com visitante sem contexto. A tolerância permanece em 1%.
