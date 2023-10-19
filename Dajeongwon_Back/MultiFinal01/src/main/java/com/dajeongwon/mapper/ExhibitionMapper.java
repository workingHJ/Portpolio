package com.dajeongwon.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.dajeongwon.model.vo.Book;
import com.dajeongwon.model.vo.Exhibition;

@Mapper
public interface ExhibitionMapper {
    int insertExhibition(Exhibition exhibition);
    
    List<Exhibition> selectExhibitionList(Map<String, Object> param);
    
    int selectExhibitionCount(Map<String, Object> param);
    
    Exhibition getExhibitionBySeq(@Param("seq") String seq);
    
    int countExhibitionBySeq(@Param("seq") String seq);
    
	List<Exhibition> getExhibitionsByStartdate(Map paramMap);
	
	List<Exhibition> getExhiOfMonth(int count);
}
