package com.multi.semi03.hmc.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.hmc.model.service.HmcService;
import com.multi.semi03.hmc.model.vo.Hmc;
import com.multi.semi03.pharmacy.model.vo.Pharmacy;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class HmcContoller {

	@Autowired
	private HmcService service;
	
	
	@RequestMapping("/hmc/search")
	public String mainPage(Model model,
			@RequestParam Map<String, Object> paramMap,
			@RequestParam(required = false) String address,
			@RequestParam(required = false) String hmcNm,
			@RequestParam(required = false) String[] hmcType1,
			@RequestParam(required = false) String[] hmcType2,
			HttpServletRequest request
			
			) {
		
		int page = 1;
		log.info("hmc 요청, param : " + paramMap); 
		
		if(paramMap.get("page") != null) {
			try {
				page = Integer.parseInt((String) paramMap.get("page"));
			} catch (Exception e) {}
		}
		
		if(hmcType1 != null  && hmcType1.length > 0) {
			paramMap.put("hmcType1", Arrays.asList(hmcType1));
			model.addAttribute("hmcType1", Arrays.asList(hmcType1));
		}else {
			paramMap.remove("hmcType1");
		}
		
		if(hmcType2 != null  && hmcType2.length > 0 ) {
			paramMap.put("hmcType2", Arrays.asList(hmcType2));
			model.addAttribute("hmcType2", Arrays.asList(hmcType2));
		}else {
			paramMap.remove("hmcType2");
		}
		
		int count = service.getHmcCount(paramMap);
		PageInfo pageInfo = new PageInfo(page, 5, count, 5);
		List<Hmc> list = service.getHmcList(pageInfo, paramMap);
		int cnt = 1;
		for(Hmc item : list) {
			item.setHmcImg(request.getContextPath() +"/resources/img/HMC/"+"hmcImg"+cnt +".png");
			cnt++;
		}

		model.addAttribute("count", count);
		model.addAttribute("list", list);
		model.addAttribute("pageInfo", pageInfo);
		model.addAttribute("paramMap", paramMap);
		
		return "hmc/hmc-main";
	}

	
}
