package com.multi.semi03.aidkit_k.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.multi.semi03.aidkit_k.model.vo.Aidkit_K;

@Mapper
public interface Aidkit_KMapper {
	/**
	 * 
	 * @param map
	 * @return
	 */
	int selectAidkit_KCount(Map<String, Object> map);
	
	List<Aidkit_K> selectAidkit_KList(Map<String, Object> map);
	
}
