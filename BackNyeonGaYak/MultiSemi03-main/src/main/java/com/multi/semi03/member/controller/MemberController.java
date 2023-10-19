package com.multi.semi03.member.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import com.multi.semi03.board.model.service.BoardService;
import com.multi.semi03.board.model.vo.Board;
import com.multi.semi03.board.model.vo.Reply;
import com.multi.semi03.common.util.PageInfo;
import com.multi.semi03.member.model.service.MemberService;
import com.multi.semi03.member.model.vo.Member;

import lombok.extern.slf4j.Slf4j;

@Slf4j // log4j 선언 대신에 작성해주는 lombok 어노테이션
@Controller
@SessionAttributes("loginMember") // loginMember를 model에서 취급할때 세션으로 처리하는 어노테이션
public class MemberController {

	@Autowired
	private BoardService boardService;

	@Autowired
	private MemberService service;

	// action : /mvc/login
	// 파라메터 : memberId, memberPwd
//	@RequestMapping(name="/login", method = RequestMethod.POST)
	@PostMapping("/login")
	String login(Model model, String memberId, String memberPwd) {
		log.info("@@@Login : " + memberId + ", " + memberPwd);

		Member loginMember = service.login(memberId, memberPwd);

		// 로그인이 성공한 케이스
		if (loginMember != null) {
			model.addAttribute("loginMember", loginMember); // 세션으로 저장되는 코드, @SessionAttributes 사용
			return "redirect:/"; // home으로 보내는 방법
		} else {
			model.addAttribute("msg", "아이디와 패스워드를 확인해주세요.");
			model.addAttribute("location", "/");
			return "common/msg";
		}
	}

	@RequestMapping("/member/view")
	public String Mypage(Model model, 
			@SessionAttribute(name = "loginMember", required = false) 
			Member loginMember) {

		System.out.println("!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@");
		// 자신이 쓴 글 가져오는 코드
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", loginMember.getId());
		log.info("@@@@@my page accessed!!! ");
		int boardCount = boardService.getBoardCount(param);
		PageInfo pageInfo = new PageInfo(1, 5, boardCount, 2);
		List<Board> boardList = boardService.getBoardList(pageInfo, param);
		log.info("@@@@@@@boardList " + boardList);
		model.addAttribute("boardList", boardList);
		System.out.println(boardList);
		
		List<Reply> replyList = boardService.selectReplyList(loginMember.getMno());
		log.info("@@@@@@@replyList " + replyList);
		model.addAttribute("replyList", replyList);
		
		

		return "member/view";
	}

	@RequestMapping("/logout")
	public String logout(SessionStatus staus) { // staus: 세션의 상태확인 가능한 메소드
		log.info("staus : " + staus.isComplete());
		staus.setComplete(); // 세션을 종료 시키는 메소드
		log.info("staus : " + staus.isComplete());
		return "redirect:/";
	}

	// 회원가입 페이지를 연결시켜주는 핸들러
	@GetMapping("/member/enroll")
	public String enrollPage() { // xxxPage = 단순 html을 연결만 시켜주는 핸들러 메소드
		log.info("회원가입 페이지 요청");
		return "member/enroll";
	}

	// 실제 회원가입을 시켜주는 핸들러
	@PostMapping("/member/enroll")
	public String enroll(Model model, @ModelAttribute Member member, HttpSession session) { // @ModelAttribute 생략 가능!
		log.info("회원가입 요청");

		int result = service.save(member);


		
		String rootPath = session.getServletContext().getRealPath("resources");
		System.out.println("@@@@@@@@@rootPath : " + rootPath);
		
		// 기본이미지와 가입한 회원의 새로운 이미지 경로 정의
		String originalFilePath = rootPath + "/memberImage/Default-Profile.png";
		String reNamedFilePath = rootPath + "/memberImage/" + member.getId() + ".png";
		
//		File file = new File(reNamedFilePath);
//		file.delete();
		try {
			// 이미지 파일을 소스에서 대상으로 복사
			Path originalPath = Paths.get(originalFilePath);
			Path reNamePath = Paths.get(reNamedFilePath);
			Files.copy(originalPath, reNamePath, StandardCopyOption.REPLACE_EXISTING);

			model.addAttribute("msg", "회원가입 성공하였습니다.");
			model.addAttribute("location", "/");
			return "common/msg";
		} catch (IOException e) {
			e.printStackTrace();
		}
		model.addAttribute("msg", "회원가입에 실패하였습니다. 이미지 생성 실패.");
		model.addAttribute("location", "/");

		return "common/msg";
	}

	// AJAX로 ID 검사부
	@RequestMapping("/member/idCheck")
	public ResponseEntity<Map<String, Object>> idCheck(String id) {
		log.info("아이디 중복 확인 : " + id);

		boolean result = service.validate(id);
		Map<String, Object> jsonMap = new HashMap<String, Object>();
		jsonMap.put("validate", result); // json으로 변경되어 리턴될 예정

		return new ResponseEntity<Map<String, Object>>(jsonMap, HttpStatus.OK);
	}

	// 회원정보 페이지를 연결시켜주는 핸들러
//	@GetMapping("/member/view")
//	public String memberView(Model model) {
//		log.info("회원 정보 보기");
//		// session으로 처리할 예정으로 아래 코드는 불필요
//		// 원래는 수정 할 정보를 조회해서 model에 담아서 view로 보내야한다.
////		Member member = service.findMember();
////		model.addAttribute("member", member);
//		return "member/view";
//	}

	// 회원정보 수정
	@PostMapping("/member/update")
	public String update(Model model, @ModelAttribute Member updateMember, // request에서 온 값
			HttpSession session,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember, // 세션값
			@RequestParam("upfile") MultipartFile upfile
	) {
		// 이곳 회원 사진 받는 파라메터 추가해야하고, 회원 수정 폼은 멀티 폼 파라메터로 변경 반드시!
		// 이미지가 있는 경우 기존의 이미지를 삭제하고 새로운 이미지로 덮어쓰기 하는 코드 짠다.

		log.info("update 요청, updateMember : " + updateMember);
		log.info("update 요청, loginMember : " + loginMember);

		// 보안코드 작성부! + 체크부 작성, 예시
		if (loginMember == null || loginMember.getId().equals(updateMember.getId()) == false) {
			model.addAttribute("msg", "잘못 된 접근입니다.");
			model.addAttribute("location", "/");
			return "common/msg";
		}
		
		
		if(upfile != null && upfile.isEmpty() == false) {
			String rootPath = session.getServletContext().getRealPath("resources");
			String savePath = rootPath + "/memberImage";
			service.saveFile(upfile, loginMember.getId(), savePath); // 실제 파일 저장로직
		}

		updateMember.setMno(loginMember.getMno()); // update가 되는 코드
		int result = service.save(updateMember);

		if (result > 0) {
			loginMember = service.findById(loginMember.getId());
			model.addAttribute("loginMember", loginMember); // 세션을 업데이트 하는 코드
			model.addAttribute("msg", "회원정보를 수정하였습니다.");
			model.addAttribute("location", "/member/settings");
		} else {
			model.addAttribute("msg", "회원정보 수정에 실패하였습니다.");
			model.addAttribute("location", "/member/settings");
		}
		return "common/msg";
	}

	@GetMapping("/member/updatePwd")
	public String updatePwdPage() {
		return "/member/updatePwd";
	}

	@PostMapping("/member/updatePwd")
	public String updatePwd(Model model, String password,
			@SessionAttribute(name = "loginMember", required = false) Member loginMember // 세션값
	) {
		int result = service.updatePwd(loginMember, password);

		if (result > 0) {
			model.addAttribute("msg", "비밀번호 수정에 성공하였습니다.");
		} else {
			model.addAttribute("msg", "비밀번호를 변경 할수 없습니다.");
		}
		model.addAttribute("script", "self.close();");

		return "/common/msg";
	}

	@RequestMapping("/member/delete")
	public String delete(Model model, @SessionAttribute(name = "loginMember", required = false) Member loginMember // 세션값
	) {
		int result = service.delete(loginMember.getMno());

		if (result > 0) {
			model.addAttribute("msg", "회원탈퇴에 성공하였습니다.");
			model.addAttribute("location", "/logout");
		} else {
			model.addAttribute("msg", "회원탈퇴를 할수 없습니다.");
			model.addAttribute("location", "/member/view");
		}

		return "/common/msg";
	}

	// 회원정보 변경 페이지를 연결시켜주는 핸들러
	@GetMapping("/member/settings")
	public String SettingsPage() { // xxxPage = 단순 html을 연결만 시켜주는 핸들러 메소드
		log.info("회원정보 변경 페이지 요청");
		return "member/settings";
	}

	// contoller에서 전체 Error 처리하는 핸들러
//	@ExceptionHandler(Exception.class)
//	public String error() {
//		return "/common/error";
//	}
}
