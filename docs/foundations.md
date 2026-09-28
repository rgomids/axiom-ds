# Fundamentos

Tokens seguem DTCG 2025.10: valores primitivos, papeis semanticos e tokens
de componentes apenas quando consumidos por um recurso concreto.
Fontes em packages/tokens/src; tema escuro em src/themes/dark.tokens.json.
O Storybook Foundations/Tokens demonstra cores, tipografia e espacamento.

Cores: superfices neutras, azul para acao, texto semantico para estado e dourado
restrito a marca. Novos componentes usam papeis como semantic.action.primary,
nao um valor bruto. Theme toolbar alterna light/dark sem trocar o nome dos papeis.

Inter com fallback do sistema; escala 12,14,16,20,24,32,48px.
Espacamento 0,2,4,6,8,12,16,20,24,32,40,48,64px.
Raios 6px em controles e 8px em cards. Sombras e movimento sao tokens.
Lucide outline, stroke 2; icones decorativos ficam aria-hidden.
Transicoes de 160ms respeitam prefers-reduced-motion.

Controles exigem default, hover, focus-visible, active e disabled.
Inputs adicionam invalid, readonly e required. Carregamento de botao usa
disabled + aria-busy. Fluxos de negocio permanecem no produto consumidor.

Referencias: https://www.designtokens.org/tr/2025.10/format/ e
https://carbondesignsystem.com/guidelines/accessibility/overview/.
