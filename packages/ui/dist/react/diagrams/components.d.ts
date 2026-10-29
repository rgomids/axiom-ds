import type { ComponentProps, ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';
import { type NodeProps } from '@xyflow/react';
import { type DiagramNode, type NodeKind } from './model';
export declare const kindIcons: Record<NodeKind, LucideIcon>;
export declare function ToolButton({ label, children, active, className, ...props }: ComponentProps<'button'> & {
    label: string;
    children: ReactNode;
    active?: boolean;
}): import("react").JSX.Element;
export declare function DiagramToggle({ label, checked, onChange, disabled, }: {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
}): import("react").JSX.Element;
export declare function NodeBody({ data, selected, }: {
    data: DiagramNode['data'];
    selected?: boolean;
}): import("react").JSX.Element;
export declare function DiagramNodeView({ data, selected }: NodeProps<DiagramNode>): import("react").JSX.Element;
