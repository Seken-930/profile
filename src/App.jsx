import { useState } from "react";

// --- 子部品：1人分のユーザーカード ---
function UserCard({ user }) {
  return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition">
        <div className="flex items-center space-x-4 mb-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.department}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{user.bio}</p>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
            #{skill}
          </span>
          ))}
        </div>
      </div>
  );
}

// --- 親部品：画面全体 ---
export default function UserListPage() {
  // ① 状態（State）を2つに分けるのがポイント！
  const [inputText, setInputText] = useState(""); // 検索窓に「入力中」の文字
  const [searchQuery, setSearchQuery] = useState(""); // 検索ボタンを「押して確定した」文字

  const MOCK_USERS = [
    { id: 1, name: "田中 太郎", department: "開発部", bio: "フロントエンド開発に興味があります。最近はReactを勉強中！", skills: ["React", "JavaScript"] },
    { id: 2, name: "鈴木 花子", department: "インフラ部", bio: "クラウドインフラの自動化を推進しています。", skills: ["AWS", "Terraform"] },
    { id: 3, name: "佐藤 健", department: "企画部", bio: "生成AIを使った新しい社内ツールの企画立案をしています。", skills: ["生成AI", "プロジェクトマネジメント"] },
    { id: 4, name: "高橋 メアリー", department: "開発部", bio: "UI/UXデザインとフロントエンドの架け橋になりたいです。", skills: ["Figma", "Tailwind CSS"] },
  ];

  // ② 検索ボタン（またはEnterキー）が押された時の処理
  const handleSearch = (e) => {
    e.preventDefault(); // フォーム送信時にページ全体がリロードされるのを防ぐ（超重要！）
    setSearchQuery(inputText); // ここで初めて、入力中の文字を「確定した検索ワード」としてセットする
  };

  // ③ 絞り込み処理（入力中の文字ではなく、確定した文字 searchQuery を使う）
  const filteredUsers = MOCK_USERS.filter((user) => {
    if (searchQuery === "") return true; // 何も検索されていなければ全員表示

    // 大文字・小文字の区別なく検索できるように下準備
    const lowerQuery = searchQuery.toLowerCase();
    const matchName = user.name.toLowerCase().includes(lowerQuery);
    const matchSkill = user.skills.some(skill => skill.toLowerCase().includes(lowerQuery));

    return matchName || matchSkill;
  });

  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">

          {/* ヘッダー＆検索エリア */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">社員を探す</h1>

            {/* <form>タグで囲むことで、Enterキーでも検索できるようになる */}
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                  type="text"
                  placeholder="名前やスキルで検索..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
              />
              <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                検索
              </button>
            </form>
          </div>

          {/* ユーザーカード一覧エリア */}
          {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
              </div>
          ) : (
              /* 検索結果がゼロだった場合の親切な表示 */
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">「{searchQuery}」に一致する社員が見つかりませんでした。</p>
                <p className="text-gray-400 text-sm mt-2">別のキーワードでお試しください。</p>
              </div>
          )}

        </div>
      </div>
  );
}