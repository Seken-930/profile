import React, { useState, useEffect } from "react";
import { Edit, X, Info, Grid, Award, Compass, FileText, Loader2 } from "lucide-react";
import dummyPosts from "../data/dummyPosts.json";
import { User } from "../models/user";
import { Api } from "../utils/Api";

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", position: "", bio: "", want_to_do: "" });

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await Api.fetch("/api/me");
        setCurrentUser(response);
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました", error);
      } finaly {
        setIsLoading(false);
      }
    };
    fetchMyProfile();
  }, []);

  const handleOpenEdit = () => {
    if (!currentUser) return;
    setEditForm({
      name: currentUser.name,
      position: currentUser.position,
      bio: currentUser.bio,
      want_to_do: currentUser.want_to_do,
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...editForm });
    setIsEditModalOpen(false);
    alert("プロフィールを更新しました！（※モック反映）");
  };

  if (isLoading) {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-simplex-green" />
          <p className="text-sm font-semibold">ユーザー情報を読み込み中...</p>
        </div>
    );
  }

  if (!currentUser) {
    return <div className="p-20 text-center text-slate-500">プロフィールの取得に失敗しました。</div>;
  }

  const myPosts = dummyPosts.filter((p) => p.authorId === currentUser.id);

  const renderActivityGrid = () => {
    const activeIndices = [3, 8, 15, 16, 22, 23, 29, 30, 31, 40, 41, 45, 50, 51];
    return Array.from({ length: 56 }).map((_, i) => {
      const isGreen = activeIndices.includes(i);
      const colorClass = isGreen ? "bg-simplex-green scale-105" : "bg-slate-100 hover:bg-slate-200";
      return <div key={i} className={`w-2.5 h-2.5 rounded-sm ${colorClass} transition-colors`} />;
    });
  };

  return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 relative">
        <div className="sticky top-0 z-10 bg-simplex-bg/80 border-b border-slate-200/50 px-8 py-4 glass-panel flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-simplex-green uppercase">My Space</span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">マイプロフィール</h2>
          </div>
          <button onClick={handleOpenEdit} className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm hover:bg-slate-50">
            <Edit className="w-4 h-4 text-slate-500" />
            <span>プロフィールを編集</span>
          </button>
        </div>

        <div className="px-8 space-y-6">
          <div className="h-40 rounded-2xl animated-gradient-bg relative mb-16 shadow-lg">
            <div className="absolute -bottom-10 left-8 flex items-end gap-4">
              <div className="w-20 h-20 rounded-full bg-white p-1 shadow-xl relative">
                <div className="w-full h-full rounded-full overflow-hidden shadow-inner bg-slate-100">
                  <img src={currentUser.avatar_url} alt={currentUser.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="mb-2">
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5">{currentUser.name}</h3>
                <p className="text-[10px] text-slate-500 font-bold">{currentUser.depatment} / {currentUser.position}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-simplex-green" />自己紹介 (Bio)
                </h4>
                <p className="text-xs text-simplex-text leading-relaxed font-semibold whitespace-pre-wrap">{currentUser.bio}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-emerald-500" />ナレッジ活動（草マップ）
                </h4>
                <div className="flex flex-wrap gap-1.5">{renderActivityGrid()}</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-simplex-green" />スキル・バッジ
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-simplex-light border border-simplex-green/10 rounded text-simplex-green">React</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-simplex-light border border-simplex-green/10 rounded text-simplex-green">TypeScript</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-simplex-yellow" />今後やりたいこと
                </h4>
                <p className="text-xs text-simplex-green font-bold">{currentUser.want_to_do}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-simplex-green" />共有ナレッジ ({myPosts.length})
            </h4>
            <div className="space-y-2 border-t border-slate-200/40 pt-4">
              {myPosts.length > 0 ? myPosts.map((p) => (
                  <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between items-center group">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-800">{p.title}</h4>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 shrink-0 ml-4">{p.date}</span>
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
              <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    プロフィールの編集
                  </h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:bg-slate-100 p-1 rounded-lg">
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
                        className="w-full px-3 py-2 border border-slate-200 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/20 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ポジション</label>
                    <input
                        type="text"
                        value={editForm.position}
                        onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/20 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">今後やりたいこと</label>
                    <input
                        type="text"
                        value={editForm.want_to_do}
                        onChange={(e) => setEditForm({...editForm, want_to_do: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/20 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">自己紹介 (Bio)</label>
                    <textarea
                        rows={4}
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/20 text-xs resize-none"
                    />
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
                  <button onClick={() => setIsEditModalOpen(false)} className="px-3.5 py-1.5 text-slate-500 text-xs font-semibold rounded-lg hover:bg-slate-100">キャンセル</button>
                  <button onClick={handleSave} className="px-4 py-1.5 bg-simplex-green text-white text-xs font-bold rounded-lg shadow-sm">保存する</button>
                </div>

              </div>
            </div>
        )}
      </div>
  );
}