import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search, ChevronRight, Compass } from "lucide-react";
import dummyUsers from "../data/dummyUsers.json";
import dummyPosts from "../data/dummyPosts.json";

export default function HomePage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = dummyPosts.filter((post) => {
        const q = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(q) || post.tags.some(t => t.toLowerCase().includes(q));
    });

    return (
        <div className="pb-20">
            <div className="sticky top-0 z-10 bg-simplex-bg/80 border-b border-slate-200/60 px-8 py-4 glass-panel">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-simplex-green uppercase">Knowledge Base</span>
                        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">ホームフィード</h2>
                    </div>
                    <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="知見、キーワード、タグを検索..."
                            className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/20 focus:border-simplex-green text-xs text-simplex-text transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 mt-6 space-y-8">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">最新の共有知見</h3>
                        {searchQuery && (
                            <span className="text-[10px] font-semibold text-simplex-green bg-simplex-light px-2 py-0.5 rounded-full">
                {filteredPosts.length}件一致
              </span>
                        )}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => {
                                const author = dummyUsers.find((u) => u.id === post.authorId);
                                return (
                                    <div
                                        key={post.id}
                                        onClick={() => navigate(`/post/${post.id}`)}
                                        className="group flex items-center justify-between p-4 hover:bg-simplex-bg/50 cursor-pointer transition-all duration-200 relative overflow-hidden"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-simplex-green scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-200"></div>

                                        <div className="flex items-center gap-4 min-w-0 flex-1 pl-2">
                                            <div className="text-xs font-bold text-slate-900 truncate flex-1 group-hover:text-simplex-green transition-colors">
                                                {post.title}
                                            </div>
                                            <div className="flex items-center gap-2.5 w-40 shrink-0 pl-4 border-l border-slate-100 hidden md:flex">
                                                <div className="w-7 h-7 rounded-full bg-slate-100 overflow-hidden shadow-inner flex items-center justify-center">
                                                    {author ? <img src={author.avatar_url} alt="icon" className="w-full h-full object-cover" /> : "👤"}
                                                </div>
                                                <span className="text-xs font-bold text-slate-700 truncate">{author?.name}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 shrink-0 pl-4">
                                            <div className="flex gap-1 hidden md:flex w-44 justify-end overflow-hidden">
                                                {post.tags.map(tag => (
                                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-simplex-light text-simplex-green border border-simplex-green/10">
                            {tag}
                          </span>
                                                ))}
                                            </div>
                                            <div className="text-[10px] font-mono text-slate-400 w-20 text-right">{post.date}</div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-simplex-green transition-colors" />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-12 text-center text-slate-400">
                                <Compass className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                <p className="text-xs font-semibold">該当する知見が見つかりませんでした</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}