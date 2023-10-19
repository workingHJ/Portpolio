package com.dajeongwon.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dajeongwon.model.service.MovieService;
import com.dajeongwon.model.vo.Movie;
import com.dajeongwon.util.PageInfo;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = { "http://localhost:3000" })
public class MovieController {

	@Autowired
	private MovieService movieService;

	@GetMapping(path = "/movielist")
	public ResponseEntity<Map<String, Object>> list(@RequestParam Map<String, Object> paramMap) {
		int page = 1;
		System.out.println(paramMap);
		try {
			if (paramMap.get("page") == null) {
				paramMap.put("page", "" + page);
			} else {
				page = Integer.parseInt("" + paramMap.get("page"));
			}
		} catch (Exception e) {
		}

		int count = movieService.selectMovieCount(paramMap);
		PageInfo pageInfo = new PageInfo(page, 5, count, 12);
		List<Movie> list = movieService.selectMovieList(pageInfo, paramMap);
		for (Movie movie : list) {
			if (movie.getPosters() != null) {
				String posters = movie.getPosters();
				String[] posterArray = posters.split("\\|");
				String poster = posterArray[0];
				movie.setPosters(poster);
			}

		}

		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		map.put("pageInfo", pageInfo);
		map.put("list", list);
		map.put("paramMap", paramMap);
		System.out.println(map);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	@GetMapping("/search")
	public List<Movie> searchMovies(@RequestParam("searchTerm") String searchTerm,
			@RequestParam("searchType") String searchType) {

		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("searchTerm", searchTerm);
		paramMap.put("searchType", searchType);

		System.err.println(" !!!!!!!!!! movie Controller Called!!!!!!!!!!" + paramMap);

		List<Movie> result = movieService.searchMovies(paramMap);

		for (Movie movie : result) {
			if (movie.getPosters() != null) {
				String posters = movie.getPosters();
				String[] posterArray = posters.split("\\|");
				String poster = posterArray[0];
				movie.setPosters(poster);
			}
		}

		return result;
	}

	@GetMapping("/movieGenre")
	public List<Movie> getMoviesByGenre(@RequestParam String genre) {
		System.err.println(" !!!!!!!!!! movieGenre Controller Called!!!!!!!!!! Genre: " + genre);

		return movieService.getMoviesByGenre(genre);
	}

	@GetMapping("/movieDetail")
	public Movie getMovieDetail(@RequestParam("mvno") int mvno) {
		Movie result = movieService.getMovieDetail(mvno);
		System.err.println(result + "!!!!!!!!!!!movieDetail!!!!!!!!!!!");
		return result;
	}

	@GetMapping("/movieGenre2")
	public List<Movie> getMoviesByGenre2(@RequestParam String genre) {
		System.err.println(" !!!!!!!!!! movieGenre Controller Called!!!!!!!!!! Genre: " + genre);
		
        String[] genreArray = genre.split(",");
        String firstGenre = genreArray[0].trim(); // trim() 메서드로 앞뒤 공백 제거

        List<Movie> result = movieService.getMoviesByGenre2(firstGenre);
		
		return result;
	}

	@GetMapping("/movieDirector")
	public List<Movie> getMoviesByDirector(@RequestParam("directorNm") String directorNm) {
		System.err.println("!!!!!!!!!!directorNm Searched!!!!!!!!!!");
		
		List<Movie> result = movieService.getMoviesByDirector(directorNm);
		
		return result;
	}
	
	@PostMapping("/boxofficeData")
	public ResponseEntity<Map<String, Object>> boxofficeData(@RequestBody Map<String, Object> requestBody) {
	    System.out.println("!!!!boxoffice!!!!!!!: " + requestBody);

	    Map<String, Object> response = new HashMap<>();
	    response.put("message", "성공!!!!!!!!!!!!!!.");
	    
	    return ResponseEntity.status(HttpStatus.OK).body(response);
	}
	
//	 @PostMapping("/checkAndInsertMovie")
//	    public Movie checkAndInsertMovie(@RequestBody Movie movie) {
//			System.err.println("!!!!!!!!!!제발!!!!!!!!!!");
//
//	        return movieService.checkAndInsertMovie(movie);
//	    }
	

//    @PostMapping("/checkAndInsertMovie")
//    public int checkAndInsertMovie(@RequestBody Movie movie, @RequestParam int mvno) {
//    	System.err.println("!!!!!!!!!!제발!!!!!!!!!!");
//        return movieService.saveMovieAndOwner(movie, mvno);
//    }
	
	 @PostMapping("/checkAndInsertMovie")
	    public ResponseEntity<Movie> checkAndInsertMovie(@RequestBody Movie movie) {
	        boolean isExisting = movieService.checkExistingMovieByMvno(movie.getMvno());

	        if (!isExisting) {
	            movieService.insertMovie(movie);
	        }

	        Movie retrievedMovie = movieService.getMovieByMvno(movie.getMvno());
	        System.err.println("!!!!!!!!!!제발!!!!!!!!!!");

	        return new ResponseEntity<>(retrievedMovie, HttpStatus.OK);
	    }
	
}
