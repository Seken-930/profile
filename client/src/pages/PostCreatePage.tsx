import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Edit3, Eye } from "lucide-react";

export default function PostCreatePage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [activeTag, setActiveTag] = useState("Frontend");

    const tags = ["UI/UX", "Frontend", "Management", "Database"];

    // 超簡易的なMarkdownパーサー（実務では react-markdown などのライブラリを推奨します）
    const parseMarkdown = (text: string) => {
        if (!text) return '<span class="text-slate-400 dark:text-slate-600 italic">ここにプレビューが表示されます...</span>';

        let parsed = text
            .replace(/^### (.*$)/gim, '<h3 class="text-sm font-extrabold text-slate-900 dark:text-white mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-6 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-lg font-black text-slate-900 dark:text-white mt-8 mb-4">$1</h1>')
            .replace(/^\- (.*$)/gim, '<li class="text-xs text-slate-700 dark:text-slate-300 ml-4 list-disc mb-1">$1</li>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/`(.*)`/gim, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-red-500 dark:text-red-400 font-mono text-[10px]">$1</code>')
            .replace(/\n/g, '<br/>');

        return `<div class="space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">${parsed}</div>`;
    };

    const handlePublish = () => {
        if (!title || !content) {
            alert("タイトルと本文を入力してください。");
            return;
        }
        alert("投稿しました！");
        navigate("/"); // ホームへ戻る
    };

    return (
        <div className="pb-20">
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 px-8 py-4 glass-panel">
                <div className="max-w-6xl mx-auto">
                    <span className="text-[10px] font-bold tracking-widest text-brand-500 uppercase">Write & Preview</span>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">知見エディタ</h2>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-8 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">

                    {/* 左カラム：エディタ */}
                    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" />エディタ
              </span>
                            <span className="text-[10px] text-brand-500 font-bold bg-brand-500/10 px-2 py-0.5 rounded">Markdown対応</span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col gap-4 overflow-y-auto">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">タイトル</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="タイトルを入力..."
                                    className="w-full px-3 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">カテゴリ・タグ</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {tags.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => setActiveTag(tag)}
                                            className={`text-[10px] font-bold py-1.5 px-2.5 border rounded-md transition-all duration-200 ${
                                                activeTag === tag
                                                    ? "bg-brand-500 text-white border-brand-500"
                                                    : "border-slate-200 dark:border-slate-800 text-slate-500 hover:border-brand-500"
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">本文</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="## 概要&#10;ここにMarkdownで本文を書いてみてください..."
                                    className="w-full flex-1 p-3 text-xs font-mono border border-slate-200 dark:border-slate-800 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 dark:text-white resize-none leading-relaxed"
                                />
                            </div>
                        </div>
                        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200/50 flex items-center justify-end gap-2 shrink-0">
                            <button onClick={() => navigate(-1)} className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-500 text-xs font-semibold rounded-lg transition-colors">キャンセル</button>
                            <button onClick={handlePublish} className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm">公開する</button>
                        </div>
                    </div>

                    {/* 右カラム：ライブプレビュー */}
                    <div className="flex flex-col h-full bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200/50 rounded-xl overflow-hidden">
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/50 flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />ライブプレビュー
              </span>
                        </div>
                        <div
                            className="p-6 flex-1 overflow-y-auto bg-white dark:bg-slate-950/40 text-xs"
                            dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}