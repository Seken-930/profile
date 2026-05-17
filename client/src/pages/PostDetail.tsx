import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Heart, Calendar } from "lucide-react";
import dummyUsers from "../data/dummyUsers.json";
import dummyPosts from "../data/dummyPosts.json";

export default function PostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const post = dummyPosts.find((p) => p.id === id);
    const author = dummyUsers.find((u) => u.id === post?.authorId);

    // いいね機能のState（本来はDBと通信します）
    const [likes, setLikes] = useState(post?.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    if (!post || !author) return <div className="p-10 text-center text-slate-500">記事が見つかりません</div>;

    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    // 簡易Markdownパーサー
    const parseMarkdown = (text: string) => {
        let parsed = text
            .replace(/^### (.*$)/gim, '<h3 class="text-sm font-extrabold text-slate-900 dark:text-white mt-5 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-8 mb-4 border-b border-slate-200 dark:border-slate-800 pb-1.5">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-lg font-black text-slate-900 dark:text-white mt-10 mb-6">$1</h1>')
            .replace(/^\- (.*$)/gim, '<li class="text-xs text-slate-700 dark:text-slate-300 ml-4 list-disc mb-1">$1</li>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/`(.*)`/gim, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-red-500 dark:text-red-400 font-mono text-[10px]">$1</code>')
            .replace(/\n/g, '<br/>');
        return parsed;
    };

    return (
        <div className="pb-20 relative">
            {/* 上部固定アクションバー */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 px-8 py-3.5 glass-panel flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-colors flex items-center gap-1 text-xs font-semibold">
                    <ArrowLeft className="w-4 h-4" />
                    <span>戻る</span>
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleLike}
                        className={`px-3 py-1.5 border hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm ${
                            isLiked ? "border-red-200 bg-red-50 text-red-600 dark:bg-red-900/20" : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                    >
                        <Heart className={`w-4 h-4 transition-transform ${isLiked ? "fill-red-500 text-red-500 scale-110" : "text-slate-500"}`} />
                        <span>{likes}</span>
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-8 mt-6">
                <article className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 p-8 md:p-10 rounded-2xl shadow-sm">
                    <header className="mb-8 border-b border-slate-100 dark:border-slate-800/60 pb-6">
                        <div className="flex gap-1.5 mb-4">
                            {post.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-500 border border-brand-500/20">
                  {tag}
                </span>
                            ))}
                        </div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight mb-6">{post.title}</h1>

                        <div className="flex items-center justify-between">
                            <div onClick={() => navigate(`/user/${author.id}`)} className="flex items-center gap-3 cursor-pointer p-1.5 -ml-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-flex">
                                <div className="w-8 h-8 rounded-full overflow-hidden shadow-inner bg-slate-100">
                                    <img src={author.avatar_url} alt={author.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{author.name}</h4>
                                    <p className="text-[10px] text-slate-400 font-medium">{author.depatment} / {author.position}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />{post.date}
              </span>
                        </div>
                    </header>

                    <div
                        className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                    />
                </article>
            </div>
        </div>
    );
}