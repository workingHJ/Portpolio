package com.dajeongwon;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dajeongwon.model.service.MovieService;
import com.dajeongwon.model.vo.Movie;

@Controller
public class HomeController2 {
	
	static boolean isInit = false;
	
	@Autowired
	MovieService movieService;
	
	@GetMapping("/home2")
	public String home(Locale locale, Model model) {
		if(isInit == false) {
			isInit = true;
		}
		return "home";
	}

	@ResponseBody
	@GetMapping("/init2")
	public String init() {
		StringBuilder sb = new StringBuilder();

		// 영화 초기화
		int result = initMovies();
		sb.append("Movie result : " + result + "\n");
		
		return sb.toString();
	}
	
	
	public int initMovies() {
		List<Movie> allList = movieService.findAllMovies();

		int count = 0;
		for (Movie movie : allList) {
			System.out.println(movie);
			try {
				count++;
				movieService.insertMovie(movie);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return count;
	}	
}
