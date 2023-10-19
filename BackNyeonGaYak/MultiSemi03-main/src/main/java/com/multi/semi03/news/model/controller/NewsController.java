package com.multi.semi03.news.model.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.news.model.service.NewsService;
import com.multi.semi03.news.model.vo.News;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class NewsController {
	
	@Autowired
	NewsService service;
	
	@GetMapping("/news/list")
	public String list(Model model,
			@RequestParam Map<String, Object> param
			){
		log.info("news 요청, param : " + param);
		
		int page = 1;
		log.info("page : " + page);
		try {
			if(param.get("searchType") != null) {
				param.put((String)param.get("searchType"), param.get("searchValue"));
			}
			
			page = Integer.parseInt((String)param.get("page"));
			
		} catch (Exception e) {}
		
		
		int NewsCount = service.getNewsCount(param);
		PageInfo pageInfo = new PageInfo(page, 5, NewsCount, 7);
		List<News> list = service.getNewsList(pageInfo, param);
		
		model.addAttribute("Count", NewsCount);
		model.addAttribute("list", list);
		model.addAttribute("param", param);
		model.addAttribute("pageInfo", pageInfo);
		
		
		return "/news/list";
	}
	
	@RequestMapping("/myPage/favorNews")
	public String favorNews() {
		return "/member/favorNews";
	}


}
