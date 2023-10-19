package com.dajeongwon.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.dajeongwon.model.service.GardenService;
import com.dajeongwon.model.service.MemberService;
import com.dajeongwon.model.vo.ArtReview;
import com.dajeongwon.model.vo.Garden;
import com.dajeongwon.model.vo.Member;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = { "http://localhost:3000" }, maxAge = 5000, allowedHeaders = ("*"))
@Controller
@SessionAttributes("loginMember")
public class MemberController {
	final static private String savePath = "C:\\dev_source\\vscode_git\\MultiFinal01Front\\public\\images\\uploads\\";
	@Autowired
	private MemberService service;

	@Autowired
	private GardenService gardenService;

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> param, HttpSession session) {
		String email = param.get("email");
		String pwd = param.get("password");
		System.err.println("id : " + email + ", pwd : " + pwd);
		Member loginMember = service.login(email, pwd);

		Map<String, Object> map = new HashMap<>();

		if (loginMember == null) { // 실패
			System.err.println("로그인 실패");
			map.put("result", false);
			map.put("message", "로그인에 실패했습니다.");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		}

		// 탈퇴한 회원
		if (loginMember.getStatus().equals("INACTIVE")) {
			map.put("result", false);
			map.put("message", "탈퇴한 회원입니다.");
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}

		// 성공
		map.put("result", true);
		map.put("member", loginMember);
		map.put("message", "정상적으로 로그인되었습니다.");
		System.err.println("로그인 성공!!!!!!!!!!");
		session.setAttribute("loginMember", loginMember);
		return ResponseEntity.status(HttpStatus.OK).body(map);

	}

	// 로그인 인포 가져오는 거(세션에 있는 로그인 정보 가져오기)
	@GetMapping("/loginInfo")
	public ResponseEntity<Map<String, Object>> getLoginInfo(
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		Map<String, Object> map = new HashMap<>();
		System.out.println("로그인 인포 호출됨" + loginMember);

		if (loginMember != null) { // 성공
			map.put("result", true);
			map.put("member", loginMember);

			return ResponseEntity.status(HttpStatus.OK).body(map);
		} else { // 실패
			map.put("result", false);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}
	}

	@GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(SessionStatus status, HttpServletRequest request) {
        System.out.println("!!!!!!!!!logOut 호출됨!!!!!!!!!!!!!");
        status.setComplete();
        
        // Invalidate HttpSession to terminate the session
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        Map<String, Object> map = new HashMap<>();
        map.put("result", true);
        return ResponseEntity.status(HttpStatus.OK).body(map);
    }

	@PostMapping("/enroll")
	public ResponseEntity<Map<String, Object>> enroll(Model model, @RequestBody Member member) {
		System.err.println("enroll 호출됨!!!!!!!!!!!!!");
		System.out.println(member);
		member.setMImg("/member/default.png");
		Map<String, Object> map = new HashMap<>();
		int result = service.save(member);
		if (result > 0) { // 성공
			map.put("result", true);
		} else { // 실패
			map.put("result", false);
		}
		System.out.println(map);
		return ResponseEntity.status(HttpStatus.OK).body(map);
	}

	// AJAX 회원아이디 중복 검사부
	// String email
	@GetMapping("/member/idCheck")
	public ResponseEntity<Map<String, Object>> idCheck(@RequestParam("email") String email) {
		System.err.println("idCheck 호출됨!!!!!!!!!!!!!");
		log.info("아이디 중복 확인 : " + email);

		boolean result = service.validate(email);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("validate", result);
		
		System.out.println("!!!!!!!!!!!!validate 확인!!!!!!!!!!!!" + result);

		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@PostMapping(path = "/imgupdate", produces = "application/json; charset=utf8")
	public ResponseEntity<Map<String, Object>> update(Model model,
	        @SessionAttribute(name = "loginMember", required = false) Member loginMember,
	        @RequestParam(name = "upfile", required = false) MultipartFile upfile) {

	    System.err.println("update 호출됨!!!!!!!!!!!!!");

	    Map<String, Object> map = new HashMap<>();
	    log.info("update 요청, loginMember : " + loginMember);

	    if (loginMember == null) {
	        map.put("result", false);
	        return ResponseEntity.status(HttpStatus.OK).body(map);
	    }
	    
	    // 파일 저장 로직
	    if (upfile != null && !upfile.isEmpty()) {
	        // 기존 파일이 있는 경우 삭제
	        if (loginMember.getMImg() != null) {
	            service.deleteFile(savePath + "/" + loginMember.getMImg());
	        }

	        String renameFileName = service.saveFile(upfile, savePath); // 실제 파일 저장하는 로직

	        if (renameFileName != null) {
	            loginMember.setMImg(renameFileName); // mImg로 설정
	        }
	    }

	    int result = service.save(loginMember);
	    if (result != 0) {
	        model.addAttribute("loginMember", service.findByEmail(loginMember.getEmail())); // DB에서 있는 값을 다시 세션에 넣어주는 코드
	        map.put("result", true);
	    } else {
	        map.put("result", false);
	    }
	    return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	
	@PostMapping(path = "/member/uploadmImg", produces = "application/json; charset=utf8")
    public ResponseEntity<String> uploadFile(@RequestParam("memberImg") MultipartFile file, Model model,
    										@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		
		System.out.println("!!!!!!!memberUpload 호출!!!!!!!");
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }
        
        if(loginMember == null) {
            return ResponseEntity.badRequest().body("로그인되어있지 않음");
        }

        try {
			String uploadDirectory = "./src/main/resources/static/member";
			
			// 디렉토리 지정 (없으면 만듦)
			File dir = new File(uploadDirectory);
			if(!dir.exists()) {
				dir.mkdirs();
			}
        	
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            File dest = new File(dir.getAbsolutePath() + File.separator + fileName);
            String mImg = "/member/" +  fileName;
            file.transferTo(dest);
            
            loginMember.setMImg(mImg);
            int result = service.updatemImg(mImg, loginMember.getMNo());
            
            System.out.println("저장함");

    		if(result != 0) {
    			model.addAttribute("loginMember", service.findByEmail(loginMember.getEmail())); // DB에서 있는 값을 다시 세션에 넣어주는 코드
    			return ResponseEntity.ok("File upload successful!");
    		} else {
                return ResponseEntity.status(500).body("Failed to upload file");
    		}
    		
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload file");
        }
    }
	
	
	@PostMapping(path = "/update", produces = "application/json; charset=utf8")
	public ResponseEntity<Map<String, Object>> update(Model model, @RequestBody Member member, // request에서 온 값
			@SessionAttribute(name = "loginMember", required = false) Member loginMember
			// 세션 값
	) {
		System.err.println("update 호출됨!!!!!!!!!!!!!");
		
		Map<String, Object> map = new HashMap<>();
		log.info("update 요청, updateMember : " + member);
		log.info("update 요청, loginMember : " + loginMember);
		
		if (loginMember == null) {
			map.put("result", false);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		}

		member.setMNo(loginMember.getMNo());
		member.setPassword(loginMember.getPassword());
		
		
		int result = service.save(member);
		if(result != 0) {
			model.addAttribute("loginMember", service.findByEmail(loginMember.getEmail())); // DB에서 있는 값을 다시 세션에 넣어주는 코드
			map.put("result", true);
		} else {
			map.put("result", false);
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}
	
	

	@PostMapping("/updatePwd")
	public ResponseEntity<Map<String, Object>> updatePwd(Model model,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember,
			@RequestBody Map<String, String> paramMap) {
		System.err.println("updatePwd 호출됨!!!!!!!!!!!!!");
		Map<String, Object> map = new HashMap<>();
		int result = service.updatePwd(loginMember, paramMap.get("password"));
		if (result > 0) {
			map.put("result", true);
		} else {
			map.put("result", false);
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@GetMapping("/delete")
	public ResponseEntity<Map<String, Object>> delete(SessionStatus status,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {
		loginMember.setStatus("0");
		service.save(loginMember);
		status.setComplete();
		Map<String, Object> map = new HashMap<>();
		map.put("result", true);
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}

	@GetMapping("/member/getMemberByEmail")
	public ResponseEntity<Map<String, Object>> delete(@RequestParam("email") String email, @RequestParam("gNo") int gNo,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {

		System.out.println("getMemberByEmail 호출!!!!!!!!!!!!!");
		Map<String, Object> paramMap = new HashMap<>();
		Map<String, Object> resultMap = new HashMap<>();

		System.err.println("email!!!!!!!!!" + email);

		Member member = service.findByEmail(email);
		System.err.println("member" + member);

		// 검색해오기

		// 만약 멤버가 없다면 종료
		if (member == null) {
			resultMap.put("message", "Email로 검색되지 않습니다. 다시 한 번 확인해주세요.");
			resultMap.put("result", false);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		}

		// 있다면 이미 이 정원에 가입되어있는지 체크
		int mNo = member.getMNo();
		paramMap.put("mNo", mNo);
		paramMap.put("gNo", gNo);

		Garden garden = gardenService.memberCheck(paramMap);

		if (garden != null) {
			resultMap.put("message", "이미 이 정원에 가입되어 있습니다.");
			resultMap.put("result", false);
		} else {
			resultMap.put("nickName", member.getNickName());
			resultMap.put("mNo", member.getMNo());
			resultMap.put("mImg", member.getMImg());
			resultMap.put("memberSNSType", member.getSnsType());
			resultMap.put("message", "님을 찾았습니다. 정원에 초대하시려면 아래의 버튼을 눌러주세요.");
			resultMap.put("result", true);
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@GetMapping("/member/getGardens")
	public ResponseEntity<Map<String, Object>> getGardens(
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {

		System.out.println("GetGarden By Member 호출");

		List<Garden> gardens = gardenService.getGardenListbyMNo(loginMember.getMNo());

		Map<String, Object> resultMap = new HashMap<>();

		if (gardens == null) {
			resultMap.put("result", false);
		} else {
			resultMap.put("result", true);
			resultMap.put("GardenList", gardens);
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	// ============================================ 내가 쓴 감상
	@GetMapping("/getMyReviews")
	public ResponseEntity<Map<String, Object>> getMyReviews(@SessionAttribute(name = "loginMember", required = false) Member loginMember){
		System.out.println("리뷰리스트 요청됨@@@@@@@@@@@@@@@@");
		List<ArtReview> reviewList = service.getMyReviews(loginMember.getMNo());
		Map<String, Object> resultMap = new HashMap<>();
		System.out.println(reviewList);
		if (reviewList == null) {
			resultMap.put("result", false);
		} else {
			resultMap.put("result", true);
			resultMap.put("reviewList", reviewList);
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	// ========================================================

}
