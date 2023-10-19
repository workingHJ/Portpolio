package com.dajeongwon.model.objectVo;

import com.dajeongwon.model.vo.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
// 토큰의 값을 헤더에서 뽑거나 헤더에서 삽입할 때 쓰는 DTO
public class MemberResponseDto {
	private int mNo;
    private String email;
    private String nickName;
    private String mImg;

    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
        		.mNo(member.getMNo())
                .email(member.getEmail())
                .nickName(member.getNickName())
                .mImg(member.getMImg())
                .build();
    }
}