import * as React from 'react';
import { Button } from './button';
import { cn } from '../lib/utils';

type CommandSnippetProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  command: string;
  language?: 'pt' | 'en';
  disabled?: boolean;
  copy?: (command: string) => Promise<void>;
};

/** One executable command per instance. Never concatenates adjacent snippets. */
function CommandSnippet({
  command,
  language = 'pt',
  disabled = false,
  copy,
  className,
  ...props
}: CommandSnippetProps) {
  const [state, setState] = React.useState<'idle' | 'copying' | 'copied' | 'error'>('idle');
  const code = React.useRef<HTMLElement>(null);
  const version = React.useRef(0);
  React.useEffect(() => {
    version.current++;
    setState('idle');
    return () => {
      version.current++;
    };
  }, [command, language]);
  const labels =
    language === 'pt'
      ? {
          idle: 'Copiar',
          copying: 'Copiando…',
          copied: 'Copiado',
          error: 'Tentar novamente',
          manual: 'Selecione e copie o comando com Ctrl+C ou ⌘C.',
        }
      : {
          idle: 'Copy',
          copying: 'Copying…',
          copied: 'Copied',
          error: 'Try again',
          manual: 'Select and copy the command with Ctrl+C or ⌘C.',
        };
  async function handleCopy() {
    const current = version.current;
    setState('copying');
    try {
      await (copy ?? ((value) => navigator.clipboard.writeText(value)))(command);
      if (current === version.current) setState('copied');
    } catch {
      if (current !== version.current) return;
      setState('error');
      if (code.current) {
        const range = document.createRange();
        range.selectNodeContents(code.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }
  return (
    <div
      data-slot="command-snippet"
      className={cn('rounded-card border bg-surface-subtle p-3 text-card-foreground', className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        <pre className="min-w-0 flex-1 py-1.5 pl-1 font-mono text-13 break-all whitespace-pre-wrap text-fg">
          <span aria-hidden className="mr-2 text-fg-tertiary select-none">
            $
          </span>
          <code ref={code}>{command}</code>
        </pre>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || state === 'copying'}
          aria-label={`${labels.idle}: ${command}`}
          onClick={handleCopy}
        >
          {labels[state]}
        </Button>
      </div>
      <p role="status" className="mt-1 pl-1 text-xs text-fg-tertiary empty:mt-0 empty:h-0">
        {state === 'copied' ? labels.copied : state === 'error' ? labels.manual : ''}
      </p>
    </div>
  );
}

export { CommandSnippet, type CommandSnippetProps };
