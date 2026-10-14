# Visual validation

This implementation directory belongs to issue #2. Run npm run test:visual
after npm run build:storybook to compare the reviewed light/dark baselines and
check accessibility and keyboard behavior. See components.spec.ts.

The independent issue-1-bootstrap branch only reserves this directory;
it has no browser baselines or placeholder success command.

## Landing e marketing

`landing.spec.ts` valida a composição estática em 1280, 390 e 320px: idioma,
tradução como texto, cópia individual real, erro de clipboard, teclado, motion
reduzido e axe. Uma execução com movimento valida a passagem amarelo/preto,
crescimento orgânico e pausa explícita.

As sete novas baselines cobrem CommandSnippet nos temas light/dark e nas larguras
1280/390, mais o workflow orgânico desktop/mobile. Foram inspecionadas antes da
proposta de revisão; isso não equivale ao aceite visual do mantenedor. O restante
das baselines continua inalterado. Atualizações devem ser restritas às imagens
afetadas pela mudança e revisadas visualmente.

A captura mobile do workflow tem referências separadas `win32` e `linux`,
inspecionadas nas execuções local e da CI. A rasterização e as métricas das fontes
do sistema diferem entre esses ambientes; a tolerância de comparação permanece
inalterada. A captura desktop e as demais imagens são compartilhadas.
