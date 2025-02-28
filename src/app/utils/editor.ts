import {
    Undo2, Redo2, Maximize, Bold, Italic, Underline, Highlighter,
    Quote, Code, List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
    Table, Columns, Rows, Image, TableCellsSplit, TableColumnsSplit, TableRowsSplit,
    Rows2,
} from "lucide-react";

export interface EditorType {
    [key: string]: any;
}
export const undoRedoTools = [
    { icon: Undo2, command: (editor: EditorType) => editor.chain().undo().run(), tooltip: "Undo" },
    { icon: Redo2, command: (editor: EditorType) => editor.chain().redo().run(), tooltip: "Redo" },
];



export const formattingTools = [
    { icon: Bold, command: (editor: EditorType) => editor.chain().toggleBold().run(), tooltip: "Bold" },
    { icon: Italic, command: (editor: EditorType) => editor.chain().toggleItalic().run(), tooltip: "Italic" },
    { icon: Underline, command: (editor: EditorType) => editor.chain().toggleUnderline().run(), tooltip: "Underline" },
    { icon: Highlighter, command: (editor: EditorType) => editor.chain().toggleHighlight().run(), tooltip: "Highlight" },
    { icon: Quote, command: (editor: EditorType) => editor.chain().toggleBlockquote().run(), tooltip: "Blockquote" },
    { icon: Code, command: (editor: EditorType) => editor.chain().toggleCodeBlock().run(), tooltip: "Code Block" },
];

export const alignmentTools = [
    { icon: AlignLeft, command: (editor: EditorType) => editor.chain().setTextAlign("left").run(), tooltip: "Align Left" },
    { icon: AlignCenter, command: (editor: EditorType) => editor.chain().setTextAlign("center").run(), tooltip: "Align Center" },
    { icon: AlignRight, command: (editor: EditorType) => editor.chain().setTextAlign("right").run(), tooltip: "Align Right" },
];

export const listTools = [
    { icon: List, command: (editor: EditorType) => editor.chain().toggleBulletList().run(), tooltip: "Bullet List" },
    { icon: ListOrdered, command: (editor: EditorType) => editor.chain().toggleOrderedList().run(), tooltip: "Ordered List" },
];

export const tableTools = [
    { icon: Table, command: (editor: EditorType) => editor.chain().insertTable({ rows: 3, cols: 3 }).run(), tooltip: "Insert Table" },
    { icon: TableCellsSplit, command: (editor: EditorType) => editor.chain().deleteTable().run(), tooltip: "Delete Table" },
    { icon: Columns, command: (editor: EditorType) => editor.chain().addColumnBefore().run(), tooltip: "Add Column Before" },
    { icon: Columns, command: (editor: EditorType) => editor.chain().addColumnAfter().run(), tooltip: "Add Column After" },
    { icon: TableColumnsSplit, command: (editor: EditorType) => editor.chain().deleteColumn().run(), tooltip: "Delete Column" },
    { icon: Rows2, command: (editor: EditorType) => editor.chain().addRowBefore().run(), tooltip: "Add Row Before" },
    { icon: Rows2, command: (editor: EditorType) => editor.chain().addRowAfter().run(), tooltip: "Add Row After" },
    { icon: TableRowsSplit, command: (editor: EditorType) => editor.chain().deleteRow().run(), tooltip: "Delete Row" },
];

export const insertTools = [
    {
        icon: Image,
        command: (editor: EditorType) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async (event) => {
                const file = (event.target as HTMLInputElement).files?.[0];
                if (!file) return;

                // Đọc ảnh dưới dạng base64
                const reader = new FileReader();
                reader.onload = () => {
                    const src = reader.result as string;
                    editor.chain().focus().setImage({ src }).run();
                };
                reader.readAsDataURL(file);
            };
            input.click();
        },
        tooltip: "Insert Image",
    },
];

export const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
];

export const fontSizeOptions = [
    { value: "12px", label: "12px" },
    { value: "16px", label: "16px" },
    { value: "20px", label: "20px" },
    { value: "24px", label: "24px" },
];

export const fontFamilyOptions = [
    { value: "serif", label: "Serif" },
    { value: "monospace", label: "Monospace" },
];
