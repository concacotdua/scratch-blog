import { Bold, Italic, Highlighter, Quote, Table2, Trash, AlignLeft, AlignCenter, AlignRight, Terminal } from "lucide-react";
interface EditorType {
    [key: string]: any;
}
export const formattingTools = [
    { icon: Bold, command: (editor: EditorType) => editor.chain().toggleBold().run(), tooltip: "Bold" },
    { icon: Italic, command: (editor: EditorType) => editor.chain().toggleItalic().run(), tooltip: "Italic" },
    { icon: Highlighter, command: (editor: EditorType) => editor.chain().toggleHighlight().run(), tooltip: "Highlight" },
    { icon: Quote, command: (editor: EditorType) => editor.chain().toggleBlockquote().run(), tooltip: "Blockquote" },
];
export const codeTools = [
    { icon: Terminal, command: (editor: EditorType) => editor.chain().toggleCodeBlock().run(), tooltip: "Code Block" },
];
export const tableTools = [
    { icon: Table2, command: (editor: EditorType) => editor.chain().insertTable({ rows: 3, cols: 3 }).run(), tooltip: "Insert Table" },
    { icon: Trash, command: (editor: EditorType) => editor.chain().deleteTable().run(), tooltip: "Delete Table" },
];

export const alignmentTools = [
    { icon: AlignLeft, command: (editor: EditorType) => editor.chain().setTextAlign("left").run(), tooltip: "Căn trái" },
    { icon: AlignCenter, command: (editor: EditorType) => editor.chain().setTextAlign("center").run(), tooltip: "Căn giữa" },
    { icon: AlignRight, command: (editor: EditorType) => editor.chain().setTextAlign("right").run(), tooltip: "Căn phải" },
];
