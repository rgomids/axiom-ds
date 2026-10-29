import * as React from 'react';
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
declare function CodeBlock({ code, title, showLineNumbers, copyable, highlight, className, ...props }: CodeBlockProps): React.JSX.Element;
export { CodeBlock, type CodeBlockProps };
