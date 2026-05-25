package com.example.demo.repository;

import com.example.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}


//package com.example.demo.repository;
//
//import com.example.demo.entity.Book;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//import java.util.List;
//
//@Repository
//public class BookRepository {
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    // 全件取得
//    public List<Book> findAll() {
//        String sql = "SELECT * FROM books";
//        return jdbcTemplate.query(sql, (rs, rowNum) -> {
//            Book book = new Book();
//            book.setId(rs.getLong("id"));
//            book.setTitle(rs.getString("title"));
//            book.setBorrowed(rs.getBoolean("is_borrowed"));
//            return book;
//        });
//    }
//
//    // 貸出ステータスの更新
//    public int updateBorrowedStatus(Long id, boolean isBorrowed) {
//        String sql = "UPDATE books SET is_borrowed = ? WHERE id = ?";
//        return jdbcTemplate.update(sql, isBorrowed, id);
//    }
//
//    // 本の存在と現在の状態をチェック
//    public Boolean isBorrowed(Long id) {
//        String sql = "SELECT is_borrowed FROM books WHERE id = ?";
//        try {
//            return jdbcTemplate.queryForObject(sql, Boolean.class, id);
//        } catch (Exception e) {
//            return null; // 見つからない場合
//        }
//    }
//}