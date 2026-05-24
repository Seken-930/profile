import React from "react";
import { useParams } from "react-router-dom"; // URLから投稿IDを取得するため
import { Edit, MessageSquare, Heart, Share2 } from "lucide-react";

// 🚀 JSONデータをインポート
import dummyUsers from "../data/dummyUsers.json";
import dummyPosts from "../data/dummyPosts.json";

export default function PostDetail() {
    // 1. URLから投稿IDを取得（例: /posts/1 なら id="1" になる）
    const { id } = useParams<{ id: string }>();

    // 2. 該当する投稿を dummyPosts から探す（見つからなければ1件目を表示）
    const post: any = dummyPosts.find((p: any) => String(p.id) === id) || dummyPosts[0];

    // 3. その投稿を書いた人を dummyUsers から探す
    // ※投稿データの中に authorId (または hrid) がある想定です。無ければダミーユーザーを生成します。
    const author: any = dummyUsers.find((u: any) => u.hrid === post.authorId) || {
        familyName: "名無し",
        givenName: "",
        department: "部署未設定"
    };

    // タグリストの取得（文字列とオブジェクトの両方に対応）
    const tagList = post.postTag || post.tags || [];

    return (
        <div className="max-w-5xl mx-auto pb-20 text-simplex-text">

            {/* 上部パンくずリスト */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="text-sm text-slate-500 font-medium truncate">
                    ホーム {'>'} 投稿一覧 {'>'} <span className="text-simplex-green font-bold">[{post.title ? post.title.substring(0, 20) : "タイトルなし"}...]</span>
                </div>
            </div>

            {/* メイン記事カード */}
            <div className="bg-white rounded-3xl border border-simplex-border shadow-sm overflow-hidden relative">

                <div className="p-8 md:p-12 lg:px-16 lg:py-14">

                    {/* 記事ヘッダー（投稿者情報 ＆ メタ情報） */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
                        {/* 左側：投稿者 */}
                        <div className="flex items-center gap-4 cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-simplex-light text-simplex-green flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform shrink-0">
                                {author.familyName ? author.familyName[0] : "U"}
                            </div>
                            <div>
                                <div className="font-bold text-lg group-hover:text-simplex-green transition-colors">
                                    {author.familyName} {author.givenName}
                                </div>
                                <div className="text-xs font-medium text-slate-500">
                                    {author.department}
                                </div>
                            </div>
                        </div>

                        {/* 右側：日付とアクション数 */}
                        <div className="flex items-center gap-5 text-slate-500 font-bold text-sm">
                            <span>{post.date || "日付未設定"}</span>
                            <button className="hover:text-simplex-green transition-colors"><Edit className="w-5 h-5" /></button>
                            {/* いいね・コメント数はダミーとして固定値を入れています */}
                            <div className="flex items-center gap-1.5"><MessageSquare className="w-5 h-5" /> 14</div>
                            <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors"><Heart className="w-5 h-5" /> 98</button>
                        </div>
                    </div>

                    {/* 📝 タイトル ＆ タグ */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                        {post.title || "無題の投稿"}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-10">
                        {tagList.map((tag: any, idx: number) => {
                            const tagName = typeof tag === "string" ? tag : tag.name;
                            return (
                                <span key={idx} className="px-3 py-1.5 text-sm font-bold rounded-md bg-simplex-bg border border-simplex-border text-simplex-text">
                  #{tagName}
                </span>
                            );
                        })}
                    </div>

                    {/* 記事本文エリア */}
                    <div className="prose prose-lg max-w-none text-slate-700 leading-loose">
                        {/* 本文データ（post.content）があればそれを表示し、無ければ画像のダミーテキストを表示 */}
                        {post.content ? (
                            <div className="whitespace-pre-wrap">{post.content}</div>
                        ) : (
                            <>
                                <p>
                                    人が認知したくないUIを考えるのが好きです。子育てをとおして感じるのは、シンプルで直感的な操作がどれほど重要か。本記事では、未経験の私がプロジェクト管理を始めた際のエピソードを紐解きながら見ることにします。
                                </p>

                                <h2 className="text-2xl font-bold text-simplex-text border-l-4 border-simplex-green pl-4 my-8">
                                    チームの課題と向き合う
                                </h2>

                                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                                    <div className="flex-1">
                                        <p className="mb-4">
                                            チームの課題に毎日向き合うのは大変ですが、同時にやりがいでもあります。マテリアルデザインには、シンプルで直感的な操作が組み込まれているので、目的的な導線やアクションが伝わりやすくなっています。
                                        </p>
                                        <p>
                                            初めてチームで開発を行った際、営業担当者たちとのミーティングが非常に良いインプットになりました。
                                        </p>
                                    </div>
                                    {/* イラストのダミープレースホルダー */}
                                    <div className="w-full md:w-1/3 bg-simplex-bg rounded-2xl p-6 border border-simplex-border flex justify-center items-center">
                                        <div className="text-center opacity-50">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-2 text-simplex-green" />
                                            <span className="text-xs font-bold">Illustration Space</span>
                                        </div>
                                    </div>
                                </div>

                                {/* コードブロック */}
                                <div className="my-8 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="bg-slate-800 px-4 py-2 flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <pre className="bg-slate-900 text-slate-50 p-6 overflow-x-auto text-sm font-mono leading-relaxed m-0 rounded-none">
<code className="text-blue-300">const</code> <code className="text-yellow-200">makeProject</code> <code className="text-slate-50">=</code> <code className="text-purple-300">()</code> <code className="text-purple-300">{'=>'}</code> <code className="text-yellow-300">{'{'}</code>{'\n'}
                                        <code className="text-blue-300">return</code> <code className="text-purple-300">(</code><code className="text-slate-50">state</code><code className="text-purple-300">)</code> <code className="text-purple-300">{'=>'}</code> <code className="text-purple-300">{'{'}</code>{'\n'}
                                        <code className="text-slate-50">console.</code><code className="text-blue-200">log</code><code className="text-blue-300">(</code><code className="text-green-300">'start name!'</code><code className="text-slate-50">, setItems()</code><code className="text-blue-300">)</code><code className="text-slate-50">;</code>{'\n'}
                                        <code className="text-purple-300">{'}'}</code><code className="text-slate-50">;</code>{'\n'}
                                        <code className="text-yellow-300">{'}'}</code>
                  </pre>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* フッター装飾（街並みのアートワーク） */}
                <div className="w-full h-32 relative bg-simplex-headerBg border-t border-simplex-border/50 overflow-hidden mt-10">
                    <svg className="absolute bottom-0 w-full h-full text-simplex-border" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 100H1000V80C900 80 850 60 750 60C650 60 600 90 500 90C400 90 350 50 250 50C150 50 100 80 0 80V100Z" fill="currentColor" opacity="0.3"/>
                        <rect x="150" y="40" width="40" height="60" rx="2" fill="currentColor" opacity="0.5"/>
                        <rect x="200" y="20" width="50" height="80" rx="2" fill="currentColor" opacity="0.4"/>
                        <rect x="260" y="50" width="35" height="50" rx="2" fill="currentColor" opacity="0.6"/>
                        <rect x="700" y="30" width="45" height="70" rx="2" fill="currentColor" opacity="0.5"/>
                        <rect x="760" y="10" width="55" height="90" rx="2" fill="currentColor" opacity="0.4"/>
                        <circle cx="350" cy="70" r="20" fill="currentColor" opacity="0.5"/>
                        <circle cx="650" cy="60" r="25" fill="currentColor" opacity="0.5"/>
                    </svg>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-simplex-border">
                        <button className="flex items-center gap-2 text-slate-600 hover:text-rose-500 font-bold transition-colors">
                            <Heart className="w-5 h-5" /> <span>いいね！</span>
                        </button>
                        <div className="w-px h-5 bg-slate-300"></div>
                        <button className="flex items-center gap-2 text-slate-600 hover:text-blue-500 font-bold transition-colors">
                            <Share2 className="w-5 h-5" /> <span>シェア</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}