import React, { useState } from "react";
import { Search, MessageSquare, Heart, Edit, FileText, ChevronDown } from "lucide-react";

// 🚀 外部のダミーデータJSONを読み込みます
import dummyUsers from "../data/dummyUsers.json";
import dummyPosts from "../data/dummyPosts.json";

export default function PostList() {
    const [searchQuery, setSearchQuery] = useState("");

    // JSONデータを安全に型付け
    const posts = dummyPosts as any[];
    const users = dummyUsers as any[];

    // 🔍 検索キーワードで投稿を絞り込む処理
    const filteredPosts = posts.filter((post) => {
        const titleMatch = (post.title || "").toLowerCase().includes(searchQuery.toLowerCase());
        return titleMatch; // 必要に応じてタグ検索などもここに追加できます
    });

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20 text-simplex-text">

            {/* 📌 上部パンくずリスト */}
            <div className="mb-4">
        <span className="text-sm text-slate-500 font-medium">
          ホーム {'>'} 社内のひと {'>'} <span className="text-simplex-green font-bold">投稿一覧</span>
        </span>
            </div>

            {/* 📌 ヘッダーエリア（検索窓 ＋ カテゴリー/タグ絞り込み ＋ 街並みイラスト） */}
            <div className="bg-simplex-headerBg rounded-3xl p-8 relative overflow-hidden border border-simplex-border/50 shadow-sm">

                {/* 背景の装飾イメージ（街並みのアートワークを右下に配置） */}
                <div className="absolute right-0 bottom-0 w-2/3 h-full opacity-40 pointer-events-none text-simplex-border">
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

                <div className="relative z-10 space-y-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3">
                        <FileText className="w-8 h-8 text-simplex-green" /> すべての投稿
                    </h1>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* 検索ボックス */}
                        <div className="w-full md:w-80 relative shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="投稿を検索"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2.5 border border-simplex-border rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-simplex-green/50 sm:text-sm transition-all"
                            />
                        </div>

                        {/* カテゴリー・タグ絞り込みのダミーUI */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-500 mb-1">カテゴリー</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 bg-white border border-simplex-border rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm">仕事の工夫 <ChevronDown className="w-4 h-4 opacity-50"/></button>
                                    <button className="px-3 py-1.5 bg-white border border-simplex-border rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm">暮らし・地域 <ChevronDown className="w-4 h-4 opacity-50"/></button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-500 mb-1">タグ</span>
                                <button className="px-3 py-1.5 bg-white border border-simplex-border rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm">開発・技術 <ChevronDown className="w-4 h-4 opacity-50"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 📌 投稿リスト一覧 */}
            <div className="bg-white rounded-3xl border border-simplex-border shadow-sm overflow-hidden pt-2">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => {
                        // 投稿に紐づくユーザー情報を取得
                        const author = users.find((u: any) => u.hrid === post.authorId) || {
                            familyName: "名無し",
                            givenName: "",
                            department: "部署未設定",
                            position: ""
                        };

                        // タグリストの取得
                        const tagList = post.postTag || post.tags || [];

                        return (
                            <div
                                key={post.id || index}
                                className="p-6 border-b border-slate-100 last:border-b-0 hover:bg-simplex-bg/50 transition-colors group cursor-pointer flex flex-col lg:flex-row gap-6 lg:items-center"
                            >

                                {/* 1. 左側：投稿者情報（アイコン・氏名） */}
                                <div className="flex items-center gap-4 w-full lg:w-64 shrink-0">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0 bg-simplex-light text-simplex-green">
                                        {author.familyName ? author.familyName[0] : "U"}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-base font-extrabold truncate">
                                            {author.familyName} {author.givenName}
                                        </h3>
                                        <div className="text-xs font-medium text-slate-500 truncate mt-0.5">
                                            {author.department} {author.position ? `| ${author.position}` : ""}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. 中央：タイトル・タグ・スニペット */}
                                <div className="flex-1 min-w-0 flex flex-col gap-2">
                                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                                        {/* タイトル（最重要・最大サイズ） */}
                                        <h2 className="text-lg font-extrabold group-hover:text-simplex-green transition-colors leading-tight">
                                            {post.title || "無題の投稿"}
                                        </h2>

                                        {/* ジャンルタグ（バッジ型） */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {tagList.map((tag: any, idx: number) => {
                                                const tagName = typeof tag === "string" ? tag : tag.name;
                                                return (
                                                    <span key={idx} className="px-2 py-0.5 bg-simplex-headerBg border border-simplex-border text-simplex-text text-[11px] font-bold rounded-md whitespace-nowrap">
                            #{tagName}
                          </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* 本文スニペット（line-clamp-2 で強制的に2行以内に収める） */}
                                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                                        {post.content || "人が認知したくないUIを考えるのが好きです。子育てをとおして感じるのは、シンプルで直感的な操作がどれほど重要か。この記事ではそのエピソードをご紹介します。"}
                                    </p>
                                </div>

                                {/* 3. 右側：メタ情報（日付・いいね・コメント） */}
                                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center w-full lg:w-48 shrink-0 gap-3 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0 mt-2 lg:mt-0">
                                    <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                        <Edit className="w-3.5 h-3.5" />
                                        <span>{post.date || "2026/05/20"}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-500 font-bold text-sm">
                                        <div className="flex items-center gap-1.5 hover:text-simplex-green transition-colors">
                                            <MessageSquare className="w-4 h-4" /> 14
                                        </div>
                                        <div className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                                            <Heart className="w-4 h-4" /> 98
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })
                ) : (
                    <div className="py-20 text-center text-slate-500">
                        <p className="font-bold">投稿が見つかりませんでした。</p>
                    </div>
                )}

                {/* 📌 さらに読み込むボタン */}
                {filteredPosts.length > 0 && (
                    <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                        <button className="text-sm font-bold text-slate-500 hover:text-simplex-green transition-colors">
                            すべてを表示 {'>'}
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}