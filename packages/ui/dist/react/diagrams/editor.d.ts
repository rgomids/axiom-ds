import '@xyflow/react/dist/style.css';
import './styles.css';
export type DiagramEditorProps = {
    initialTheme?: 'light' | 'dark';
    persist?: boolean;
    brandSrc?: string;
};
export declare function DiagramEditor(props: DiagramEditorProps): import("react").JSX.Element;
