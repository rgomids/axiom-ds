# Changelog

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
