package com.multi.semi03.pharmacy.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.pharmacy.model.mapper.PharmacyMapper;
import com.multi.semi03.pharmacy.model.vo.FavorPharmacy;
import com.multi.semi03.pharmacy.model.vo.Pharmacy;

@Service
public class PharmService {
	
	@Autowired
	private PharmacyMapper mapper;

	public int getPharmacyCount(Map<String, Object> paramMap) {
		return mapper.selectPharmacyCount(paramMap);
	}

	public List<Pharmacy> getPharmacyList(PageInfo pageInfo, Map<String, Object> paramMap) {
		paramMap.put("limit", "" + pageInfo.getListLimit());
		paramMap.put("offset", "" + (pageInfo.getStartList()-1));
		return mapper.selectPharmacyList(paramMap);
	}

	public List<FavorPharmacy> getFavorPharmacyList(int mno) {
		return mapper.selectFavorPharmacyList(mno);
	}

	public int getFavorCount(Map<String, Object> map) {
		return mapper.selectFavorCount(map);
	}

	public int removeFavor(Map<String, Object> map) {
		return mapper.deleteFavorPharmacy(map);
	}

	public int addFavor(Map<String, Object> map) {
		return mapper.insertFavor(map);
	}

	public List<FavorPharmacy> getFavorList(int mno) {
		return mapper.selectFavorPharmacyList(mno);
	}

	public List<Pharmacy> getPharmacyByFavorList(List<FavorPharmacy> favorList) {
		List<Integer> dutyNoList = new ArrayList<>();
		for(FavorPharmacy favorPharmacy : favorList) {
			dutyNoList.add(favorPharmacy.getDutyNo());
		}
		List<Pharmacy> pharmacy = mapper.selectPharmacyByDutyNo(dutyNoList);
		return pharmacy;
	}

}
