package com.multi.semi03.aidkit_k.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.multi.semi03.aidkit_k.model.service.Aidkit_KService;
import com.multi.semi03.aidkit_k.model.vo.Aidkit_K;
import com.multi.semi03.common.util.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class Aidkit_KController {
	
	@Autowired
	Aidkit_KService aidkitService;
	
	@GetMapping("/aidkit_k/asearch")
	public String search(Model model,
			@RequestParam Map<String, Object> param,
			@RequestParam(required = false) String bizplc_nm,
			@RequestParam(required = false) String refine_roadnm_addr 
			){
		log.info("aidkit_k 요청, param : " + param);
		
		int page = 1;
		log.info("page : " + page);
		try {
			if(param.get("searchType") != null) {
				param.put((String)param.get("searchType"), param.get("searchValue"));
			}
			
			page = Integer.parseInt((String)param.get("page"));
			
		} catch (Exception e) {}
		
		int Aidkit_KCount = aidkitService.getAidkit_KCount(param);
		PageInfo pageInfo = new PageInfo(page, 5, Aidkit_KCount, 7);
		List<Aidkit_K> list = aidkitService.getAidkit_KList(pageInfo, param, bizplc_nm, refine_roadnm_addr);
		
		model.addAttribute("list", list);
		model.addAttribute("param", param);
		model.addAttribute("pageInfo", pageInfo);
		
		model.addAttribute("bizplc_nm", bizplc_nm);
		model.addAttribute("refine_roadnm_addr", refine_roadnm_addr);
		
		return "/aidkit_k/asearch";
	}
	
	
}
