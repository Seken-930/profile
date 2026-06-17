import React from "react";
import { MessageSquare } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-simplex-bg dark:bg-slate-950 flex flex-col-reverse lg:flex-row relative overflow-hidden transition-colors duration-300">

            {/* 📌 左カラム：ログインエリア（白背景） */}
            {/* モバイルでは下に配置し、中央カードのデザインを継承。PCでは左側に配置し、右側だけを丸くします */}
            <div className="w-[calc(100%-2rem)] max-w-sm lg:w-[480px] lg:max-w-none mx-auto lg:mx-0 mt-8 mb-8 lg:mt-0 lg:mb-0 lg:ml-0 lg:mr-0 p-10 lg:p-16 flex flex-col justify-center items-center bg-white dark:bg-slate-900 relative z-10 shadow-2xl transition-colors duration-300 rounded-[2.5rem] lg:rounded-r-[2.5rem] lg:rounded-b-none lg:rounded-l-none lg:border-r border-simplex-border/50 dark:border-slate-800 shrink-0">

                {/* ロゴアイコン (以前中央にあったもの) */}
                <div className="w-16 h-16 bg-simplex-green dark:bg-emerald-600 text-white rounded-[1.2rem] flex items-center justify-center mb-6 shadow-lg transform -rotate-3 transition-colors shrink-0">
                    <MessageSquare className="w-8 h-8 fill-white/20" />
                </div>

                {/* タイトル & 説明 (以前中央にあったもの) */}
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 transition-colors">
                    Simplex Blog
                </h1>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-10 leading-relaxed transition-colors text-center">
                    社内の知見を共有し、<br className="hidden md:block" />みんなで成長を分かち合いましょう。
                </p>

                {/* 📌 ログインボタン配置エリア */}
                <div className="w-full space-y-4">

                    {/* =================================================
            💡 ここにお手持ちのログインボタンを配置してください！
            =================================================
            （以下はダミーのボタン要素です）
          */}
                    <button className="w-full py-3.5 px-4 bg-simplex-green hover:bg-simplex-green/90 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                        ログインする
                    </button>

                </div>

                {/* フッター */}
                <p className="mt-10 lg:mt-auto text-xs font-semibold text-slate-400 dark:text-slate-500">
                    © 2026 Simplex Blog.
                </p>
            </div>

            {/* 📌 右カラム：アプリの説明エリア（ベージュ背景） */}
            {/* モバイルでは上に配置し、PCでは右側の広いスペースを使います */}
            <div className="lg:flex-1 p-10 md:p-16 lg:p-24 flex flex-col justify-center items-center lg:items-start relative overflow-hidden transition-colors">

                {/* 背景の装飾 (ホーム画面と同じ薄い円) */}
                <div className="absolute inset-0 opacity-15 dark:opacity-10 pointer-events-none flex justify-center items-center z-0">
                    <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="200" cy="50" r="250" fill="#2A7A56" opacity="0.4" />
                        <circle cx="600" cy="350" r="300" fill="#F4B728" opacity="0.3" />
                    </svg>
                </div>

                <div className="relative z-10 space-y-6 text-center lg:text-left transition-colors duration-300">
                    {/* ホーム画面ヒーローセクションのデザインを流用 */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white transition-colors">
                        社内の知見を共有し、<br />
                        チームで成長する。
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed font-bold transition-colors">
                        日々の気づきや技術的な学びを記録し、アイデアや経験を共有。コミュニケーションを活性化し、みんなで成長を分かち合うためのプラットフォームです。
                    </p>
                </div>
            </div>

        </div>
    );
}