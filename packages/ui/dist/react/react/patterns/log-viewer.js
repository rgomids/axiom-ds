'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { ArrowDownToLine, WrapText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CopyButton } from '../copy-button';
import { SearchField } from '../search-field';
import { Toggle } from '../toggle';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group';
const levelClass = {
    debug: 'text-fg-tertiary',
    info: 'text-info',
    warn: 'text-warning',
    error: 'text-danger',
};
/**
 * Read-only log display with level filter, text search, wrap toggle,
 * follow-tail and copy. Rendering is client-side; stream lines in via props.
 */
function LogViewer({ lines, title = 'Logs', height = '20rem', follow: followProp = true, className, }) {
    const [levels, setLevels] = React.useState(['debug', 'info', 'warn', 'error']);
    const [query, setQuery] = React.useState('');
    const [wrap, setWrap] = React.useState(false);
    const [follow, setFollow] = React.useState(followProp);
    const scroller = React.useRef(null);
    const visible = lines.filter((line) => levels.includes(line.level) &&
        (!query || line.message.toLowerCase().includes(query.toLowerCase())));
    React.useEffect(() => {
        if (follow && scroller.current)
            scroller.current.scrollTop = scroller.current.scrollHeight;
    }, [follow, visible.length]);
    const text = visible
        .map((l) => [l.timestamp, l.level.toUpperCase(), l.message].filter(Boolean).join(' '))
        .join('\n');
    return (_jsxs("section", { "data-slot": "log-viewer", "aria-label": title, className: cn('min-w-0 overflow-hidden rounded-card border bg-surface-subtle', className), children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b bg-surface px-3 py-2", children: [_jsx("h3", { className: "mr-auto font-mono text-xs text-fg-tertiary", children: title }), _jsx(ToggleGroup, { type: "multiple", size: "sm", value: levels, onValueChange: setLevels, "aria-label": "N\u00EDveis de log", children: ['debug', 'info', 'warn', 'error'].map((level) => (_jsx(ToggleGroupItem, { value: level, className: "h-7 px-2 font-mono text-2xs uppercase", children: level }, level))) }), _jsx(SearchField, { "aria-label": "Filtrar logs", placeholder: "Filtrar", value: query, onValueChange: setQuery, className: "w-40 [&_input]:h-8" }), _jsx(Toggle, { size: "sm", pressed: wrap, onPressedChange: setWrap, "aria-label": "Quebrar linhas", children: _jsx(WrapText, { "aria-hidden": true }) }), _jsx(Toggle, { size: "sm", pressed: follow, onPressedChange: setFollow, "aria-label": "Acompanhar fim", children: _jsx(ArrowDownToLine, { "aria-hidden": true }) }), _jsx(CopyButton, { value: text, label: "Copiar logs vis\u00EDveis" })] }), _jsx("div", { ref: scroller, role: "log", "aria-live": follow ? 'polite' : 'off', tabIndex: 0, style: { height }, className: "overflow-auto py-2 font-mono text-xs leading-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring", children: visible.length === 0 ? (_jsx("p", { className: "px-4 py-6 text-center font-sans text-sm text-fg-tertiary", children: "Nenhuma linha corresponde aos filtros." })) : (visible.map((line, index) => (_jsxs("div", { "data-level": line.level, className: cn('flex gap-3 px-3 hover:bg-surface-muted', line.level === 'error' && 'bg-danger-subtle/60'), children: [_jsx("span", { "aria-hidden": true, className: "w-8 shrink-0 text-right text-fg-disabled select-none", children: index + 1 }), line.timestamp && (_jsx("span", { className: "shrink-0 text-fg-tertiary", children: line.timestamp })), _jsx("span", { className: cn('w-11 shrink-0 uppercase', levelClass[line.level]), children: line.level }), line.source && _jsxs("span", { className: "shrink-0 text-fg-secondary", children: ["[", line.source, "]"] }), _jsx("span", { className: cn('text-fg', wrap ? 'break-all whitespace-pre-wrap' : 'whitespace-pre'), children: line.message })] }, line.id)))) })] }));
}
export { LogViewer };
