package com.multi.semi03.drug.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class APIParser {
	public List<Map<String, String>> parseList() {
	    List<Map<String, String>> list = new ArrayList<>();

	    DrugInfoParse dInfo = new DrugInfoParse();
	    DrugShapeParse dShape = new DrugShapeParse();
	    
	    List<Map<String, String>> infoList = dInfo.parser();
	    List<Map<String, String>> shapeList = dShape.parser();

	        for (Map<String, String> infoMap : infoList) {
	            for (Map<String, String> shapeMap : shapeList) {
	                if (infoMap.get("itemName".trim()).equals(shapeMap.get("ITEM_NAME").trim())) {
	                    Map<String, String> resultMap = new HashMap<>();
	                    resultMap.put("itemSeq", infoMap.get("itemSeq"));
	                    resultMap.put("itemName", infoMap.get("itemName"));
	                    resultMap.put("entpName", infoMap.get("entpName"));
	                    resultMap.put("itemImage", infoMap.get("itemImage"));
	                    resultMap.put("efcyQesitm", infoMap.get("efcyQesitm"));
	                    resultMap.put("useMethodQesitm", infoMap.get("useMethodQesitm"));
	                    resultMap.put("atpnWarnQesitm", infoMap.get("atpnWarnQesitm"));
	                    resultMap.put("intrcQesitm", infoMap.get("intrcQesitm"));
	                    resultMap.put("atpnQesitm", infoMap.get("atpnQesitm"));
	                    resultMap.put("seQesitm", infoMap.get("seQesitm"));
	                    resultMap.put("depositMethodQesitm", infoMap.get("depositMethodQesitm"));
	                    resultMap.put("drugFront", shapeMap.get("drugFront"));
	                    resultMap.put("drugShape", shapeMap.get("drugShape"));
	                    resultMap.put("drugFront", shapeMap.get("drugFront"));
	                    resultMap.put("drugColor", shapeMap.get("drugColor"));
	                    resultMap.put("formCode", shapeMap.get("formCode"));
	                    resultMap.put("itemLine", shapeMap.get("itemLine"));

	                    list.add(resultMap);
	            }
	        }
	    }
			return list;
	}

	}
