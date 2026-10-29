import * as React from 'react';
import { cn } from '../lib/utils';
import { CopyButton } from './copy-button';

type CodeBlockProps = Omit<React.ComponentProps<'figure'>, 'children'> & {
  code: string;
  /** File name or language shown in the header. */
  title?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  /** Lines (1-based) to highlight. */
  highlight?: number[];
};

/** Read-only, monospace code with optional header, line numbers and copy. No syntax highlighting. */
function CodeBlock({
  code,
  title,
  showLineNumbers = false,
  copyable = true,
  highlight = [],
  className,
  ...props
}: CodeBlockProps) {
  const lines = code.replace(/\n$/, '').split('\n');
  return (
    <figure
      data-slot="code-block"
      className={cn('overflow-hidden rounded-card border bg-surface-subtle', className)}
      {...props}
    >
      {(title || copyable) && (
        <figcaption className="flex h-10 items-center justify-between gap-2 border-b bg-surface px-3">
          <span className="truncate font-mono text-xs text-fg-tertiary">{title}</span>
          {copyable && <CopyButton value={code} label={'Copiar ' + (title ?? 'código')} />}
        </figcaption>
      )}
      <pre
        tabIndex={0}
        className="overflow-x-auto py-3 font-mono text-13 leading-5 text-fg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <code className="grid min-w-fit">
          {lines.map((line, index) => (
            <span
              key={index}
              data-highlighted={highlight.includes(index + 1) || undefined}
              className="flex px-4 data-[highlighted]:bg-primary-subtle"
            >
              {showLineNumbers && (
                <span
                  aria-hidden
                  className="mr-4 inline-block w-6 shrink-0 text-right text-fg-tertiary select-none"
                >
                  {index + 1}
                </span>
              )}
              <span className="whitespace-pre">{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export { CodeBlock, type CodeBlockProps };
