import * as React from 'react';
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogLine = {
    id: string;
    timestamp?: string;
    level: LogLevel;
    message: string;
    source?: string;
};
/**
 * Read-only log display with level filter, text search, wrap toggle,
 * follow-tail and copy. Rendering is client-side; stream lines in via props.
 */
declare function LogViewer({ lines, title, height, follow: followProp, className, }: {
    lines: LogLine[];
    title?: string;
    height?: string;
    follow?: boolean;
    className?: string;
}): React.JSX.Element;
export { LogViewer, type LogLine, type LogLevel };
