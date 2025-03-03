import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { createLowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/github-dark.css';
import { ToolbarGroup } from './ToolBar';
import { alignmentTools, insertTools, tableTools, undoRedoTools } from '../utils/editor';
import { formattingTools } from '../utils/editor';
import { Maximize, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EditorTapProps {
    content?: string;
    onChange: (value: string) => void;
}

const TiptapEditor = ({ content, onChange }: EditorTapProps) => {
    const lowlight = createLowlight();
    lowlight.register('js', js);
    lowlight.register('ts', ts);
    lowlight.register('html', html);
    lowlight.register('css', css);
    lowlight.register('python', python);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const displayTools = [
        {
            icon: isFullscreen ? Minimize : Maximize,
            command: () => setIsFullscreen(prev => !prev),
            tooltip: isFullscreen ? "Exit Fullscreen" : "Fullscreen"
        },
    ];

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                blockquote: false,
                codeBlock: false,
                bulletList: false,
                orderedList: false,
                listItem: false,
            }),
            Underline,
            FontFamily,
            FontSize,
            Color,
            Highlight,
            Placeholder.configure({ placeholder: 'Viết nội dung ở đây...' }),
            Image.configure({ allowBase64: true }),
            TextAlign.configure({
                types: ["heading", "paragraph", "code", "codeBlock", "image"],
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: cn(
                        "relative rounded-lg overflow-hidden",
                        "bg-gray-900 dark:bg-gray-950",
                        "border border-gray-800 dark:border-gray-700",
                        "shadow-lg",
                        "my-4",
                        "group",
                        "font-mono text-sm leading-relaxed",
                        "p-4",
                        "prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950",
                        "prose-pre:text-gray-100",
                        "prose-pre:border-gray-800 dark:prose-pre:border-gray-700",
                        "prose-pre:shadow-lg",
                        "prose-pre:my-4",
                        "prose-pre:p-4",
                        "prose-pre:overflow-x-auto",
                        "prose-pre:rounded-lg",
                        "prose-pre:font-mono",
                        "prose-pre:text-sm",
                        "prose-pre:leading-relaxed"
                    ),
                },
                defaultLanguage: 'javascript',
            }),
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TableHeader,
            BulletList,
            OrderedList,
            ListItem,
            Blockquote.configure({
                HTMLAttributes: {
                    class: "text-gray-700 italic border-l-4 pl-4 border-gray-400 bg-gray-100 py-2 px-4 rounded-md"
                },
            }),
            Link.configure({ openOnClick: false, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } }),
            Subscript,
            Superscript,
        ],
        editorProps: {
            attributes: {
                class: "prose max-w-7xl min-h-[400px] p-6 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 text-xl leading-relaxed",
                spellcheck: "false",
            },
        },
        onUpdate: ({ editor }) => {
            let content = editor.getHTML();
            onChange(content);
        },
        content: content,
        immediatelyRender: true,
    });
    useEffect(() => {
        if (!isFullscreen && editor) {
            setTimeout(() => editor.commands.focus(), 50);
        }
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || "");
        }
    }, [isFullscreen, editor, content]);


    if (!editor) return null;

    const editorContent = (
        <>
            <div className="flex gap-2 mb-2 flex-wrap">
                <ToolbarGroup editor={editor} tools={undoRedoTools} />
                <ToolbarGroup editor={editor} tools={displayTools} />
                <ToolbarGroup editor={editor} tools={formattingTools} />
                <ToolbarGroup editor={editor} tools={tableTools} />
                <ToolbarGroup editor={editor} tools={alignmentTools} />
                <ToolbarGroup editor={editor} tools={insertTools} />
            </div>
            <EditorContent editor={editor} className="border p-2 rounded min-h-[200px]" />
        </>
    );
    return (
        <>
            <div className="border p-4 rounded-lg relative">
                {editorContent}
            </div>
            {isFullscreen && (
                <div className="fixed inset-0 bg-white z-50 flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                        <span className="font-semibold">Fullscreen Editor</span>
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="p-2 hover:bg-gray-200 rounded-md"
                        >
                            <Minimize className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1 p-4 overflow-auto">
                        {editorContent}
                    </div>
                </div>
            )}
        </>
    );
};

export default TiptapEditor;
