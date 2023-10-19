package com.dajeongwon.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dajeongwon.model.objectVo.MemberRequestDto;
import com.dajeongwon.model.objectVo.MemberResponseDto;
import com.dajeongwon.model.objectVo.TokenDto;
import com.dajeongwon.model.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody MemberRequestDto requestDto) {
    	System.err.println("!!!!!!!!!!!!!!!!!!! signUp컨트롤러!!!!!!!!!!!!!!!!!!!");
    	
    	Map<String, Object> resultMap = new HashMap<>();
    	
    	int result = authService.signup(requestDto);
    	
    	if(result == -1) {
    		resultMap.put("result", false);
    		resultMap.put("message", "이미 가입되어 있는 아이디입니다. 다시 한 번 더 확인해주세요.");
    	} else if(result == 1) {
    		resultMap.put("result", true);
    		resultMap.put("message", "회원가입에 성공하였습니다. 로그인해주세요.");
    	} else {
    		resultMap.put("result", false);
    		resultMap.put("message", "가입하는 동안 문제가 발생했습니다. 다정원 관리자에게 확인해주세요.");
    	}
    	
        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
    	System.err.println("!!!!!!!!!!!!!!!!!!! 로그인 컨트롤러!!!!!!!!!!!!!!!!!!!");
        return ResponseEntity.ok(authService.login(requestDto));
    }
}