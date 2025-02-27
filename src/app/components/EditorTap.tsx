
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Placeholder from "@tiptap/extension-placeholder";
import Blockquote from "@tiptap/extension-blockquote";

import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { ToolbarGroup } from "./ToolBar";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight"; // Import đúng cách

import TextAlign from "@tiptap/extension-text-align";
import js from "highlight.js/lib/languages/javascript"; // Import ngôn ngữ bạn muốn hỗ trợ
import ts from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github-dark.css";

import { alignmentTools, codeTools, tableTools } from "../utils/editor";
import { formattingTools } from "../utils/editor";
import { Save } from "lucide-react";

export interface EditorTapProps {
    content?: string;
    onChange: (value: string) => void;
}

export default function EditorTap({ content, onChange }: EditorTapProps) {
    const [loading, setLoading] = useState(false);

    const lowlight = createLowlight();
    lowlight.register("js", js);
    lowlight.register("ts", ts);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                blockquote: false,
                codeBlock: false,
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: { class: "text-blue-500 underline hover:text-blue-700 transition" },
            }),
            Image.configure({ allowBase64: true }),
            Highlight,
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TableHeader,
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: "bg-gray-900 text-white p-4 rounded-md font-mono overflow-x-auto text-xl leading-relaxed"
                },
            }),
            Placeholder.configure({
                placeholder: "Nhập nội dung tại đây...",
                emptyEditorClass: "text-gray-400 italic",
            }),
            TextAlign.configure({
                types: ["heading", "paragraph", "code", "codeBlock", "image"],
            }),
            Blockquote.configure({
                HTMLAttributes: {
                    class: "text-gray-700 italic border-l-4 pl-4 border-gray-400 bg-gray-100 py-2 px-4 rounded-md"
                },
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose max-w-screen min-h-[400px] p-6 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 text-xl leading-relaxed",
            },
        },
        onUpdate: ({ editor }) => {
            let content = editor.getHTML();
            onChange(content);
        },
        content: content,
    });


    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || "");
        }
    }, [content, editor]);


    if (!editor) return null;

    const handleSave = async () => {
        setLoading(true);
        const content = editor.getJSON();
        const { error } = await supabase.from("posts").insert([{ content }]);
        setLoading(false);

        if (error) {
            console.error("Lỗi lưu vào Supabase:", error);
            toast.error("Lỗi lưu vào Supabase", { description: error.message });
        } else {
            toast.success("Lưu thành công!");
        }
    };


    return (
        <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
            <div className="mb-3 flex flex-wrap gap-2 items-center">
                <ToolbarGroup editor={editor} tools={formattingTools} />
                <ToolbarGroup editor={editor} tools={tableTools} />
                <ToolbarGroup editor={editor} tools={alignmentTools} />
                <ToolbarGroup editor={editor} tools={codeTools} />
                <button
                    onClick={handleSave}
                    className="py-[4px] px-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Đang lưu..." : <Save className="w-5 h-6" />}
                </button>
            </div>
            <div
                className="border border-gray-200 rounded-lg min-h-[400px] p-3 text-lg focus:ring-2 focus:ring-blue-500"
                onClick={() => editor.chain().focus().run()}
            >
                <EditorContent editor={editor} className="w-full max-w-7xl h-auto outline-none mx-auto" />
            </div>
        </div>
    );
}
