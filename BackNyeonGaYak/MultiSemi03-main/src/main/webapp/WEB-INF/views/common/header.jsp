<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />


<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${param.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
	<!-- Viewport-->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- Favicon -->
	<link rel="apple-touch-icon" sizes="180x180" href="${path}/resources/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="${path}/resources/favicon/favicon.ico">
	<link rel="icon" type="image/png" sizes="16x16" href="${path}/resources/favicon/favicon-32x32.png">
	<!-- Theme mode-->
	<script>
		let mode = window.localStorage.getItem('mode'),
			root = document.getElementsByTagName('html')[0];
		if (mode !== undefined && mode === 'dark') {
			root.classList.add('dark-mode');
		} else {
			root.classList.remove('dark-mode');
		}
	</script>
	<!-- Page loading styles-->
	<link rel="stylesheet" media="screen" href="${path}/resources/css/pageLoading.css">

	<!-- Page loading scripts-->
	<script>
		(function () {
			window.onload = function () {
				const preloader = document.querySelector('.page-loading');
				preloader.classList.remove('active');
				setTimeout(function () {
					preloader.remove();
				}, 1500);
			};
		})();

	</script>
	<!-- Vendor styles-->
	<link rel="stylesheet" media="screen" href="${path}/resources/vendor/swiper/swiper-bundle.min.css" />
	<link rel="stylesheet" media="screen" href="${path}/resources/vendor/aos/dist/aos.css" />

	<!-- Main Theme Styles + Bootstrap-->
	<link rel="stylesheet" media="screen" href="${path}/resources/css/theme.min.css">
	<link rel="stylesheet" media="screen" href="${path}/resources/vendor/simplebar/dist/simplebar.min.css" />
	<link rel="stylesheet" media="screen"
		href="${path}/resources/vendor/lightgallery/css/lightgallery-bundle.min.css" />
	<link rel="stylesheet" media="screen" href="${path}/resources/vendor/prismjs/themes/prism.css" />
	<link rel="stylesheet" media="screen" href="${path}/resources/vendor/prismjs/plugins/toolbar/prism-toolbar.css" />
	<link rel="stylesheet" media="screen"
		href="${path}/resources/vendor/prismjs/plugins/line-numbers/prism-line-numbers.css" />

	<!--  JQUERY  -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body>
	<!-- 헤더 -->
	<!-- 로딩 스피너-->
	<div class="page-loading active">
		<div class="page-loading-inner">
			<div class="page-spinner"></div>
			<span>로딩 중...</span>
		</div>
	</div>
	<main class="page-wrapper">
		<header class="navbar navbar-expand-lg bg-light mb-0 fs-5">
			<div class="container">
				<a href="${path }" class="navbar-brand"> <span class="Logo"> <img
							src="https://user-images.githubusercontent.com/132437120/235857660-32ff21e8-52c9-42ab-bd0f-7146c4c7aa43.png"
							width="130px" ;>
					</span>
				</a>
				<button type="button" class="navbar-toggler" data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse1">
					<span class="navbar-toggler-icon"></span>
				</button>
				<nav class="collapse navbar-collapse" id="navbarCollapse1">
					<ul class="navbar-nav me-auto">
						<li class="nav-item"><a href="${path}/drug/search" class="nav-link">약 검색</a></li>
						<li class="nav-item dropdown"><a href="#" class="nav-link dropdown-toggle"
								data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">위치 찾기</a>
							<ul class="dropdown-menu header-nav">
								<li><a href="${path}/pharm/search" class="dropdown-item">근처 약국</a></li>
								<li><a href="${path}/aidkit_k/asearch" class="dropdown-item">안전상비의약품 판매점</a></li>
								<li><a href="${path}/hmc/search" class="dropdown-item">건강검진 기관</a></li>
								<li><a href="${path}/Animalhospital/AnimalhospitalSearch" class="dropdown-item">동물 병원</a></li>
								<li><a href="${path}/Animalpharm/AnimalpharmSearch" class="dropdown-item">동물 약국</a></li>
							</ul>
						</li>
						<li class="nav-item"><a href="#" class="nav-link">건강
								기능 식품</a></li>
						<li class="nav-item dropdown"><a href="#" class="nav-link dropdown-toggle"
								data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">소식</a>
							<ul class="dropdown-menu">
								<li><a href="${path }/news/list" class="dropdown-item">뉴스</a></li>
								<li><a href="${path }/board/list" class="dropdown-item">커뮤니티</a></li>
							</ul>
						</li>
					</ul>
					<c:if test="${loginMember == null}">
						<span class="nav-item">
							<a href="#" data-bs-target="#signInModal" data-bs-toggle="modal" class="nav-link fw-bold"
								style="display: inline-block;">로그인
							</a>
						</span>
						<span class="nav-item">
							<a href="#" class="nav-link fw-bold" data-bs-target="#signUpModal" data-bs-toggle="modal"
								style="display: inline-block;">회원가입
							</a>
						</span>
					</c:if>
					<c:if test="${loginMember != null }">
						<span class="nav-item">
							<a href="${path }/member/view" class="nav-link fw-bold" style="display: inline-block;">
								<i class="ai-user me-1"> </i> ${loginMember.name}님
							</a>
						</span>
						<span class="nav-item">
							<a href="${path}/logout" class="nav-link fw-bold" style="display: inline-block;">로그아웃
							</a>
						</span>
					</c:if>
				</nav>
			</div>
		</header>

		<!-- 로그인 모달 -->
		<div class="modal" tabindex="-1" role="dialog" id="signInModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header pb-0">
						<h3>로그인</h3>
						<button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body pt-4 tab-content">
						<form class="tab-pane fade show active mt-n2" novalidate id="signIn" autocomplete="off"
							action="${path}/login" method="post" name="loginFrm">
							<div class="mb-3 mb-sm-4">
								<label for="memberId" class="form-label"> 아이디 </label> <input type="text"
									class="form-control mt-2" name="memberId" id="memberId" required>
							</div>
							<div class="mb-3 mb-sm-4">
								<label for="memberPwd" class="form-label"> 비밀번호 </label>
								<div class="password-toggle">
									<input type="password" class="form-control mt-2" name="memberPwd" id="memberPwd"
										required>
									<label class="password-toggle-btn"> <input class="password-toggle-check"
											type="checkbox"> <span class="password-toggle-indicator"></span>
									</label>
								</div>
							</div>
							<div class="mb-4 d-flex flex-wrap justify-content-between">
								<div class="form-check mb-2">
									<input type="checkbox" class="form-check-input" name="rememberid" id="saveBtn">
									<label for="saveBtn" class="form-check-label"> 아이디 저장 </label>
								</div>
								<a href="#" class="fs-sm" id="findpw" data-bs-toggle="modal"
									data-bs-target="#findPwModal">비밀번호 찾기 </a>
							</div>
							<button type="submit" class="btn btn-primary w-100" onclick="loginProcess();">로그인</button>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!-- 아이디 저장 -->
		<script>
			$(function () {
				var id = getCookie("Cookie_id");

				if (id) {
					$("#memberId").val(id);
					$("#saveBtn").attr("checked", true);
				}
			});


			function loginProcess() {
				var id = $("#memberId").val();
				var idChk = $("#saveBtn").is(":checked");

				if (id == "") {
					alert("아이디를 입력하세요");
					$("#memberId").focus();
					return false;
				} else if (idChk) {
					setCookie("Cookie_id", id, 7);
				} else {
					deleteCookie("Cookie_id");
				}
				$("#loginFrm").submit();
			};


			function setCookie(cookieName, value, exdays) {
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + exdays);
				var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
				document.cookie = cookieName + "=" + cookieValue;
			}


			function getCookie(cookieName) {
				cookieName = cookieName + '=';
				var cookieData = document.cookie;
				var start = cookieData.indexOf(cookieName);
				var cookieValue = '';

				if (start != -1) {
					start += cookieName.length;
					var end = cookieData.indexOf(';', start);
					if (end == -1) end = cookieData.length;
					cookieValue = cookieData.substring(start, end);
				}
				return unescape(cookieValue);
			}


			function deleteCookie(cookieName) {
				var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() - 1);
				document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
			}
		</script>




		<!-- 회원가입 모달 -->
		<div class="modal" tabindex="-1" role="dialog" id="signUpModal">
			<div class="modal-dialog " role="document">
				<div class="modal-content">
					<div class="modal-header pb-0">
						<h3>회원가입</h3>
						<button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body pt-4 tab-content">
						<form class="tab-pane fade show active mt-n2" novalidate id="signUp" autocomplete="off"
							action="${path}/member/enroll" method="post">
							<div class="mb-3 mb-sm-4">
								<label for="su-id" class="form-label"> 아이디 </label> <input type="text"
									class="form-control mt-2" id="su-id" name="id" required>
								<input type="button" class="d-none" id="checkDuplicate" name="id" value="중복검사">
								<span class="mt-2 d-flex justify-content-end">
									<label for="checkDuplicate" class="text-end toPage fc-primary"> 중복 검사</label>
								</span>
							</div>
							<div class="mb-3 mb-sm-4">
								<label for="su-password" class="form-label"> 비밀번호 </label>
								<div class="password-toggle">
									<input type="password" class="form-control mt-2" name="password" id="su-password"
										required>
									<label class="password-toggle-btn"> <input class="password-toggle-check"
											type="checkbox"> <span class="password-toggle-indicator"></span>
									</label>
								</div>
							</div>
							<div class="mb-3 mb-sm-4">
								<label for="su-password-confirm" class="form-label"> 비밀번호 확인 </label>
								<div class="password-toggle">
									<input type="password" class="form-control mt-2" id="su-password-confirm" required>
									<label class="password-toggle-btn"> <input class="password-toggle-check"
											type="checkbox"> <span class="password-toggle-indicator"></span>
									</label>
								</div>
							</div>
							<div class="mb-3 mb-sm-4">
								<label for="su-name" class="form-label"> 닉네임 </label>
								<div class="name-toggle">
									<input type="text" class="form-control mt-2" id="su-name" name="name" required>
								</div>
							</div>
							<div class="mb-3 mb-sm-4">
								<label for="su-phone" class="form-label"> 전화번호 </label>
								<div class="name-toggle">
									<input type="tel" class="form-control mt-2" id="su-phone" name="phone">
								</div>
							</div>
							<div class="mb-3 mb-sm-4">
								<label for="su-email" class="form-label"> 이메일 </label>
								<div class="name-toggle">
									<input type="email" class="form-control mt-2" id="su-email" name="email">
								</div>
							</div>
							<div class="mb-3 mb-sm-4">
								<label for="su-address" class="form-label"> 주소 </label>
								<div class="name-toggle">
									<input type="text" class="form-control mt-2" id="su-address" name="address">
								</div>
							</div>
							<button type="submit" class="btn btn-primary w-100">회원가입</button>
						</form>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			$(() => {
				$('#password2').blur((event) => {
					let password1 = $('#password1').val();
					let password2 = $(event.target).val();

					if (password1.trim() != password2.trim()) {
						alert('패스워드가 일치하지 않습니다.')
						$('#password1').val("");
						$('#password2').val("");
						$('#password1').focus();
					}
				});

				$('#enrollSubmit').click(() => {
					let id = $('#id').val();
					if (id.length < 4) {
						alert('아이디가 4글자보다 작습니다.');
						return false; // submit 안가는 방법
					}

					// 유효성 로직 추가하는 곳

					return true; // submit 보내짐
				});

				$('#checkDuplicate').click(() => {
					let id = $('#su-id').val().trim();

					if (id.length < 4) {
						alert('아이디가 4글자보다 작습니다.');
						return;
					}

					$.ajax({
						type: 'get',
						url: '${path}/member/idCheck',
						data: { id }, // 속성값이 키값과 같을때 값을 생략해서 보낼수 있다. 보통은 key-value로 채운다.
						success:
							(data) => { // data : 서버에서 보내준 결과 값, json으로 응답될수 있다.
								console.log(data);
								if (data.validate === true) {
									alert('이미 사용중인 아이디 입니다.');
								} else {
									alert('사용 가능합니다.');
								}
							},
						error:
							(e) => {
								alert('중복을 확인할수 없습니다.');
								console.log(e)
							}
					});
				});

			});
		</script>