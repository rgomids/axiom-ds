import * as React from 'react';
type CommandSnippetProps = Omit<React.ComponentProps<'div'>, 'children'> & {
    command: string;
    language?: 'pt' | 'en';
    disabled?: boolean;
    copy?: (command: string) => Promise<void>;
};
/** One executable command per instance. Never concatenates adjacent snippets. */
declare function CommandSnippet({ command, language, disabled, copy, className, ...props }: CommandSnippetProps): React.JSX.Element;
export { CommandSnippet, type CommandSnippetProps };
