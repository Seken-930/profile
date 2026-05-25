import React, { useState, useEffect } from "react";
import {
  Edit, X, User as UserIcon, Briefcase, Mail, Building,
  CreditCard, FileText, Lightbulb, Loader2
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import { Profile } from "../types/profile";
import dummyPosts from "../data/dummyPosts.json";

// テスト用のダミープロフィールデータ
const DUMMY_PROFILE: Profile = {
  hrid: "20260401",
  name: "ken.sekiguchi@example.com",
  email: "ken.sekiguchi@example.com",
  familyName: "関口",
  givenName: "賢",
  department: "開発部",
  position: "エンジニア",
  bio: "大学院で情報学を専攻し、LODやセマンティックウェブ技術の研究を行っています。また、添削業務のリーダーとしてチームマネジメントも経験しました。\nユーザー視点を大切にしながら、使いやすいUI実装を目指しています。",
  careerSummary: "・Javaを用いたバックエンドシステムの開発\n・React/TypeScriptを用いたフロントエンドの実装\n・組織内のワークフロー管理とマニュアル作成",
  wantToDo: "・モダンなReact（Hooksや状態管理）の実装スキルの向上\n・ゴルフでさらにスコアを伸ばすためのセッティング探求",
  selfTag: [
    { id: 1, name: "React" },
    { id: 2, name: "Java" },
    { id: 3, name: "マネジメント" }
  ],
  posts: [
    { id: "1", title: "ダミー", postTag: [] as { id: number; name: string }[] },
  ]
};

// 💡 編集モーダル用のタグ一覧
const AVAILABLE_TAGS = [
  { id: 1, name: "React" },
  { id: 2, name: "Java" },
  { id: 3, name: "マネジメント" },
  { id: 4, name: "TypeScript" },
  { id: 5, name: "LOD" },
];

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

  //プロフィール取得（モック）
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
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

  // 編集モーダル
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

  // タグの付け外し
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

  // 保存処理
  const handleSave = async () => {
    if (!currentUser) return;

    try {
      // 基本情報用のリクエストボディ（selfTagを含めない）
      const profileRequestBody = {
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
        posts: currentUser.posts
      };

      // タグ更新用のリクエストボディ（APIの仕様に合わせて形を変えてください）
      const tagsRequestBody = {
        hrid: currentUser.hrid,
        tags: editForm.selfTag
      };

      // つのAPIリクエストを並行して送信する（Promise.allを使用）
      await Promise.all([
        // 例: 基本情報を更新するAPI
        // api.put('/users/profile', profileRequestBody),
        new Promise(resolve => setTimeout(resolve, 300)),

        // 例: タグ情報を更新するAPI
        // api.put('/users/tags', tagsRequestBody)
        new Promise(resolve => setTimeout(resolve, 300))
      ]);

      // フロントエンドの表示（State）を更新
      setCurrentUser({
        ...profileRequestBody,
        selfTag: editForm.selfTag // 画面表示用にタグを結合
      });

      setIsEditModalOpen(false);
      alert("プロフィールとタグを更新しました！");

    } catch (error) {
      console.error("更新エラー:", error);
      alert("保存に失敗しました。");
    }
  };

  // 保存処理（モック）
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

      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentUser(requestBody);
      setIsEditModalOpen(false);
      alert("プロフィールを更新しました！（※テスト用）");
    } catch (error) {
      console.error("更新エラー:", error);
      alert("保存に失敗しました。");
    }
  };

  if (isLoading) {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-simplex-green" />
          <p className="text-sm font-semibold">読み込み中...</p>
        </div>
    );
  }

  if (!currentUser) {
    return <div className="p-20 text-center text-slate-500">ユーザー情報の取得に失敗しました。</div>;
  }

  // 従来通りの投稿一覧の取得処理
  const myPosts = dummyPosts.slice(0, 3) as any[]; // モックテスト用

  return (
      <div className="max-w-6xl mx-auto space-y-6 pb-20 text-simplex-text">

        {/* 📌 ヘッダーバー */}
        <div className="flex justify-between items-center mb-6">
          <div>
          <span className="text-sm text-slate-500 font-medium">
            ホーム {'>'} 社内のひと {'>'} {currentUser.familyName} {currentUser.givenName}
          </span>
          </div>
          <button
              onClick={handleOpenEdit}
              className="px-4 py-2 bg-white border border-simplex-border hover:bg-simplex-bg transition-colors text-sm font-bold rounded-lg flex items-center gap-2 shadow-sm text-simplex-text"
          >
            <Edit className="w-4 h-4 opacity-70" />
            プロフィールを編集
          </button>
        </div>

        {/* メインプロフィールカード */}
        <div className="bg-simplex-headerBg rounded-3xl p-10 relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8 border border-simplex-border/50 shadow-sm">
          {/* 背景の装飾イメージ*/}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <svg width="400" height="200" viewBox="0 0 400 200" className="fill-simplex-green"><path d="M0,200 L50,120 L150,160 L250,80 L350,130 L400,60 L400,200 Z" /></svg>
          </div>

          {/* アイコン */}
          <div className="w-40 h-40 rounded-full border-4 border-white shadow-md overflow-hidden z-10 shrink-0 bg-white">
            <div className="w-full h-full bg-simplex-light flex items-center justify-center text-simplex-green font-bold text-4xl">
              {currentUser.familyName ? currentUser.familyName[0] : "U"}
            </div>
          </div>

          {/* ユーザー情報 */}
          <div className="z-10 space-y-5 flex-1 w-full text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {currentUser.familyName} {currentUser.givenName}
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="flex items-center gap-1.5 px-4 py-1.5 bg-white rounded-full text-sm font-bold shadow-sm border border-simplex-border/50 text-simplex-text">
              <Building className="w-4 h-4 opacity-50" /> {currentUser.department}
            </span>
              <span className="flex items-center gap-1.5 px-4 py-1.5 bg-white rounded-full text-sm font-bold shadow-sm border border-simplex-border/50 text-simplex-text">
              <Briefcase className="w-4 h-4 opacity-50" /> {currentUser.position}
            </span>
            </div>

            <p className="text-sm leading-relaxed font-medium whitespace-pre-wrap max-w-2xl text-slate-700">
              {currentUser.bio}
            </p>
          </div>
        </div>

        {/* 2カラムレイアウト部分 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* 左カラム：基本情報 */}
          <div className="bg-white border border-simplex-border rounded-3xl p-8 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-8 border-b border-simplex-border pb-4">
              <UserIcon className="w-5 h-5" /> 基本情報
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-500 w-40 flex items-center gap-2 mb-1 sm:mb-0">
                <CreditCard className="w-4 h-4" /> 社員番号
              </span>
                <span className="text-sm font-semibold text-simplex-text">{currentUser.hrid}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-500 w-40 flex items-center gap-2 mb-1 sm:mb-0">
                <Mail className="w-4 h-4" /> メールアドレス
              </span>
                <span className="text-sm font-semibold text-simplex-text">{currentUser.email}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-500 w-40 flex items-center gap-2 mb-1 sm:mb-0">
                <Building className="w-4 h-4" /> 部署
              </span>
                <span className="text-sm font-semibold text-simplex-text">{currentUser.department}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center py-2">
              <span className="text-sm font-bold text-slate-500 w-40 flex items-center gap-2 mb-1 sm:mb-0">
                <Briefcase className="w-4 h-4" /> 職種 (役職)
              </span>
                <span className="text-sm font-semibold text-simplex-text">{currentUser.position}</span>
              </div>
            </div>
          </div>

          {/* 右カラム：経歴 ＆ やりたいこと */}
          <div className="space-y-6">

            {/* 経歴 */}
            <div className="bg-white border border-simplex-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6 border-b border-simplex-border pb-4">
                <FileText className="w-5 h-5" /> 経歴
              </h2>
              <div className="text-sm leading-relaxed font-medium text-slate-700 whitespace-pre-wrap pl-2 border-l-2 border-simplex-light">
                {currentUser.careerSummary || "経歴が未設定です。"}
              </div>
            </div>

            {/* 今後やりたいこと */}
            <div className="bg-white border border-simplex-border rounded-3xl p-8 shadow-sm">
              <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2 mb-6 border-b border-simplex-border pb-4">
                <Lightbulb className="w-5 h-5" /> 今後やりたいこと
              </h2>
              <div className="text-sm leading-relaxed font-medium text-slate-700 whitespace-pre-wrap pl-2 border-l-2 border-simplex-light">
                {currentUser.wantToDo || "今後やりたいことが未設定です。"}
              </div>
            </div>

          </div>
        </div>

        {/* 投稿一覧（※従来のコード） */}
        <div className="bg-white border border-simplex-border rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-simplex-border pb-4">
            <h2 className="text-lg font-bold text-simplex-green flex items-center gap-2">
              <FileText className="w-5 h-5" /> 投稿一覧
            </h2>
            <button className="text-sm font-bold text-slate-500 hover:text-simplex-green transition-colors">
              すべての投稿を見る {'>'}
            </button>
          </div>

          <div className="space-y-3">
            {myPosts.length > 0 ? myPosts.map((p, index) => (
                <div key={index} className="p-4 bg-simplex-bg border border-simplex-border rounded-xl flex justify-between items-center group">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold group-hover:text-simplex-green transition-colors cursor-pointer">{p.title || "投稿タイトル"}</h4>
                  </div>
                  <span className="text-xs font-mono opacity-50 shrink-0 ml-4">{p.date || "2026-05-24"}</span>
                </div>
            )) : (
                <div className="p-8 text-center text-sm opacity-50 border border-dashed border-simplex-border rounded-xl">まだ投稿はありません。</div>
            )}
          </div>
        </div>

        {/* 編集モーダル*/}
        {isEditModalOpen && (
            // ...（前回のモーダル部分と全く同じ省略せずに配置）
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white border border-simplex-border rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
                {/* モーダルヘッダー */}
                <div className="px-6 py-5 border-b border-simplex-border flex justify-between items-center bg-simplex-bg shrink-0 rounded-t-3xl">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <UserIcon className="w-4.5 h-4.5 text-simplex-green" /> プロフィールの編集
                  </h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="opacity-50 hover:opacity-100 hover:bg-simplex-border p-1.5 rounded-lg transition-all">
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* モーダルボディ */}
                <div className="p-6 space-y-5 overflow-y-auto">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">姓</label>
                      <input
                          type="text"
                          value={editForm.familyName}
                          onChange={(e) => setEditForm({...editForm, familyName: e.target.value})}
                          className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">名</label>
                      <input
                          type="text"
                          value={editForm.givenName}
                          onChange={(e) => setEditForm({...editForm, givenName: e.target.value})}
                          className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">職種 (ポジション)</label>
                    <input
                        type="text"
                        value={editForm.position}
                        onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                        className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">自己紹介 (Bio)</label>
                    <textarea
                        rows={3}
                        value={editForm.bio}
                        onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                        className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">経歴</label>
                    <textarea
                        rows={3}
                        value={editForm.careerSummary}
                        onChange={(e) => setEditForm({...editForm, careerSummary: e.target.value})}
                        className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">今後やりたいこと</label>
                    <textarea
                        rows={2}
                        value={editForm.wantToDo}
                        onChange={(e) => setEditForm({...editForm, wantToDo: e.target.value})}
                        className="w-full px-3 py-2 border border-simplex-border bg-simplex-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-simplex-green/50 text-sm font-medium resize-none"
                    />
                  </div>

                  {/* タグ選択 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">自己紹介タグ</label>
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
                                        : "bg-white text-simplex-text border-simplex-border hover:bg-simplex-bg"
                                }`}
                            >
                              {tag.name}
                            </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* モーダルフッター */}
                <div className="px-6 py-5 border-t border-simplex-border flex justify-end gap-3 bg-simplex-bg shrink-0 rounded-b-3xl">
                  <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-5 py-2 border border-simplex-border bg-white hover:bg-simplex-border text-sm font-bold rounded-lg transition-colors text-simplex-text"
                  >
                    キャンセル
                  </button>
                  <button
                      onClick={handleSave}
                      className="px-5 py-2 bg-simplex-green hover:bg-simplex-green/90 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
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