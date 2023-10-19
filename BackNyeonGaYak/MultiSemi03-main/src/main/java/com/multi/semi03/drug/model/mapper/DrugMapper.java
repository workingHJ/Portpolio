package com.multi.semi03.drug.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.multi.semi03.drug.model.vo.Drug;
import com.multi.semi03.drug.model.vo.FavorDrug;


@Mapper
public interface DrugMapper {
	/*
	 * @param List<Map<String, String>>
	 * @return int 
	 */
	// 전체 삽입. 안 씀.
	int insertDrugAll(List<Map<String, String>> dataList);
	
	int selectDrugCount(Map<String, Object> param);
	
	List<Drug> selectDrugList(Map<String, Object> param);
	Drug selectByItemNo(int itemNo);

	int insertFavor(Map<String, Object> map);
	int deleteFavorDrug(Map<String, Object> map);

	List<FavorDrug> selectFavorDrugList(int mno);

	int selectFavorCount(Map<String, Object> map);

    List<Drug> selectDrugsByItemNos(List<Integer> itemNoList);

	
		
	
	// 혹시 모르니까 남겨놓기
//	List<Drug> selectDrugListByItemNames(@Param("itemNames") String[] itemNames);
//	int selectDrugCountByItemNames(@Param("itemNames") String[] itemNames);

	
	
	
}
