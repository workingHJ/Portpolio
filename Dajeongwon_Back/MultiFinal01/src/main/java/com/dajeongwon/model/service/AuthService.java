package com.dajeongwon.model.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dajeongwon.jwt.TokenProvider;
import com.dajeongwon.mapper.MemberMapper;
import com.dajeongwon.model.objectVo.MemberRequestDto;
import com.dajeongwon.model.objectVo.MemberResponseDto;
import com.dajeongwon.model.objectVo.TokenDto;
import com.dajeongwon.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    
    
    @Autowired
    MemberMapper mapper;

    @Transactional(rollbackFor = Exception.class)
    public int signup(MemberRequestDto requestDto) {
    	System.err.println(requestDto.getEmail());
        if (mapper.selectMember(requestDto.getEmail()) != null) {
        	System.out.println(mapper.selectMember(requestDto.getEmail()));
            return -1;
        }
        Member member = requestDto.toMember(passwordEncoder);
        
        // 디폴트 이미지 적용 
        member.setMImg("/member/default.png");
        
        int result = mapper.insertMember(member);
        return result;
    }

    @Transactional(rollbackFor = Exception.class)
    public TokenDto login(MemberRequestDto requestDto) {
        
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }

}