import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Layout from './components/Layout'
import UserListPage from './pages/UserListPage'
import UserDetailPage from './pages/UserDetailPage'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<UserListPage />} />
                    <Route path="/users" element={<UserListPage />} />
                    <Route path="/user/:id" element={<UserDetailPage />} />
                    <Route path="/profile" element={<div className="p-10">プロフィール画面（開発中）</div>} />
                    <Route path="/post" element={<div className="p-10">投稿画面（開発中）</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)