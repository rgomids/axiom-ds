'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tooltip, Switch } from 'radix-ui';
import { Bot, Database, Diamond, FileCheck2, Square } from 'lucide-react';
import { Handle, Position } from '@xyflow/react';
import { kindLabels } from './model';
export const kindIcons = {
    process: Square,
    decision: Diamond,
    agent: Bot,
    database: Database,
    output: FileCheck2,
};
export function ToolButton({ label, children, active, className = '', ...props }) {
    return (_jsxs(Tooltip.Root, { children: [_jsx(Tooltip.Trigger, { asChild: true, children: _jsx("button", { type: "button", className: `dg-tool ${className}`, "aria-label": label, "aria-pressed": active, ...props, children: children }) }), _jsx(Tooltip.Portal, { children: _jsxs(Tooltip.Content, { className: "dg-tooltip", sideOffset: 8, children: [label, _jsx(Tooltip.Arrow, {})] }) })] }));
}
export function DiagramToggle({ label, checked, onChange, disabled = false, }) {
    return (_jsxs("label", { className: "dg-toggle-label", children: [_jsx("span", { children: label }), _jsx(Switch.Root, { className: "dg-switch", checked: checked, onCheckedChange: onChange, "aria-label": label, disabled: disabled, children: _jsx(Switch.Thumb, { className: "dg-switch-thumb" }) })] }));
}
export function NodeBody({ data, selected = false, }) {
    const Icon = kindIcons[data.kind];
    return (_jsxs("div", { className: "dg-node", "data-kind": data.kind, "data-selected": selected, children: [_jsxs("div", { className: "dg-node-type", children: [_jsx(Icon, { size: 14 }), _jsx("span", { children: kindLabels[data.kind] })] }), _jsx("strong", { children: data.label }), _jsx("small", { children: data.description })] }));
}
export function DiagramNodeView({ data, selected }) {
    return (_jsxs(_Fragment, { children: [_jsx(Handle, { id: "in", type: "target", position: Position.Top, title: "Entrada superior" }), _jsx(Handle, { id: "left", type: "target", position: Position.Left, title: "Entrada lateral" }), _jsx(NodeBody, { data: data, selected: selected }), _jsx(Handle, { id: "out", type: "source", position: Position.Bottom, title: "Sa\u00EDda inferior" }), _jsx(Handle, { id: "right", type: "source", position: Position.Right, title: "Sa\u00EDda lateral" })] }));
}
