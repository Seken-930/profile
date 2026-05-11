import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout' // さっき作ったLayoutをインポート
import UserListPage from './UserListPage'
import UserDetailPage from './UserDetailPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            {/* すべての画面をLayoutで包む */}
            <Layout>
                <Routes>
                    <Route path="/" element={<UserListPage />} />
                    <Route path="/users" element={<UserListPage />} />
                    <Route path="/user/:id" element={<UserDetailPage />} />
                    {/* プロフィールや投稿画面も今後ここに足していきます */}
                    <Route path="/profile" element={<div>プロフィール画面（作成中）</div>} />
                    <Route path="/post" element={<div>投稿画面（作成中）</div>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>,
)