import React from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Heart } from "lucide-react";
import dummyPosts from "../data/dummyPosts.json";

export default function PostListPage() {
    const navigate = useNavigate();

    return (
        <div className="pb-20">
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 px-8 py-4 glass-panel">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-brand-500 uppercase">Archive</span>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">全知見アーカイブ</h2>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 mt-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
                    {dummyPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => navigate(`/post/${post.id}`)}
                            className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-colors flex items-center justify-between group relative"
                        >
                            <div className="flex-1 min-w-0 pr-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{post.date}</span>
                                    <div className="flex gap-1">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-500 border border-brand-500/20">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5 group-hover:text-brand-500 truncate transition-colors">{post.title}</h3>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                                <div className="flex items-center gap-1 text-[10px] text-slate-400 w-12 justify-end">
                                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                                    <span>{post.likes}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}