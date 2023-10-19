package com.multi.semi03.animalHospital.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.multi.semi03.animalHospital.model.vo.Animalhospital;
import com.multi.semi03.animalHospital.model.vo.FavorAnimalhospital;


@Mapper 
public interface AnimalhospitalMapper {
	int selectAnimalhospitalCount(Map<String,Object> paramMap); 
	List<Animalhospital> selectAnimalhospitalList(Map<String, Object> paramMap); 
	
	
	//즐겨찾는곳 
	 List<FavorAnimalhospital> selectFavorAnimalhospitalList(int HNo); 
	 int selectFavorCountAnimalhospital(Map<String, Object> map); 
	 int insertFavorAnimalhospital(Map<String, Object> map); 
	 List <Animalhospital> selectAnimalhospitalByFavorList(List <Integer> dutyNoList);
	 int deleteFavorAnimalhospital(Map<String, Object> map); 
	
	
}
