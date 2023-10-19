package com.dajeongwon.controller;

import java.io.File;
import java.io.IOException;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.dajeongwon.model.objectVo.GardenNMember;
import com.dajeongwon.model.objectVo.MemberfromGNo;
import com.dajeongwon.model.service.ArtService;
import com.dajeongwon.model.service.GardenService;
import com.dajeongwon.model.vo.Art;
import com.dajeongwon.model.vo.ArtReview;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Garden;
import com.dajeongwon.model.vo.Member;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, maxAge = 5000, allowedHeaders = ("*"))
@RequestMapping("/garden")
@SessionAttributes("loginMember")
public class GardenController {
	
	private GardenService service;
	private ArtService artService;
	
	
	@Autowired
	public GardenController(GardenService service, ArtService artService) {
		this.service = service;
		this.artService = artService;
	}
		
	// ResponseBody : html에 그대로 그리게 하는 거. JSON이나 XML 자동 변환 지원하기 때문에 API 엔드 포인트를 생성하는 데 자주 이용된다. 
	// 				  RestController를 써서 동시에 적용도 가능한데 일단은 수동으로 해둠
	@PostMapping(value = "/create", produces = "application/json; charset=UTF-8")
	public ResponseEntity<Map<String, Object>> makeGarden(@RequestBody GardenNMember gNm) {
        Garden garden = gNm.getGarden();
        Member member = gNm.getMember();
        
        int mNo = member.getMNo();
        garden.setMakerMNo(mNo);

        int gNo = service.saveGarden(garden, mNo);
        
		Map<String, Object> resultMap = new HashMap<>();

		if (gNo < 0) {
			resultMap.put("result", false);
			resultMap.put("message", "컨트롤러에서 문제가 생겼어요!");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultMap);
		} else {
			resultMap.put("result", true);
			resultMap.put("gNo", gNo);
			return ResponseEntity.status(HttpStatus.OK).body(resultMap);
		}
	}
	
	@PostMapping("/uploadImg")
	public ResponseEntity<String> uploadImg(@RequestParam("coverImg") MultipartFile file) {
		
		if(file.isEmpty()) {
		      return ResponseEntity.badRequest().body("파일 없음!!!!");
		}
		
		try {
			String uploadDirectory = "./src/main/resources/static/garden";
			
			// 디렉토리 지정 (없으면 만듦)
			File dir = new File(uploadDirectory);
			if(!dir.exists()) {
				dir.mkdirs();
			}
			
			//서버에 이미지 저장
			String fileName = file.getOriginalFilename();
			File serverFile = new File(dir.getAbsolutePath() + File.separator + fileName );
			file.transferTo(serverFile);
			
			return ResponseEntity.ok("File upload successful!");
		} catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("컨트롤러에서 뭔가 문제생김");
        }
	}
	
	@GetMapping("/getPublicGardenList")
	public ResponseEntity<Map<String, Object>> getPublicGardenList (@RequestParam Map<String, Object> paramMap){
		Map<String, Object> resultMap = new HashMap<>();
		
		System.err.println("paramMap 호출" + paramMap);
		
		paramMap.put("limit", 50);
		
		Map<String, Object> paramMapForBest = new HashMap<>();
		paramMapForBest.put("limit", 2);
		paramMapForBest.put("sort", "highHeadcount");
		
		System.err.println("gardenList 호출 ");
		List<Garden> gardenList = service.getPublicGardenList(paramMap);
		
		System.err.println("bestGardens 호출");
		List<Garden> bestGardens = service.getPublicGardenList(paramMapForBest);
		
		if(gardenList == null || bestGardens == null) {
			resultMap.put("result", false);
		}else {
			resultMap.put("result", true);
			resultMap.put("gardenList", gardenList);
			resultMap.put("bestGardens", bestGardens);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/getAdminGardenData")
	public ResponseEntity<Map<String, Object>> getAdminGardenList (@RequestParam("mno") int mNo){
		
		List<Garden> adminGardenList = service.getAdminGardenListbyMNo(mNo);
		Map<String, Object> resultMap = new HashMap<>();
		
		if(adminGardenList == null) {
			resultMap.put("result", "fail");
			System.err.println("!!!!!!!getAdminGardenData에서 문제생김!!!!!!!");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultMap);
		} else {
			resultMap.put("adminGardenList", adminGardenList);
			resultMap.put("result", "ok");
			return ResponseEntity.status(HttpStatus.OK).body(resultMap);
		}
	}
	
	@GetMapping("/getGarden")
	public ResponseEntity<Map<String, Object>> getPublicGarden (@RequestParam("gNo") int gNo, 
																@SessionAttribute(name = "loginMember", required = false) Member loginMember){
		System.err.println("garden 가져오기");
		Garden garden = service.getGardenByGNo(gNo);

		garden.setArtTotal(service.getArtTotalNum(gNo));
		garden.setCompleted(service.getArtCompleteNum(gNo));

		Map<String, Object> resultMap = new HashMap<>();
		
		if(garden == null) {
			resultMap.put("result", "fail");
			System.err.println("!!!!!!!getGarden에서 문제생김!!!!!!!");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultMap);
		} else {
			resultMap.put("garden", garden);
			resultMap.put("result", "ok");
			return ResponseEntity.status(HttpStatus.OK).body(resultMap);
		}
	}
	
	@GetMapping("/getArtTotalCount")
	public ResponseEntity<Map<String, Object>> getPublicGarden (@RequestParam("gNo") int gNo){
		int totalCount = service.getArtTotalNum(gNo);
		int completedCount = service.getArtCompleteNum(gNo);
		Map<String, Object> resultMap = new HashMap<>();
		
		resultMap.put("result", true);
		resultMap.put("totalCount", totalCount);
		resultMap.put("completeCount", completedCount);
		
		System.err.println(resultMap);
		
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/getGardenMembers")
	public ResponseEntity<Map<String, Object>> getGardenMembers (@RequestParam("gNo") int gNo, 
			@SessionAttribute(name = "loginMember", required = false) Member loginMember){
		System.err.println("memberList 가져오기");
		List<MemberfromGNo> memberList = service.getMemberListByGNo(gNo);
		
		Map<String, Object> resultMap = new HashMap<>();
		
		if(memberList == null) {
			resultMap.put("result", false);
			System.err.println("!!!!!!!getGardenMembers에서 문제생김!!!!!!!");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultMap);
		} else {
			resultMap.put("memberList", memberList);
			resultMap.put("result", true);
			return ResponseEntity.status(HttpStatus.OK).body(resultMap);
		}
	}
	
	@GetMapping("/getArtList")
	public ResponseEntity<Map<String, Object>> getArtListByGNo (@RequestParam("gNo") int gNo, 
																@SessionAttribute(name = "loginMember", required = false) Member loginMember){
		List<Art> artList = service.getArtListByGNo(gNo);
		
		Map<String, Object> resultMap = new HashMap<>();
		
		if(artList == null) {
			resultMap.put("result", "fail");
			System.err.println("!!!!!!!getGarden에서 문제생김!!!!!!!");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultMap);
		} else {
			resultMap.put("artList", artList);
			resultMap.put("result", "ok");
			return ResponseEntity.status(HttpStatus.OK).body(resultMap);
		}
		
	}
	
	@GetMapping("/updateDescTitle")
	public ResponseEntity<Map<String, Object>> getArtListByGNo (@RequestParam Map<String, Object> paramMap, 
																@SessionAttribute(name = "loginMember", required = false) Member loginMember){
		
		Map<String, Object> resultMap = new HashMap<>();

		System.err.println(paramMap);
		int updateResult = service.updateTitleDesc(paramMap);
		if(updateResult != 1) {
			resultMap.put("result", "fail");
			System.out.println();
		} else { 
			resultMap.put("result", "ok");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
		
	
	}
	
	@GetMapping("/deleteArt")
	public ResponseEntity<Map<String, Object>> deleteArt(@RequestParam("gNo") int gNo, @RequestParam("aNo") int aNo,
																@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("gNo", gNo);
		paramMap.put("aNo", aNo);
		
		System.err.println(paramMap);
		int deleteResult = service.deleteArt(paramMap);
		
		Map<String, Object> resultMap = new HashMap<>();

		if(deleteResult != 1) {
			resultMap.put("result", "fail");
		} else {
			resultMap.put("result", "ok");
		}

		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/addMember")
	public ResponseEntity<Map<String, Object>> addMember(@RequestParam("gNo") int gNo, @RequestParam("mNo") int mNo,
														@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("gNo", gNo);
		paramMap.put("mNo", mNo);

		System.out.println("addMember 호출!!!!!!!!!!!!!!!");
		System.err.println(paramMap);
		
		int result = service.addMember(paramMap);

		Map<String, Object> resultMap = new HashMap<>();
		
		if(result < 1) {
			resultMap.put("result", false);
			resultMap.put("message", "멤버를 제대로 추가하지 못했습니다. 고객센터로 문의해주세요.");
		}else {
			resultMap.put("result", true);
			resultMap.put("message", "멤버를 추가하였습니다.");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/checkMember")
	public ResponseEntity<Map<String, Object>> checkMember(@RequestParam("gNo") int gNo, @RequestParam("mNo") int mNo,
															@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		Map<String, Object> paramMap = new HashMap<>();
		
		paramMap.put("mNo", mNo);
		paramMap.put("gNo", gNo);
		
		System.out.println("!!!!!!!checkMember 호출!!!!!!!");
		
		Map<String, Object> resultMap = new HashMap<>();
		
		if(service.countGardenofMember(paramMap) < 1) {
			resultMap.put("isMember", false);
		} else {
			Garden garden = service.memberCheck(paramMap);
			resultMap.put("isAdmin", garden.getIsAdmin()); // 'Y' 'N' 중 하나
			resultMap.put("isMember", true);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("kickOutMember")
	public ResponseEntity<Map<String, Object>> kickOutMember(@RequestParam("gNo") int gNo, @RequestParam("executeMNo") int executeMNo, 
															 @RequestParam("deportedMNo") int deportedMNo, @RequestParam("kickOutReason") String kickOutReason,
															 @SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		Map<String, Object> paramMap = new HashMap<>();

		paramMap.put("gNo", gNo);
		paramMap.put("executeMNo", executeMNo);
		paramMap.put("deportedMNo", deportedMNo);
		paramMap.put("kickOutReason", kickOutReason);

		System.err.println("!!!!!!!kickOutMember 호출!!!!!!!");

		Map<String, Object> resultMap = new HashMap<>();

		int result = service.kickOutMember(paramMap);
		
		System.err.println(result);
		if(result == -1) { // 실패
			resultMap.put("result", false); // 'Y' 'N' 중 하나
			resultMap.put("message", "인원을 추방하는 데에 문제가 발생했습니다. 다정원 관리자에게 문의해주세요.");
		} else {		//성공 
			resultMap.put("result", true);			
			resultMap.put("message", "선택한 멤버가 추방되었습니다.");
		}

		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("setMemberAuth")
	public ResponseEntity<Map<String, Object>> setMemberAuth(@RequestParam Map<String, Object> paramMap){
		
//		param : gNo, mNo, isAdmin
		
		System.err.println(paramMap);
		
		Map<String, Object> resultMap = new HashMap<>();
		
		int result = service.setMemberAuth(paramMap);
		
		// result가 0 이상이면 성공 
		if(result < 1) {
			resultMap.put("result", false);
			resultMap.put("message", "멤버 권한을 변경하지 못했습니다. 다시 확인해주세요!");
		} else {
			resultMap.put("result", true);
			resultMap.put("message", "권한을 변경했습니다.");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}

	
	
	@GetMapping("/artDetail")
	public ResponseEntity<Map<String, Object>> getArtDetail(@RequestParam("aNo") int aNo, @RequestParam("gNo") int gNo,
																			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("gNo", gNo);
		paramMap.put("aNo", aNo);

		System.err.println("!!!!!!!artDetail 호출!!!!!!!");
		
		Art art = artService.getArtInGarden(paramMap);
		art.setReviewCount(artService.getArtReviewCount(paramMap));
		if(art.getReviewCount() > 0) {
			art.setRating(artService.getRating(paramMap));			
		}
		Garden garden = service.getGardenByGNo(gNo);
		Date meetingDate = garden.getMeetingDate();
		String gardenTitle = garden.getTitle();
		int flowerStatus = garden.getFlowerStatus();
		String flower = garden.getFlower();
		
		System.err.println(art);
		System.err.println(garden);
		
		// 결과 반환 
		Map<String, Object> resultMap = new HashMap<>();
		if(art == null) {
			System.err.println("!!!!!!뭔가 문제 생김!!!!!!");
			resultMap.put("result", false);
		}else {
			resultMap.put("result", true);
			resultMap.put("artData", art);
			resultMap.put("meetingDate", meetingDate);
			resultMap.put("gardenTitle", gardenTitle);
			resultMap.put("flower", flower);
			resultMap.put("flowerStatus", flowerStatus);
		}

		System.err.println(resultMap);
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/getArtReviewRate")
	public ResponseEntity<Map<String, Object>> getArtDetail(@RequestParam("aNo") int aNo, @RequestParam("gNo") int gNo){
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("gNo", gNo);
		paramMap.put("aNo", aNo);
		
		int reviewCount = artService.getArtReviewCount(paramMap);
		float reviewRating = 0;
		
		if(reviewCount > 0) {
			reviewRating = artService.getRating(paramMap);
		}
		
		Map<String, Object> resultMap = new HashMap<>();
		
		resultMap.put("reviewCount", reviewCount);
		resultMap.put("rating", reviewRating);
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/changeArtStatus")
	public ResponseEntity<Map<String, Object>> completeArt(@RequestParam("aNo") int aNo, @RequestParam("gNo") int gNo, @RequestParam("status") String status) {
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("aNo", aNo);
		paramMap.put("status", status);

		int result = artService.completeArt(paramMap);
		
		System.out.println("상태 변경 완료");
		
		int total = service.getArtTotalNum(gNo);
		int completeCount = service.getArtCompleteNum(gNo);
		Garden garden = service.getGardenByGNo(gNo);
		int presentFlowerStatus = garden.getFlowerStatus();
		int setFlowerStatus = 1;
		if(total == 0 || completeCount == 0) {
			System.err.println("0으로 나눔");
		} else {
			double progressPercentage = (double) completeCount / total * 100;
			// 1 2 3 4 . 25% 단위로 나눈 단계 
			setFlowerStatus= (int) (progressPercentage / 25);
		}
		
		int statusChangeResult = 0;
		
		// 키우는 것만 하고 줄이는 건 안 함
		if(presentFlowerStatus < setFlowerStatus) {
			statusChangeResult = service.updateFlowerStatus(gNo, setFlowerStatus);
		}
		
		Map<String, Object> resultMap = new HashMap<>();
		
		// result가 0 이상이면 성공 
		if(result < 1) {
			resultMap.put("result", false);
			resultMap.put("message", "작품 상태를 변경하지 못했습니다. 다시 확인해주세요!");
		} else {
			resultMap.put("result", true);
			resultMap.put("message", "상태를 변경했습니다.");
		}
		
		if(statusChangeResult > 0) {
			resultMap.put("statusChanged", true);
			resultMap.put("flowerStatus", setFlowerStatus);
		}
		
		System.err.println(resultMap);
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	
	@GetMapping("/artReviewList")
	public ResponseEntity<Map<String, Object>> getReviewList(@RequestParam("aNo") int aNo, @RequestParam("gNo") int gNo,
																			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("gNo", gNo);
		paramMap.put("aNo", aNo);
		
		List<ArtReview> artReviewList = artService.getArtReviews(paramMap);
		
		// 결과 반환
		Map<String, Object> resultMap = new HashMap<>();
		if(artReviewList == null) {
			resultMap.put("result", false);
		}else {
			resultMap.put("artReviewList", artReviewList);
			resultMap.put("result", true);
		}

		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/artReview")
	public ResponseEntity<Map<String, Object>> getReview(@RequestParam("aNo") int aNo, @RequestParam("gNo") int gNo, @RequestParam("rNo") int rNo) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("gNo", gNo);
		paramMap.put("aNo", aNo);
		paramMap.put("rNo", rNo);
		
		ArtReview reviewData = artService.getArtReview(paramMap);
		
		// 결과 반환
		Map<String, Object> resultMap = new HashMap<>();
		if(reviewData == null) {
			resultMap.put("result", false);
		}else {
			resultMap.put("reviewData", reviewData);
			resultMap.put("result", true);
		}
	
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@PostMapping("/saveArtReview")
	public ResponseEntity<Map<String, Object>> saveReviewData(@RequestBody Map<String, Object> paramMap) {
		
		//aNo gNo rNo mNo title content rating
		String message = "";
		
        // 오늘 날짜 가져오기
        LocalDate today = LocalDate.now();

        // 날짜를 원하는 형식의 문자열로 변환
        String formattedDate = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        
        paramMap.put("modifiedDate", formattedDate);
		
        Map<String, Object> resultMap = artService.saveReviewInArt(paramMap);
        
        System.err.println(resultMap);
        
		if(resultMap.get("type").equals("update")) {
			message = "정상적으로 수정되었습니다.";
		} else {
			message = "정상적으로 등록되었습니다.";
		}
		
		resultMap.put("message", message);
		
		// result가 0 이상이면 성공 
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/deleteArtReview")
	public ResponseEntity<Map<String, Object>> deleteArtReview(@RequestParam("rNo") int rNo) {
		
		Map<String, Object> paramMap = new HashMap<>();

		// 오늘 날짜 가져오기
		LocalDate today = LocalDate.now();
		// 날짜를 원하는 형식의 문자열로 변환
		String modifiedDate = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		paramMap.put("rNo", rNo);
		paramMap.put("modifiedDate", modifiedDate);
		
		int result = artService.deleteReviewArt(paramMap);
		
		Map<String, Object> resultMap = new HashMap<>();
		
		String message = "";
		
		if(result < 1) {
			resultMap.put("result", false);
			resultMap.put("message", "정상적으로 삭제하지 못했습니다. 다정원 관리자에게 문의 해주세요.");
		} else {
			resultMap.put("result", true);
			resultMap.put("message", "정상적으로 삭제했습니다.");
		}
		
		// result가 0 이상이면 성공 
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@PostMapping(value = "/addMembers", produces = "application/json; charset=UTF-8")
	public ResponseEntity<Map<String, Object>> addMembersWhenGardenMake(@RequestBody Map<String, Object> paramMap) {
		System.out.println("addMember GardenList 호출!!!!!!!!!!!!!!!");
		
		System.out.println(paramMap);
	
		int gNo = Integer.parseInt((String) paramMap.get("gNo"));
		List<String> mNoList = (List<String>) paramMap.get("mNoList");
		
		int result = service.addMembers(paramMap);
		
		System.out.println(mNoList);

		Map<String, Object> resultMap = new HashMap<>();
		
		if(result < 1) {
			resultMap.put("result", false);
			resultMap.put("message", "멤버를 제대로 추가하지 못했습니다. 고객센터로 문의해주세요.");
		}else {
			resultMap.put("result", true);
			resultMap.put("message", "멤버를 추가하였습니다.");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(resultMap);
	}
	
	@GetMapping("/getIndexGarden")
	public ResponseEntity<Map<String, Object>> getIndexGarden(@RequestParam("count") int count){
		
		Map<String, Object> map = new HashMap<>();
    	List<Garden> gardenList = new ArrayList<>();
    	gardenList = service.getIndexGarden(count);
    	
		
    	map.put("result", true);
    	map.put("gardenList", gardenList);
    	
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}


}
