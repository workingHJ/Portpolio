package com.multi.semi03.aidkit_k.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.semi03.aidkit_k.model.mapper.Aidkit_KMapper;
import com.multi.semi03.aidkit_k.model.vo.Aidkit_K;
import com.multi.semi03.common.util.PageInfo;

@Service
public class Aidkit_KService {
	
	@Autowired
	private Aidkit_KMapper mapper;
	
	public List<Aidkit_K> getAidkit_KList(PageInfo pageInfo, Map<String, Object> param, Object bizplc_nm, Object refine_roadnm_addr) {
		param.put("limit", "" + pageInfo.getListLimit());
		param.put("offset", "" + (pageInfo.getStartList()-1));
		param.put("bizplc_nm", bizplc_nm);
		param.put("refine_roadnm_addr", refine_roadnm_addr);
		
		return mapper.selectAidkit_KList(param);
	}
	
	public int getAidkit_KCount(Map<String, Object> param) {
		return mapper.selectAidkit_KCount(param);
	}

}
