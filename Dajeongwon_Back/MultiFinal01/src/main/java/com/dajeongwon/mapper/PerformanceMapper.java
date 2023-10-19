package com.dajeongwon.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Perform;

@Mapper
public interface PerformanceMapper {
    int insertPerformance(Perform performance) ;
    
    List<Perform> selectPerformanceList(Map<String, Object> param);
    
    int selectPerformanceCount(Map<String, Object> param);
    
    Perform getPerformanceByPrfNo(@Param("mt20id") String mt20id);
    
    int countPerformanceByPrfNo(@Param("mt20id") String mt20id);
    
	List<Perform> getPerformanceByAwards(int page);
	
}
