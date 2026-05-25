package com.example.demo.repository;

import com.example.demo.entity.BorrowHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BorrowHistoryRepository extends JpaRepository<BorrowHistory, Long> {
    Optional<BorrowHistory> findByBookIdAndReturnedAtIsNull(Long bookId);
}



//package com.example.demo.repository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class BorrowHistoryRepository {
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    // 履歴の新規作成（借りる時）
//    public void insertHistory(Long userId, Long bookId) {
//        String sql = "INSERT INTO borrow_histories (user_id, book_id, borrowed_at, returned_at) VALUES (?, ?, NOW(), NULL)";
//        jdbcTemplate.update(sql, userId, bookId);
//    }
//
//    // 履歴の更新（返す時：未返却のレコードに現在時刻を入れる）
//    public int updateReturnTime(Long bookId) {
//        String sql = "UPDATE borrow_histories SET returned_at = NOW() WHERE book_id = ? AND returned_at IS NULL";
//        return jdbcTemplate.update(sql, bookId);
//    }
//}