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
									[태그 잊지말고 달기] Q&A 좋은 답글 달리는 꿀팁!
								</h3>
								<div
									class="d-flex flex-wrap align-items-center justify-content-between mb-4">
									<div class="d-flex align-items-center mb-4 me-4">
										<span class="fs-sm me-2"> <img class="rounded-circle"
											src="${path}/resources/img/community/백.png" width="17"> </span> <span
											class="fs-xs text-muted">백년가약</span> <span
											class="fs-xs text-muted"> ·  2023. 5. 23. 오후 9:41:33
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
								<div style="white-space: pre-wrap">Q&A 이용하기에 대한 회원분들의 Tip + 간곡한 부탁들이 15년 전부터 일주일 전까지 계속해서 올라오고 있는데요.

하나하나 읽어보며, 반복해서 제기되는 내용들을 정리해 보았습니다.



A. 정확하고 구체적인 질문

문제점을 정확하고 구체적으로 서술한다. : 정확한 답변을 받을 수 있도록.

질문 시 관련 정보 (로그, 소스, 시스템 환경) 를 충분히 설명한다.

공부한 과정이나 레퍼런스 (웹사이트, 서적) 를 함께 적는다. : Tip과 더 좋은 레퍼런스를 얻을 수 있도록.

현재 자신이 아는 바를 최대한 자세히 적는다. : 이미 아는 내용을 답변 받지 않도록.

약어는 가급적 사용하지 않는다.

기본적인 문법 (띄어쓰기, 맞춤법) 을 지킨다. : 쉽게 읽고 답변할 수 있도록.

새 질문은 새 글로, 하나의 글에는 하나의 질문만 적는다. : 한 번에 최대한 많은 내용을 올려서 한 번에 답변을 받을 수 있도록, 다음에 비슷한 질문을 가진 다른 유저가 쉽게 참고할 수 있도록. 댓글로 채팅처럼 질문을 이어갈 경우, 답변 받을 가능성이 더 낮아짐.



B.질문자의 attitude

질문 전에 스스로 답을 찾기 위해 충분히 노력한다. (기본 도큐먼트, 에러 메시지 확인, API 문서 확인, 인터넷 검색, 번역기 활용 등) : 답변자들도 자신의 소중한 시간을 할애하는 것임을 기억한다.

답변이 완료되었을 경우, 답변 왼쪽의 버튼을 눌러 답변을 채택한다. 또한 “감사합니다”, “잘 해결했습니다” 등의 인사를 붙이면 좋다.


질문에 지나친 감정을 담지 않는다. : 부정적인 감정 (짜증, 분노, 애절함, 동정심 유도, 급박함 등) 은 답변에 전혀 도움이 되지 않으므로, 답변자가 자신의 지식을 마음 편히 공유할 수 있도록.

답변을 얻고 글을 지워버리는 등의 행동은 절대 하지 않는다. : 답변자에게도, 해당 글에서 좋은 지식을 얻을 수 있는 다른 회원들에게도 매우 무례한 행위임을 기억한다.




기능적으로 당장 해결하기 어려운 의견들 (ex. “구글링 하세요” 버튼, 답변 복수 채택 등) 도 있지만, 회원 여러분과 운영진의 노력으로 바뀔 수 있는 것이 있어서, 함께 바꿔 보았으면 하는 마음으로 새로운 Q&A 운영 원칙을 안내드립니다.</div>
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
