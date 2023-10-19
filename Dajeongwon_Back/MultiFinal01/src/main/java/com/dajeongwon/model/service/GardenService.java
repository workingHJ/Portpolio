package com.dajeongwon.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dajeongwon.mapper.GardenMapper;
import com.dajeongwon.model.objectVo.MemberfromGNo;
import com.dajeongwon.model.vo.Art;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Garden;
import com.dajeongwon.model.vo.GardenOwner;


@Service
public class GardenService {
	
	private GardenMapper mapper;
	
	//생성자 주입. 순환참조와 SRP 위반 확률을 낮춰준다는데 잘 모르겠음 권장해서 그냥 넣음
	@Autowired
	public GardenService(GardenMapper mapper) {
		this.mapper = mapper;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int saveGarden(Garden garden, int mNo) {
		// garden Table insert
		int gardenResult = mapper.insertGarden(garden);

		// 관계 테이블 만들기 
	    if (gardenResult > 0) {
	    	int gNo = garden.getGNo();
	        GardenOwner gardenOwner = new GardenOwner(gNo, mNo, "Y");
	        int goResult = mapper.insertGardenOwner(gardenOwner);
	        
	        if(goResult < 1) {
	        	System.err.println("goTable에 추가하다가 문제 생김");
	        	return -1;
	        }

	        return gNo; // GardenOwner의 추가 결과를 반환
	    } else {
	        // garden 테이블에 데이터가 정상적으로 추가되지 않았을 때 처리할 코드 (예외처리 등)
	        return 0;
	    }
	}

	public List<Garden> getGardenListbyMNo(int mNo) {
		List<Garden> result = new ArrayList<>();
		for(Garden garden : mapper.getGardenListByMNo(mNo)) {
			garden.setHeadcount(mapper.getHeadCountbyGNo(garden.getGNo()));
			result.add(garden);
		}
		return result;
	}
	
	public List<Garden> getAdminGardenListbyMNo(int mNo){
		return mapper.getAdminGardenListByMNo(mNo);
	}
	
	public List<Garden> getPublicGardenList(Map<String, Object> paramMap) {
		List<Garden> result = new ArrayList<Garden>();
		
		for(Garden garden : mapper.getPublicGardenList(paramMap)) {
			garden.setHeadcount(mapper.getHeadCountbyGNo(garden.getGNo()));
			result.add(garden);
		}
		
		return result;
	}

	public Garden getGardenByGNo(int gNo) {
		return mapper.getGardenByGNo(gNo);
	}

	public List<MemberfromGNo> getMemberListByGNo(int gNo) {
		return mapper.getMembersByGNo(gNo);
	}

	public List<Art> getArtListByGNo(int gNo) {
		return mapper.getArtsByGNo(gNo);
	}

	public int getArtTotalNum(int gNo) {
		return mapper.getArtCountByGNo(gNo);
	}

	public int getArtCompleteNum(int gNo) {
		return mapper.getCompletedArtCountByGNo(gNo);
	}

	@Transactional(rollbackFor = Exception.class)
	public int updateTitleDesc(Map<String, Object> paramMap) {
		return mapper.updateTitleDescByGno(paramMap);
	}

	@Transactional(rollbackFor = Exception.class)
	public int deleteArt(Map<String, Integer> paramMap) {
		return mapper.deleteArt(paramMap);
	}

	public Garden memberCheck(Map<String, Object> paramMap) {
		return mapper.getGardenByGNoMNo(paramMap);
	}

	@Transactional(rollbackFor = Exception.class)
	public int addMember(Map<String, Integer> paramMap) {
		return mapper.insertMembertoGarden(paramMap);
	}
	
	public int countGardenofMember(Map<String, Object> paramMap) {
		return mapper.countGardenByGNoMNo(paramMap);
	}

	@Transactional(rollbackFor = Exception.class)
	public int kickOutMember(Map<String, Object> paramMap) {
		System.err.println("insertKickOutReason " +  mapper.insertKickOutReason(paramMap));
		if(mapper.removeMemberFromGarden(paramMap) == 1 && mapper.insertKickOutReason(paramMap) == 1 ) {
			return 1;
		}else {
			return -1;
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public int setMemberAuth(Map<String, Object> paramMap) {
		return mapper.updateMemberAuth(paramMap);
	}

	public int addMembers(Map<String, Object> paramMap) {
		return mapper.addMembers(paramMap);
	}

	public int updateFlowerStatus(int gNo, int flowerStatus) {
		return mapper.updateFlowerStatus(gNo, flowerStatus);
	}
	
	public List<Garden> getIndexGarden(int count) {
		List<Garden> gardenList = mapper.getIndexGarden(count);
		for(Garden garden : gardenList) {
			garden.setHeadcount(mapper.getHeadCountbyGNo(garden.getGNo()));
		}
    	return gardenList;
	}
	
}
