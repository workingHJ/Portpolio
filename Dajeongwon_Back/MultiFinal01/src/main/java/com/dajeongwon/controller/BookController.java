package com.dajeongwon.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dajeongwon.model.service.BookService;
import com.dajeongwon.model.vo.Book;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/art")
public class BookController {
    private final BookService service;

    @Autowired
    public BookController(BookService bookService) {
        this.service = bookService;
    }

    @GetMapping("/bookList")
    public List<Book> getBookList(@RequestParam("searchType") String searchType,
                                  @RequestParam("searchTerm") String searchTerm,
                                  @RequestParam("sort") String sort) {
        return service.getBookList(searchType, searchTerm, sort, 30);
    }

    @GetMapping("/bookRecommend")
    public List<Book> getRecommendList(@RequestParam("CategoryId") String CategoryId) {
        return service.getRecommendList(CategoryId);
    }
    
    @GetMapping("/newBookList")
    public List<Book> getNewList(@RequestParam("count") int count) {
    	return service.getNewList(count);
    }
    
    @GetMapping("/mainBooks")
    public ResponseEntity<Map<String, Object>> getMainBooks(@RequestParam("count") int count) {
    	Map<String, Object> map = new HashMap<>();
    	List<Book> bookList = service.getNewList(count);
    	map.put("result", true);
    	map.put("bookList", bookList);
    	return ResponseEntity.status(HttpStatus.OK).body(map);
    }

    @GetMapping("/bestSellsList")
    public List<Book> getBestSellsList() {
    	//원한다면 param에 int count 추가해서 개수제한 편하게 할 수 있음 
    	return service.getBestSellsList(5);
    }

    @GetMapping("/bookDetail")
    public Book getBookDetail(@RequestParam("id") String isbn13) {
    	Book result = service.getBookDetail(isbn13);
    	return result;
    }
    

}
