import React from "react";
import { useNavigate } from "react-router";
import { Info, ArrowRight } from "lucide-react";
import dummyUsers from "../data/dummyUsers.json";
import { User } from "../models/user";

export default function UserListPage() {
    const navigate = useNavigate();

    return (
        <>
            {/* 上部固定ヘッダー */}
            <div className="sticky top-0 z-10 glass-panel border-b border-slate-200/50 dark:border-slate-800/50 px-8 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">Directory</span>
                        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">組織メンバー一覧</h2>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-md">
                        <Info className="w-3.5 h-3.5 text-brand-500" />
                        <span>部署は全員「D1」に所属しています</span>
                    </div>
                </div>
            </div>

            {/* ユーザーカードグリッド */}
            <div className="max-w-4xl mx-auto px-8 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(dummyUsers as User[]).map((user) => (
                        <div
                            key={user.id}
                            onClick={() => navigate(`/user/${user.id}`)}
                            className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 hover:border-brand-500/50 hover:shadow-glow-violet cursor-pointer transition-all duration-300 flex items-start justify-between group"
                        >
                            <div className="flex gap-4">
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-500 via-purple-600 to-indigo-600 p-[2px] shadow-md">
                                        <img src={user.avatar_url} alt={user.name} className="w-full h-full rounded-full border-2 border-white dark:border-slate-950 object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                                        {user.name}
                                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-brand-500/10 text-brand-500 rounded">{user.position}</span>
                                    </h3>
                                    <p className="text-[10px] text-slate-400 mt-1">{user.depatment}</p>
                                    <p className="text-[10px] text-slate-500 mt-2 line-clamp-2 leading-relaxed font-semibold">{user.bio}</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-brand-500 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}