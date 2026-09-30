# 0003: Kit de diagramas como extensão do Axiom

Status: implementado localmente, sem publicação.

O editor precisa de conexões muitos-para-muitos, viewport amplo, seleção e
manipulação direta. React Flow (MIT) fornece esse comportamento e Dagre (MIT)
resolve layout, evitando manter um motor de grafos próprio. Radix mantém os
comportamentos de tooltip e switch. Lucide fornece os ícones existentes.

O kit tem catálogo e exemplo separados, mas continua usando tokens e distribuição
do Axiom. A geometria quadrada usa os tokens component.diagram e
component.icon.radius nos controles e contêineres de ícones. O tema global e os
protótipos de produto permanecem independentes. Temas claro e escuro
são suportados no editor e no catálogo.

O painel de código usa JSON versionado, validado e bidirecional com o canvas.
Mermaid não é anunciado como formato compatível. A referência visual orienta
disposição, não o parser. Persistência local e exportação são suficientes para
prototipagem; integração de produto continua pertencendo ao repositório axiom.

O build Vite gera bundle IIFE e CSS autocontidos, incluindo fonte local, para que
os exemplos funcionem via file:// e sem CDN. Storybook documenta o componente
React. Não há assinatura, serviço de IA ou custo recorrente obrigatório.
