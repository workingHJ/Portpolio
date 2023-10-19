package com.dajeongwon.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.dajeongwon.model.vo.Art;
import com.dajeongwon.model.vo.ArtReview;
import com.dajeongwon.model.vo.Book;

@Mapper
public interface ArtMapper {
	
	int insertToGarden(Art art);
	
	// ART 전체 count 
	int countByGNo(int gNo);
	
	// count 해오는 거(중복체크용)
	int countByGNoAndMovieNo(@Param("gNo") int gNo, @Param("mvNo") int mvNo);
	
	int countByGNoAndSeq(@Param("gNo")int gNo, @Param("seq")int seq);
	
	int countByGNoAndmt20id(@Param("gNo")int gNo, @Param("mt20id") String mt20id);
	
	int countByGNoAndBNo(@Param("gNo") int gNo, @Param("bNo") int bNo);

	Art getArtByGnoAno(Map<String, Object> paramMap);

	List<ArtReview> getArtReviewsByGnoAno(Map<String, Object> paramMap);

	int getArtReviewCountByGnoAno(Map<String, Object> paramMap);

	float getArtReviewRatingByGnoAno(Map<String, Object> paramMap);

	ArtReview getArtReviewByGnoAnoRno(Map<String, Object> paramMap);

	int checkReviewExist(Map<String, Object> paramMap);

	int updateReview(Map<String, Object> paramMap);

	int insertReview(Map<String, Object> paramMap);

	int deleteReviewByRno(Map<String, Object> paramMap);

	int setArtStatus(Map<String, Object> paramMap);

	
}
