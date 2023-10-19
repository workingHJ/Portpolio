package com.dajeongwon.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

import com.dajeongwon.model.service.ExhibitionService;
import com.dajeongwon.model.vo.Book;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.util.PageInfo;

@RestController
@RequestMapping("/art")
@CrossOrigin(origins = { "http://localhost:3000" })
public class ExhibitionController {

    @Autowired
    private ExhibitionService exhibitionService;

    // get-> requestParam / post -> requestBody 
	@GetMapping(path = "/exhibitionList")
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
		
		System.err.println("page insert" + paramMap);
		int count = exhibitionService.selectExhibitionCount(paramMap);
		PageInfo pageInfo = new PageInfo(page, 5, count, 30);
		List<Exhibition> list = exhibitionService.selectExhibitionList(pageInfo, paramMap);
		System.out.println(list);

		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		map.put("pageInfo", pageInfo);
		map.put("list", list);
		map.put("paramMap", paramMap);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}
	
	 @GetMapping("/exhibitionDetail")
	    public Exhibition getExhibitionDetail(@RequestParam("id") String seq) {
	    	Exhibition result = exhibitionService.getExhibitionDetail(seq);
	    	return result;
	    }
	 
	 @GetMapping("/newExhibitionList")
	 public List<Exhibition> getNewList(@RequestParam("count") int count) {
		 System.out.println("!!!!!!!!!!!!!!!!!!!list By startDate 호출!!!!!!!!!!!!!!!!!!!");
		 Map<String, Object> paramMap = new HashMap<>();
	     // 오늘 날짜 얻기
	     LocalDate today = LocalDate.now();
	     LocalDate firstDayOfMonth = today.withDayOfMonth(1);

	     // 날짜 포맷 지정
	     DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	     // 날짜를 string으로 변환
	     String startDate = firstDayOfMonth.format(formatter);	// 오늘 날짜 해당월 01일 
		
		 paramMap.put("count", count);
		 paramMap.put("startDate", startDate);
		 
		 
	     return exhibitionService.getNewList(paramMap);
	 }
	 
	 @GetMapping(path="/exhiOfMonth")
		public ResponseEntity<Map<String, Object>> getExhiOfMonth(@RequestParam("count") int count) {
	    	Map<String, Object> map = new HashMap<>();
	    	List<Exhibition> result = new ArrayList<>();
	    	result = exhibitionService.getExhiOfMonth(count);

	    	int size = result.size();

	    	List<Exhibition> exhiList1 = result.subList(0, (size + 1) / 2);
	    	List<Exhibition> exhiList2 = result.subList((size + 1) / 2, size);

	    	map.put("result", true);
	    	map.put("exhiList1", exhiList1);
	    	map.put("exhiList2", exhiList2);
	    	return ResponseEntity.status(HttpStatus.OK).body(map);
	    }
	 
}
