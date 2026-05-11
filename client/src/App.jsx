import { useState } from "react";
// shadcn/ui のコンポーネントをインポート（※事前にCLIで追加しておく必要があります）
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserListPage() {
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const MOCK_USERS = [
    { id: 1, name: "田中 太郎", department: "開発部", bio: "フロントエンド開発に興味があります。最近はReactを勉強中！", skills: ["React", "JavaScript"] },
    { id: 2, name: "鈴木 花子", department: "インフラ部", bio: "クラウドインフラの自動化を推進しています。", skills: ["AWS", "Terraform"] },
    { id: 3, name: "佐藤 健", department: "企画部", bio: "生成AIを使った新しい社内ツールの企画立案をしています。", skills: ["生成AI", "プロジェクトマネジメント"] },
    { id: 4, name: "高橋 メアリー", department: "開発部", bio: "UI/UXデザインとフロントエンドの架け橋になりたいです。", skills: ["Figma", "Tailwind CSS"] },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputText);
  };

  const filteredUsers = MOCK_USERS.filter((user) => {
    if (searchQuery === "") return true;
    const lowerQuery = searchQuery.toLowerCase();
    const matchName = user.name.toLowerCase().includes(lowerQuery);
    const matchSkill = user.skills.some(skill => skill.toLowerCase().includes(lowerQuery));
    return matchName || matchSkill;
  });

  return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* ヘッダー＆検索エリア */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">社員を探す</h1>
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input
                  type="text"
                  placeholder="名前やスキルで検索..."
                  className="flex-1"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
              />
              <Button type="submit">検索</Button>
            </form>
          </div>

          {/* ユーザーリスト（横1行の形式） */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {filteredUsers.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                      // 1人分の行（横並びのFlexbox）
                      <div
                          key={user.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center p-5 hover:bg-slate-50 transition-colors gap-4"
                      >
                        {/* 左側：アバターアイコン */}
                        <Avatar className="h-12 w-12 border border-slate-100">
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* 中央：基本情報と経歴概要（横幅を広くとる） */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-slate-900 truncate">{user.name}</h3>
                            <span className="text-xs text-slate-500 font-medium px-2 py-0.5 bg-slate-100 rounded-full">
                        {user.department}
                      </span>
                          </div>
                          {/* line-clamp-1 で長すぎる文章を「...」で省略 */}
                          <p className="text-sm text-slate-600 line-clamp-1">{user.bio}</p>
                        </div>

                        {/* 右側：スキルタグ */}
                        <div className="flex flex-wrap gap-1.5 sm:justify-end sm:w-1/3 mt-2 sm:mt-0">
                          {user.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="font-normal text-xs">
                                #{skill}
                              </Badge>
                          ))}
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
      </div>
  );
}