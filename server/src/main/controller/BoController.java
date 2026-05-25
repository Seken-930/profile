import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    // 1. 本の一覧を取得するAPI (Reactの初回読み込み時)
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
        // ※Entity（Book）をそのままJSONにしてReactへ返します
    }

    // 2. 本を借りるAPI (Reactの「借りる」ボタン)
    @PostMapping("/{bookId}/borrow")
    public void borrowBook(@PathVariable Long bookId, @RequestBody Map<String, Long> request) {
        // リクエストのbodyからuserIdを取り出してServiceに渡す
        Long userId = request.get("userId");
        bookService.borrowBook(bookId, userId);
    }

    // 3. 本を返すAPI (Reactの「返却する」ボタン)
    @PostMapping("/{bookId}/return")
    public void returnBook(@PathVariable Long bookId) {
        bookService.returnBook(bookId);
    }
}