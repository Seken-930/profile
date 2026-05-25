import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Home, List, Tag, Users, Bell, Edit3, Search, User, LogOut, MessageSquare, Moon, Sun } from "lucide-react";
// ※パスは環境に合わせて適宜変更してください
import dummyUsers from "../data/dummyUsers.json";

export default function AppLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDark, setIsDark] = useState(false);

    // ダミーデータの取得（エラー回避のためフォールバックを用意）
    const currentUser = dummyUsers[0] || {
        familyName: "ユーザー",
        givenName: "",
        department: "部署未設定",
        avatar_url: ""
    };

    // ダークモードの切り替え
    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
    };

    // 📝 画像に合わせたナビゲーションメニュー
    const navItems = [
        { id: "home", label: "ホーム", icon: Home, path: "/" },
        { id: "posts", label: "ブログ一覧", icon: List, path: "/posts" },
        { id: "tags", label: "カテゴリー", icon: Tag, path: "/tags" },
        { id: "users", label: "社内のひと", icon: Users, path: "/users" },
        { id: "notifications", label: "お知らせ", icon: Bell, path: "/notifications" },
    ];

    return (
        <div className="flex h-screen bg-simplex-bg dark:bg-slate-950 text-simplex-text dark:text-slate-200 font-sans overflow-hidden transition-colors duration-300">

            {/* 📌 サイドバー */}
            <aside className="w-64 bg-simplex-green dark:bg-emerald-950 text-white flex flex-col h-full shrink-0 z-20 rounded-r-3xl shadow-xl relative transition-colors duration-300">

                {/* ロゴ & ダークモードトグル */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MessageSquare className="w-7 h-7 text-white fill-white" />
                        <h1 className="text-xl font-extrabold tracking-tight">Simplex Blog</h1>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        title="テーマ切り替え"
                    >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                </div>

                {/* ナビゲーション */}
                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.id === 'users' && location.pathname.includes('user'));
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                                    isActive ? "bg-white/20 font-bold" : "hover:bg-white/10 text-white/80 hover:text-white"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}

                    <div className="pt-6 pb-2">
                        <button onClick={() => navigate('/posts/create')} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-simplex-yellow hover:bg-yellow-500 text-slate-900 text-sm font-bold rounded-xl transition-all shadow-md">
                            <Edit3 className="w-4 h-4" />
                            <span>ブログを書く</span>
                        </button>
                    </div>
                </nav>

                {/* 下部プロフィール＆アクション */}
                <div className="p-5 mt-auto">

                    {/* ユーザー情報（表示のみ） */}
                    <div className="flex items-center gap-3 px-1 mb-5">
                        <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden">
                            {currentUser.avatar_url ? (
                                <img src={currentUser.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                                currentUser.familyName ? currentUser.familyName[0] : "U"
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-white truncate">{currentUser.familyName} {currentUser.givenName}</p>
                            <p className="text-xs text-white/70 truncate">{currentUser.department}</p>
                        </div>
                    </div>

                    {/* 💡 角丸のプロフィール＆ログアウトブロック */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-lg transition-colors">
                        <button
                            onClick={() => navigate('/profile')}
                            className="flex items-center gap-3 px-5 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 w-full text-left"
                        >
                            <User className="w-4.5 h-4.5 text-slate-400 dark:text-slate-400" />
                            プロフィール
                        </button>
                        <button
                            onClick={() => alert('ログアウト処理')}
                            className="flex items-center gap-3 px-5 py-3.5 text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors w-full text-left"
                        >
                            <LogOut className="w-4.5 h-4.5 text-rose-400 dark:text-rose-500" />
                            ログアウト
                        </button>
                    </div>
                </div>
            </aside>

            {/* 📌 メインコンテンツ（ヘッダーとOutlet） */}
            <main className="flex-1 h-full flex flex-col relative overflow-hidden">

                {/* トップヘッダー */}
                <header className="h-16 px-8 flex items-center justify-between shrink-0 border-b border-simplex-border/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 transition-colors">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Home className="w-4 h-4 text-simplex-green dark:text-emerald-500" />
                        <span>ホーム</span> <span className="text-slate-300 dark:text-slate-600">&gt;</span>
                        <span className="text-slate-800 dark:text-slate-200 font-bold">画面</span>
                    </div>

                    <div className="flex items-center gap-5">
                        {/* 検索窓（PC表示のみ） */}
                        <div className="relative hidden md:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="ブログを検索"
                                className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-simplex-green/30 dark:focus:ring-emerald-500/30 w-64 text-slate-900 dark:text-white transition-colors"
                            />
                        </div>

                        {/* 通知アイコン */}
                        <button className="relative p-2 text-slate-400 hover:text-simplex-green dark:hover:text-emerald-400 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-slate-900"></span>
                        </button>
                    </div>
                </header>

                {/* コンテンツ描画エリア（ここにPostListなどの各画面が入ります） */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-6">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}