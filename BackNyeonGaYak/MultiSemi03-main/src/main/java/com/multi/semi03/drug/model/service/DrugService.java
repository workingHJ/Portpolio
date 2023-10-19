package com.multi.semi03.drug.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.drug.model.mapper.DrugMapper;
import com.multi.semi03.drug.model.vo.Drug;
import com.multi.semi03.drug.model.vo.FavorDrug;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DrugService {

	@Autowired
	private DrugMapper mapper;

	public int getDrugCount(Map<String, Object> paramMap) {
		return mapper.selectDrugCount(paramMap);
	}

	public List<Drug> getDrugList(PageInfo pageInfo, Map<String, Object> paramMap) {
		paramMap.put("limit", "" + pageInfo.getListLimit());
		paramMap.put("offset", "" + (pageInfo.getStartList()-1));
		return mapper.selectDrugList(paramMap);
	}

	public Drug getDrugByitemNo(int itemNo) {
		return mapper.selectByItemNo(itemNo);
	}

	public int getFavorCount(Map<String, Object> map) {
		return mapper.selectFavorCount(map);
	}
	
	public int addFavor(Map<String, Object> map) {
		return mapper.insertFavor(map);
	}
	
	public List<FavorDrug> getFavorList(int mno) {
		return mapper.selectFavorDrugList(mno);
	}
	
	public int removeFavor(Map<String, Object> map) {
		return mapper.deleteFavorDrug(map);
	}
	
    public List<Drug> getDrugsByFavorList(List<FavorDrug> favorList) {
        List<Integer> itemNoList = new ArrayList<>();
        for (FavorDrug favorDrug : favorList) {
            itemNoList.add(favorDrug.getItemNo());
        }
        List<Drug> drugs = mapper.selectDrugsByItemNos(itemNoList);
        return drugs;
    }



	
	
	
	
	
	
	
	
	
//	public int getDrugCountByItemNames(String[] itemNames) {
//		return mapper.selectDrugCountByItemNames(itemNames);
//	}
//
//	public List<Drug> getDrugListByItemNames(String[] itemNames, PageInfo pageInfo) {
//		return mapper.selectDrugListByItemNames(itemNames);
//	}

	//모든 API 파싱 DB에 넣는 거. 안 씀.
//	@Transactional(rollbackFor = Exception.class)
//	public void insertDataToDB() {
//		APIParser parser = new APIParser();
//		List<Map<String, String>> data = parser.parseList();
//		int result = 0;
//		result = mapper.insertDrugAll(data);
//	}
	

}
