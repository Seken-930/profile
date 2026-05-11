import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, User, SquarePen } from "lucide-react"; // アイコン用

export default function Layout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();

    // メニュー項目の設定
    const menuItems = [
        { label: "ホーム", icon: <Home className="w-5 h-5" />, path: "/" },
        { label: "ユーザー一覧", icon: <Users className="w-5 h-5" />, path: "/users" },
        { label: "プロフィール", icon: <User className="w-5 h-5" />, path: "/profile" },
        { label: "投稿", icon: <SquarePen className="w-5 h-5" />, path: "/post" },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* 左側：サイドバーメニュー */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-blue-600">知見共有アプリ</h1>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Button
                            key={item.path}
                            variant={location.pathname === item.path ? "secondary" : "ghost"}
                            className="w-full justify-start gap-3 font-medium text-slate-600"
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon}
                            {item.label}
                        </Button>
                    ))}
                </nav>
            </aside>

            {/* 右側：メインコンテンツ表示エリア */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}