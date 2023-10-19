package com.dajeongwon.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dajeongwon.mapper.ArtMapper;
import com.dajeongwon.model.vo.Art;
import com.dajeongwon.model.vo.ArtReview;
import com.dajeongwon.model.vo.Book;

@Service
public class ArtService {
	
	@Autowired
	private ArtMapper mapper;

	@Transactional
	public int insertToGarden(Art art, String category) {
		int count = 0;
		int gNo = art.getGNo();
		
		if		(category.equals("movie")) {
			count = mapper.countByGNoAndMovieNo(gNo, art.getMvNo());
		} else if(category.equals("exhibition")) {
			count = mapper.countByGNoAndSeq(gNo, art.getSeq());
		} else if(category.equals("perform")) {
			count = mapper.countByGNoAndmt20id(gNo, art.getMt20id());
		} else if(category.equals("book")) {
			count = mapper.countByGNoAndBNo(gNo, art.getBNo());
		}
		
		System.err.println(count);
		// count가 0보다 많음 = 중복이 있음! 
		if(count > 0) {
			return -1;
		}else {
			return mapper.insertToGarden(art);
		}
		
	}

	public Art getArtInGarden(Map<String, Object> paramMap) {
		return mapper.getArtByGnoAno(paramMap);
	}

	public List<ArtReview> getArtReviews(Map<String, Object> paramMap) {
		return mapper.getArtReviewsByGnoAno(paramMap);
	}

	public int getArtReviewCount(Map<String, Object> paramMap) {
		return mapper.getArtReviewCountByGnoAno(paramMap);
	}

	public float getRating(Map<String, Object> paramMap) {
		return mapper.getArtReviewRatingByGnoAno(paramMap);
	}

	public ArtReview getArtReview(Map<String, Object> paramMap) {
		return mapper.getArtReviewByGnoAnoRno(paramMap);
	}

	@Transactional
	public Map<String, Object> saveReviewInArt(Map<String, Object> paramMap) {
		Map<String, Object> resultMap = new HashMap<>();
		if(mapper.checkReviewExist(paramMap) > 0) {
			resultMap.put("type", "update");
			resultMap.put("result", mapper.updateReview(paramMap));
		} else {
			resultMap.put("type", "insert");
			resultMap.put("result", mapper.insertReview(paramMap));
		}
		return resultMap;
	}

	@Transactional(rollbackFor = Exception.class)
	public int deleteReviewArt(Map<String, Object> paramMap) {
		if(mapper.checkReviewExist(paramMap) < 1) {
			return -1;
		} else {
			return mapper.deleteReviewByRno(paramMap);
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public int completeArt(Map<String, Object> paramMap) {
			return mapper.setArtStatus(paramMap);
	}
	



}
