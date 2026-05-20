import React, { useState } from "react";
import { Edit, X, Info, Grid, Award, Compass, FileText, User as UserIcon, Briefcase, Users, Leaf, MessageSquare } from "lucide-react";
import dummyUsers from "../data/dummyUsers.json";
import dummyPosts from "../data/dummyPosts.json";
import { User } from "../models/user";

export default function ProfilePage() {
  // 💡 ダミーデータの1番目の人を初期値としてセット（API通信の代わり）
  const [currentUser, setCurrentUser] = useState<User>(dummyUsers[0] as User);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    position: currentUser.position,
    bio: currentUser.bio,
    want_to_do: currentUser.want_to_do,
  });

  // 自分の投稿だけを絞り込む
  const myPosts = dummyPosts.filter((p) => p.authorId === currentUser.id);

  // 編集モーダルを開く
  const handleOpenEdit = () => {
    setEditForm({
      name: currentUser.name,
      position: currentUser.position,
      bio: currentUser.bio,
      want_to_do: currentUser.want_to_do,
    });
    setIsEditModalOpen(true);
  };

  // 変更を保存して画面に反映させる（ダミーなのでリロードすると元に戻ります）
  const handleSave = () => {
    setCurrentUser({ ...currentUser, ...editForm });
    setIsEditModalOpen(false);
  };

  // 草マップ（コントリビューション）の生成
  const renderActivityGrid = () => {
    const activeIndices = [3, 8, 15, 16, 22, 23, 29, 30, 31, 40, 41, 45, 50, 51];
    return Array.from({ length: 56 }).map((_, i) => {
      const isGreen = activeIndices.includes(i);
      // 💡 緑色も背景色もSimplexカラーを使用
      const colorClass = isGreen ? "bg-simplex-green scale-105" : "bg-simplex-bg";
      return <div key={i} className={`w-2.5 h-2.5 rounded-sm ${colorClass} transition-colors border border-simplex-border/50`} />;
    });
  };

  return (
      <div className="max-w-6xl mx-auto space-y-6 pb-20 text-simplex-text">

        {/* 📌 上部固定ヘッダー */}
        <div className="sticky top-0 z-10 bg-simplex-bg/90 backdrop-blur-md border-b border-simplex-border px-8 py-4 flex justify-between items-center -mx-8 px-8 mb-6">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-simplex-green uppercase">My Space</span>
            <h2 className="text-xl font-extrabold mt-0.5">マイプロフィール</h2>
          </div>
          <button
              onClick={handleOpenEdit}
              className="px-3.5 py-1.5 bg-simplex-surface border border-simplex-border hover:bg-simplex-light transition-colors text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Edit className="w-4 h-4 opacity-70" />
            <span>プロフィールを編集</span>
          </button>
        </div>

        {/* 📌 1. ヘッダーカード（クリーム色の背景） */}
        <div className="bg-simplex-headerBg rounded-2xl p-8 relative overflow-hidden flex items-center gap-8 border border-simplex-border">
          <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
            <svg width="300" height="150" viewBox="0 0 300 150" className="fill-simplex-green"><path d="M0,150 L50,80 L100,120 L150,50 L200,90 L250,30 L300,100 L300,150 Z" /></svg>
          </div>

          <img src={currentUser.avatar_url} alt={currentUser.name} className="w-40 h-40 rounded-full border-4 border-simplex-surface shadow-sm object-cover z-10 bg-simplex-surface" />

          <div className="z-10 space-y-4">
            <div className="flex items-end gap-3">
              <h1 className="text-3xl font-extrabold">{currentUser.name}</h1>
            </div>

            <div className="flex gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-simplex-surface rounded-full text-sm font-bold shadow-sm border border-simplex-border">
              <Users className="w-4 h-4 opacity-50" /> {currentUser.depatment}
            </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-simplex-surface rounded-full text-sm font-bold shadow-sm border border-simplex-border">
              <Briefcase className="w-4 h-4 opacity-50" /> {currentUser.position}
            </span>
            </div>

            <p className="text-sm leading-relaxed font-medium pt-2 whitespace-pre-wrap max-w-lg">
              {currentUser.bio}
            </p>
          </div>
        </div>

        {/* 📌 2. カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* 左2カラム */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
                <Info className="w-5 h-5" /> 自己紹介 (Bio)
              </h2>
              <p className="text-sm leading-relaxed font-semibold whitespace-pre-wrap">{currentUser.bio}</p>
            </div>

            <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
                <Grid className="w-5 h-5" /> ナレッジ活動（草マップ）
              </h2>
              <div className="flex flex-wrap gap-1.5">{renderActivityGrid()}</div>
            </div>
          </div>

          {/* 右1カラム */}
          <div className="space-y-6">
            <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
                <Award className="w-5 h-5" /> スキル・バッジ
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-simplex-light border border-simplex-green/10 rounded-md text-simplex-green">React</span>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-simplex-light border border-simplex-green/10 rounded-md text-simplex-green">TypeScript</span>
              </div>
            </div>

            <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
                <Compass className="w-5 h-5 text-simplex-yellow" /> 今後やりたいこと
              </h2>
              <p className="text-sm font-bold">{currentUser.want_to_do}</p>
            </div>
          </div>
        </div>

        {/* 📌 3. 自分の投稿一覧 */}
        <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5" /> 共有ナレッジ ({myPosts.length})
          </h2>
          <div className="space-y-3">
            {myPosts.length > 0 ? myPosts.map((p) => (
                <div key={p.id} className="p-4 bg-simplex-bg border border-simplex-border rounded-xl flex justify-between items-center group">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold group-hover:text-simplex-green transition-colors cursor-pointer">{p.title}</h4>
                  </div>
                  <span className="text-xs font-mono opacity-50 shrink-0 ml-4">{p.date}</span>
                </div>
            )) : (
                <div className="p-8 text-center text-sm opacity-50 border border-dashed border-simplex-border rounded-xl">まだ投稿はありません。</div>
            )}
          </div>
        </div>

        {/* 📌 4. 編集用モーダル */}
        {isEditModalOpen && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              {/* モーダル本体にも bg-simplex-surface を適用 */}
              <div className="bg-simplex-surface border border-simplex-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">

                <div className="px-6 py-4 border-b border-simplex-border flex justify-between items-center bg-simplex-bg/50">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <UserIcon className="w-4.5 h-4.5 text-simplex-green" /> プロフィールの編集
                  </h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="opacity-50 hover:opacity-100 hover:bg-simplex-border p-1.5 rounded-lg transition-all">
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  <div>
                    <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">お名前</label>
                    <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">ポジション</label>
                    <input
                        type="text"
                        value={editForm.position}
                        onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                        className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">今後やりたいこと</label>
                    <input
                        type="text"
                        value={editForm.want_to_do}
                        onChange={(e) => setEditForm({...editForm, want_to_do: e.target.value})}
                        className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">自己紹介 (Bio)</label>
                    <textarea
                        rows={4}
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium resize-none"
                    />
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-simplex-border flex justify-end gap-3 bg-simplex-bg/50">
                  <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 border border-simplex-border hover:bg-simplex-border text-xs font-bold rounded-lg transition-colors"
                  >
                    キャンセル
                  </button>
                  <button
                      onClick={handleSave}
                      className="px-5 py-2 bg-simplex-green hover:bg-simplex-green/90 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                  >
                    保存する
                  </button>
                </div>

              </div>
            </div>
        )}
      </div>
  );
}