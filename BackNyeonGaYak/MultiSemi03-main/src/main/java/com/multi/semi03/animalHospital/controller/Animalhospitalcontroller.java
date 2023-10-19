package com.multi.semi03.animalHospital.controller;

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

import com.multi.semi03.animalHospital.model.service.AnimalhospitalService;
import com.multi.semi03.animalHospital.model.vo.Animalhospital;
import com.multi.semi03.animalHospital.model.vo.FavorAnimalhospital;
import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.member.model.vo.Member;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class Animalhospitalcontroller {
	@Autowired
	AnimalhospitalService service; 
	
	@RequestMapping("/Animalhospital/AnimalhospitalSearch")
	public String Search(Model model, 
			HttpSession session, 
			@RequestParam Map<String, Object>paramMap, 
			@RequestParam(required = false) String sido, 
			@RequestParam(required = false) String gugun, 
			@RequestParam(required = false) String address,
			HttpServletRequest request
			) {
		int page = 1; 
		log.info("page : "+page); 
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
		
		int count = service.getAnimalhospitalCount(paramMap);
		PageInfo pageInfo = new PageInfo(page, 5, count, 5);
		List<Animalhospital> list = service.getAnimalhospitalList(pageInfo, paramMap);
		int cnt = 1;
	      for(Animalhospital item : list) {
	         item.setAhimg(request.getContextPath() +"/resources/img/ahimg/"+"ahimg"+cnt +".jpg");
	         cnt++;
	      }
		model.addAttribute("count", count);
		model.addAttribute("list", list);
		model.addAttribute("pageInfo", pageInfo);
		model.addAttribute("paramMap", paramMap);
		

		return "Animalhospital/AnimalhospitalSearch";
	}
	
	@ResponseBody
	   @PostMapping(value = "/Animalhospital/addFavor", produces = "application/json;charset=UTF-8")
	   public ResponseEntity<Map<String, String>> addFavor(HttpSession session,
	         @RequestBody Map<String, Object> request){
	        Member member = (Member) session.getAttribute("loginMember");
	          if (member == null) {
	              Map<String, String> response = new HashMap<>();
	              response.put("message", "로그인이 필요합니다.");
	              return ResponseEntity.badRequest().body(response);
	          }

	          int mno = member.getMno();
	          int dutyNo = Integer.parseInt(request.get("dutyNo").toString());

	          Map<String, Object> map = new HashMap<>();
	          map.put("mno", mno);
	          map.put("dutyNo", dutyNo);

	          if (service.getFavorAnimalhospitalCount(map) > 0) {
	              service.removeFavorAnimalhospital(map);
	              Map<String, String> response = new HashMap<>();
	              response.put("message", "이미 즐겨찾기에 추가되어 있습니다. 삭제합니다.");

	              response.put("bookmarked", "true");

	              return ResponseEntity.ok(response);
	          } else {
	              if (service.addFavorAnimalhospital(map) > 0) {
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
	   
	   @RequestMapping("/Animalhospital/FavorAnimalhospital")
	   public String FavorAnimalhospital(Model model,HttpSession session) {
	      Member member =(Member) session.getAttribute("loginMember");
	      if(member == null) {
	         model.addAttribute("msg","로그인이 필요합니다.");
	         model.addAttribute("location","/");
	         return "common/msg";
	      }
	      int mno = member.getMno();
	      
	      List<FavorAnimalhospital> favorList = service.getFavorList(mno);
	      List<Animalhospital> list = service.getAnimalhospitalByFavorList(favorList);
	      log.info("favorList" + favorList);
	      log.info("Animalhospital" + list);
	      model.addAttribute("list", list);
	      return "Animalhospital/FavorAnimalhospital";
	   }
	
	
	
}