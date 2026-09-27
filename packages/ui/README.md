# @axion/ui

React/TypeScript e CSS do Axiom Design System, versao beta.
Importe os componentes de @axion/ui e o CSS de @axion/ui/theme.css.
Defina data-theme="light" ou data-theme="dark" no html, inclusive para portais.

src/react contem sete componentes derivados de shadcn/ui com comportamento Radix.
React 19 e peer dependency. Nenhum comportamento de negocio e embutido.
Inter nao e incluida no CSS da biblioteca; Storybook disponibiliza a fonte local.
O codigo derivado de shadcn/ui preserva sua licenca em SHADCN-LICENSE.

O export @axion/ui/css e os arquivos src/components e src/patterns preservam
o catalogo HTML legado. Esse bundle usa class="axion" e nao substitui o tema React.
