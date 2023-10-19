package com.dajeongwon.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dajeongwon.mapper.MovieMapper;
import com.dajeongwon.model.vo.Movie;
import com.dajeongwon.util.PageInfo;

@Service
public class MovieService {
	
	
	@Autowired
	private MovieMapper movieMapper;


	public int selectMovieCount(Map<String, Object> param) {
		return movieMapper.selectMovieCount(param);
	}

	public List<Movie> selectMovieList(PageInfo pageInfo, Map<String, Object> param) {
		param.put("limit", "" + pageInfo.getListLimit());
		param.put("offset", "" + (pageInfo.getStartList() - 1));
		return movieMapper.selectMovieList(param);
	}

	public List<Movie> findAllMovies() {
		return movieMapper.selectAllMovies();
	}

	public List<Movie> searchMovies(Map<String, Object> paramMap) {
		return movieMapper.searchMovies(paramMap);
	}
	
	 public List<Movie> getMoviesByGenre(String genre) {
	        return movieMapper.getMoviesByGenre(genre);
	    }
	 
	 public List<Movie> getMoviesByGenre2(String genre) {
		 return movieMapper.getMoviesByGenre2(genre);
	 }
	 
	 
	 
	 public Movie getMovieDetail(int mvno) {
			int count = movieMapper.countMovieByMvno(mvno);
			if(count == 0) {
				System.out.println("DB에 없음!!!!!!!!!!!");
				return null;
			}
			Movie result =  movieMapper.getMovieByMvno(mvno);
			if(result == null) {
				System.out.println("데이터 조회 오류 발생!!!!!!!!! ");
				return null;
			}
			return result;
		}

	 public List<Movie> getMoviesByDirector(String directorNm) {
	        return movieMapper.getMoviesByDirector(directorNm);
	    }
	 
//	 @Transactional
//	    public Movie checkAndInsertMovie(Movie movie) {
//	        int existingMovieCount = movieMapper.countMovieByMvno(movie.getMvno());
//
//	        if (existingMovieCount > 0) {
//	            return movieMapper.getMovieByMvno(movie.getMvno());
//	        } else {
//	            movieMapper.insertMovie(movie);
//	            return null;
//	        }
//	    }
	 
	 
//	  @Transactional(rollbackFor = Exception.class)
//	    public int saveMovieAndOwner(Movie movie, int mvno) {
//	        int count = movieMapper.selectCountByMvno(mvno);
//
//	        if (count > 0) {
//	            int movieResult = movieMapper.insertMovie(movie);
//
//	            if (movieResult > 0) {
//	                return movieResult;
//	            } else {
//	                return 0;
//	            }
//	        } else {
//	            return count; 
//	        }
//	    }
	 
		@Transactional(rollbackFor = Exception.class)
		public int insertMovie(Movie movie) {
			return movieMapper.insertMovie(movie);
		}
		
		
	 public boolean checkExistingMovieByMvno(int mvno) {
	        return movieMapper.existsByMvno(mvno);
	    }

	    public Movie getMovieByMvno(int mvno) {
	        return movieMapper.selectMovieByMvno(mvno);
	    }
}
