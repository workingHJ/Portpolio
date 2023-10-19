package com.multi.semi03.news.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.news.model.mapper.NewsMapper;
import com.multi.semi03.news.model.vo.News;

@Service
public class NewsService {
	
	@Autowired
	private NewsMapper mapper;
	
	public List<News> getNewsList(PageInfo pageInfo, Map<String, Object> param){
		param.put("limit", "" + pageInfo.getListLimit());
		param.put("offset", "" + (pageInfo.getStartList()-1));
		
		return mapper.selectNewsList(param);
	}

	public int getNewsCount(Map<String, Object> param) {
		return mapper.selectNewsCount(param);
	}

}
