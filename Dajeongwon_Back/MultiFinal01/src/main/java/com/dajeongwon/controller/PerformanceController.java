package com.dajeongwon.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dajeongwon.api.PerformanceParser;
import com.dajeongwon.model.service.PerformanceService;
import com.dajeongwon.model.vo.Book;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Perform;
import com.dajeongwon.util.PageInfo;

@RestController
@RequestMapping("/art")
@CrossOrigin(origins = { "http://localhost:3000" })
public class PerformanceController {

    @Autowired
    private PerformanceService performanceService;

    // get-> requestParam / post -> requestBody 
	@GetMapping(path = "/performanceList")
	public ResponseEntity<Map<String, Object>> list(@RequestParam Map<String, Object> paramMap) {
		int page = 1;
		System.err.println(paramMap);
		try {
			if(paramMap.get("page") == null) {
				paramMap.put("page", ""+page);
			}else {
				page = Integer.parseInt(""+paramMap.get("page"));
			}
		} catch (Exception e) {}
		
		String selectedDateStr = ((String) paramMap.get("selectedDate")).substring(0, 10);

		paramMap.put("selectedDateStr", selectedDateStr);
		
		if (paramMap.get("area") != null) {
	        paramMap.put("area", paramMap.get("area"));
	    }
	    
	    if (paramMap.get("subarea") != null) {
	        paramMap.put("subarea", paramMap.get("subarea"));
	    }
		
				
		System.err.println("page insert" + paramMap);
		int count = performanceService.selectPerformanceCount(paramMap);
		PageInfo pageInfo = new PageInfo(page, 5, count, 30);
		List<Perform> list = performanceService.selectPerformanceList(pageInfo, paramMap);
		System.out.println(list);

		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		map.put("pageInfo", pageInfo);
		map.put("list", list);
		map.put("paramMap", paramMap);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}
	
	
	 @GetMapping("/performanceDetail")
	    public Perform getPerformanceDetail(@RequestParam("id") String mt20id) {
		 	Perform result = performanceService.getPerformanceDetail(mt20id);
	    	return result;
	    }
	 
	 
	 @GetMapping("/performanceAwards")
	 public List<Perform> getNewList(@RequestParam("page") int page) {
		 System.out.println("!!!!!!!!!!!!!!!!!!!list By awards 호출!!!!!!!!!!!!!!!!!!!");
		 return performanceService.getNewList(page);
	 }
	 
	 @GetMapping("/performanceRecommend")
	    public List<Perform> getRecommendList(@RequestParam("categoryId") String categoryId) throws Exception {
		 System.out.println("!!!!!!!!!!!!!!!!!!!카테고리 호출!!!!!!!!!!!!!!!!!!!");
	        return performanceService.getRecommendList(categoryId);
	    }
	 
	 
}

