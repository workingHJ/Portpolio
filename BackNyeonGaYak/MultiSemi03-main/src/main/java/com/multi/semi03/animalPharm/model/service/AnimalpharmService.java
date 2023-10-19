package com.multi.semi03.animalPharm.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.semi03.animalPharm.model.mapper.AnimalpharmMapper;
import com.multi.semi03.animalPharm.model.vo.Animalpharm;
import com.multi.semi03.common.util.PageInfo;

@Service
public class AnimalpharmService {

	@Autowired
	private AnimalpharmMapper mapper; 
	public  int getAnimalpharmCount(Map<String, Object> paramMap) {
		return mapper.selectAnimalpharmCount(paramMap); 
		}
	
	public List <Animalpharm> getAnimalpharmList(PageInfo pageInfo, Map<String, Object> paramMap){
		paramMap.put("limit", " "+pageInfo.getListLimit()); 
		paramMap.put("offset",""+ (pageInfo.getStartList()-1));
		return mapper.selectAnimalpharmList(paramMap); 
	}

	public int getFavorAnimalpharmCount(Map<String, Object> map) {
		return mapper.selectFavorAnimalpharmCount(map);
	}

	public int removeFavorAnimalpharm(Map<String, Object> map) {
		return mapper.deleteFavorAnimalpharm(map);
	}

	public int addFavorAnimalpharm(Map<String, Object> map) {
		return mapper.insertFavorAnimalpharm(map);
	}
	
	
	
}
