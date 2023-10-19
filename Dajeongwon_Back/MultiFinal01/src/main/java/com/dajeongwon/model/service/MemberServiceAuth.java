//package com.dajeongwon.model.service;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.dajeongwon.config.SecurityUtil;
//import com.dajeongwon.mapper.MemberMapper;
//import com.dajeongwon.model.objectVo.MemberResponseDto;
//import com.dajeongwon.model.vo.Member;
//
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//@Transactional(rollbackOn = Exception.class)
//public class MemberServiceAuth {
//	
//	@Autowired
//	private MemberMapper mapper;
//
//    private final PasswordEncoder passwordEncoder;
//
//    public MemberResponseDto getMyInfoBySecurity() {
//        Optional<Member> optionalMember = Optional.of(mapper.selectMemberByMNo(SecurityUtil.getCurrentMemberMNo()));
//
//        return optionalMember
//                .map(MemberResponseDto::of)
//                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
//    }
//    
//    // 닉네임 변경 및 패스워드 변경인데 여력이 되면 바꿀 것임 (not now)
//    
//
////    @Transactional
////    public MemberResponseDto changeMemberNickname(String email, String nickname) {
////        Member member = mapper.selectMember(email);
////        member.setNickName(nickname);
////        return MemberResponseDto.of(mapper.updateMember(member));
////    }
////
////    @Transactional
////    public MemberResponseDto changeMemberPassword(String email, String exPassword, String newPassword) {
////        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberMNo()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
////        if (!passwordEncoder.matches(exPassword, member.getPassword())) {
////            throw new RuntimeException("비밀번호가 맞지 않습니다");
////        }
////        member.setPassword(passwordEncoder.encode((newPassword)));
////        return MemberResponseDto.of(memberRepository.save(member));
//        
//}