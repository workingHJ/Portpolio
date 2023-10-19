package com.dajeongwon.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import com.dajeongwon.model.vo.Movie;

@Mapper
public interface MovieMapper {
	int insertMovie(Movie movie);

	List<Movie> selectMovieList(Map<String, Object> param);

	int selectMovieCount(Map<String, Object> param);

	List<Movie> selectAllMovies();

	List<Movie> searchMovies(Map<String, Object> paramMap);

	List<Movie> getMoviesByGenre(String genre);

	Movie getMovieByMvno(@Param("mvno") int mvno);

	int countMovieByMvno(@Param("mvno") int mvno);

	List<Movie> getMoviesByGenre2(String genre);

	List<Movie> getMoviesByDirector(String directorNm);
	
	
	
	    int selectCountByMvno(int mvno);
	   
	    Movie selectMovieByMvno(int mvno);

	    boolean existsByMvno(int mvno);

}
