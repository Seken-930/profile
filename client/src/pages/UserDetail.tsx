import React from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Info, Grid, Award, Compass, FileText } from "lucide-react";
import dummyUsers from "../data/dummyUsers.json";
import { User } from "../models/user";

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = (dummyUsers as User[]).find((u) => u.id === id);

  if (!user) return <div className="p-10 text-center text-slate-500">ユーザーが見つかりません</div>;

  // 独自タグの色設定（モック）
  const renderTags = (tags: string[]) => {
    return tags.map((tag, idx) => (
        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-500 border border-brand-500/20 transition-transform hover:scale-105">
        {tag}
      </span>
    ));
  };

  // GitHub風の草マップ（56マス）の生成
  const renderActivityGrid = () => {
    const activeIndices = [3, 8, 15, 16, 22, 23, 29, 30, 31, 40, 41, 45, 50, 51];
    return Array.from({ length: 56 }).map((_, i) => {
      const isGreen = activeIndices.includes(i);
      const colorClass = isGreen
          ? "bg-brand-500 dark:bg-brand-600 scale-105"
          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700";
      return <div key={i} className={`w-2.5 h-2.5 rounded-sm ${colorClass} transition-colors cursor-pointer`} title="アクティビティ" />;
    });
  };

  return (
      <div className="pb-20">
        {/* 上部固定ヘッダー */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 px-8 py-3.5 glass-panel flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-colors flex items-center gap-1 text-xs font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>メンバー一覧に戻る</span>
          </button>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">User Profile</span>
        </div>

        <div className="max-w-4xl mx-auto px-8 mt-6">
          {/* カバー（グラデーション背景） */}
          <div className="h-40 rounded-2xl animated-gradient-bg relative mb-16 shadow-lg">
            <div className="absolute -bottom-10 left-8 flex items-end gap-4">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-950 p-1 shadow-xl relative">
                <div className="w-full h-full rounded-full overflow-hidden shadow-inner bg-slate-100">
                  <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="mb-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">{user.name}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{user.depatment} / {user.position}</p>
              </div>
            </div>
          </div>

          {/* 2カラムコンテンツ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* 左2カラム: 基本情報 ＆ アクティビティ */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-brand-500" />自己紹介 (Bio)
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">{user.bio}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl p-5 shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5 text-emerald-500" />ナレッジ活動（草マップ）
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {renderActivityGrid()}
                </div>
              </div>
            </div>

            {/* 右1カラム: スキル、興味 */}
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
                  <Compass className="w-3.5 h-3.5 text-pink-500" />興味・関心
                </h4>
                <p className="text-xs text-brand-500 font-bold">{user.want_to_do}</p>
              </div>
            </div>
          </div>

          {/* 投稿一覧 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-brand-500" />共有ナレッジ
            </h4>
            <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-400">
              まだ投稿はありません。
            </div>
          </div>
        </div>
      </div>
  );
}