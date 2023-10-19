package com.multi.semi03.hmc.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.multi.semi03.hmc.model.vo.Hmc;

@Mapper
public interface HmcMapper {
	
	int selectHmcCount(Map<String, Object> param);
	
	List<Hmc> selectHmcList(Map<String, Object> param);
}
