import { build } from 'vite';
import { copyFile, mkdir } from 'node:fs/promises';

await build({
  configFile: false,
  publicDir: false,
  build: {
    emptyOutDir: false,
    outDir: 'packages/ui/dist',
    lib: {
      entry: 'docs/site/diagrams.tsx',
      name: 'AxiomDiagrams',
      formats: ['iife'],
      fileName: () => 'diagram-editor.js',
      cssFileName: 'diagram-editor',
    },
    cssCodeSplit: false,
  },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
});
await mkdir('packages/ui/dist/react/diagrams', { recursive: true });
await copyFile('packages/ui/src/diagrams/styles.css', 'packages/ui/dist/react/diagrams/styles.css');
for (const [source, destination] of [
  ['node_modules/@xyflow/react/LICENSE', 'REACT-FLOW-LICENSE'],
  ['node_modules/@dagrejs/dagre/LICENSE', 'DAGRE-LICENSE'],
  ['node_modules/@fontsource/inter/LICENSE', 'INTER-LICENSE'],
])
  await copyFile(source, 'packages/ui/dist/' + destination);
