package com.multi.semi03.pharmacy.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.multi.semi03.pharmacy.model.vo.FavorPharmacy;
import com.multi.semi03.pharmacy.model.vo.Pharmacy;


@Mapper 
public interface PharmacyMapper {
	int selectPharmacyCount(Map<String, Object> paramMap);

	List<Pharmacy> selectPharmacyList(Map<String, Object> paramMap);

	
	
	// 즐겨찾기
	List<FavorPharmacy> selectFavorPharmacyList(int mno);

	int selectFavorCount(Map<String, Object> map);

	int deleteFavorPharmacy(Map<String, Object> map);

	int insertFavor(Map<String, Object> map);

	List<Pharmacy> selectPharmacyByDutyNo(List<Integer> dutyNoList);

 }

