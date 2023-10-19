package com.dajeongwon.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.dajeongwon.model.vo.Member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = { "http://localhost:3000" }, maxAge = 5000, allowedHeaders = ("*"))
@Controller
@SessionAttributes("loginMember")
public class OAuthController {
	
	@Autowired
	public OAuthService service;


	@PostMapping("/oauth2/naver/login")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> naverOauth(@RequestBody Map<String, String> param, HttpSession session) {
		System.out.println("네이버");
		String code = param.get("code");
		String token = service.getNaverAccessToken(code);
		
		Member loginMember = service.naverUserInfo(token);

		Map<String, Object> map = new HashMap<>();
		if (loginMember != null) { // 성공
			map.put("result", true);
			map.put("member", loginMember);
			System.err.println("로그인 성공!!!!!!!!!!");
			session.setAttribute("loginMember", loginMember);
			session.setAttribute("accessToken", token);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		} else { // 실패
			System.err.println("로그인 실패");
			map.put("result", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		}
	}
	
	@PostMapping("/oauth2/kakao/login")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> kakaoOauth(@RequestBody Map<String, String> param, HttpSession session) {
		System.out.println("카카오");
		String code = param.get("code");
		String token = service.getKakaoAccessToken(code);
		
		Member loginMember = service.kakaoUserInfo(token);
		
		Map<String, Object> map = new HashMap<>();
		if (loginMember != null) { // 성공
			map.put("result", true);
			map.put("member", loginMember);
			System.err.println("로그인 성공!!!!!!!!!!");
			session.setAttribute("loginMember", loginMember);
			session.setAttribute("accessToken", token);
			return ResponseEntity.status(HttpStatus.OK).body(map);
		} else { // 실패
			System.err.println("로그인 실패");
			map.put("result", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		}
	}
	
}
