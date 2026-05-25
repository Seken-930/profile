@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BorrowHistoryRepository borrowHistoryRepository;

    // 貸出処理
    @Transactional
    public void borrowBook(Long bookId, Long userId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("本が見つかりません"));

        if (book.isBorrowed()) {
            throw new IllegalStateException("この本は既に貸出中です");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("ユーザーが見つかりません"));

        // 1. 本のステータスを貸出中に更新
        book.setBorrowed(true);
        bookRepository.save(book);

        // 2. 履歴に新規登録
        BorrowHistory history = new BorrowHistory();
        history.setBook(book);
        history.setUser(user);
        history.setBorrowedAt(LocalDateTime.now());
        borrowHistoryRepository.save(history);
    }

    // 返却処理
    @Transactional
    public void returnBook(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("本が見つかりません"));

        // 1. 本のステータスを返却可能に更新
        book.setBorrowed(false);
        bookRepository.save(book);

        // 2. 未返却の履歴を探して返却日時を入れる
        BorrowHistory history = borrowHistoryRepository.findByBookIdAndReturnedAtIsNull(bookId)
                .orElseThrow(() -> new IllegalStateException("貸出履歴が見つかりません"));

        history.setReturnedAt(LocalDateTime.now());
        borrowHistoryRepository.save(history);
    }
}


//package com.example.demo.service;
//
//import com.example.demo.repository.BookRepository;
//import com.example.demo.repository.BorrowHistoryRepository;
//import com.example.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//public class BookService {
//
//    @Autowired
//    private BookRepository bookRepository;
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private BorrowHistoryRepository borrowHistoryRepository;
//
//    @Transactional
//    public void borrowBook(Long bookId, Long userId) {
//        Boolean isBorrowed = bookRepository.isBorrowed(bookId);
//        if (isBorrowed == null) {
//            throw new IllegalArgumentException("本が見つかりません");
//        }
//        if (isBorrowed) {
//            throw new IllegalStateException("この本は既に貸出中です");
//        }
//        if (!userRepository.existsById(userId)) {
//            throw new IllegalArgumentException("ユーザーが見つかりません");
//        }
//
//        // 1. 本を貸出中にする
//        bookRepository.updateBorrowedStatus(bookId, true);
//
//        // 2. 貸出履歴を作る
//        borrowHistoryRepository.insertHistory(userId, bookId);
//    }
//
//    @Transactional
//    public void returnBook(Long bookId) {
//        Boolean isBorrowed = bookRepository.isBorrowed(bookId);
//        if (isBorrowed == null) {
//            throw new IllegalArgumentException("本が見つかりません");
//        }
//
//        // 1. 本を返却可能に戻す
//        bookRepository.updateBorrowedStatus(bookId, false);
//
//        // 2. 貸出履歴に返却時間を記録する
//        int updated = borrowHistoryRepository.updateReturnTime(bookId);
//        if (updated == 0) {
//            throw new IllegalStateException("未返却の貸出履歴が見つかりません");
//        }
//    }
//}