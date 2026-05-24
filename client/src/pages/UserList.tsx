import React, { useState } from "react";
import { Search, Calendar, User as UserIcon } from "lucide-react";
import dummyUsers from "../../data/dummyUsers.json";

export default function UserListPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const users = dummyUsers as any[];

    // 🔍 検索キーワードでメンバーを絞り込む処理
    const filteredMembers = users.filter((member) => {
        // 姓名を結合（データが無い場合は空文字にする安全対策）
        const fullName = `${member.familyName || ""}${member.givenName || ""}`;

        // タグの検索（JSONが selfTag:{id, name} の形でも、tags:["React"] の形でも動くように対応）
        const tagList = member.selfTag || member.tags || [];
        const tagMatch = tagList.some((tag: any) => {
            const tagName = typeof tag === "string" ? tag : tag.name;
            return tagName.toLowerCase().includes(searchQuery.toLowerCase());
        });

        return fullName.includes(searchQuery) || tagMatch;
    });

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20 text-simplex-text">

            {/* 上部パンくずリスト */}
            <div className="mb-4">
        <span className="text-sm text-slate-500 font-medium">
          ホーム {'>'} 社内のひと {'>'} <span className="text-simplex-green font-bold">社内のメンバー一覧</span>
        </span>
            </div>

            {/* ヘッダーエリア（ベージュ背景 ＋ 検索窓） */}
            <div className="bg-simplex-headerBg rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border border-simplex-border/50 shadow-sm">

                {/* 背景の装飾イメージ */}
                <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
                    <svg width="400" height="120" viewBox="0 0 400 120" className="fill-simplex-green">
                        <rect x="300" y="40" width="30" height="80" rx="2" />
                        <rect x="340" y="20" width="40" height="100" rx="2" />
                        <rect x="250" y="60" width="40" height="60" rx="2" />
                        <circle cx="230" cy="90" r="20" />
                        <circle cx="200" cy="100" r="15" />
                    </svg>
                </div>

                <div className="z-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        社内のメンバー一覧
                    </h1>
                </div>

                {/* 検索ボックス */}
                <div className="z-10 w-full md:w-80 relative shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="メンバーやタグを検索"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-simplex-border rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-simplex-green/50 sm:text-sm transition-all"
                    />
                </div>
            </div>

            {/* メンバーリスト一覧 */}
            <div className="space-y-4 pt-4">
                {filteredMembers.length > 0 ? (
                    filteredMembers.map((member, index) => {
                        // タグリストの取得（文字列とオブジェクトの両方に対応）
                        const tagList = member.selfTag || member.tags || [];

                        return (
                            <div
                                key={member.hrid || index}
                                className="bg-white border border-simplex-border hover:border-simplex-green/30 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center gap-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >

                                {/* 1. 左側：アイコンと基本情報 */}
                                <div className="flex items-center gap-5 w-full lg:w-72 shrink-0">
                                    {/* 🎨 アバターの色をSimplexカラーに統一 */}
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl shrink-0 bg-simplex-light text-simplex-green">
                                        {member.familyName ? member.familyName[0] : "U"}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-xl font-extrabold truncate group-hover:text-simplex-green transition-colors">
                                            {member.familyName} {member.givenName}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold whitespace-nowrap">
                        {member.department || "部署未設定"}
                      </span>
                                            <span className="text-sm text-slate-500 font-medium truncate">
                        {member.position || "役職未設定"}
                      </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. 中央：タグエリア */}
                                <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                                    {tagList.map((tag: any, idx: number) => {
                                        const tagName = typeof tag === "string" ? tag : tag.name;
                                        return (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 bg-simplex-bg border border-simplex-border text-simplex-text text-xs font-bold rounded-full shadow-sm"
                                            >
                        {tagName}
                      </span>
                                        );
                                    })}
                                    {tagList.length === 0 && (
                                        <span className="text-xs text-slate-400">タグは未設定です</span>
                                    )}
                                </div>

                                {/* 3. 右側：更新日時 */}
                                <div className="w-full lg:w-48 shrink-0 flex justify-end lg:justify-center border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                        <Calendar className="w-4 h-4 opacity-70" />
                                        <span>更新日 : {member.updatedAt || "2026/05/20"}</span>
                                    </div>
                                </div>

                            </div>
                        );
                    })
                ) : (
                    <div className="py-20 text-center text-slate-500 bg-white rounded-3xl border border-dashed border-simplex-border">
                        <UserIcon className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p className="font-bold">「{searchQuery}」に一致するメンバーは見つかりませんでした。</p>
                    </div>
                )}
            </div>

        </div>
    );
}