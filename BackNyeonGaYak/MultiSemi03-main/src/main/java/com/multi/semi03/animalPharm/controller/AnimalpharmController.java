package com.multi.semi03.animalPharm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.multi.semi03.animalPharm.model.service.AnimalpharmService;
import com.multi.semi03.animalPharm.model.vo.Animalpharm;
import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.member.model.vo.Member;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class AnimalpharmController {
	
	
	@Autowired
	private AnimalpharmService service;
	
	
	@RequestMapping("/Animalpharm/AnimalpharmSearch")
	public String Search(Model model,
			HttpSession session,
			@RequestParam Map<String, Object> paramMap,
			@RequestParam(required = false) String sido,
			@RequestParam(required = false) String gugun,
			@RequestParam(required = false) String address,
			HttpServletRequest request
		
			) {
		int page = 1;
		log.info("page : " + page);
		log.info("@@@@@@@@@@@@" + paramMap);

		if(paramMap.get("page") != null) {
			try {
				page = Integer.parseInt((String)paramMap.get("page"));
			} catch(Exception e) {}
		}
		
		if(sido != null && sido.length() > 0) {
			paramMap.put("sido", sido);
		}else {
			paramMap.remove("sido");
		}
		
		if(gugun != null && gugun.length() > 0) {
			paramMap.put("gugun", gugun);
		}else {
			paramMap.remove("gugun");
		}
	
		if(address != null && address.length() > 0) {
			paramMap.put("address", address);
		}else {
			paramMap.remove("address");
		}
		
		int count = service.getAnimalpharmCount(paramMap);
		PageInfo pageInfo = new PageInfo(page, 5, count, 5);
		List<Animalpharm> list = service.getAnimalpharmList(pageInfo, paramMap);
		int cnt = 1;
	      for(Animalpharm item : list) {
		         item.setApimg(request.getContextPath() +"/resources/img/apimg/"+"apimg"+cnt +".jpg");
		         cnt++;
		      }
		model.addAttribute("count", count);
		model.addAttribute("list", list);
		model.addAttribute("pageInfo", pageInfo);
		model.addAttribute("paramMap", paramMap);

		return "Animalpharm/AnimalpharmSearch";
	}
	
	@ResponseBody
	   @PostMapping(value = "/Animalpharm/addFavor", produces = "application/json;charset=UTF-8")
	   public ResponseEntity<Map<String, String>> addFavor(HttpSession session,
	         @RequestBody Map<String, Object> request){
	        Member member = (Member) session.getAttribute("loginMember");
	          if (member == null) {
	              Map<String, String> response = new HashMap<>();
	              response.put("message", "로그인이 필요합니다.");
	              return ResponseEntity.badRequest().body(response);
	          }

	          int mno = member.getMno();
	          int apno = Integer.parseInt(request.get("apno").toString());

	          Map<String, Object> map = new HashMap<>();
	          map.put("mno", mno);
	          map.put("apno", apno);

	          if (service.getFavorAnimalpharmCount(map) > 0) {
	              service.removeFavorAnimalpharm(map);
	              Map<String, String> response = new HashMap<>();
	              response.put("message", "이미 즐겨찾기에 추가되어 있습니다. 삭제합니다.");

	              response.put("bookmarked", "true");

	              return ResponseEntity.ok(response);
	          } else {
	              if (service.addFavorAnimalpharm(map) > 0) {
	                  Map<String, String> response = new HashMap<>();
	                  response.put("message", "즐겨찾기에 추가되었습니다.");

	                  response.put("bookmarked", "false");

	                  return ResponseEntity.ok(response);
	              } else {
	                  Map<String, String> response = new HashMap<>();
	                  response.put("message", "추가하지 못했습니다. 다시 확인해 주세요.");
	                  return ResponseEntity.ok(response);
	              }
	          }
	   }
	   
}