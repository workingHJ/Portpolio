package com.dajeongwon.model.service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dajeongwon.mapper.MemberMapper;
import com.dajeongwon.model.vo.Member;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	MemberMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	Member member = mapper.selectMember(username);
    	
        Optional<Member> memberOptional = Optional.of(mapper.selectMember(username));
        if (memberOptional.isPresent()) {
            return createUserDetails(member);
        } else {
            throw new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다");
        }
    }

    private UserDetails createUserDetails(Member member) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getRole());

        return new User(
                String.valueOf(member.getMNo()),
                member.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}