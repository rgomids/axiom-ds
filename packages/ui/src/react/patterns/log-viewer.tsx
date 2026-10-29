'use client';

import * as React from 'react';
import { ArrowDownToLine, WrapText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CopyButton } from '../copy-button';
import { SearchField } from '../search-field';
import { Toggle } from '../toggle';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogLine = {
  id: string;
  timestamp?: string;
  level: LogLevel;
  message: string;
  source?: string;
};

const levelClass: Record<LogLevel, string> = {
  debug: 'text-fg-tertiary',
  info: 'text-info',
  warn: 'text-warning',
  error: 'text-danger',
};

/**
 * Read-only log display with level filter, text search, wrap toggle,
 * follow-tail and copy. Rendering is client-side; stream lines in via props.
 */
function LogViewer({
  lines,
  title = 'Logs',
  height = '20rem',
  follow: followProp = true,
  className,
}: {
  lines: LogLine[];
  title?: string;
  height?: string;
  follow?: boolean;
  className?: string;
}) {
  const [levels, setLevels] = React.useState<string[]>(['debug', 'info', 'warn', 'error']);
  const [query, setQuery] = React.useState('');
  const [wrap, setWrap] = React.useState(false);
  const [follow, setFollow] = React.useState(followProp);
  const scroller = React.useRef<HTMLDivElement>(null);
  const visible = lines.filter(
    (line) =>
      levels.includes(line.level) &&
      (!query || line.message.toLowerCase().includes(query.toLowerCase())),
  );
  React.useEffect(() => {
    if (follow && scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [follow, visible.length]);
  const text = visible
    .map((l) => [l.timestamp, l.level.toUpperCase(), l.message].filter(Boolean).join(' '))
    .join('\n');
  return (
    <section
      data-slot="log-viewer"
      aria-label={title}
      className={cn('min-w-0 overflow-hidden rounded-card border bg-surface-subtle', className)}
    >
      <div className="flex flex-wrap items-center gap-2 border-b bg-surface px-3 py-2">
        <h3 className="mr-auto font-mono text-xs text-fg-tertiary">{title}</h3>
        <ToggleGroup
          type="multiple"
          size="sm"
          value={levels}
          onValueChange={setLevels}
          aria-label="Níveis de log"
        >
          {(['debug', 'info', 'warn', 'error'] as const).map((level) => (
            <ToggleGroupItem
              key={level}
              value={level}
              className="h-7 px-2 font-mono text-2xs uppercase"
            >
              {level}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <SearchField
          aria-label="Filtrar logs"
          placeholder="Filtrar"
          value={query}
          onValueChange={setQuery}
          className="w-40 [&_input]:h-8"
        />
        <Toggle size="sm" pressed={wrap} onPressedChange={setWrap} aria-label="Quebrar linhas">
          <WrapText aria-hidden />
        </Toggle>
        <Toggle size="sm" pressed={follow} onPressedChange={setFollow} aria-label="Acompanhar fim">
          <ArrowDownToLine aria-hidden />
        </Toggle>
        <CopyButton value={text} label="Copiar logs visíveis" />
      </div>
      <div
        ref={scroller}
        role="log"
        aria-live={follow ? 'polite' : 'off'}
        tabIndex={0}
        style={{ height }}
        className="overflow-auto py-2 font-mono text-xs leading-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        {visible.length === 0 ? (
          <p className="px-4 py-6 text-center font-sans text-sm text-fg-tertiary">
            Nenhuma linha corresponde aos filtros.
          </p>
        ) : (
          visible.map((line, index) => (
            <div
              key={line.id}
              data-level={line.level}
              className={cn(
                'flex gap-3 px-3 hover:bg-surface-muted',
                line.level === 'error' && 'bg-danger-subtle/60',
              )}
            >
              <span aria-hidden className="w-8 shrink-0 text-right text-fg-disabled select-none">
                {index + 1}
              </span>
              {line.timestamp && (
                <span className="shrink-0 text-fg-tertiary">{line.timestamp}</span>
              )}
              <span className={cn('w-11 shrink-0 uppercase', levelClass[line.level])}>
                {line.level}
              </span>
              {line.source && <span className="shrink-0 text-fg-secondary">[{line.source}]</span>}
              <span
                className={cn('text-fg', wrap ? 'break-all whitespace-pre-wrap' : 'whitespace-pre')}
              >
                {line.message}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export { LogViewer, type LogLine, type LogLevel };
