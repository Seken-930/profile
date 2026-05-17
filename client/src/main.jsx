import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Layout from './components/Layout'
import UserListPage from './pages/UserListPage'
import UserDetailPage from './pages/UserDetailPage'
import PostDetailPage from "./pages/PostDetail.tsx";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/users" element={<UserListPage />} />
                    <Route path="/user/:id" element={<UserDetailPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/posts" element={<PostListPage />} />
                    <Route path="/post/:id" element={<PostDetailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)