import React, { useState } from "react";
// 💡 ここが `react-router` になりました！
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dummyUsers from "@/data/dummyUsers.json";
import { User } from "@/models/user";

export default function UserListPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = (dummyUsers as User[]).filter((user) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(lowerCaseQuery) ||
            user.depatment.toLowerCase().includes(lowerCaseQuery) || // ※JSONのキー名に合わせて depatment にしています
            user.bio.toLowerCase().includes(lowerCaseQuery)
        );
    });

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">社員一覧</h2>
                    <p className="text-slate-500 text-sm mt-1">社内の知見やスキルを探しましょう</p>
                </div>
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="名前、部署、スキルで検索..."
                        className="pl-9 bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {filteredUsers.length > 0 ? (
                    <div className="flex flex-col divide-y divide-slate-100">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => navigate(`/user/${user.id}`)}
                                className="flex flex-row items-center p-3 sm:p-4 hover:bg-blue-50 transition-colors gap-4 cursor-pointer"
                            >
                                <div className="flex items-center gap-3 w-[180px] shrink-0">
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage src={user.avatar_url} alt={user.name} />
                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="font-semibold text-slate-900 truncate">{user.name}</span>
                                </div>
                                <div className="w-[120px] shrink-0">
                                    <Badge variant="secondary" className="font-normal bg-emerald-100 text-emerald-800 truncate block text-center">
                                        {user.depatment}
                                    </Badge>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-slate-600 truncate">{user.bio}</p>
                                </div>
                                <div className="w-[150px] shrink-0 hidden sm:block text-right">
                                    <p className="text-sm text-slate-500 font-medium truncate">{user.want_to_do}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-slate-500">「{searchQuery}」に一致する社員が見つかりませんでした。</p>
                    </div>
                )}
            </div>
        </div>
    );
}