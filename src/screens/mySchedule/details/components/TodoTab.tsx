import { useEffect, useReducer, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Minus,
    Undo,
    Redo,
} from 'lucide-react';
import styles from './css/TodoTab.module.css';

interface TodoTabProps {
    initialContent?: string;
    onSave?: (content: string) => Promise<void> | void;
}

function TodoTab({ initialContent = '', onSave }: TodoTabProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: initialContent,
    });

    const [saving, setSaving] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        if (!editor) return;
        editor.on('transaction', forceUpdate);
        return () => {
            editor.off('transaction', forceUpdate);
        };
    }, [editor]);

    if (!editor) return null;

    const chain = () => editor.chain().focus();

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave?.(editor.getHTML());
        } finally {
            setSaving(false);
        }
    };

    const tools = [
        { key: 'h1', icon: Heading1, label: '제목 1', run: () => chain().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
        { key: 'h2', icon: Heading2, label: '제목 2', run: () => chain().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
        { key: 'h3', icon: Heading3, label: '제목 3', run: () => chain().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }) },
        { key: 'bold', icon: Bold, label: '굵게', run: () => chain().toggleBold().run(), active: editor.isActive('bold') },
        { key: 'italic', icon: Italic, label: '기울임', run: () => chain().toggleItalic().run(), active: editor.isActive('italic') },
        { key: 'strike', icon: Strikethrough, label: '취소선', run: () => chain().toggleStrike().run(), active: editor.isActive('strike') },
        { key: 'bullet', icon: List, label: '목록', run: () => chain().toggleBulletList().run(), active: editor.isActive('bulletList') },
        { key: 'ordered', icon: ListOrdered, label: '번호 목록', run: () => chain().toggleOrderedList().run(), active: editor.isActive('orderedList') },
        { key: 'quote', icon: Quote, label: '인용', run: () => chain().toggleBlockquote().run(), active: editor.isActive('blockquote') },
        { key: 'code', icon: Code, label: '코드 블록', run: () => chain().toggleCodeBlock().run(), active: editor.isActive('codeBlock') },
        { key: 'hr', icon: Minus, label: '구분선', run: () => chain().setHorizontalRule().run(), active: false },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.toolbar}>
                {tools.map((t) => {
                    const Icon = t.icon;
                    return (
                        <button
                            key={t.key}
                            type="button"
                            title={t.label}
                            aria-label={t.label}
                            onClick={t.run}
                            className={`${styles.toolBtn} ${t.active ? styles.toolBtnActive : ''}`}
                        >
                            <Icon className={styles.toolIcon} />
                        </button>
                    );
                })}

                <span className={styles.divider} />

                <button
                    type="button"
                    title="실행 취소"
                    aria-label="실행 취소"
                    onClick={() => chain().undo().run()}
                    disabled={!editor.can().undo()}
                    className={styles.toolBtn}
                >
                    <Undo className={styles.toolIcon} />
                </button>
                <button
                    type="button"
                    title="다시 실행"
                    aria-label="다시 실행"
                    onClick={() => chain().redo().run()}
                    disabled={!editor.can().redo()}
                    className={styles.toolBtn}
                >
                    <Redo className={styles.toolIcon} />
                </button>
            </div>

            <EditorContent editor={editor} className={styles.editor} />

            {onSave && (
                <div className="flex justify-end mt-3">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="px-5 py-2.5 rounded-2xl bg-[#ff7a00] text-white text-sm font-bold shadow-sm active:scale-[0.98] disabled:opacity-60"
                    >
                        {saving ? '저장 중...' : '저장'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default TodoTab;
