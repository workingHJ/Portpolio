package com.dajeongwon.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.dajeongwon.model.vo.ArtReview;
import com.dajeongwon.model.vo.Member;


@Mapper
public interface MemberMapper {
	
	Member selectMember(String email);
	
	Member findSNSMebmer(String email);
	
	Member selectMemberByMNo(int mNo);

	int insertMember(Member member);
	
	int insertSNSMember(Member member);

	int updateMember(Member member);
	
	int deleteMember(int no);

	int updatePwd(Map<String, String> map);

	int updateMImg(@Param("mImg")String mImg, @Param("mNo")int mNo);

	List<ArtReview> selectMyReview(int mNo);

}