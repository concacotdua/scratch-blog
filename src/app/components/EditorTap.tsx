import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useState } from "react";

// === SUPABASE CONFIG ===
import { createClient } from "@supabase/supabase-js";

export default function EditorTap() {
    const [loading, setLoading] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: { class: "text-blue-500 underline" },
            }),
            Image.configure({
                allowBase64: true,
            }),
            Highlight,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableCell,
            TableHeader,
        ],
        content: "<p>Viết nội dung của bạn ở đây...</p>",
    });

    if (!editor) return null;

    // === HÀM LƯU DỮ LIỆU VÀO SUPABASE ===
    const handleSave = async () => {
        setLoading(true);
        const content = editor.getJSON(); // Lưu dạng JSON

        const { data, error } = await supabase
            .from("posts")
            .insert([{ content }]);

        setLoading(false);

        if (error) {
            console.error("Lỗi lưu vào Supabase:", error);
        } else {
            alert("Lưu thành công!");
        }
    };

    return (
        <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
            <div className="mb-3 flex gap-2">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                >
                    H
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    P
                </button>
                <button
                    onClick={() => editor.chain().focus().setCode().run()}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Code
                </button>
                <button
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Table
                </button>
                <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {loading ? "Đang lưu..." : "Lưu bài viết"}
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
