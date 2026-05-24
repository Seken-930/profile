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




















import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Bold, Italic, Link as LinkIcon, List, Search } from "lucide-react";

export default function PostCreatePage() {
    const navigate = useNavigate();

// フォームのステート
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

// タグのステート
    const [categoryTags, setCategoryTags] = useState(["React", "Node.js", "Teamwork", "UXDesign"]);
    const [newCategory, setNewCategory] = useState("");

    const [skillTags, setSkillTags] = useState(["Leadership", "Innovation", "ProblemSolver"]);
    const [newSkill, setNewSkill] = useState("");

// マークダウンをHTMLに変換する簡易パーサー（ダークモード対応復活）
    const parseMarkdown = (text: string) => {
        if (!text) return 'ここにプレビューが表示されます...';

        let parsed = text
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-simplex-text dark:text-white mt-4 mb-3">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-simplex-text dark:text-white mt-6 mb-2">$1</h2>')
            .replace(/^\- (.*$)/gim, '<li class="text-sm text-slate-700 dark:text-slate-300 ml-6 list-disc mb-1">$1</li>')
            .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold dark:text-white">$1</strong>')
            .replace(/\*(.*)\*/gim, '<em class="italic dark:text-slate-300">$1</em>')
            .replace(/```([\s\S]*?)```/gim, '<pre class="bg-slate-100 dark:bg-slate-800/80 p-4 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 my-4 overflow-x-auto">$1</pre>')
            .replace(/`(.*)`/gim, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-rose-500 dark:text-rose-400 font-mono text-sm">$1</code>')
            .replace(/\n/g, '<br/>');

        return `<div class="space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">${parsed}</div>`;


    };

// タグ追加処理
    const addCategoryTag = () => {
        if (newCategory.trim() && !categoryTags.includes(newCategory.trim())) {
            setCategoryTags([...categoryTags, newCategory.trim()]);
            setNewCategory("");
        }
    };

    const addSkillTag = () => {
        if (newSkill.trim() && !skillTags.includes(newSkill.trim())) {
            setSkillTags([...skillTags, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const handlePublish = () => {
        if (!title || !content) {
            alert("タイトルと本文を入力してください。");
            return;
        }
        alert("投稿しました！");
        navigate("/");
    };

    return (


        {/* 部パンくずリスト */}
    <div className="mb-4">
    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
      ホーム {'>'} 投稿管理 {'>'} <span className="text-simplex-green dark:text-emerald-400 font-bold">[新規投稿]</span>
    </span>
    </div>

    {/* ヘッダーエリア */}
    <div className="bg-simplex-headerBg dark:bg-slate-900 rounded-3xl p-8 relative overflow-hidden border border-simplex-border/50 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-6 transition-colors">

        {/* 背景の装飾イメージ（街並み） */}
        <div className="absolute right-0 bottom-0 w-2/3 h-full opacity-40 dark:opacity-20 pointer-events-none text-simplex-border dark:text-slate-700">
            <svg className="w-full h-full object-cover object-right-bottom" preserveAspectRatio="xMaxYMax meet" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 200H800V150C700 150 650 120 550 120C450 120 400 160 300 160C200 160 150 130 50 130C30 130 15 140 0 150V200Z" fill="currentColor" opacity="0.3"/>
                <rect x="350" y="80" width="40" height="70" rx="2" fill="currentColor" opacity="0.5"/>
                <rect x="420" y="40" width="50" height="110" rx="2" fill="currentColor" opacity="0.4"/>
                <rect x="490" y="90" width="35" height="60" rx="2" fill="currentColor" opacity="0.6"/>
                <rect x="600" y="60" width="45" height="90" rx="2" fill="currentColor" opacity="0.5"/>
                <rect x="680" y="30" width="60" height="120" rx="2" fill="currentColor" opacity="0.4"/>
                <circle cx="280" cy="110" r="25" fill="currentColor" opacity="0.5"/>
                <circle cx="560" cy="120" r="20" fill="currentColor" opacity="0.5"/>
            </svg>
        </div>

        <div className="relative z-10 space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight dark:text-white">
                投稿管理の作成
            </h1>
        </div>

        {/* 検索ボックスダミー */}
        <div className="z-10 w-full md:w-64 relative shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
                type="text"
                placeholder="ブログ内を検索"
                className="block w-full pl-9 pr-3 py-2 border border-simplex-border dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-950 placeholder-slate-400 focus:outline-none dark:text-white sm:text-sm transition-colors"
            />
        </div>
    </div>

    {/* メインエディタカード */}
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-simplex-border dark:border-slate-800 shadow-sm p-8 lg:p-12 transition-colors">

        {/* 📝 タイトル入力 */}
        <div className="mb-10">
            <label className="block text-xl font-extrabold mb-4 dark:text-white">タイトル</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="投稿のタイトルを入力してください..."
                className="w-full px-4 py-3 text-base border border-simplex-border dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-simplex-green/50 placeholder-slate-400 shadow-sm transition-colors"
            />
        </div>

        {/* タグ入力エリア */}
        <div className="space-y-6 mb-12">
            {/* カテゴリータグ */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <label className="font-bold text-simplex-green dark:text-emerald-400 w-32 shrink-0">カテゴリータグ</label>
                <div className="flex flex-wrap items-center gap-2 flex-1">
                    {categoryTags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-simplex-light dark:bg-emerald-900/30 text-simplex-green dark:text-emerald-400 text-xs font-bold rounded-md">
              #{tag}
            </span>
                    ))}
                    <div className="flex items-center gap-2 ml-auto lg:ml-0 mt-2 lg:mt-0">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="タグ"
                            className="w-32 px-3 py-1.5 text-sm border border-simplex-border dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 transition-colors"
                            onKeyDown={(e) => e.key === 'Enter' && addCategoryTag()}
                        />
                        <button onClick={addCategoryTag} className="px-3 py-1.5 bg-simplex-light dark:bg-slate-800 border border-simplex-green dark:border-emerald-500/50 text-simplex-green dark:text-emerald-400 text-sm font-bold rounded-lg hover:bg-simplex-green dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-colors">
                            追加
                        </button>
                    </div>
                </div>
            </div>

            {/* スキルタグ */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <label className="font-bold text-simplex-accentText dark:text-orange-400 w-32 shrink-0">スキルタグ</label>
                <div className="flex flex-wrap items-center gap-2 flex-1">
                    {skillTags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800/50 text-orange-700 dark:text-orange-400 text-xs font-bold rounded-md">
              #{tag}
            </span>
                    ))}
                    <div className="flex items-center gap-2 ml-auto lg:ml-0 mt-2 lg:mt-0">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="タグ"
                            className="w-32 px-3 py-1.5 text-sm border border-simplex-border dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
                            onKeyDown={(e) => e.key === 'Enter' && addSkillTag()}
                        />
                        <button onClick={addSkillTag} className="px-3 py-1.5 bg-orange-50 dark:bg-slate-800 border border-orange-300 dark:border-orange-500/50 text-orange-700 dark:text-orange-400 text-sm font-bold rounded-lg hover:bg-orange-500 dark:hover:bg-orange-600 hover:text-white dark:hover:text-white transition-colors">
                            追加
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 本文 ＆ プレビュー エリア */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

            {/* 左：マークダウン入力 */}
            <div className="flex flex-col">
                <label className="block text-xl font-extrabold mb-4 dark:text-white">本文</label>
                <div className="flex flex-col border border-simplex-border dark:border-slate-700 rounded-xl overflow-hidden shadow-sm h-[400px]">
                    {/* ツールバー */}
                    <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-simplex-border dark:border-slate-700">
                        <button className="text-slate-600 dark:text-slate-400 hover:text-simplex-green dark:hover:text-emerald-400 transition-colors"><Bold className="w-5 h-5" /></button>
                        <button className="text-slate-600 dark:text-slate-400 hover:text-simplex-green dark:hover:text-emerald-400 transition-colors"><Italic className="w-5 h-5" /></button>
                        <button className="text-slate-600 dark:text-slate-400 hover:text-simplex-green dark:hover:text-emerald-400 transition-colors"><LinkIcon className="w-5 h-5" /></button>
                        <button className="text-slate-600 dark:text-slate-400 hover:text-simplex-green dark:hover:text-emerald-400 transition-colors"><List className="w-5 h-5" /></button>
                    </div>
                    {/* テキストエリア */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="ここに記事の本文を記述してください。Markdownに対応しています。画像をドラッグ＆ドロップで追加できます。"
                        className="w-full flex-1 p-4 text-sm font-mono focus:outline-none resize-none leading-relaxed text-slate-700 dark:text-slate-300 bg-transparent"
                    />
                </div>
            </div>

            {/* 右：プレビュー */}
            <div className="flex flex-col">
                <label className="block text-xl font-extrabold mb-4 dark:text-white">プレビュー</label>
                <div className="border border-simplex-border dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950/50 overflow-y-auto shadow-inner h-[400px] p-6 transition-colors">
                    <div
                        className="preview-content"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
                    />
                </div>
            </div>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button className="px-6 py-2.5 bg-simplex-light dark:bg-slate-800 border border-simplex-green dark:border-emerald-500/50 text-simplex-green dark:text-emerald-400 text-sm font-bold rounded-lg hover:bg-simplex-green dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-colors shadow-sm">
                下書き保存
            </button>
            <button
                onClick={handlePublish}
                className="px-8 py-2.5 bg-simplex-yellow hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
            >
                投稿する
            </button>
        </div>

    </div>
</div>


);
}