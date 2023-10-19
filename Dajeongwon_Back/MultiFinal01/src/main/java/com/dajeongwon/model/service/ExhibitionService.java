package com.dajeongwon.model.service;

import java.util.ArrayList;
import java.util.List;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.dajeongwon.mapper.BookMapper;
import com.dajeongwon.mapper.ExhibitionMapper;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.util.PageInfo;
import com.google.gson.Gson;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ExhibitionService {
	private static final Logger logger = LoggerFactory.getLogger(ExhibitionService.class);

	private final RestTemplate restTemplate;
    private final Gson gson;
    private ExhibitionMapper exhibitionMapper;

	
    @Autowired
    public ExhibitionService(RestTemplate restTemplate, Gson gson, ExhibitionMapper exhibitionMapper) {
        this.restTemplate = restTemplate;
        this.gson = gson;
        this.exhibitionMapper = exhibitionMapper;
    }

	@Transactional(rollbackFor = Exception.class)
	public int insertExhibition(Exhibition exhibition) {
		return exhibitionMapper.insertExhibition(exhibition);
	}

	public int selectExhibitionCount(Map<String, Object> param) {
		return exhibitionMapper.selectExhibitionCount(param);
	}

	public List<Exhibition> selectExhibitionList(PageInfo pageInfo, Map<String, Object> param) {
		param.put("limit", "" + pageInfo.getListLimit());
		param.put("offset", "" + (pageInfo.getStartList() - 1));
		return exhibitionMapper.selectExhibitionList(param);
	}
	
	public List<Exhibition> searchExhibition(Map<String, Object> param){
		return exhibitionMapper.selectExhibitionList(param);
	}
	
	public Exhibition getExhibitionDetail(String seq) {
		int count = exhibitionMapper.countExhibitionBySeq(seq);
		if(count == 0) {
			System.out.println("DB에 없음!!!!!!!!!!!");
			return null;
		}
		Exhibition result = exhibitionMapper.getExhibitionBySeq(seq);
		if(result == null) {
			System.out.println("데이터 조회 오류 발생!!!!!!!!! ");
			return null;
		}
		return result;
	}
	
	public class ExhibitionResponse {
	    private List<Exhibition> items;

	    public List<Exhibition> getItems() {
	        return items;
	    }

	    public void setItems(List<Exhibition> items) {
	        this.items = items;
	    }
	}
	
	public List<Exhibition> getExhiOfMonth(int count) {
		List<Exhibition> exhiList = exhibitionMapper.getExhiOfMonth(count);
    	return exhiList;
	}
	
    
	 // 주목할 만한 신간(프론트에서 SSR로딩)
    @Transactional
    public List<Exhibition> getNewList(Map paramMap) {
    	return exhibitionMapper.getExhibitionsByStartdate(paramMap);
    }
    
}
