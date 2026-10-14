import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Button } from './button';
import { cn } from '../lib/utils';
/** One executable command per instance. Never concatenates adjacent snippets. */
function CommandSnippet({ command, language = 'pt', disabled = false, copy, className, ...props }) {
    const [state, setState] = React.useState('idle');
    const code = React.useRef(null);
    const version = React.useRef(0);
    React.useEffect(() => {
        version.current++;
        setState('idle');
        return () => {
            version.current++;
        };
    }, [command, language]);
    const labels = language === 'pt'
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
            if (current === version.current)
                setState('copied');
        }
        catch {
            if (current !== version.current)
                return;
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
    return (_jsxs("div", { "data-slot": "command-snippet", className: cn('rounded-lg border bg-card p-4 text-card-foreground', className), ...props, children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("pre", { className: "min-w-0 flex-1 whitespace-pre-wrap break-all font-mono text-sm", children: _jsx("code", { ref: code, children: command }) }), _jsx(Button, { type: "button", variant: "outline", size: "sm", disabled: disabled || state === 'copying', "aria-label": `${labels.idle}: ${command}`, onClick: handleCopy, children: labels[state] })] }), _jsx("p", { role: "status", className: "mt-2 text-sm text-muted-foreground", children: state === 'copied' ? labels.copied : state === 'error' ? labels.manual : '' })] }));
}
export { CommandSnippet };
