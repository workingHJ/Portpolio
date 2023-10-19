package com.multi.semi03.drug.api;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class DrugInfoParse {
	public List<Map<String, String>> parser() {
		HttpURLConnection conn = null;
		BufferedReader rd = null;
		List<Map<String, String>> dList = new ArrayList<>();
//		for(int i = 1; i < 46; i++) {
		for(int i = 1; i < 2; i++) {
			StringBuilder urlBuilder = new StringBuilder(
					"http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList"); /* URL */
			try {
				urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8")
				+ "=FBgaT2EkcVfHbgIr11pc4WtAJ8fE8o3cYrZgZAyASE%2F%2FvlJJgich3boLX%2F3u5RsXffVjko6dxsognhhumh2oSg%3D%3D");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}  /*servicekey*/
	        try {
				urlBuilder.append("&" + URLEncoder.encode("itemName","UTF-8") + "=" + URLEncoder.encode("타이레놀", "UTF-8"));
			} catch (UnsupportedEncodingException e1) {
				e1.printStackTrace();
			} /*품목명*/
//	        urlBuilder.append("&" + URLEncoder.encode("entp_name","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*업체명*/
//	        urlBuilder.append("&" + URLEncoder.encode("item_seq","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*품목일련번호*/
//	        urlBuilder.append("&" + URLEncoder.encode("img_regist_ts","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*약학정보원 이미지 생성일*/
			try {
				urlBuilder.append(
						"&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(Integer.toString(i), "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} /* 페이지번호 */
			try {
				urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
						+ URLEncoder.encode("100", "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} /* 한 페이지 결과 수 */
//	        urlBuilder.append("&" + URLEncoder.encode("edi_code","UTF-8") + "=" + URLEncoder.encode("", "UTF-8")); /*보험코드*/
			try {
				urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "="
						+ URLEncoder.encode("json", "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} /* 응답데이터 형식(xml/json) default : xml */
			URL url = null;
			try {
				url = new URL(urlBuilder.toString());
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				conn = (HttpURLConnection) url.openConnection();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				conn.setRequestMethod("GET");
			} catch (ProtocolException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			conn.setRequestProperty("Content-type", "application/json");
			try {
				System.out.println("Response code: " + conn.getResponseCode());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			
			try {
				if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
					rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				} else {
					rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			JSONParser jsonParser = new JSONParser();
			JSONObject rootObj = null;
			try {
				rootObj = (JSONObject) jsonParser.parse(rd);
			} catch (IOException | ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			JSONObject childObj = (JSONObject) rootObj.get("body");
			
			// root 부
			System.out.println(" pageNo : " + childObj.get("pageNo"));
			
			JSONArray array = (JSONArray) childObj.get("items");
			
			for (int j = 0; j < array.size(); j++) {
				JSONObject obj = (JSONObject) array.get(j);
				Map<String, String> map = new HashMap<>();
//	        	String itemName                            = (String) obj.get("itemName")                 ;
//	        	String entpName                            = (String) obj.get("entpName")                 ;
//	        	String itemImage                           = (String) obj.get("itemImage")                ;
//	        	String efcyQesitm                          = (String) obj.get("efcyQesitm")               ;
//	        	String useMethodQesitm                     = (String) obj.get("useMethodQesitm")          ;
//	        	String atpnWarnQesitm					   = (String) obj.get("atpnWarnQesitm")           ;
//	        	String intrcQesitm						   = (String) obj.get("intrcQesitm")              ;
//	        	String atpnQesitm                          = (String) obj.get("atpnQesitm")               ;
//	        	String seQesitm                            = (String) obj.get("seQesitm")                 ;
//	        	String depositMethodQesitm                 = (String) obj.get("depositMethodQesitm")      ;
				
				map.put("itemSeq", (String)obj.get("itemSeq"));
				map.put("itemName", (String) obj.get("itemName"));
				map.put("entpName", (String) obj.get("entpName"));
				map.put("itemImage", (String) obj.get("itemImage"));
				map.put("efcyQesitm", (String) obj.get("efcyQesitm"));
				map.put("useMethodQesitm", (String) obj.get("useMethodQesitm"));
				map.put("atpnWarnQesitm", (String) obj.get("atpnWarnQesitm"));
				map.put("intrcQesitm", (String) obj.get("intrcQesitm"));
				map.put("atpnQesitm", (String) obj.get("atpnQesitm"));
				map.put("seQesitm", (String) obj.get("seQesitm"));
				map.put("depositMethodQesitm", (String) obj.get("depositMethodQesitm"));
				
				dList.add(map);
		}
			}
		try {
			rd.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		conn.disconnect();
		return dList;
		}
	
}
