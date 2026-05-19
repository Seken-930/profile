import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Info, ArrowRight, Users } from "lucide-react";
import dummyUsers from "../data/dummyUsers.json";
import { User } from "../models/user";

export default function UserListPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = (dummyUsers as User[]).filter((user) => {
        const q = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(q) ||
            user.depatment.toLowerCase().includes(q) ||
            user.bio.toLowerCase().includes(q)
        );
    });

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="sticky top-0 z-10 bg-simplex-bg/80 border-b border-slate-200/50 px-8 py-4 glass-panel flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="text-[10px] font-bold tracking-widest text-simplex-green uppercase">Directory</span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">組織メンバー一覧</h2>
                </div>
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="名前、部署、スキルで検索..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-simplex-green/20 focus:border-simplex-green"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="px-8">
                {filteredUsers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => navigate(`/user/${user.id}`)}
                                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-simplex-green/50 hover:shadow-md cursor-pointer transition-all duration-300 flex items-start justify-between group"
                            >
                                <div className="flex gap-4 min-w-0">
                                    <div className="relative shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-simplex-green to-simplex-light p-[2px] shadow-sm">
                                            <img src={user.avatar_url} alt={user.name} className="w-full h-full rounded-full border-2 border-white object-cover bg-white" />
                                        </div>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-xs font-extrabold text-simplex-text flex items-center gap-1.5 flex-wrap">
                                            {user.name}
                                            <span className="text-[9px] font-bold px-2 py-0.5 bg-simplex-light text-simplex-green rounded-md shrink-0">
                        {user.position}
                      </span>
                                        </h3>
                                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">{user.depatment}</p>
                                        <p className="text-[10px] text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">{user.bio}</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 group-hover:text-simplex-green transition-colors ml-2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
                        <p className="text-slate-400 text-sm">「{searchQuery}」に一致するメンバーが見つかりませんでした。</p>
                    </div>
                )}
            </div>
        </div>
    );
}