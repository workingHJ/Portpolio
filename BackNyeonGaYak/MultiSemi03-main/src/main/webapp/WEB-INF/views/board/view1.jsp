<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />



<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="게시글 상세조회" name="title" />
</jsp:include>

<style>
    .no-resize {
        resize: none;
    }
</style>


<section id="board-write-container">
	<div class="container">
		<div class="row mx-0">
			<div class="col-10 offset-1">
				<!-- 본문 -->
				<section class="container">
					<div class="row">
						<div class="col-lg-9 col-xl-8 pe-lg-4 pe-xl-0">
							<div class="fc-gray500 mt-5">
								 <i class="ai-arrow-left fs-xl"></i>
    <span onclick="goback();" class="toPage mb-3"> 이전 페이지로 돌아가기 </span>
							</div>
							<!-- 제목-->
							<div class="border-bottom">
								<h3 class="pb-2 pb-lg-3 pt-2 mt-2">
									[중요 알림] 서비스 안정화 작업으로 인한 다운타임 공지
								</h3>
								<div
									class="d-flex flex-wrap align-items-center justify-content-between mb-4">
									<div class="d-flex align-items-center mb-4 me-4">
										<span class="fs-sm me-2"> <img class="rounded-circle"
											src="${path}/resources/img/community/백.png" width="17"></span> 
											<span class="fs-xs text-muted">백년가약</span> 
											<span class="fs-xs text-muted"> ·  2023. 6. 1. 오후 1:11:38
										</span>
									</div>
									<div class="d-flex align-items-center mb-4">
									<c:if test="${not empty loginMember && loginMember.id == board.writerId}">
                                        <button type="button" id="btnUpdate"
                                             class="btn btn-sm btn-outline-primary fw-semibold me-2 rounded-pill"
                                            style="width: 90px !important; font-size: 0.85rem;">
                                            수정
                                        </button>
                                        <button type="button" id="btnDelete"
                                            class=" btn btn-sm btn-warning text-black fw-bold rounded-pill"
                                            style="width: 90px !important; font-size: 0.85rem;">
                                            삭제
                                        </button>
                                    </c:if>
                                </div>
								</div>
								<!-- Post content-->
								<div style="white-space: pre-wrap">안녕하세요, 백년가약팀입니다.

서비스 안정화를 위한 시스템 작업으로 최대 30분 다운타임이 있을 예정입니다.

서비스가 중단될 예정이니 양해 부탁드립니다. 

일시 : 6월 27일(토) 00:00 ~ 00:30, 총 30분 다운타임 발생

내용 : DB 점검 및 NHN 클라우드 하이퍼바이저 서버 업그레이드

상기 일정은 작업 상황에 따라 변동될 수 있으며, 빠른 서비스 안정을 위해 최선을 다하겠습니다.

감사합니다.</div>
								<!-- Tags-->
								<div class="d-flex flex-wrap pb-5 pt-3 pt-md-4 pt-xl-5 mt-xl-n2">
									<a class="nav-link fs-sm py-1 px-0 me-3" href="#"><span
										class="text-primary">#</span>공지사항</a>
								</div>
							</div>
							<!-- Comments-->
							<div class="pt-2 pt-xl-5 mt-2" id="comments">
								<!-- 댓글 입력창-->
								<div class="card-body py-3">
									<form action="${path}/board/reply" method="post"
										class="row needs-validation" novalidate>
										<div class="col-12">
											<input type="hidden" name="bno" value="${board.bno}" /> 
											<input type="hidden" name="writerId" value="${loginMember.id}" />
											<input type="hidden" name="mno" value="${loginMember.mno}"/>
											<textarea name="content" id="replyContent"
												class="form-control" cols="55" rows="3"
												placeholder="댓글을 적어주세요!" required id="c-comment"></textarea>
											<div class="invalid-feedback">최소 1글자 이상이어야 합니다</div>
										</div>
										<div class="col-1 offset-9">
											<button id="btn-insert"
												class="btn btn-primary ms-5 my-2 px-4 py-2 fs-xs rounded-0 rounded-1"
												type="submit">댓글 쓰기</button>
										</div>
									</form>
								</div>
								<!-- Comment-->
								<div class="border-bottom py-4 mt-2 mb-4">
									<c:if test="${!empty replyList}">
										<c:forEach var="reply" items="${replyList}">
											<div class="d-flex align-items-center pb-1 mb-3">
												<img class="rounded-circle"
													src="${path}/resources/memberImage/${loginMember.id}.png" width="45"
													alt="user">
												<div class="ps-3">
													<h6 class="mb-0 pb-0">${reply.writerId}</h6>
													<span class="fs-sm text-muted"><fmt:formatDate
															type="both" value="${reply.createDate}" /></span>
												</div>
											</div>
												<textarea class="form-control no-resize" readonly>${reply.content}</textarea>
											<c:if
												test="${ not empty loginMember && loginMember.id == reply.writerId}">
												<div class="d-flex me-1 justify-content-end">
													<button class="btn btn-sm btn-warning text-black fw-bold py-2 px-3 mt-2 mb-5 pt-2"
														onclick="deleteReply('${reply.rno}','${board.bno}');">삭제</button>
												</div>
											</c:if>
										</c:forEach>
									</c:if>

									<c:if test="${empty replyList}">
										<tr>
											<td colspan="3" style="text-align: center;">등록된 리플이 없습니다.</td>
										</tr>
									</c:if>
								</div>
							</div>
						</div>
						<!-- Sidebar (offcanvas on sreens < 992px)-->
						<aside class="col-lg-3 offset-xl-1">
							<div class="pt-5 mt-4" id="sidebar">
								<form name="searchForm" action="${path}/board/list" method="get">
									<input type="hidden" name="page" value="1">
									<div class="input-group input-group-sm mt-5 shadow rounded-4">
										<input type="text" id="searchValue" name="searchValue"
											class="input_text form-control" value="${param.searchValue}"
											placeholder="커뮤니티에서 검색" />
										<button type="submit" class="btn btn-primary px-3 sch_smit">
											<i class="ai-search"></i>
										</button>
									</div>
									<label class="mt-2 ms-2 pt-2"> <input type="radio"
										name="searchType" value="title" checked> 제목
									</label> <label class="ms-2 pe-2"> <input type="radio"
										name="searchType" value="content"
										${searchType == 'content' ? 'checked' : ''}>내용
									</label> <label class=""> <input type="radio" name="searchType"
										value="writer" ${searchType == 'writer' ? 'checked' : ''}>작성자
									</label>
								</form>
								<div class="mt-3 mb-5">
									<button
										class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1">공지</button>
									<button
										class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1">건강식품</button>
									<button
										class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1">일상</button>
									<button
										class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1">질문</button>
									<button
										class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1">건강정보</button>
									<button
										class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1">의학지식</button>
									<button
										class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1">추천아이템</button>
									<button
										class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1">건의사항</button>
								</div>
								<h5 class="pt-3 pt-lg-1 mb-1 fw-semibold">인기글</h5>
									<article class="my-1 my-lg-0 pb-2">
									<h6 class="pb-0 mb-0 mt-2 fw-normal fs-sm">
										<a href="${path}/board/view1" class="fc-black">[중요 알림] 서비스 안정화 작업으로 인한 다운타임 공지</a>
									</h6>
									<div class="d-flex flex-wrap align-items-center mt-0 mb-2">
										<a class="nav-link text-muted fs-xs fw-normal p-0 mt-2 me-3"
											href="#">12<i class="ai-share fs-xs ms-1"></i></a><a
											class="nav-link text-muted fs-xs fw-normal d-flex align-items-end p-0 mt-2"
											href="#">1<i class="ai-message fs-xs ms-1"></i></a> <span
											class="fs-xs opacity-20 mt-2 mx-3">|</span><span
											class="fs-xs text-muted mt-2 pb-0">6월 1일</span>
									</div>
								</article>
								<article class="my-1 my-lg-0 pb-2">
									<h6 class="pb-0 mb-0 mt-2 fw-normal fs-sm">
										<a href="${path}/board/view2" class="fc-black">[태그 잊지말고 달기] Q&A 좋은 답글 달리는 꿀팁!</a>
									</h6>
									<div class="d-flex flex-wrap align-items-center mt-0 mb-2">
										<a class="nav-link text-muted fs-xs fw-normal p-0 mt-2 me-3"
											href="#">22<i class="ai-share fs-xs ms-1"></i></a><a
											class="nav-link text-muted fs-xs fw-normal d-flex align-items-end p-0 mt-2"
											href="#">3<i class="ai-message fs-xs ms-1"></i></a> <span
											class="fs-xs opacity-20 mt-2 mx-3">|</span><span
											class="fs-xs text-muted mt-2 pb-0">5월 23일</span>
									</div>
								</article>
							</div>
						</aside>
					</div>
				</section>
			</div>
		</div>
	</div>
</section>
<br>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />



<script type="text/javascript">
	$(document).ready(() => {
		$("#btnUpdate").click((e) => {
			location.href = ("${path}/board/update?no=${board.bno}");
		});
		
		$("#btnDelete").click((e) => {
			if(confirm("정말로 게시글을 삭제 하시겠습니까?")) {
				location.replace("${path}/board/delete?no=${board.bno}");
			}
		});
	});
	
	function deleteReply(replyNo, boardNo){
		var url = "${path}/board/replyDel?rno=";
		var requestURL = url + replyNo +"&bno=" + boardNo;
		location.replace(requestURL);
	}
	
	function fileDownload(originName, reName){
		const url = '${path}/board/fileDown';
		originName = encodeURIComponent(originName)
		reName = encodeURIComponent(reName)
		location.href = url + '?originName=' + originName + '&reName=' + reName;
	}
	
	function goback() {
		window.history.back();
	}
</script>

<script src="js/custom/community.js"></script>

















