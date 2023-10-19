package com.multi.semi03.animalHospital.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.multi.semi03.animalHospital.model.mapper.AnimalhospitalMapper;
import com.multi.semi03.animalHospital.model.vo.Animalhospital;
import com.multi.semi03.animalHospital.model.vo.FavorAnimalhospital;
import com.multi.semi03.common.util.PageInfo;

@Service
public class AnimalhospitalService {

		@Autowired
		private AnimalhospitalMapper mapper; 
		
		public int getAnimalhospitalCount(Map<String,Object> paramMap) {
			return mapper.selectAnimalhospitalCount(paramMap); 
		}
		public List<Animalhospital> getAnimalhospitalList(PageInfo pageInfo, Map<String, Object> paramMap) {
			paramMap.put("limit", "" + pageInfo.getListLimit());
			paramMap.put("offset", "" + (pageInfo.getStartList()-1));
			return mapper.selectAnimalhospitalList(paramMap);
		}
		
		
		
		
		
		public int getFavorAnimalhospitalCount(Map<String, Object> map) {
			return mapper.selectFavorCountAnimalhospital(map);
		}
		
		public int addFavorAnimalhospital(Map<String, Object> map) {
			return mapper.insertFavorAnimalhospital(map);
		}
		
		public int removeFavorAnimalhospital(Map<String, Object> map) {
			return mapper.deleteFavorAnimalhospital(map);
		}
		
		public List<Animalhospital> getAnimalhospitalByFavorList(List<FavorAnimalhospital> favorList) {
		      List<Integer> AHNoList = new ArrayList<>();
		      for(FavorAnimalhospital favorAnimalhospital : favorList) {
		    	  AHNoList.add(favorAnimalhospital.getAHNo());
		      }
		      List<Animalhospital> animalhospital = mapper.selectAnimalhospitalByFavorList(AHNoList);
		      return animalhospital;
		   }
		public List<FavorAnimalhospital> getFavorList(int mno) {
		      return mapper.selectFavorAnimalhospitalList(mno);
		   }
		 
}
