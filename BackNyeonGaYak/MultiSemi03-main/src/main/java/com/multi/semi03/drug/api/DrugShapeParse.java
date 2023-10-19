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

public class DrugShapeParse {
	public List<Map<String, String>> parser() {
		BufferedReader rd = null;
		HttpURLConnection conn = null;
		List<Map<String, String>> dList = new ArrayList<>();
//		for(int i = 1; i < 85; i++) {
		for(int i = 1; i < 2; i++) {
			StringBuilder urlBuilder = new StringBuilder(
					"http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01"); /* URL */
			try {
				urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8")
				+ "=FBgaT2EkcVfHbgIr11pc4WtAJ8fE8o3cYrZgZAyASE%2F%2FvlJJgich3boLX%2F3u5RsXffVjko6dxsognhhumh2oSg%3D%3D");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}  /*servicekey*/
			try {
				urlBuilder.append("&" + URLEncoder.encode("item_name","UTF-8") + "=" + URLEncoder.encode("타이레놀", "UTF-8"));
				urlBuilder.append(
						"&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
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
			} 
			try {
				urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "="
						+ URLEncoder.encode("json", "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
			URL url = null;
			try {
				url = new URL(urlBuilder.toString());
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				conn = (HttpURLConnection) url.openConnection();
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
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
				map.put("ITEM_NAME", (String)obj.get("ITEM_NAME"));
				map.put("ITEM_SEQ", (String) obj.get("ITEM_SEQ"));
				map.put("drugFront", (String) obj.get("DRUG_FRONT"));
				map.put("drugShape", (String) obj.get("DRUG_SHAPE"));
				map.put("drugColor", (String) obj.get("COLOR_CLASS1"));
				map.put("formCode", (String) obj.get("FORM_CODE_NAME"));
				map.put("itemLine", (String) obj.get("ITEM_LINE"));
				
				
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
//	        System.out.println(sb.toString());
}
