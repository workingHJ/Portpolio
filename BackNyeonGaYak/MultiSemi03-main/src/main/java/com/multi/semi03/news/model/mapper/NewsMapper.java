package com.multi.semi03.news.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.multi.semi03.news.model.vo.News;

@Mapper
public interface NewsMapper {
	/**
	 * 
	 * @param map
	 * @return
	 */
	int selectNewsCount(Map<String, Object> map);
	
	List<News> selectNewsList(Map<String, Object> map);
	

}
