import React from 'react';
import BookList from './components/BookList'; // 作成したファイルをインポート

function App() {
    return (
        <div className="App">
            {/* ここでBookListコンポーネントを呼び出す */}
            <BookList />
        </div>
    );
}

export default App;