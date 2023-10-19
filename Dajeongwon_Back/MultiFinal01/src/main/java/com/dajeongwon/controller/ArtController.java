package com.dajeongwon.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.dajeongwon.model.service.ArtService;
import com.dajeongwon.model.service.BookService;
import com.dajeongwon.model.service.ExhibitionService;
import com.dajeongwon.model.service.MovieService;
import com.dajeongwon.model.service.PerformanceService;
import com.dajeongwon.model.vo.Art;
import com.dajeongwon.model.vo.Book;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Movie;
import com.dajeongwon.model.vo.Perform;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

@Controller
@RequestMapping("/art")
public class ArtController {
	
	// 작품 목록에 CRUD 하는 컨트롤러 
	
	@Autowired
	private ArtService service;
	
	@Autowired
	private BookService bookService;
	
	@Autowired
	private MovieService movieService;
	
	@Autowired
	private ExhibitionService exhibitionService;
	
	@Autowired
	private PerformanceService performService;
	
	@PostMapping("/insertBookToGarden")
	public ResponseEntity<String> insertToGarden (@RequestBody Map<String, Object> data){
		//data 는 params 안에 JSON 담고 있음, 그래서 dataMap으로 한번 분리 (궁금하면 syso로 data 출력해보세요)
		Map<String, Object> dataMap = (Map<String, Object>) data.get("params");
		
		// dataMap에는 gNo = 4, book = ~~~, category = ~~~, 하는 식으로 Map이 들어 있음. 그래서 하나씩 분리해주기 
	    int gNo = (int) dataMap.get("gNo");
	    String category = (String) dataMap.get("category");
	    Book book = new ObjectMapper().convertValue(dataMap.get("book"), Book.class);
	    
		Art art = new Art();				// ArtTable. 아래 고쳐서 써야 함.
		art.setTitle(book.getTitle());		//	title 
		art.setCreator(book.getAuthor());	//	작가, 감독, 제작사, 전시회장
		art.setCategory(category);			// 카테고리
		art.setAImg(book.getCover());		// 이미지 
		art.setGNo(gNo);					//	gNo
		art.setBNo(book.getBNo());			// 	bNo
		
		int result = service.insertToGarden(art, category);
		
		if(result == -1) {
			return ResponseEntity.ok("이미 추가되어 있는 작품입니다.");
		} else if(result == 1) {
			return ResponseEntity.ok("정원에 추가되었습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문제생김");
		}
	}
	
	@PostMapping("/insertMovieToGarden")
	public ResponseEntity<String> insertMovieToGarden (@RequestBody Map<String, Object> data){
		//data 는 params 안에 JSON 담고 있음, 그래서 dataMap으로 한번 분리 (궁금하면 syso로 data 출력해보세요)
		Map<String, Object> dataMap = (Map<String, Object>) data.get("params");
		
		// dataMap에는 gNo = 4, book = ~~~, category = ~~~, 하는 식으로 Map이 들어 있음. 그래서 하나씩 분리해주기 
		int gNo = (int) dataMap.get("gNo");
		String category = (String) dataMap.get("category");
		Movie movie = new ObjectMapper().convertValue(dataMap.get("movie"), Movie.class);
		
		Art art = new Art();				// ArtTable. 아래 고쳐서 써야 함.
		art.setTitle(movie.getTitle());		//	title 
		art.setCreator(movie.getDirectorNm());	//	작가, 감독, 제작사, 전시회장
		art.setCategory(category);			// 카테고리
		art.setAImg(movie.getPosters());		// 이미지 
		art.setGNo(gNo);					//	gNo
		art.setMvNo(movie.getMvno());			//  mvno
		
		int result = service.insertToGarden(art, category);
		
		if(result == -1) {
			return ResponseEntity.ok("이미 추가되어 있는 작품입니다.");
		} else if(result == 1) {
			return ResponseEntity.ok("정원에 추가되었습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문제생김");
		}
	}
	
	@PostMapping("/insertExhibitionToGarden")
	public ResponseEntity<String> insertExhibitionToGarden (@RequestBody Map<String, Object> data){
		//data 는 params 안에 JSON 담고 있음, 그래서 dataMap으로 한번 분리 (궁금하면 syso로 data 출력해보세요)
		Map<String, Object> dataMap = (Map<String, Object>) data.get("params");
		
		// dataMap에는 gNo = 4, book = ~~~, category = ~~~, 하는 식으로 Map이 들어 있음. 그래서 하나씩 분리해주기 
		int gNo = (int) dataMap.get("gNo");
		String category = (String) dataMap.get("category");
		Exhibition exhibition = new ObjectMapper().convertValue(dataMap.get("exhibition"), Exhibition.class);
		
		Art art = new Art();				// ArtTable. 아래 고쳐서 써야 함.
		art.setTitle(exhibition.getTitle());		//	title 
		art.setCreator(exhibition.getPlace());	//	작가, 감독, 제작사, 전시회장
		art.setCategory(category);			// 카테고리
		art.setAImg(exhibition.getImgUrl());		// 이미지 
		art.setGNo(gNo);					//	gNo
		art.setSeq(exhibition.getSeq());			//  id값(식별값)
		
		int result = service.insertToGarden(art, category);
		
		if(result == -1) {
			return ResponseEntity.ok("이미 추가되어 있는 작품입니다.");
		} else if(result == 1) {
			return ResponseEntity.ok("정원에 추가되었습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문제생김");
		}
	}
	
	@PostMapping("/insertPerformToGarden")
	public ResponseEntity<String> insertPerformToGarden (@RequestBody Map<String, Object> data){
		//data 는 params 안에 JSON 담고 있음, 그래서 dataMap으로 한번 분리 (궁금하면 syso로 data 출력해보세요)
		Map<String, Object> dataMap = (Map<String, Object>) data.get("params");
		
		// dataMap에는 gNo = 4, book = ~~~, category = ~~~, 하는 식으로 Map이 들어 있음. 그래서 하나씩 분리해주기 
		int gNo = (int) dataMap.get("gNo");
		String category = (String) dataMap.get("category");
		Gson gson = new Gson();
		Perform perform = gson.fromJson(gson.toJson(dataMap.get("perform")), Perform.class);
		
		Art art = new Art();					// ArtTable. 아래 고쳐서 써야 함.
		art.setTitle(perform.getPrfnm());		//	title 
		art.setCreator(perform.getFcltynm());	//	작가, 감독, 제작사, 전시회장
		art.setCategory(category);				// 카테고리
		art.setAImg(perform.getPoster());		// 이미지 
		art.setGNo(gNo);						//	gNo
		art.setMt20id(perform.getMt20id());		//  id값(식별값)
		
		int result = service.insertToGarden(art, category);
		
		if(result == -1) {
			return ResponseEntity.ok("이미 추가되어 있는 작품입니다.");
		} else if(result == 1) {
			return ResponseEntity.ok("정원에 추가되었습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문제생김");
		}
	}
	
	@GetMapping("/searchArt")
	public ResponseEntity<Map<String,Object>> searchArt (@RequestParam("title") String title, @RequestParam("category") String category, @RequestParam("limit") int limit){
		
		System.err.println("searchArt 호출!!!!!!!!!!");
		
		Map<String, Object> paramMap = new HashMap<>();
		
		System.err.println(title + category + limit);
		
		
		List<Art> artResult = new ArrayList<>();
		
		if(		category.equals("movie")) {
			paramMap.put("searchTerm", title);
			paramMap.put("searchType", "Title");
			List<Movie> movieList = movieService.searchMovies(paramMap);
			for(Movie movie : movieList) {
				Art art = new Art();
				art.setTitle(movie.getTitle());
				art.setAImg(movie.getPosters());
				art.setCreator(movie.getDirectorNm());
				art.setCategory("movie");
				art.setMvNo(movie.getMvno());
				
				artResult.add(art);
			}
		}else if(category.equals("exhibition")) {
			paramMap.put("limit", 30);
			paramMap.put("offset", 0);
			paramMap.put("title", title);
			List<Exhibition> exhibitionList = exhibitionService.searchExhibition(paramMap);
			
			for(Exhibition exhibition : exhibitionList) {
				Art art = new Art();
				art.setTitle(exhibition.getTitle());
				art.setCreator(exhibition.getPlace());
				art.setAImg(exhibition.getImgUrl());
				art.setCategory("exhibition");
				art.setSeq(exhibition.getSeq());
				artResult.add(art);
			}
			
		}else if(category.equals("perform")) {
			paramMap.put("limit", 30);
			paramMap.put("offset", 0);
			paramMap.put("prfnm", title);
			List<Perform> performList = performService.searchPerformance(paramMap);
			
			for(Perform perform : performList) {
				Art art = new Art();
				art.setTitle(perform.getPrfnm());
				art.setCreator(perform.getFcltynm());
				art.setAImg(perform.getPoster());
				art.setCategory("perform");
				art.setMt20id(perform.getMt20id());
				artResult.add(art);
			}
		}else if(category.equals("book")) {
			String sort = "Accuracy";
			List<Book> bookList = bookService.getBookList("title", title, sort, limit);
			
			for(Book book : bookList) {
				Art art = new Art();
				art.setTitle(book.getTitle());
				art.setCreator(book.getAuthor());
				art.setAImg(book.getCover());
				art.setCategory("book");
				art.setIsbn(book.getIsbn13());
				artResult.add(art);
			}
		}
		
		System.out.println("@@@@@@@@@@@@paramTest @@@@@@@@@@@@"+ paramMap);

		Map<String, Object> resultMap = new HashMap<>();
		
		if(artResult.size() < 1) {
			resultMap.put("result", false);
		}else {
			resultMap.put("result", true);
			resultMap.put("artList", artResult);
		}
		
		System.out.println(resultMap);
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@PostMapping("/inserArtListToGarden")
	public ResponseEntity<Map<String, Object>> inserArtListToGarden (@RequestBody Map<String, Object> data){
		
		List<Art> artList = (List<Art>) data.get("addedList");
		Integer gNo = Integer.parseInt((String) data.get("gNo"));
		
		System.out.println(artList);
		int count = 0;
		
		for(Object obj : artList) {
			Art art = new ObjectMapper().convertValue(obj, Art.class);
			art.setGNo(gNo);
			if(art.getCategory().equals("book")) {
				art.setBNo(bookService.getBNoByIsbn13(art.getIsbn()));
			}
			count = count + service.insertToGarden(art, art.getCategory());
			System.err.println("count" + count);
		}

		Map<String, Object> resultMap = new HashMap<>();
		
		if(count < 0) {
			resultMap.put("result", false);
		}else {
			resultMap.put("result", true);
			resultMap.put("count", count);
		}
		System.err.println(resultMap);
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}

}
