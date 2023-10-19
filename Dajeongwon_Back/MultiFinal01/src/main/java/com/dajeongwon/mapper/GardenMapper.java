package com.dajeongwon.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.dajeongwon.model.objectVo.MemberfromGNo;
import com.dajeongwon.model.vo.Art;
import com.dajeongwon.model.vo.Garden;
import com.dajeongwon.model.vo.GardenOwner;

@Mapper
public interface GardenMapper {
	
	int findGardenByGno(Garden garden);

	int insertGarden(Garden garden);
	
	int countGardenBymNo(int mNo);
	
	int insertGardenOwner(GardenOwner gardenOwner);

	List<Garden> getGardenListByMNo(int mNo);
	
	List<Garden> getPublicGardenList(Map<String, Object> paramMap);

	List<Garden> getAdminGardenListByMNo(int mNo);
	
	Garden getGardenByGNo(int gNo);

	List<MemberfromGNo> getMembersByGNo(int gNo);

	List<Art> getArtsByGNo(int gNo);

	int getArtCountByGNo(int gNo);
	
	int getCompletedArtCountByGNo(int gNo);

	int updateTitleDescByGno(Map<String, Object> paramMap);

	int updateArtToInActive(Map<String, Integer> paramMap);
	
	int deleteArt(Map<String, Integer> paramMap);

	Garden getGardenByGNoMNo(Map<String, Object> paramMap);
	
	int countGardenByGNoMNo(Map<String, Object> paramMap);

	int insertMembertoGarden(Map<String, Integer> paramMap);

	int removeMemberFromGarden(Map<String, Object> paramMap);

	int insertKickOutReason(Map<String, Object> paramMap);

	int updateMemberAuth(Map<String, Object> paramMap);

	int addMembers(Map<String, Object> paramMap);

	int updateFlowerStatus(@Param("gNo")int gNo, @Param("flowerStatus")int flowerStatus);

	int getHeadCountbyGNo(int gNo);
	
	List<Garden> getIndexGarden(int count);
	
}
