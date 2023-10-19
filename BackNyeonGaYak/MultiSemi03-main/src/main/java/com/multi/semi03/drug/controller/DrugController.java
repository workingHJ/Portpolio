package com.multi.semi03.drug.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.drug.model.service.DrugService;
import com.multi.semi03.drug.model.vo.Drug;
import com.multi.semi03.drug.model.vo.FavorDrug;
import com.multi.semi03.member.model.vo.Member;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class DrugController {
	
	@Autowired
	private DrugService service;
	
    @Autowired
    private ServletContext servletContext;
//	@RequestMapping("/drug/create")
//	public void AllInsert(Model model, HttpSession session) {
//		log.info("@@@@@@@@@@@create 요청");
//		service.insertDataToDB();
//	}
    
    
	@RequestMapping("/drug/search")
	public String Search(Model model, 
			HttpSession session,
			@RequestParam Map<String, Object> paramMap,
			@RequestParam(required = false) String itemNo,
			@RequestParam(required = false) String itemName,
			@RequestParam(required = false) String drugFront,
			@RequestParam(required = false) String drugShape,
			@RequestParam(required = false) String drugColor,
			@RequestParam(required = false) String formCode,
			@RequestParam(required = false) String itemLine
			) {

		int page = 1;

		log.info("page : " + page);
		log.info("@@@@@@@@@@@@" + paramMap);

		if(paramMap.get("page") != null) {
			try {
				page = Integer.parseInt((String)paramMap.get("page"));
			} catch(Exception e) {}
		}
		
		// 조건값 check (없으면 paramMap에서 지우기, 검색하지 않은 초기용) 
		
		if(itemName != null && itemName.length() > 0) {
			paramMap.put("itemName", itemName);
		}else {
			paramMap.remove("itemName");
		}
				
		if(drugFront != null && drugFront.length() > 0) {
			paramMap.put("drugFront", drugFront);
		}else {
			paramMap.remove("drugFront");
		}
		
		if(drugShape != null && drugShape.length() > 0 && !drugShape.equals("전체")) {
			paramMap.put("drugShape", drugShape);
		}else {
			paramMap.remove("drugShape");
		}
		
		if(drugColor != null && drugColor.length() > 0 && !drugColor.equals("전체")) {
			paramMap.put("drugColor", drugColor);
		}else {
			paramMap.remove("drugColor");
		}
		
		if(formCode != null && formCode.length() > 0 && !formCode.equals("전체")) {
			paramMap.put("formCode", formCode);
		}else {
			paramMap.remove("formCode");
		}
		
		if(itemLine != null && itemLine.length() > 0 && !itemLine.equals("전체") && !itemLine.equals("없음")) {
			paramMap.put("itemLine", itemLine);
		}else {
			paramMap.remove("itemLine");
		}
		
		int count = service.getDrugCount(paramMap);
		PageInfo pageInfo = new PageInfo(page, 5, count, 12);
		List<Drug> list = service.getDrugList(pageInfo, paramMap);
		extractEfcy(list);
		
		// 로컬 이미지 경로
		String localImagePath = "/resources/img/medicine/";

		for (Drug drug : list) {
		    String imageName = drug.getItemNo() + ".jpg";
		    String imagePath = localImagePath + imageName;
		    String realPath = session.getServletContext().getRealPath(imagePath);
		    File imageFile = new File(realPath);
		    
		    if (imageFile.exists()) {
		        // 이미지 파일이 존재하면 경로를 설정
		        drug.setItemCoverImg(imagePath);
		    } else {
		        // 이미지 파일이 존재하지 않으면 원격 이미지 다운로드
		        String remoteImageUrl = drug.getItemImage();
		        RestTemplate restTemplate = new RestTemplate();
		        try {
		            byte[] imageBytes = restTemplate.getForObject(remoteImageUrl, byte[].class);
		            // 이미지를 로컬 경로에 저장
		            Files.write(Paths.get(realPath), imageBytes);
		            // 이미지 경로를 설정
		            drug.setItemCoverImg(imagePath);
		        } catch (Exception e) {
		            e.printStackTrace();
		            drug.setItemCoverImg("0"); // 이미지 다운로드 실패 시 '0' 값을 설정
		        }
		    }
		}
		
		
		model.addAttribute("count", count);
		model.addAttribute("list", list);
		model.addAttribute("pageInfo", pageInfo);
		model.addAttribute("paramMap", paramMap);
		
		
		//즐겨찾기용 로직
		if(session.getAttribute("loginMember") != null) {
			Member member = (Member) session.getAttribute("loginMember");
			int mno = member.getMno();			
			List<FavorDrug> favorList = service.getFavorList(mno);
			model.addAttribute("favorList", favorList);
		}
		
		
		return "drug/search-main";
	}


	private void extractEfcy(List<Drug> list) {
		for (Drug drug : list) {
		    String efcyQesitm = drug.getEfcyQesitm(); // Drug 객체에서 efcyQesitm 가져오기
		    // efcyQesitm 가공 처리
		    if (efcyQesitm != null && efcyQesitm.length() > 0) {
		    	String key1 = "<p>이 약은";
		    	String key2 = "에 사용합니다";
		        int startIndex = efcyQesitm.indexOf(key1);
		        int endIndex = efcyQesitm.indexOf(key2);

		        if (startIndex != -1 && endIndex != -1) {
		            String extractedText = efcyQesitm.substring(startIndex + key1.length(), endIndex).trim();
		            String[] items = extractedText.split(", ");

		            // 가공된 결과를 Drug 객체에 저장
		            drug.setEfcyQesitmItems(items);
		        }
		    }
		}
	}
	
	
	@GetMapping("/drug/detail")
	public String drugView(Model model, int itemNo) {
		Drug drug = service.getDrugByitemNo(itemNo);
		if(drug == null) {
			return "redirect:error";
		}
		
		String efcyQesitm = drug.getEfcyQesitm();
	    if (efcyQesitm != null && efcyQesitm.length() > 0) {
	    	String key1 = "<p>이 약은";
	    	String key2 = "에 사용합니다";
	        int startIndex = efcyQesitm.indexOf(key1);
	        int endIndex = efcyQesitm.indexOf(key2);

	        if (startIndex != -1 && endIndex != -1) {
	            String extractedText = efcyQesitm.substring(startIndex + key1.length(), endIndex).trim();
	            String[] items = extractedText.split(", ");
	            drug.setEfcyQesitmItems(items);
	        }
	    }
		
		model.addAttribute(drug);
		return "drug/search-detail";
	}
	
	@GetMapping("/drug/symp")
	public String sympView(Model model, 
			HttpSession session,
			@RequestParam Map<String, Object> paramMap) {
		int page = 1;
		log.info("symp호출됨@@@@@@@@@@@@@@@@@@@@@@@@@@");
		log.info("page : " + page);
		log.info("@@@@@@@@@@@@" + paramMap);

		if(paramMap.get("page") != null) {
			try {
				page = Integer.parseInt((String)paramMap.get("page"));
			} catch(Exception e) {}
		}
		
		// 조건값 check (없으면 paramMap에서 지우기, 검색하지 않은 초기용) qms
		
		int count = service.getDrugCount(paramMap);
		PageInfo pageInfo = new PageInfo(page, 5, count, 12);
		List<Drug> list = service.getDrugList(pageInfo, paramMap);
		extractEfcy(list);
		
		// 로컬 이미지 경로
		String localImagePath = "/resources/img/medicine/";

		for (Drug drug : list) {
		    String imageName = drug.getItemNo() + ".jpg";
		    String imagePath = localImagePath + imageName;
		    String realPath = session.getServletContext().getRealPath(imagePath);
		    File imageFile = new File(realPath);
		    
		    if (imageFile.exists()) {
		        // 이미지 파일이 존재하면 경로를 설정
		        drug.setItemCoverImg(imagePath);
		    } else {
		        // 이미지 파일이 존재하지 않으면 원격 이미지 다운로드
		        String remoteImageUrl = drug.getItemImage();
		        RestTemplate restTemplate = new RestTemplate();
		        try {
		            byte[] imageBytes = restTemplate.getForObject(remoteImageUrl, byte[].class);
		            // 이미지를 로컬 경로에 저장
		            Files.write(Paths.get(realPath), imageBytes);
		            // 이미지 경로를 설정
		            drug.setItemCoverImg(imagePath);
		        } catch (Exception e) {
		            e.printStackTrace();
		            drug.setItemCoverImg("0"); // 이미지 다운로드 실패 시 '0' 값을 설정
		        }
		    }
		}
		
		model.addAttribute("count", count);
		model.addAttribute("list", list);
		model.addAttribute("pageInfo", pageInfo);
		model.addAttribute("paramMap", paramMap);
		
		return "drug/symptom";
	}
	
	@ResponseBody
	@PostMapping(value = "/drug/addFavor", produces = "application/json;charset=UTF-8")
	public ResponseEntity<Map<String, String>> addFavor(HttpSession session,
	        @RequestBody Map<String, Object> request) {
	    Member member = (Member) session.getAttribute("loginMember");
	    if (member == null) {
	        Map<String, String> response = new HashMap<>();
	        response.put("message", "로그인이 필요합니다.");
	        return ResponseEntity.badRequest().body(response);
	    }

	    int mno = member.getMno();
	    int itemNo = Integer.parseInt(request.get("itemNo").toString());

	    Map<String, Object> map = new HashMap<>();
	    map.put("mno", mno);
	    map.put("itemNo", itemNo);

	    if (service.getFavorCount(map) > 0) {
	        // 이미 즐겨찾기에 추가된 경우
	        service.removeFavor(map);
	        Map<String, String> response = new HashMap<>();
	        response.put("message", "즐겨찾기에서 삭제합니다.");

	        // 즐겨찾기 상태를 응답에 추가
	        response.put("bookmarked", "true");

	        return ResponseEntity.ok(response);
	    } else {
	        if (service.addFavor(map) > 0) {
	            Map<String, String> response = new HashMap<>();
	            response.put("message", "즐겨찾기에 추가되었습니다.");

	            // 즐겨찾기 상태를 응답에 추가
	            response.put("bookmarked", "false");

	            return ResponseEntity.ok(response);
	        } else {
	            Map<String, String> response = new HashMap<>();
	            response.put("message", "추가하지 못했습니다. 다시 확인해 주세요.");
	            return ResponseEntity.ok(response);
	        }
	    }
	}
	
	@RequestMapping("/member/FavorDrug")
	public String favorDrug(Model model, HttpSession session) {
		Member member = (Member) session.getAttribute("loginMember");
		if(member == null) {
			model.addAttribute("msg","로그인이 필요합니다.");
			model.addAttribute("location","/");
			return "common/msg";
		}
		int mno = member.getMno();
		
		int page = 1;
        List<FavorDrug> favorList = service.getFavorList(mno);
        List<Drug> list = service.getDrugsByFavorList(favorList);
        log.info("favorList" + favorList);
        log.info("drugs" + list);
        model.addAttribute("list", list);
        return "member/favorDrug"; 
	}

	
	
}
