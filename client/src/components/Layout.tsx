import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import { Home, Users, User, FileText, Plus, LogOut, Moon, Sun, ChevronsUpDown } from "lucide-react";
import dummyUsers from "../data/dummyUsers.json";

export default function AppLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDark, setIsDark] = useState(false);

    const currentUser = dummyUsers[0];

    // ダークモードの切り替え
    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
    };

    const navItems = [
        { id: "home", label: "ホーム", icon: Home, path: "/" },
        { id: "users", label: "ユーザー一覧", icon: Users, path: "/users" },
        { id: "profile", label: "プロフィール", icon: User, path: "/profile" },
        { id: "post-list", label: "投稿一覧", icon: FileText, path: "/posts" },
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans h-screen overflow-hidden flex transition-colors duration-300">

            {/* サイドバー（グラスモフィズム適用） */}
            <aside className="w-64 border-r border-slate-200/50 dark:border-slate-800/50 flex flex-col h-full shrink-0 z-20 glass-panel">

                {/* ロゴエリア */}
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-lg font-extrabold tracking-tight flex items-center gap-2 bg-gradient-to-r from-brand-500 to-pink-500 bg-clip-text text-transparent">
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-pink-500 flex items-center justify-center text-white text-xs shadow-md shadow-brand-500/20">I</span>
                        InsightHub
                    </h1>
                    <button onClick={toggleTheme} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>

                {/* ナビゲーションメニュー */}
                <nav className="flex-1 px-4 py-2 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? "text-brand-500" : ""}`} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* 下部アクション */}
                <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
                    <button onClick={() => navigate('/posts/create')} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm shadow-brand-500/10 hover:shadow-glow-violet">
                        <Plus className="w-4 h-4" />
                        <span>投稿する</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-slate-500 hover:text-red-500 dark:text-slate-400 hover:bg-red-50/10 rounded-lg text-xs font-semibold transition-all">
                        <LogOut className="w-4 h-4" />
                        <span>ログアウト</span>
                    </button>
                </div>

                {/* カレントユーザーのミニプロフィール */}
                <div onClick={() => navigate('/profile')} className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center gap-3 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
                        <img src={currentUser.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{currentUser.depatment} / {currentUser.position}</p>
                    </div>
                    <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
            </aside>

            {/* メインコンテンツ領域 */}
            <main className="flex-1 h-full overflow-y-auto relative bg-slate-50/50 dark:bg-slate-950/20 pb-20">
                <Outlet />
            </main>

        </div>
    );
}