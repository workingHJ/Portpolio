package com.dajeongwon;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dajeongwon.api.ExhibitionParser;
import com.dajeongwon.api.PerformanceParser;
import com.dajeongwon.model.service.ExhibitionService;
import com.dajeongwon.model.service.PerformanceService;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Perform;

@Controller
public class HomeController {
	
	static boolean isInit = false;
	
	@Autowired
	ExhibitionService exhibitionService;
	
	@Autowired
	PerformanceService performanceService;
	
	@GetMapping("/")
	public String home(Locale locale, Model model) {
		if(isInit == false) {
			isInit = true;
		}
		return "home";
	}

	@ResponseBody
	@GetMapping("/init")
	public String init() {
		
		System.err.println("init called");
		StringBuilder sb = new StringBuilder();

//		// 전시 초기화
//		int result = initExhibition();
//		sb.append("Exhibition result : " + result + "\n");
		
		// 공연 초기화
		int result1 = initPerformance();
		sb.append("Performance result : " + result1 + "\n");
		
		return sb.toString();
	}
	
	public int initExhibition() {
		ExhibitionParser parser = new ExhibitionParser();
		List<Exhibition> allList = new ArrayList<>();
//		for (int i = 1; i < 2; i++) { // 테스트시 사용
		for (int i = 1; i < 45; i++) { // 모든 데이터 가져오고 싶을때
			try {
				List<Exhibition> list = parser.getExhibitionListFromAPI(i);
				allList.addAll(list);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		List<Exhibition> allList2 = new ArrayList<>();
		for(int i = 0; i < allList.size(); i++) {
			try {
				Exhibition item = parser.getExhibitionDetailInfoFromAPI(allList.get(i));
				allList2.add(item);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
//		System.out.println("끝!!!!!!");
//		System.out.println(allList2.size());
		int count = 0;
		for (Exhibition item : allList2) {
			System.out.println(item);
			try {
				count++;
			} catch (Exception e) {
//				e.printStackTrace();
			}
		}
		return count;
	}

	    public int initPerformance() {
	        PerformanceParser parser = new PerformanceParser();
	        List<Perform> allList = new ArrayList<>();
	        for (int i = 1; i < 5; i++) { 
//	        	for (int i = 1; i < 2; i++) {	//test  
//	        	for (int i = 1; i < 18; i++) {	// 공연 예정  
	        	// 페이지 바꿔가며 allList에 넣음 
	            try {
	                List<Perform> list = parser.getPerformanceListFromAPI(i, "공연중");
	                allList.addAll(list);
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	        // allList 쭉 돌면서 Detail추가
	        List<Perform> allList2 = new ArrayList<>();
	        for(int i = 0; i < allList.size(); i++) {
	            try {
	            	Perform item = parser.getPerformanceDetailInfoFromAPI(allList.get(i));
	                allList2.add(item);
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }
	        
	        // 여기에 perform 장소도 추가 
	        List<Perform> afterPlaceAddList = new ArrayList<>();
	        for(Perform item : allList2) {
	        	try {
					Perform afterAddItem = parser.getPlaceListFromAPI(item);
					afterPlaceAddList.add(afterAddItem);			} 
	        	catch (Exception e) {
					e.printStackTrace();
				}
	        	
	        }

	        int count = 0;
	        
//	         awards add
//	        List<Perform> awardsList = new ArrayList<>();
//			try {
//				awardsList = parser.getAwardsListFromAPI(1);
//				for (Perform item : afterPlaceAddList) {
//					for (Perform awardsItem : awardsList) {
//						if (item.getMt20id().equals(awardsItem)) {
//							item.setAwards(awardsItem.getAwards());
//						}
//					}
//					awardsList.add(item);
//				}
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
			
	        
	        // Detail 까지 완성된 거 insert
	        for (Perform item : afterPlaceAddList) {
	            System.out.println(item);
	            try {
	                count++;
	                performanceService.insertPerformance(item);
	            } catch (Exception e) {
	                e.printStackTrace();
	            }
	        }

	        return count;
	    }
	
	
}
