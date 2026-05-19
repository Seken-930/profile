import { useState } from "react";
import { Edit, X, Info, Grid, Award, Compass, FileText } from "lucide-react";
import dummyUsers from "../data/dummyUsers.json";
import dummyPosts from "../data/dummyPosts.json";
import { User } from "../models/user";

export default function ProfilePage() {
  // 今はダミーデータの1番目を取得
  const [currentUser, setCurrentUser] = useState<User>(dummyUsers[0] as User);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 編集フォームの入力状態
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    position: currentUser.position,
    bio: currentUser.bio,
    want_to_do: currentUser.want_to_do,
  });

  // 自分の投稿だけを絞り込む
  const myPosts = dummyPosts.filter((p) => p.authorId === currentUser.id);

  // 保存処理
  const handleSave = () => {
    setCurrentUser({ ...currentUser, ...editForm });
    setIsEditModalOpen(false);
    alert("プロフィールを更新しました！");
  };


  return (
    <div className="pb-20 relative">
      {/* 上部固定ヘッダー */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 px-8 py-4 glass-panel">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase">My Space</span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">マイプロフィール</h2>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Edit className="w-4 h-4 text-slate-500" />
            <span>プロフィールを編集</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 mt-6">
        {/* カバー */}
        <div className="h-40 rounded-2xl animated-gradient-bg relative mb-16 shadow-lg">
          <div className="absolute -bottom-10 left-8 flex items-end gap-4">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-950 p-1 shadow-xl relative">
              <div className="w-full h-full rounded-full overflow-hidden shadow-inner bg-slate-100">
                <img src={currentUser.avatar_url} alt={currentUser.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">{currentUser.name}</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{currentUser.depatment} / {currentUser.position}</p>
            </div>
          </div>
        </div>

        {/* 2カラムコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-500" />自己紹介 (Bio)
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold whitespace-pre-wrap">{currentUser.bio}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-emerald-500" />ナレッジ活動（草マップ）
              </h4>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-500" />スキル・バッジ
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-400">React</span>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-400">TypeScript</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 shadow-sm">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-pink-500" />今後やりたいこと
              </h4>
              <p className="text-xs text-brand-500 font-bold">{currentUser.want_to_do}</p>
            </div>
          </div>
        </div>

        {/* 自分の投稿一覧 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-brand-500" />共有ナレッジ ({myPosts.length})
          </h4>
          <div className="space-y-2 border-t border-slate-200/40 dark:border-slate-800/40 pt-4">
            {myPosts.length > 0 ? myPosts.map((p) => (
              <div key={p.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-lg flex justify-between items-center group">
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.title}</h4>
                </div>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 shrink-0 ml-4">{p.date}</span>
              </div>
            )) : (
              <div className="p-8 text-center text-xs text-slate-400">まだ投稿はありません。</div>
            )}
          </div>
        </div>
      </div>

      {/* 編集用モーダル */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <User className="w-4.5 h-4.5 text-brand-500" />プロフィールの編集
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-lg">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">お名前</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-transparent rounded-lg focus:ring-2 focus:ring-brand-500/20 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ポジション</label>
                <input
                  type="text"
                  value={editForm.position}
                  onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-transparent rounded-lg focus:ring-2 focus:ring-brand-500/20 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">今後やりたいこと</label>
                <input
                  type="text"
                  value={editForm.want_to_do}
                  onChange={(e) => setEditForm({...editForm, want_to_do: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-transparent rounded-lg focus:ring-2 focus:ring-brand-500/20 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">自己紹介 (Bio)</label>
                <textarea
                  rows={4}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-transparent rounded-lg focus:ring-2 focus:ring-brand-500/20 text-xs resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200/60 dark:border-slate-800/60 flex justify-end gap-2 bg-slate-50 dark:bg-slate-900/40">
              <button onClick={() => setIsEditModalOpen(false)} className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-semibold rounded-lg hover:bg-slate-100">キャンセル</button>
              <button onClick={handleSave} className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-lg shadow-sm">保存する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}