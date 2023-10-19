package com.dajeongwon.model.service;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

//import com.dajeongwon.config.SecurityUtil;
import com.dajeongwon.mapper.MemberMapper;
import com.dajeongwon.model.objectVo.MemberResponseDto;
import com.dajeongwon.model.vo.ArtReview;
import com.dajeongwon.model.vo.Member;

@Service
public class MemberService {

	private final static BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder();

	@Autowired
	private MemberMapper mapper;
	
	public Member login(String email, String pw) {
		Member member = mapper.selectMember(email);
		if(member == null) {
			return null;
		}
		
		// passwordEncoder 활용법
		System.out.println(member.getPassword()); // hash로 암호화된 코드가 들어있다.
		System.out.println(pwEncoder.encode(pw)); // encode를 통해 평문에서 hash 코드로 변환
		System.out.println(pwEncoder.matches(pw, member.getPassword())); // 평문 변환하고 비교까지
		
		if(member.getRole().equals("ROLE_ADMIN")) { // admin 테스트를 위한 코드
			return member;
		}
		
		if(member != null && pwEncoder.matches(pw, member.getPassword()) == true) {
			// 성공
			return member;
		}else {
			// 로그인 실패
			return null;
		}
	}
	

	// @Transactional : DB 트랜잭션 관리를 위한 AOP 어노테이션. 만일 오류가 발생하면 롤백. 아니면 커밋
	// (rollbackFor = Exception.class) : 사용하지 않은 경우 트랜잭션 코드가 정상적으로 작동하지 않을수 있다.
	@Transactional(rollbackFor = Exception.class)
	public int save(Member member) {
		int result = 0;
		System.out.println(member);
		if (member.getMNo() == 0) { // 회원가입
			String encodePW = pwEncoder.encode(member.getPassword());
			member.setPassword(encodePW);
			result = mapper.insertMember(member);
		} else { // 회원 수정
			result = mapper.updateMember(member);
		}
		return result;
	}

	public boolean validate(String email) {
		return this.findByEmail(email) != null;
	}

	public Member findByEmail(String email) {
		Member member = mapper.selectMember(email);
		return member;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int delete(int no) {
		return mapper.deleteMember(no);
	}
//	프로필 저장을 위해 만드는 서비스
	public void deleteFile(String filePath) {
	    File file = new File(filePath);
	    if (file.exists()) {
	        file.delete();
	    }
	}
	public String saveFile(MultipartFile upFile, String savePath) {
	    File folder = new File(savePath);

	    // 폴더 없으면 만드는 코드
	    if (!folder.exists()) {
	        folder.mkdir();
	    }
	    System.out.println("savePath: " + savePath);

	    // 파일 이름을 랜덤하게 바꾸는 코드, test.txt -> 20221213_1728291212.txt
	    String originalFileName = upFile.getOriginalFilename();
	    String reNameFileName =
	            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmssSSS"));
	    reNameFileName += originalFileName.substring(originalFileName.lastIndexOf("."));
	    String reNamePath = savePath + "/" + reNameFileName;

	    try {
	        // 실제 파일이 저장되는 코드
	        upFile.transferTo(new File(reNamePath));
	        
	        // 기존 파일이 "기본프로필.png"이 아닌 경우에만 파일 삭제
	        if (!originalFileName.equals("기본프로필.png")) {
	            deleteFile(savePath + "/" + originalFileName);
	        }
	    } catch (Exception e) {
	        return null;
	    }

	    return reNameFileName;
	}
	
	@Transactional(rollbackFor = Exception.class)
	public int updatePwd(Member loginMember, String userPW) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("mNo", "" + loginMember.getMNo());
		map.put("password", pwEncoder.encode(userPW));
		return mapper.updatePwd(map);
	}


	public int updatemImg(String mImg, int mNo) {
		return mapper.updateMImg(mImg, mNo);
		
	}


	public List<ArtReview> getMyReviews(int mNo) {
		return mapper.selectMyReview(mNo);
	}
	
}
    
