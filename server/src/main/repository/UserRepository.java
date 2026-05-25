package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}


//package com.example.demo.repository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public class UserRepository {
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
//    public boolean existsById(Long id) {
//        String sql = "SELECT COUNT(*) FROM users WHERE id = ?";
//        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
//        return count != null && count > 0;
//    }
//}