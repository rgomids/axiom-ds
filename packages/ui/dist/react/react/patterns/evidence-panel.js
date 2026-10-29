import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../badge';
import { CopyButton } from '../copy-button';
const status = {
    verified: {
        icon: _jsx(ShieldCheck, { className: "text-success" }),
        badge: 'success',
        label: 'Verificada',
    },
    pending: {
        icon: _jsx(ShieldQuestion, { className: "text-warning" }),
        badge: 'warning',
        label: 'Pendente',
    },
    failed: { icon: _jsx(ShieldAlert, { className: "text-danger" }), badge: 'danger', label: 'Divergente' },
};
/**
 * List of evidence artifacts with verification state and digests.
 * The panel only displays states supplied by the caller; it verifies nothing.
 */
function EvidencePanel({ items, title = 'Evidências', actions, className, }) {
    const verified = items.filter((i) => i.status === 'verified').length;
    return (_jsxs("section", { "data-slot": "evidence-panel", className: cn('rounded-card border bg-card', className), children: [_jsxs("header", { className: "flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-sm font-semibold text-fg", children: title }), _jsxs(Badge, { variant: "secondary", size: "sm", mono: true, children: [verified, "/", items.length, " verificadas"] })] }), actions] }), _jsx("ul", { className: "divide-y", children: items.map((item) => {
                    const s = status[item.status];
                    return (_jsxs("li", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3", children: [_jsx("span", { "aria-hidden": true, className: "[&_svg]:size-4", children: s.icon }), _jsxs("div", { className: "grid min-w-0 flex-1 gap-0.5", children: [_jsxs("span", { className: "flex items-center gap-2 text-sm text-fg", children: [_jsx(FileText, { "aria-hidden": true, className: "size-3.5 shrink-0 text-fg-tertiary" }), item.href ? (_jsx("a", { href: item.href, className: "truncate underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring", children: item.name })) : (_jsx("span", { className: "truncate", children: item.name }))] }), _jsxs("span", { className: "flex flex-wrap gap-x-2 font-mono text-2xs text-fg-tertiary", children: [_jsx("span", { children: item.kind }), item.size && _jsx("span", { children: item.size }), item.digest && _jsxs("span", { title: item.digest, children: [item.digest.slice(0, 19), "\u2026"] })] })] }), _jsx(Badge, { variant: s.badge, size: "sm", children: s.label }), item.digest && (_jsx(CopyButton, { value: item.digest, label: 'Copiar digest de ' + item.name }))] }, item.id));
                }) })] }));
}
export { EvidencePanel };
