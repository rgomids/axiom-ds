'use client';

import type { ComponentProps, ReactNode } from 'react';
import { Tooltip, Switch } from 'radix-ui';
import { Bot, Database, Diamond, FileCheck2, Square, type LucideIcon } from 'lucide-react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { kindLabels, type DiagramNode, type NodeKind } from './model';

export const kindIcons: Record<NodeKind, LucideIcon> = {
  process: Square,
  decision: Diamond,
  agent: Bot,
  database: Database,
  output: FileCheck2,
};

export function ToolButton({
  label,
  children,
  active,
  className = '',
  ...props
}: ComponentProps<'button'> & {
  label: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          className={`dg-tool ${className}`}
          aria-label={label}
          aria-pressed={active}
          {...props}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="dg-tooltip" sideOffset={8}>
          {label}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function DiagramToggle({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="dg-toggle-label">
      <span>{label}</span>
      <Switch.Root
        className="dg-switch"
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label}
        disabled={disabled}
      >
        <Switch.Thumb className="dg-switch-thumb" />
      </Switch.Root>
    </label>
  );
}

export function NodeBody({
  data,
  selected = false,
}: {
  data: DiagramNode['data'];
  selected?: boolean;
}) {
  const Icon = kindIcons[data.kind];
  return (
    <div className="dg-node" data-kind={data.kind} data-selected={selected}>
      <div className="dg-node-type">
        <Icon size={14} />
        <span>{kindLabels[data.kind]}</span>
      </div>
      <strong>{data.label}</strong>
      <small>{data.description}</small>
    </div>
  );
}

export function DiagramNodeView({ data, selected }: NodeProps<DiagramNode>) {
  return (
    <>
      <Handle id="in" type="target" position={Position.Top} title="Entrada superior" />
      <Handle id="left" type="target" position={Position.Left} title="Entrada lateral" />
      <NodeBody data={data} selected={selected} />
      <Handle id="out" type="source" position={Position.Bottom} title="Saída inferior" />
      <Handle id="right" type="source" position={Position.Right} title="Saída lateral" />
    </>
  );
}
