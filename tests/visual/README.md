# Visual validation

This implementation directory belongs to issue #2. Run npm run test:visual
after npm run build:storybook to compare the reviewed light/dark baselines and
check accessibility and keyboard behavior. See components.spec.ts.

The independent issue-1-bootstrap branch only reserves this directory;
it has no browser baselines or placeholder success command.

## Landing e marketing

`landing.spec.ts` valida todos os 18 quadros das cinco cenas em 1280, 390 e 320px:
ideia antes do Axiom, seis nós persistentes, progressão reversível sem histórico,
idioma, tradução como texto, cópia individual, erro de clipboard, teclado,
movimento reduzido, sequência sem JS e axe.

As dez vistas mostram S1–S5 em desktop/mobile. S2–S5 mobile têm referências
Windows/Linux inspecionadas, devido à rasterização de texto distinta no Chromium;
a geometria e a tolerância são as mesmas. As referências anteriores
do workflow isolado foram substituídas; as baselines dos componentes e dos
CommandSnippets permanecem. Inspecione imagens antes de atualizar expectativas.

`test-results/storytelling` recebe 18 capturas por viewport (um por quadro,
p=índice×4/17), além das capturas estáticas e vídeos contínuos desktop/mobile.
O workflow de CI disponibiliza essas evidências no artefato `visual-checks`.
Elas documentam a implementação candidata; não substituem aceite visual nem
teste de compreensão com visitante sem contexto. A tolerância permanece em 1%.

`story-motion.spec.ts` verifica em desktop/mobile a pausa de leitura, a persistência dos cards sem fios antes do Axiom, as conexões ortogonais,
os ícones dos agentes, o halo de chegada, a rotação do globo,
as ondas dirigidas ao centro e o zoom dos quadrados decorativos.
Pausa/movimento reduzido desativam os ciclos. Os testes de ida e volta aguardam
a suavização da rolagem se estabilizar; os vídeos registram a interação nativa.
