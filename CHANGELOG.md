# Changelog

## 0.3.0 - em revisão

- Landing imersiva beta em pacote est�tico, com dez padr�es documentados no Storybook.
- Tokens sem�nticos de marketing, Manrope local e mascote original com dourado preservado.
- CommandSnippet React: copiar por comando, estados de sucesso, erro e desabilitado.
- Build reproduz�vel para integra��o separada no produto, sem publica��o nesta branch.

## 0.2.0 - 2026-09-27

- Git local dedicado e tres pacotes npm workspaces.
- Tokens DTCG em camadas, geracao CSS/JSON e validacao de referencias.
- Estilos por recurso, escopo .axion e estados de controles.
- SVGs aprovados em packages/brand/svg.
- Exemplos individuais, indice de recursos, contratos e workflow CI.

### Migracao

Use class="axion" no container que consome a biblioteca.
Os SVGs passaram de assets/brand para packages/brand/svg.
styles.css agora e gerado. Edite packages/ui/src e execute npm run build.

## 0.1.0

- Catalogo inicial com dashboard, landing e marca vetorial.
