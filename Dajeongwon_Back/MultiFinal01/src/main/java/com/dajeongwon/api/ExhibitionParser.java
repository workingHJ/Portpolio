package com.dajeongwon.api;

import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import com.dajeongwon.mapper.ExhibitionMapper;
import com.dajeongwon.model.vo.Exhibition;
import com.dajeongwon.model.vo.Exhibition;
import com.google.gson.Gson;

@Service
public class ExhibitionParser {

    @Autowired
    private ExhibitionMapper exhibitionMapper;
    
//    http://www.culture.go.kr/openapi/rest/publicperformancedisplays/area?serviceKey=Wu0TfrZeXgndC1YhYPKnJApPWpSYwMXem3IYRPqKwM3BssiuQy4YrPVHqd3LzDSXfSgU7muhUKQpLhtjmO8WCQ%3D%3D&from=20230101&to=20231231&rows=100&cPage=1

    public List<Exhibition> getExhibitionListFromAPI(int page) throws Exception {
        StringBuilder urlBuilder = new StringBuilder("http://www.culture.go.kr/openapi/rest/publicperformancedisplays/realm?serviceKey=Wu0TfrZeXgndC1YhYPKnJApPWpSYwMXem3IYRPqKwM3BssiuQy4YrPVHqd3LzDSXfSgU7muhUKQpLhtjmO8WCQ%3D%3D&realmCode=D000&from=20230101&to=20231231");
        urlBuilder.append("&cPage=" + page);
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
		
		List<Exhibition> list = new ArrayList<>();
		
		NodeList nList = doc.getElementsByTagName("perforList");
		for(int i = 0; i < nList.getLength(); i++) {
			Node node = nList.item(i);
//			System.out.println("\nCurrent Element : " + node.getNodeName());
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				try {
					Element eElement = (Element) node;
					
					int seq				=getIntData(eElement, "seq");
					String title        =getStrData(eElement, "title");
					Date startDate		= getDateData(eElement, "startDate");
					Date endDate		= getDateData(eElement, "endDate");
					String place		=getStrData(eElement, "place");
					String realmName	=getStrData(eElement, "realmName");
					String area			=getStrData(eElement, "area");
					String subTitle		=getStrData(eElement, "subTitle");
					String price		=getStrData(eElement, "price");
					String contents1	=getStrData(eElement, "contents1");
					String contents2	=getStrData(eElement, "contents2");
					String url			=getStrData(eElement, "url");
					String phone		=getStrData(eElement, "phone");
					String gpsX			=getStrData(eElement, "gpsX");
					String gpsY			=getStrData(eElement, "gpsY");
					String imgUrl		=getStrData(eElement, "imgUrl");
					String placeUrl		=getStrData(eElement, "placeUrl");
					String placeAddr	=getStrData(eElement, "placeAddr");
					int placeSeq		=getIntData(eElement, "placeSeq");
					Exhibition item = new Exhibition(seq, title, startDate, endDate, place, realmName, area, subTitle, price, contents1, contents2, url, phone, gpsX, gpsY, imgUrl, placeUrl, placeAddr, placeSeq);
					list.add(item);
				} catch (Exception e){
					System.out.println("데이터가 잘못되었습니다!");
				}
			}
		}
    	
        return list;
    }
    
    public Exhibition getExhibitionDetailInfoFromAPI(Exhibition target) throws Exception {
    	StringBuilder urlBuilder = new StringBuilder("http://www.culture.go.kr/openapi/rest/publicperformancedisplays/d/?serviceKey=Wu0TfrZeXgndC1YhYPKnJApPWpSYwMXem3IYRPqKwM3BssiuQy4YrPVHqd3LzDSXfSgU7muhUKQpLhtjmO8WCQ%3D%3D");
    	urlBuilder.append("&seq=" + target.getSeq());
    	URL url2 = new URL(urlBuilder.toString());
    	System.out.println(urlBuilder.toString());
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
    	
    	
    	NodeList nList = doc.getElementsByTagName("perforInfo");
    	for(int i = 0; i < nList.getLength(); i++) {
    		Node node = nList.item(i);
//			System.out.println("\nCurrent Element : " + node.getNodeName());
    		if(node.getNodeType() == Node.ELEMENT_NODE) {
    			try {
    				Element eElement = (Element) node;
    				int seq				=getIntData(eElement, "seq");
    				String title        =getStrData(eElement, "title");
    				Date startDate		= getDateData(eElement, "startDate");
    				Date endDate		= getDateData(eElement, "endDate");
    				String place		=getStrData(eElement, "place");
    				String realmName	=getStrData(eElement, "realmName");
    				String area			=getStrData(eElement, "area");
    				String subTitle		=getStrData(eElement, "subTitle");
    				String price		=getStrData(eElement, "price");
    				String contents1	=getStrData(eElement, "contents1");
    				String contents2	=getStrData(eElement, "contents2");
    				String url			=getStrData(eElement, "url");
    				String phone		=getStrData(eElement, "phone");
    				String gpsX			=getStrData(eElement, "gpsX");
    				String gpsY			=getStrData(eElement, "gpsY");
    				String imgUrl		=getStrData(eElement, "imgUrl");
    				String placeUrl		=getStrData(eElement, "placeUrl");
    				String placeAddr	=getStrData(eElement, "placeAddr");
    				int placeSeq		=getIntData(eElement, "placeSeq");
    				Exhibition item = new Exhibition(seq, title, startDate, endDate, place, realmName, area, subTitle, price, contents1, contents2, url, phone, gpsX, gpsY, imgUrl, placeUrl, placeAddr, placeSeq);
    				return item;
    			} catch (Exception e){
    				System.out.println("데이터가 잘못되었습니다!");
    				return null;
    			}
    		}
    	}
    	return null;
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
	
	
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	private static Date getDateData(Element eElement, String tagName){
		try {
//			System.out.println(eElement.getElementsByTagName(tagName).item(0).getTextContent());
			
			Date date = sdf.parse(eElement.getElementsByTagName(tagName).item(0).getTextContent()); 
//			LocalDate date = LocalDate.parse(eElement.getElementsByTagName(tagName).item(0).getTextContent()) ;
//			System.out.println(date);
			return date;
		} catch (Exception e) {
			return null;
		}
	}
	
    
    
//    public void saveExhibitionInfoToDB(String xmlData) {
//        List<Exhibition> performances = parseXMLData(xmlData);
//        for (Exhibition performance : performances) {
//            performanceMapper.insertExhibition(performance);
//        }
//    }

//    public List<Exhibition> parseXMLData(String xmlData) {
//
//    }
}
