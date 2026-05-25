import React, { useState, useEffect } from 'react';

function BookList() {
    const [books, setBooks] = useState([]);
    const currentUserId = 1; // 演習用に対象ユーザーIDを固定
    const API_URL = 'http://localhost:8080/api/books';

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(err => console.error('エラー:', err));
    }, []);

    const handleBorrow = (bookId) => {
        fetch(`${API_URL}/${bookId}/borrow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUserId })
        }).then(res => {
            if (res.ok) {
                setBooks(books.map(book =>
                    book.id === bookId ? { ...book, borrowed: true } : book
                ));
            }
        });
    };

    const handleReturn = (bookId) => {
        fetch(`${API_URL}/${bookId}/return`, {
            method: 'POST'
        }).then(res => {
            if (res.ok) {
                setBooks(books.map(book =>
                    book.id === bookId ? { ...book, borrowed: false } : book
                ));
            }
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>図書貸出管理（演習）</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id} style={{ margin: '10px 0', fontSize: '18px' }}>
                        <span style={{ marginRight: '15px' }}>{book.title}</span>

                        {book.borrowed ? (
                            <>
                                <span style={{ color: 'red', marginRight: '10px' }}>貸出中</span>
                                <button onClick={() => handleReturn(book.id)}>返却する</button>
                            </>
                        ) : (
                            <button onClick={() => handleBorrow(book.id)}>借りる</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;