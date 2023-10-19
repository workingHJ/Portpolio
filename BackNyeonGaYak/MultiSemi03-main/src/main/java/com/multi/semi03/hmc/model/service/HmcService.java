package com.multi.semi03.hmc.model.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.hmc.model.mapper.HmcMapper;
import com.multi.semi03.hmc.model.vo.Hmc;

@Service
public class HmcService {
	
	@Autowired
	HmcMapper mapper;

	public int getHmcCount(Map<String, Object> paramMap) {
		return mapper.selectHmcCount(paramMap);
	}
	
	public List<Hmc> getHmcList(PageInfo pageInfo, Map<String, Object> paramMap) {
		paramMap.put("limit", "" + pageInfo.getListLimit());
		paramMap.put("offset", "" + (pageInfo.getStartList()-1));
		return mapper.selectHmcList(paramMap);
	}
}
