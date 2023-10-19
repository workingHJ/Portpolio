package com.dajeongwon.api;

import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.dajeongwon.mapper.BookMapper;
import com.dajeongwon.mapper.PerformanceMapper;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Perform;
import com.google.gson.Gson;

@Service
public class PerformanceParser {

    @Autowired
    private PerformanceMapper performanceMapper;
    
//  http://www.kopis.or.kr/openApi/restful/pblprfr?service=7bbc498e134f41e883261f8baa40abe3&stdate=20230101&eddate=20231231&rows=10&cpage=1
// http://www.kopis.or.kr/openApi/restful/pblprfr/PF132236?service=7bbc498e134f41e883261f8baa40abe3
    public Perform getPlaceListFromAPI(Perform target) throws Exception {
    	StringBuilder urlBuilder = new StringBuilder("http://www.kopis.or.kr/openApi/restful/prfplc/");
        urlBuilder.append(target.getMt10id());
    	urlBuilder.append("?service=7bbc498e134f41e883261f8baa40abe3");
    	URL url2 = new URL(urlBuilder.toString());
    	HttpURLConnection conn = (HttpURLConnection) url2.openConnection();
    	conn.setRequestMethod("GET");
    	conn.setRequestProperty("Content-type", "application/xml");
    	int code = conn.getResponseCode(); 
    	if(code < 200 || code > 300) {
    		System.out.println("페이지가 잘못되었습니다.");
    		return null;
    	}
    	
    	DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    	DocumentBuilder db = dbf.newDocumentBuilder();
    	Document doc = db.parse(conn.getInputStream()); // xml 부를 파싱하여 객체화
    	doc.getDocumentElement().normalize();
    	
    	
    	NodeList nList = doc.getElementsByTagName("db");
    	for(int i = 0; i < nList.getLength(); i++) {
    		Node node = nList.item(i);
    		if(node.getNodeType() == Node.ELEMENT_NODE) {
    			try {
    				Element eElement = (Element) node;
    				String mt10id               =getStrData(eElement, "mt10id") ;
   				 String adres          =getStrData(eElement, "adres") ;
   				 String la		      =getStrData(eElement, "la") ;
   				 String lo 				=getStrData(eElement, "lo") ;
   				 target.setAdres(adres);
   				 target.setLa(la);
   				 target.setLo(lo);
   				 return target;
    			} catch (Exception e){
    				System.out.println("데이터가 잘못되었습니다!");
    				return null;
    			}
    		}
    	}
    	return null;
    }
    
  
    
    public List<Perform> getAwardsListFromAPI(int page) throws Exception {
        StringBuilder urlBuilder = new StringBuilder("http://www.kopis.or.kr/openApi/restful/prfawad?"
        		+ "service=7bbc498e134f41e883261f8baa40abe3"
        		+ "&stdate=20230101"
        		+ "&eddate=20231231&rows=100&prfstate=02");
        urlBuilder.append("&cpage=" + page);
        URL url2 = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url2.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/xml");
    	int code = conn.getResponseCode(); 
    	if(code < 200 || code > 300) {
			System.out.println("페이지가 잘못되었습니다.");
			return null;
		}

		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		Document doc = db.parse(conn.getInputStream()); // xml 부를 파싱하여 객체화
		doc.getDocumentElement().normalize();
		
		System.out.println("Root Element : " + doc.getDocumentElement().getNodeName());
		System.out.println("======================================================");
		
		NodeList nList = doc.getElementsByTagName("db");
		List<Perform> awardsList = new ArrayList<>();
		
		for(int i = 0; i < nList.getLength(); i++) {
			Node node = nList.item(i);
//			System.out.println("\nCurrent Element : " + node.getNodeName());
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				try {
					Element eElement = (Element) node;
					String mt20id               =getStrData(eElement, "mt20id") ;
    				String awards 				=getStrData(eElement, "awards") ;
    				Perform perform = new Perform();
    				perform.setAwards(awards);
    				perform.setMt20id(mt20id);
				} catch (Exception e){
					System.out.println("데이터가 잘못되었습니다!");
				}
			}
		}
    	
        return awardsList;
    }
    
    
    public List<Perform> getPerformanceListFromAPI(int page, String type) throws Exception {
        StringBuilder urlBuilder = new StringBuilder("http://www.kopis.or.kr/openApi/restful/pblprfr?"
        		+ "service=7bbc498e134f41e883261f8baa40abe3"
        		+ "&stdate=20230101"
        		+ "&eddate=20231231"
        		+ "&rows=100"
        		+ "&prfstate=02");
        urlBuilder.append("&cpage=" + page);
        URL url2 = new URL(urlBuilder.toString());
        System.err.println(url2.toString());
        HttpURLConnection conn = (HttpURLConnection) url2.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/xml");
    	int code = conn.getResponseCode(); 
    	if(code < 200 || code > 300) {
			System.out.println("페이지가 잘못되었습니다.");
			return null;
		}

		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		Document doc = db.parse(conn.getInputStream()); // xml 부를 파싱하여 객체화
		doc.getDocumentElement().normalize();
		
		List<Perform> list = new ArrayList<>();
		
		NodeList nList = doc.getElementsByTagName("db");
		for(int i = 0; i < nList.getLength(); i++) {
			Node node = nList.item(i);
//			System.out.println("\nCurrent Element : " + node.getNodeName());
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				try {
					Element eElement = (Element) node;
					String mt20id               =getStrData(eElement, "mt20id") ;
					String mt10id               =getStrData(eElement, "mt10id") ;
    				 String prfnm          =getStrData(eElement, "prfnm") ;
    				 Date prfpdfrom           =getDateData(eElement, "prfpdfrom") ;
    				 Date prfpdto             =getDateData(eElement, "prfpdto") ;
    				 String fcltynm          =getStrData(eElement, "fcltynm") ;
    				 String poster        =getStrData(eElement, "poster") ;
    				 String genrenm         =getStrData(eElement, "genrenm") ;
    				 String prfstate         =getStrData(eElement, "prfstate") ;
    				 String openrun       =getStrData(eElement, "openrun") ;
    				 String prfcast	      =getStrData(eElement, "prfcast") ;
    				 String prfcrew	      =getStrData(eElement, "prfcrew") ;
    				 String prfage		      =getStrData(eElement, "prfage") ;
    				 String pcseguidance         =getStrData(eElement, "pcseguidance") ;
    				 String prfruntime          =getStrData(eElement, "prfruntime") ;
    				 String awards 				=getStrData(eElement, "awards") ;
    				 Perform item = new Perform(mt20id, mt10id, prfnm, prfpdfrom, prfpdto, fcltynm, poster, genrenm, prfstate, openrun, prfcast, prfcrew, prfage, pcseguidance, prfruntime, awards, null, null, null);
    				list.add(item);
				} catch (Exception e){
					System.out.println("데이터가 잘못되었습니다!");
				}
			}
		}
    	
        return list;
    }
    
    public Perform getPerformanceDetailInfoFromAPI(Perform target) throws Exception {
    	StringBuilder urlBuilder = new StringBuilder("http://www.kopis.or.kr/openApi/restful/pblprfr/");
    	urlBuilder.append(target.getMt20id());
    	urlBuilder.append("?service=7bbc498e134f41e883261f8baa40abe3");
    	URL url2 = new URL(urlBuilder.toString());
    	HttpURLConnection conn = (HttpURLConnection) url2.openConnection();
    	conn.setRequestMethod("GET");
    	conn.setRequestProperty("Content-type", "application/xml");
    	int code = conn.getResponseCode(); 
    	if(code < 200 || code > 300) {
    		System.out.println("페이지가 잘못되었습니다.");
    		return null;
    	}
    	
    	DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    	DocumentBuilder db = dbf.newDocumentBuilder();
    	Document doc = db.parse(conn.getInputStream()); // xml 부를 파싱하여 객체화
    	doc.getDocumentElement().normalize();
    	
    	
    	NodeList nList = doc.getElementsByTagName("db");
    	for(int i = 0; i < nList.getLength(); i++) {
    		Node node = nList.item(i);
//			System.out.println("\nCurrent Element : " + node.getNodeName());
    		if(node.getNodeType() == Node.ELEMENT_NODE) {
    			try {
    				Element eElement = (Element) node;
    				String mt20id               =getStrData(eElement, "mt20id") ;
    				String mt10id               =getStrData(eElement, "mt10id") ;
    				 String prfnm          =getStrData(eElement, "prfnm") ;
    				 Date prfpdfrom           =getDateData(eElement, "prfpdfrom") ;
    				 Date prfpdto             =getDateData(eElement, "prfpdto") ;
    				 String fcltynm          =getStrData(eElement, "fcltynm") ;
    				 String poster        =getStrData(eElement, "poster") ;
    				 String genrenm         =getStrData(eElement, "genrenm") ;
    				 String prfstate         =getStrData(eElement, "prfstate") ;
    				 String openrun       =getStrData(eElement, "openrun") ;
    				 String prfcast	      =getStrData(eElement, "prfcast") ;
    				 String prfcrew	      =getStrData(eElement, "prfcrew") ;
    				 String prfage		      =getStrData(eElement, "prfage") ;
    				 String pcseguidance         =getStrData(eElement, "pcseguidance") ;
    				 String prfruntime          =getStrData(eElement, "prfruntime") ;
    				 String awards 				=getStrData(eElement, "awards") ;
    				 Perform item = new Perform(mt20id, mt10id, prfnm, prfpdfrom, prfpdto, fcltynm, poster, genrenm, prfstate, openrun, prfcast, prfcrew, prfage, pcseguidance, prfruntime, awards, null, null, null);
    				 return item;
    			} catch (Exception e){
    				System.out.println("데이터가 잘못되었습니다!");
    				return null;
    			}
    		}
    	}
    	return null;
    }
    

    private static String[] getStrArrayData(Element element, String tagName) {
        String data = getStrData(element, tagName);
        if (data != null) {
            return data.split(",");  // or use the appropriate delimiter
        } else {
            return null;
        }
    }
    
	private static String getStrData(Element eElement, String tagName){
		try {
			return eElement.getElementsByTagName(tagName).item(0).getTextContent();
		} catch (Exception e) {
			return "-";
		}
	}
	
	private static int getIntData(Element eElement, String tagName){
		try {
			return Integer.parseInt(eElement.getElementsByTagName(tagName).item(0).getTextContent());
		} catch (Exception e) {
			return 0;
		}
	}
	
	private static long getLongData(Element eElement, String tagName){
		try {
			return Long.parseLong(eElement.getElementsByTagName(tagName).item(0).getTextContent());
		} catch (Exception e) {
			return 0;
		}
	}
	
	private static double getDoubleData(Element eElement, String tagName){
		try {
			return Double.parseDouble(eElement.getElementsByTagName(tagName).item(0).getTextContent());
		} catch (Exception e) {
			return 0.0;
		}
	}
	
	
	private static final DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
	private static final SimpleDateFormat outputFormatter = new SimpleDateFormat("yyyy-MM-dd");

	private static Date getDateData(Element eElement, String tagName) {
	    try {
	        String dateString = eElement.getElementsByTagName(tagName).item(0).getTextContent();
	        LocalDate localDate = LocalDate.parse(dateString, inputFormatter);
	        
	        // Convert LocalDate to java.util.Date
	        Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	        
	        return date;
	    } catch (Exception e) {
	        return null;
	    }
	}
    
}
