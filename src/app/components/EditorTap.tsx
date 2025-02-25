import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Heading from "@tiptap/extension-heading";
import { supabase } from "@/lib/supabase";

import { toast } from "sonner";
import ToolbarButton from "./ToolBar";

export interface EditorTapProps {
    description: string;
    onChange: (description: string) => void;
}

export default function EditorTap({ description, onChange }: EditorTapProps) {
    const [loading, setLoading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({

            }),
            Heading.configure({
                HTMLAttributes: { class: "text-xl font-bold" },
                levels: [2],
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: { class: "text-blue-500 underline" },
            }),
            Image.configure({ allowBase64: true }),
            Highlight,
            Table.configure({
                resizable: true,
                HTMLAttributes: { class: "border-collapse border border-gray-300" },
            }),
            TableRow,
            TableCell,
            TableHeader,
        ],
        editorProps: {
            attributes: {
                class: "prose prose-lg max-w-none rounded-md min-h-[400px] p-2 text-lg focus-within:ring-2 focus-within:ring-blue-500",
            },
        },
        onUpdate: ({ editor }) => {
            let content = editor.getHTML();
            content = content.replace(/<img[^>]*>/g, "");
            onChange(content);
        },
        content: "<p>Viết nội dung của bạn ở đây...</p>",
    });

    if (!editor) return null;

    const handleSave = async () => {
        setLoading(true);
        const content = editor.getJSON(); // Lưu JSON, không lưu HTML

        const { error } = await supabase.from("posts").insert([{ content }]);
        setLoading(false);

        if (error) {
            console.error("Lỗi lưu vào Supabase:", error);
            toast.error("Lỗi lưu vào Supabase:", { description: error.message });
        } else {
            toast.success("Lưu thành công!");
        }
    };

    return (
        <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
            <div className="mb-3 flex flex-wrap gap-2">
                <ToolbarButton tooltip="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
                    <strong>B</strong>
                </ToolbarButton>
                <ToolbarButton tooltip="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <em>I</em>
                </ToolbarButton>
                <ToolbarButton tooltip="Highlight" onClick={() => editor.chain().focus().toggleHighlight().run()} className="bg-yellow-200">
                    H
                </ToolbarButton>
                <ToolbarButton tooltip="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()}>
                    P
                </ToolbarButton>
                <ToolbarButton tooltip="Code" onClick={() => editor.chain().focus().setCode().run()}>
                    {"</>"}
                </ToolbarButton>
                <ToolbarButton tooltip="Insert Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}>
                    📊
                </ToolbarButton>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Đang lưu..." : "💾 Lưu bài viết"}
                </button>
            </div>

            <div
                className="border border-gray-200 rounded-lg min-h-[400px] p-3 text-lg focus-within:ring-2 focus-within:ring-blue-500"
                onClick={() => editor.chain().focus().run()}
            >
                <EditorContent editor={editor} className="w-full h-full outline-none" />
            </div>
        </div>
    );
}


