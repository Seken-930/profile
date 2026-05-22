import React, { useState, useEffect } from "react";
import { Edit, X, Info, Award, Compass, FileText, User as UserIcon, Briefcase, Users, Loader2 } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Profile } from "../types/profile"; // ※ファイルのパスは環境に合わせて調整してください
import dummyPosts from "../data/dummyPosts.json";

// バックエンドができるまでの仮のタグ一覧（モックデータ）
const AVAILABLE_TAGS = [
  { id: 1, name: "Client First" },
  { id: 2, name: "明るい" },
  { id: 3, name: "React" },
  { id: 4, name: "TypeScript" },
  { id: 5, name: "マネジメント" },
  { id: 6, name: "金融PJ経験" },
];

const DUMMY_PROFILE: Profile = {
  hrid: "100000",
  name: "test@example.com",
  email: "test.contact@example.com",
  familyName: "山田",
  givenName: "太郎",
  department: "開発部",
  position: "メンバー",
  bio: "現在、フロントエンドの画面挙動をテスト中です。\nバックエンドが繋がるまではこのデータが表示されます。",
  careerSummary: "2026年 開発プロジェクト参画",
  wantToDo: "UI/UXの改善",
  selfTag: [
    { id: 1, name: "Client First" },
    { id: 3, name: "React" }
  ],
  // 先ほどの照合テスト用に、dummyPosts.jsonの中にあるIDをいくつか入れておきます
  posts: [
    { id: "1", title: "ダミー", postTag: [] },
    { id: "2", title: "ダミー", postTag: [] }
  ]
};

export default function ProfilePage() {
  const api = useApi();

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    familyName: "",
    givenName: "",
    position: "",
    bio: "",
    careerSummary: "",
    wantToDo: "",
    selfTag: [] as { id: number; name: string }[],
  });

  // 🚀 1. 画面表示時にプロフィールを取得
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        // const response = await api.fetch("/api/auth/me");
        // const data = await response.json();
        // setCurrentUser(response as Profile);

        // テスト用！！！！！！
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentUser(DUMMY_PROFILE);

      } catch (error) {
        console.error("プロフィールの取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyProfile();
  }, [api]);

  // 2. 編集モーダルを開く
  const handleOpenEdit = () => {
    if (!currentUser) return;
    setEditForm({
      familyName: currentUser.familyName || "",
      givenName: currentUser.givenName || "",
      position: currentUser.position || "",
      bio: currentUser.bio || "",
      careerSummary: currentUser.careerSummary || "",
      wantToDo: currentUser.wantToDo || "",
      selfTag: currentUser.selfTag || [],
    });
    setIsEditModalOpen(true);
  };

  // 🚀 3. タグの付け外し処理
  const toggleTag = (tag: { id: number; name: string }) => {
    setEditForm((prev) => {
      const isAlreadySelected = prev.selfTag.some((t) => t.id === tag.id);
      if (isAlreadySelected) {
        return { ...prev, selfTag: prev.selfTag.filter((t) => t.id !== tag.id) };
      } else {
        return { ...prev, selfTag: [...prev.selfTag, tag] };
      }
    });
  };

  // 🚀 4. 保存してAPIに送信
  const handleSave = async () => {
    if (!currentUser) return;

    try {
      const requestBody: Profile = {
        hrid: currentUser.hrid,
        name: currentUser.name,
        email: currentUser.email,
        department: currentUser.department,
        familyName: editForm.familyName,
        givenName: editForm.givenName,
        position: editForm.position,
        bio: editForm.bio,
        careerSummary: editForm.careerSummary,
        wantToDo: editForm.wantToDo,
        selfTag: editForm.selfTag,
        posts: currentUser.posts
      };

      // テスト用にコメントアウト！！！！！！！！
      //await api.sendJson("/api/auth/me", requestBody, { method: "PUT" });

      await new Promise(resolve => setTimeout(resolve, 500));

      setCurrentUser(requestBody);
      setIsEditModalOpen(false);
      alert("プロフィールを更新しました！");

    } catch (error) {
      console.error("更新エラー:", error);
      alert("保存に失敗しました。時間をおいて再度お試しください。");
    }
  };

  // ⏳ ローディング中
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-simplex-green" />
        <p className="text-sm font-semibold">ユーザー情報を読み込み中...</p>
      </div>
    );
  }

  // 🚨 取得失敗時
  if (!currentUser) {
    return <div className="p-20 text-center text-slate-500">ユーザー情報の取得に失敗しました。</div>;
  }

  const myPosts = dummyPosts.filter((p) => p.authorId === currentUser.hrid);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 text-simplex-text">

      {/* 📌 ヘッダーバー */}
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

      {/* 📌 メインプロフィールカード */}
      <div className="bg-simplex-headerBg rounded-2xl p-8 relative overflow-hidden flex items-center gap-8 border border-simplex-border">
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
          <svg width="300" height="150" viewBox="0 0 300 150" className="fill-simplex-green"><path d="M0,150 L50,80 L100,120 L150,50 L200,90 L250,30 L300,100 L300,150 Z" /></svg>
        </div>

        <div className="w-40 h-40 rounded-full border-4 border-simplex-surface shadow-sm overflow-hidden z-10 bg-simplex-surface">
          <div className="w-full h-full bg-simplex-light flex items-center justify-center text-simplex-green font-bold text-3xl">
            {currentUser.familyName ? currentUser.familyName[0] : "U"}
          </div>
        </div>

        <div className="z-10 space-y-4">
          <div className="flex items-end gap-3">
            <h1 className="text-3xl font-extrabold">{currentUser.familyName} {currentUser.givenName}</h1>
          </div>

          <div className="flex gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-simplex-surface rounded-full text-sm font-bold shadow-sm border border-simplex-border">
              <Users className="w-4 h-4 opacity-50" /> {currentUser.department}
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

      {/* 📌 情報カラム */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
              <Info className="w-5 h-5" /> 自己紹介 (Bio)
            </h2>
            <p className="text-sm leading-relaxed font-semibold whitespace-pre-wrap">{currentUser.bio}</p>
          </div>

          <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5" /> これまでの経歴
            </h2>
            <p className="text-sm leading-relaxed font-semibold whitespace-pre-wrap">{currentUser.careerSummary}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
              <Award className="w-5 h-5" /> スキル・バッジ
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentUser.selfTag?.map((tag) => (
                <span key={tag.id} className="text-[10px] font-bold px-2.5 py-1 bg-simplex-light border border-simplex-green/10 rounded-md text-simplex-green">
                  {tag.name}
                </span>
              ))}
              {(!currentUser.selfTag || currentUser.selfTag.length === 0) && (
                <span className="text-xs opacity-50">タグは未設定です</span>
              )}
            </div>
          </div>

          <div className="bg-simplex-surface border border-simplex-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6">
              <Compass className="w-5 h-5 text-simplex-yellow" /> 今後やりたいこと
            </h2>
            <p className="text-sm font-bold">{currentUser.wantToDo}</p>
          </div>
        </div>
      </div>

      {/* 📌 投稿一覧（※ダミー） */}
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

      {/* 📌 編集モーダル */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-simplex-surface border border-simplex-border rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">

            <div className="px-6 py-4 border-b border-simplex-border flex justify-between items-center bg-simplex-bg/50 shrink-0 rounded-t-2xl">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <UserIcon className="w-4.5 h-4.5 text-simplex-green" /> プロフィールの編集
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="opacity-50 hover:opacity-100 hover:bg-simplex-border p-1.5 rounded-lg transition-all">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">姓</label>
                  <input
                    type="text"
                    value={editForm.familyName}
                    onChange={(e) => setEditForm({...editForm, familyName: e.target.value})}
                    className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">名</label>
                  <input
                    type="text"
                    value={editForm.givenName}
                    onChange={(e) => setEditForm({...editForm, givenName: e.target.value})}
                    className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                  />
                </div>
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

              {/* 🚀 タグ選択エリア */}
              <div>
                <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">自己紹介タグ（複数選択可）</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TAGS.map((tag) => {
                    const isSelected = editForm.selfTag.some((t) => t.id === tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
    isSelected
        ? "bg-simplex-green text-white border-simplex-green shadow-sm"
        : "bg-simplex-bg text-simplex-text border-simplex-border opacity-60 hover:opacity-100 hover:bg-simplex-surface"
}`}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">今後やりたいこと</label>
                <input
                  type="text"
                  value={editForm.wantToDo}
                  onChange={(e) => setEditForm({...editForm, wantToDo: e.target.value})}
                  className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">自己紹介 (Bio)</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold opacity-60 uppercase tracking-wider mb-1.5">これまでの経歴</label>
                <textarea
                  rows={3}
                  value={editForm.careerSummary}
                  onChange={(e) => setEditForm({...editForm, careerSummary: e.target.value})}
                  className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-simplex-border flex justify-end gap-3 bg-simplex-bg/50 shrink-0 rounded-b-2xl">
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