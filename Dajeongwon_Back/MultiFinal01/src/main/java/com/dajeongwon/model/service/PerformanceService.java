package com.dajeongwon.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.dajeongwon.api.PerformanceParser;
import com.dajeongwon.mapper.PerformanceMapper;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Perform;
import com.dajeongwon.util.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PerformanceService {
	private static final Logger logger = LoggerFactory.getLogger(PerformanceService.class);
    private PerformanceMapper performanceMapper;
	    
    @Autowired
    public PerformanceService(PerformanceMapper performanceMapper) {
        this.performanceMapper = performanceMapper;
    }
    
    @Autowired
    PerformanceParser performanceParser;

	@Transactional(rollbackFor = Exception.class)
	public int insertPerformance(Perform performance) {
		System.err.println("insert called" + performance);
		return performanceMapper.insertPerformance(performance);
	}
	
//	public int insertPerformancePlace(Perform performancePlace) {
//		System.err.println("insert called" + performancePlace);
//		return performanceMapper.insertPerformancePlace(performancePlace);
//	}

	public int selectPerformanceCount(Map<String, Object> param) {
		return performanceMapper.selectPerformanceCount(param);
	}

	public List<Perform> selectPerformanceList(PageInfo pageInfo, Map<String, Object> param) {
		param.put("limit", "" + pageInfo.getListLimit());
		param.put("offset", "" + (pageInfo.getStartList() - 1));
		return performanceMapper.selectPerformanceList(param);
	}
	
	public Perform getPerformanceDetail(String mt20id) {
		int count = performanceMapper.countPerformanceByPrfNo(mt20id);
		if(count == 0) {
			System.out.println("DB에 없음!!!!!!!!!!!");
			return null;
		}
		Perform result = performanceMapper.getPerformanceByPrfNo(mt20id);
		if(result == null) {
			System.out.println("데이터 조회 오류 발생!!!!!!!!! ");
			return null;
		}
		return result;
	}
	
	public List<Perform> searchPerformance(Map<String, Object> param){
		return performanceMapper.selectPerformanceList(param);
	}
	
	public class PerformanceResponse {
	    private List<Perform> items;

	    public List<Perform> getItems() {
	        return items;
	    }

	    public void setItems(List<Perform> items) {
	        this.items = items;
	    }
	}
	// 수상작(프론트에서 SSR로딩)
	@Transactional
    public List<Perform> getNewList(int page) {
    	return performanceMapper.getPerformanceByAwards(page);
    }    
	// 카테고리 클릭 시 추천목록 
    @Transactional
    public List<Perform> getRecommendList(String categoryId) throws Exception {
        return performanceParser.getPerformanceListFromAPI(1, "공연중");
        
    }
    
	    
}
