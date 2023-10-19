package com.dajeongwon.security;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dajeongwon.controller.MemberController;
import com.dajeongwon.mapper.MemberMapper;
import com.dajeongwon.model.vo.Member;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

@Service
public class OAuthService {
	@Autowired
	private MemberMapper mapper;

	@Autowired
	public MemberController mc;

	// 카카오 인가코드를 받아와서 접근 토큰을 받아오는 부분
	public String getKakaoAccessToken(String code) {
		System.out.println("시작 : getKakaoAccessToken");
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://kauth.kakao.com/oauth/token";

		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			// POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			// POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=01423a7717de1c6783129ea1544a9eaa"); // TODO REST_API_KEY 입력

			sb.append("&redirect_uri=http://localhost:3000/"); // TODO 인가코드 받은 redirect_uri 입력
			sb.append("&code=" + code);
			sb.append("&client_secret=aLkE0qBIyOserkZGK2imt5itXuCNOLjP"); // TODOclient_secret 입력
			bw.write(sb.toString());
			bw.flush();
			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";
			
			while ((line = br.readLine()) != null) {
				result += line;
			}
			
			System.out.println("response body : " + result);

			// Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			access_Token = element.getAsJsonObject().get("access_token").getAsString();
			refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

			System.out.println("access_token : " + access_Token);
			System.out.println("refresh_token : " + refresh_Token);

			br.close();
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return access_Token;
	}

	// 카카오 접근 토큰으로 사용자 정보를 호출
	public Member kakaoUserInfo(String token) {
		System.out.println("시작 : kakaoUserInfo");

		String reqURL = "https://kapi.kakao.com/v2/user/me";
		Member userInfo = new Member();
		
		
		// access_token을 이용하여 사용자 정보 조회
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "Bearer " + token); // 전송할 header 작성, access_token전송

			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

			// Gson 라이브러리로 JSON파싱
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);
			
			System.err.println(element);

			String id = element.getAsJsonObject().get("id").getAsString();
			
			System.err.println("id 가져옴");

			boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email")
					.getAsBoolean();
			String email = "";
			if (hasEmail) {
				email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
			}
			System.err.println("이메일 가져옴");

			String nickname = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("profile")
					.getAsJsonObject().get("nickname").getAsString();
			String profile_image = element.getAsJsonObject().get("properties").getAsJsonObject().get("profile_image")
					.getAsString();

			if (mapper.selectMember(email) != null) {
				userInfo = mapper.selectMember(email);
				System.out.println(userInfo);
			}
			System.err.println("닉네임 가져옴");
			
			if (mapper.selectMember(email) == null) {
				userInfo.setEmail(email);
				userInfo.setPassword(id);
				userInfo.setNickName(nickname);
				userInfo.setSnsType("kakao");
				userInfo.setSnsID(id);
				userInfo.setMImg(profile_image);
				mapper.insertSNSMember(userInfo);
			}
			System.err.println("가져오고 set함");

			System.out.println("id : " + id);
			System.out.println("email : " + email);
			System.out.println("nickname : " + nickname);
			System.out.println("profile_image : " + profile_image);

			br.close();

		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return userInfo;
	}

	// 네이버 인가코드를 받아와서 접근 토큰을 받아오는 부분
	public String getNaverAccessToken(String code) {
		System.out.println("시작 : getNaverAccessToken");
		String access_Token = "";
		String refresh_Token = "";
		String reqURL = "https://nid.naver.com/oauth2.0/token";

		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			// POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			conn.setRequestMethod("POST");
			conn.setDoOutput(true);

			// POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=iZ3JdJyr3ttFIX2k1DUW"); // REST_API_KEY 입력
			sb.append("&client_secret=91ZCH_85LG"); // client_secret 입력
			sb.append("&code=" + code);
			sb.append("&state=false ");

			sb.append("&redirect_uri=http://localhost:3000/user/LoginLoading"); // 인가코드 받은 redirect_uri 입력
			bw.write(sb.toString());
			bw.flush();
			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("responseCode : " + responseCode);

			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

			// Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			access_Token = element.getAsJsonObject().get("access_token").getAsString();
			refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

			System.out.println("access_token : " + access_Token);
			System.out.println("refresh_token : " + refresh_Token);

			br.close();
			bw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return access_Token;
	}

	// 네이버 접근 토큰으로 사용자 정보를 호출
	public Member naverUserInfo(String token) {
		System.out.println("시작 : createNaverUser");

		String reqURL = "https://openapi.naver.com/v1/nid/me";
		Member userInfo = new Member();

		// access_token을 이용하여 사용자 정보 조회
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("POST");
			conn.setDoOutput(true);
			conn.setRequestProperty("Authorization", "Bearer " + token); // 전송할 header 작성, access_token전송

			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			System.out.println("Conn : " + conn);
			System.out.println("responseCode : " + responseCode);

			// 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			System.out.println("response body : " + result);

			// Gson 라이브러리로 JSON파싱
			JsonParser parser = new JsonParser();
			JsonElement element = parser.parse(result);

			String id = element.getAsJsonObject().get("response").getAsJsonObject().get("id").getAsString();

			boolean emailCheck = false;

			if (element.getAsJsonObject().get("response").getAsJsonObject().get("email") != null) {
				emailCheck = true;
			}

			System.out.println(emailCheck);

//				boolean hasEmail = element.getAsJsonObject().get("response").getAsJsonObject().get("email")
//						.getAsBoolean();

			String email = "";
			if (emailCheck) {
				email = element.getAsJsonObject().get("response").getAsJsonObject().get("email").getAsString();
			}

			String nickname = element.getAsJsonObject().get("response").getAsJsonObject().get("nickname").getAsString();
			nickname = uniToKor(nickname);

			String profile_image = element.getAsJsonObject().get("response").getAsJsonObject().get("profile_image")
					.getAsString();
			profile_image = profile_image.replaceAll("\\\\", "");
			
			if (mapper.selectMember(email) != null) {
				userInfo = mapper.selectMember(email);
				System.out.println(userInfo);
			}
			
			if (mapper.selectMember(email) == null) {
				userInfo.setEmail(email);
				userInfo.setPassword(id);
				userInfo.setNickName(nickname);
				userInfo.setSnsType("naver");
				userInfo.setSnsID(id);
				userInfo.setMImg(profile_image);
				mapper.insertSNSMember(userInfo);
			}

			System.out.println("id : " + id);
			System.out.println("email : " + email);
			System.out.println("nickname : " + nickname);
			System.out.println("profile_image : " + profile_image);

			br.close();

		} catch (IOException e) {
			e.printStackTrace();
		}
		return userInfo;
	}

	// 네아로에서 별명과 이름을 유니코드로 전송해주기때문에 변환을 해줘야함
	public String uniToKor(String uni) {
		StringBuffer result = new StringBuffer();

		for (int i = 0; i < uni.length(); i++) {
			if (uni.charAt(i) == '\\' && uni.charAt(i + 1) == 'u') {
				Character c = (char) Integer.parseInt(uni.substring(i + 2, i + 6), 16);
				result.append(c);
				i += 5;
			} else {
				result.append(uni.charAt(i));
			}
		}
		return result.toString();
	}
}
