package com.dajeongwon.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dajeongwon.model.objectVo.MemberResponseDto;
import com.dajeongwon.model.service.AuthService;
import com.dajeongwon.model.service.MemberTokenService;

@Controller
@RequestMapping("/member")
public class MemberTokenController {
	
	@Autowired
	MemberTokenService service;
	
    @GetMapping("/loginInfo")
    public ResponseEntity<Map<String, Object>> getMyMemberInfo() {
    	System.out.println("!!!!!!!!!!!!로그인인포 호출!!!!!!!!!!!!");
        MemberResponseDto myInfoBySecurity = service.getMyInfoBySecurity();
        
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("member", myInfoBySecurity);
        
        return ResponseEntity.status(HttpStatus.OK).body(resultMap);
    }
}
