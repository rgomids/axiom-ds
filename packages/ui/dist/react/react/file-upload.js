'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
const formatSize = (bytes) => bytes < 1024
    ? bytes + ' B'
    : bytes < 1048576
        ? (bytes / 1024).toFixed(1) + ' KB'
        : (bytes / 1048576).toFixed(1) + ' MB';
function matchesAccept(file, accept) {
    if (!accept)
        return true;
    return accept.split(',').some((rule) => {
        const r = rule.trim().toLowerCase();
        if (r.startsWith('.'))
            return file.name.toLowerCase().endsWith(r);
        if (r.endsWith('/*'))
            return file.type.startsWith(r.slice(0, -1));
        return file.type === r;
    });
}
/** Drop zone backed by a native file input: keyboard (Enter/Space), click and drag-and-drop. */
function FileUpload({ files, defaultFiles = [], onFilesChange, onReject, accept, multiple = false, maxSize, disabled, id, label = 'Arraste arquivos ou clique para selecionar', hint, removeLabel = (file) => 'Remover ' + file.name, className, ...aria }) {
    const generated = React.useId();
    const inputId = id ?? generated;
    const [inner, setInner] = React.useState(defaultFiles);
    const [dragging, setDragging] = React.useState(false);
    const current = files ?? inner;
    const set = (next) => {
        if (files === undefined)
            setInner(next);
        onFilesChange?.(next);
    };
    const add = (list) => {
        if (!list)
            return;
        const rejected = [];
        const accepted = Array.from(list).filter((file) => {
            if (!matchesAccept(file, accept))
                rejected.push(file.name + ': tipo não permitido');
            else if (maxSize && file.size > maxSize)
                rejected.push(file.name + ': maior que ' + formatSize(maxSize));
            else
                return true;
            return false;
        });
        if (rejected.length)
            onReject?.(rejected);
        if (accepted.length)
            set(multiple ? [...current, ...accepted] : accepted.slice(0, 1));
    };
    return (_jsxs("div", { "data-slot": "file-upload", className: cn('grid gap-2', className), children: [_jsxs("label", { htmlFor: inputId, "data-dragging": dragging || undefined, "data-disabled": disabled || undefined, onDragOver: (event) => {
                    event.preventDefault();
                    if (!disabled)
                        setDragging(true);
                }, onDragLeave: () => setDragging(false), onDrop: (event) => {
                    event.preventDefault();
                    setDragging(false);
                    if (!disabled)
                        add(event.dataTransfer.files);
                }, className: cn('grid cursor-pointer justify-items-center gap-2 rounded-card border border-dashed border-input bg-surface px-4 py-6 text-center transition-colors hover:border-border-interactive hover:bg-surface-subtle has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring data-[dragging]:border-primary data-[dragging]:bg-primary-subtle data-[disabled]:cursor-not-allowed data-[disabled]:bg-surface-subtle data-[disabled]:text-fg-disabled', aria['aria-invalid'] && 'border-danger'), children: [_jsx("span", { className: "grid size-9 place-items-center rounded-control border bg-surface-subtle text-fg-secondary", children: _jsx(Upload, { "aria-hidden": true, className: "size-4" }) }), _jsx("span", { className: "text-sm font-medium text-fg", children: label }), hint && _jsx("span", { className: "text-xs text-fg-tertiary", children: hint }), _jsx("input", { id: inputId, type: "file", className: "sr-only", accept: accept, multiple: multiple, disabled: disabled, onChange: (event) => {
                            add(event.target.files);
                            event.target.value = '';
                        }, ...aria })] }), current.length > 0 && (_jsx("ul", { className: "grid gap-1.5", "aria-label": "Arquivos selecionados", children: current.map((file, index) => (_jsxs("li", { className: "flex items-center gap-3 rounded-control border bg-surface px-3 py-2 text-sm", children: [_jsx(FileText, { "aria-hidden": true, className: "size-4 shrink-0 text-fg-tertiary" }), _jsx("span", { className: "min-w-0 flex-1 truncate text-fg", children: file.name }), _jsx("span", { className: "font-mono text-xs text-fg-tertiary", children: formatSize(file.size) }), _jsx("button", { type: "button", "aria-label": removeLabel(file), disabled: disabled, onClick: () => set(current.filter((_, i) => i !== index)), className: cn('grid size-6 cursor-pointer place-items-center rounded-xs text-fg-tertiary hover:bg-surface-subtle hover:text-fg', focusRing), children: _jsx(X, { "aria-hidden": true, className: "size-3.5" }) })] }, file.name + index))) }))] }));
}
export { FileUpload };
