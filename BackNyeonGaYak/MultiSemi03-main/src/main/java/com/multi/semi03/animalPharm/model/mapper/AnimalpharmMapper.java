package com.multi.semi03.animalPharm.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.multi.semi03.animalPharm.model.vo.Animalpharm;


@Mapper 
public interface AnimalpharmMapper {
	int selectAnimalpharmCount(Map<String, Object> paramMap); 
	List<Animalpharm> selectAnimalpharmList(Map<String, Object> paramMap);
	
	int selectFavorAnimalpharmCount(Map<String, Object> map);
	int deleteFavorAnimalpharm(Map<String, Object> map);
	int insertFavorAnimalpharm(Map<String, Object> map);
	List<Animalpharm> selectAnimalpharmByFavorList(List<Integer> aPNoList);

}
