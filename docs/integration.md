# Integracao

## React

Execute npm run build e npm pack --workspace @axion/ui.
Instale o tarball no consumidor com React 19 e um bundler ESM.

```tsx
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@axion/ui';
import '@axion/ui/theme.css';
```

Os estilos ja incluem Tailwind compilado e tokens; nao e necessario compilar
Tailwind no consumidor. O CSS inclui preflight: revise a integracao com resets
existentes. O tema deve ser definido no html com data-theme para incluir portais.

Componentes expoem props nativas e as props Radix quando aplicavel.
Use asChild apenas com um unico filho compativel. Links navegam, botoes executam.
Os exemplos do Storybook documentam labels, estados e interacoes.
Inter e distribuida com Storybook; o pacote UI usa fallback quando o consumidor
nao fornece a fonte.

## Tokens e marca

Importe @axion/tokens/css para usar somente variaveis.
O bundle React ja as inclui. Nomes semanticos sao publicos; overrides de marca
devem manter contraste, estados e nomes dos papeis.
Os SVGs aprovados ficam em @axion/brand, preservando aspect ratio.

## HTML legado

@axion/ui/css e o bundle dos exemplos HTML antigos. Exige class="axion" no
container. Essas composicoes nao sao a API React nem o baseline de tema escuro.
