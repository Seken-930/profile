import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, UserCircle, ArrowRight, MessageSquare } from "lucide-react";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20 text-simplex-text dark:text-slate-200 transition-colors duration-300">

            {/*上部：ヒーローセクション（アプリの説明） */}
            <div className="bg-simplex-headerBg dark:bg-slate-900 rounded-[3rem] p-16 md:p-24 relative overflow-hidden border border-simplex-border dark:border-slate-800 shadow-sm text-center transition-colors">

                {/* 背景装飾 */}
                <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none flex justify-center items-center">
                    <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="150" fill="#2A7A56" />
                        <circle cx="700" cy="300" r="200" fill="#F4B728" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-simplex-green dark:bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg transform -rotate-3 transition-colors">
                        <MessageSquare className="w-10 h-10 fill-white/20" />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 transition-colors">
                        Simplex Blog
                    </h1>

                    <p className="text-base md:text-lg text-simplex-text dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-bold transition-colors">
                        社内の知見を共有し、コミュニケーションを活性化するプラットフォーム。<br className="hidden md:block" />
                        日々の気づきや技術的な学びを記録し、みんなで成長を分かち合いましょう。
                    </p>
                </div>
            </div>

            {/* 下部：ナビゲーションカード（2カラム） */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

                {/* 左側：投稿一覧へ促すカード */}
                <div
                    onClick={() => navigate("/posts")}
                    className="group bg-white dark:bg-slate-900 border border-simplex-border dark:border-slate-800 rounded-3xl p-10 cursor-pointer hover:border-simplex-green dark:hover:border-emerald-500 hover:shadow-lg transition-all relative overflow-hidden flex flex-col h-full"
                >
                    {/* 背景の透かしアイコン */}
                    <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <BookOpen className="w-64 h-64 text-simplex-green dark:text-emerald-500" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 bg-simplex-light dark:bg-emerald-900/30 text-simplex-green dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                            <BookOpen className="w-7 h-7" />
                        </div>

                        <h2 className="text-2xl font-extrabold mb-4 text-slate-900 dark:text-white group-hover:text-simplex-green dark:group-hover:text-emerald-400 transition-colors">
                            みんなの知見を探す
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed flex-1">
                            最新の投稿や気になるタグから、社内のアイデアや技術情報に触れてみましょう。新しい発見がきっとあります。
                        </p>

                        <div className="flex items-center text-sm font-extrabold text-simplex-green dark:text-emerald-400 gap-2 group-hover:translate-x-2 transition-transform mt-auto">
                            投稿一覧を見る <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* 右側：プロフィール作成へ促すカード */}
                <div
                    onClick={() => navigate("/profile")}
                    className="group bg-white dark:bg-slate-900 border border-simplex-border dark:border-slate-800 rounded-3xl p-10 cursor-pointer hover:border-simplex-yellow dark:hover:border-yellow-500 hover:shadow-lg transition-all relative overflow-hidden flex flex-col h-full"
                >
                    {/* 背景の透かしアイコン */}
                    <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <UserCircle className="w-64 h-64 text-simplex-yellow dark:text-yellow-500" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-14 h-14 bg-orange-50 dark:bg-yellow-900/20 text-simplex-yellow dark:text-yellow-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                            <UserCircle className="w-7 h-7" />
                        </div>

                        <h2 className="text-2xl font-extrabold mb-4 text-slate-900 dark:text-white group-hover:text-simplex-yellow dark:group-hover:text-yellow-400 transition-colors">
                            自分を知ってもらう
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed flex-1">
                            プロフィールを充実させて、得意なスキルや今後やりたいことをアピールしましょう。同じ興味を持つ仲間が見つかります。
                        </p>

                        <div className="flex items-center text-sm font-extrabold text-simplex-yellow dark:text-yellow-500 gap-2 group-hover:translate-x-2 transition-transform mt-auto">
                            プロフィールを編集する <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}