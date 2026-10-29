import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { Badge } from '../badge';
import { Stepper } from '../stepper';
/** Stepper with a stage counter header ("03 / 06 stages"), as used in workflow summaries. */
function WorkflowStepper({ title = 'Workflow', steps, orientation = 'horizontal', className, }) {
    const done = steps.filter((s) => s.status === 'complete').length;
    const current = steps.findIndex((s) => s.status === 'current' || s.status === 'error');
    const position = current === -1 ? done : current + 1;
    const pad = (n) => String(n).padStart(2, '0');
    return (_jsxs("section", { "data-slot": "workflow-stepper", className: cn('grid gap-4 rounded-card border bg-card p-5', className), children: [_jsxs("header", { className: "flex items-center justify-between gap-2", children: [_jsx("h3", { className: "text-sm font-semibold text-fg", children: title }), _jsxs(Badge, { variant: "subtle", mono: true, children: [pad(position), " / ", pad(steps.length), " stages"] })] }), _jsx(Stepper, { steps: steps, orientation: orientation, "aria-label": typeof title === 'string' ? title : 'Workflow' })] }));
}
export { WorkflowStepper };
