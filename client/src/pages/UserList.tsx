{/* ユーザーリスト */}
<div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    {filteredUsers.length > 0 ? (
        <div className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
                <div
                    key={user.id}
                    // 💡ポイント1: flex-col を消し、常に items-center で横1列を強制する
                    className="flex items-center p-3 sm:p-4 hover:bg-slate-50 transition-colors gap-3 sm:gap-4 cursor-pointer"
                >
                    {/* アバター（shrink-0 で画像が潰れるのを防ぐ） */}
                    <Avatar className="h-10 w-10 border border-slate-100 shrink-0">
                        <AvatarImage src={user.avatar_url} alt={user.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-sm">
                            {user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    {/* 名前と部署（一定の幅を確保） */}
                    <div className="w-[120px] sm:w-[200px] flex items-center gap-2 shrink-0">
                        <h3 className="font-semibold text-slate-900 truncate">{user.name}</h3>
                        {/* whitespace-nowrap でバッジ内の文字の改行を防ぐ */}
                        <Badge variant="secondary" className="font-normal text-[10px] bg-slate-100 whitespace-nowrap hidden sm:inline-flex">
                            {user.depatment}
                        </Badge>
                    </div>

                    {/* 自己紹介文（flex-1 で残りのスペースを埋め、truncate で1行に制限） */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-600 truncate">
                            {user.bio}
                        </p>
                    </div>

                    {/* やりたいこと（右端に固定） */}
                    <div className="w-[100px] sm:w-[150px] text-right shrink-0 hidden md:block">
                        <p className="text-xs text-slate-400 truncate">{user.want_to_do}</p>
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