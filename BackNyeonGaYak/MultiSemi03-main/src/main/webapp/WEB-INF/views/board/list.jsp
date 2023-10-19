<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

<jsp:include page="/WEB-INF/views/common/header.jsp" />

<c:set var="searchType" value="${param.searchType}" />
<c:if test="${empty searchType}">
	<c:set var="searchType" value="${'title'}" />
</c:if>

<div class="container mt-5 pt-5">
	<div class="row mx-0">
		<!-- 왼쪽 사이드바 시작 -->
		<aside class="col-xl-2 col-xxl-2_5">
			<div class="fc-gray500 mt-5">
				<i class="ai-arrow-left fs-xl"></i> <span
					onclick="location.href='${path}/news/news-list'" class="toPage mb-3">
					이전 페이지로 돌아가기 </span>
			</div>
			<form name="searchForm" action="${path}/board/list" method="get">
				<input type="hidden" name="page" value="1">
				<div class="input-group input-group-sm mt-5 shadow rounded-4">
					<input type="text" id="searchValue" name="searchValue" class="input_text form-control" value="${param.searchValue}" placeholder="커뮤니티에서 검색" />
					<button type="submit" class="btn btn-primary px-3 sch_smit">
						<i class="ai-search"></i>
					</button>
				</div>
				<label class= "mt-2 ms-2 pt-2"> <input type="radio" name="searchType" value="title"
					${searchType == 'title' ? 'checked' : ''}> 제목</label> 
				<label class="ms-2 pe-2"> <input type="radio" name="searchType"
					value="content" ${searchType == 'content' ? 'checked' : ''}>내용</label> 
				<label class=""> <input type="radio" name="searchType"
					value="writer" ${searchType == 'writer' ? 'checked' : ''}>작성자</label>
			</form>
			<div class="px-2 py-5">
				<button id="badge-notice" ${fn:contains(paramMap.brands, '공지') ? 'checked':'' }
					class="tag btn badge bg-faded-info text-info  badge-border border-0 fs-xs my-2 me-1" >공지</button>
				<button id="badge-health" ${fn:contains(paramMap.brands, '건강식품') ? 'checked':'' }
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
		</aside>
		<!-- 왼쪽 사이드바 끝 -->
		<!-- 제목 / 정렬/ 글쓰기 -->
		<div class="col-xl-8 col-xxl-9">
			<div class=" d-flex align-items-center justify-content-between px-4">
				<h4 class="pt-1 pt-lg-0 ps-1">커뮤니티</h4>
				<div class="d-flex align-items-center">
					<form class="pe-2">
						<select id="sort" name="sort"
							class="form-select form-select bg-transparent border-0 toPage"
							aria-label=".form-select-sm"
							onchange="document.searchForm.submit();">
							<option value="normal"
								${paramMap.sort == 'normal' ? 'selected' : '' }>추천순</option>
							<option value="low" ${paramMap.sort == 'low' ? 'selected' : '' }>최신순</option>
							<option value="high"
								${paramMap.sort == 'high' ? 'selected' : '' }>조회순</option>
						</select>

					</form>
					<c:if test="${loginMember != null}">
						<button type="button" id="btn-add"
							onclick="location.href='${path}/board/write'"
							class="btn btn-primary px-3 py-2">
							<i class="ai-pencil pe-1"></i>글쓰기
						</button>
					</c:if>
				</div>
			</div>
			<!-- 본문 -->
			<section class="card border-0 ">
				<div class="card-body pt-2">
					<c:if test="${empty list}">
						<div class="col-10">조회된 글이 없습니다.</div>
					</c:if>
					<!-- 리스트-->
					<c:if test="${not empty list}">
					<div class="accordion-item border-top pb-1 pt-1 row bg-faded-info toPage"
								onclick="window.location.href='${path}/board/view1';">
								<div class="col-10">
									<div class="me-3 me-sm-4 align-items-center mt-1">
										<img class="rounded-circle" src="${path}/resources/img/community/백.png" width="17"> 
											<span
											class="fs-xs text-muted">백년가약</span> <span class="fs-xs text-muted">·
											2023. 6. 1
										</span>

										<div class="mt-1 pt-1">
											<h6 class="fw-semibold mb-0 pb-0">
												<a href="${path}/board/view1"> [중요 알림] 서비스 안정화 작업으로 인한 다운타임 공지
												</a>
											</h6>
											<h6 class="fs-xs text-muted fw-light mt-1 mb-0 py-0">
												<a href="${path}/board/view1" class="text-truncate" style="max-height: 3em; overflow: hidden; display: block;"> 
												서비스 안정화를 위한 시스템 작업으로 최대 30분 다운타임이 있을 예정입니다. 서비스...
												</a>
											</h6>
											<span
												class="badge bg-light text-info badge-border fs-xs my-3">공지사항</span>
										</div>
									</div>
								</div>
								<div class=" col-2 comment-gap flex-end">
								 	<i class="bi bi-eye text-muted me-2 ms-5 ps-3"></i><span class="fs-xs text-muted">12</span>
								</div>
							</div>
											<div
								class="accordion-item border-top pb-1 pt-1 row bg-faded-info toPage"
								onclick="window.location.href='${path}/board/view2';">
								<div class="col-10">
									<div class="me-3 me-sm-4 align-items-center mt-1">
										<img class="rounded-circle" src="${path}/resources/img/community/백.png" width="17"> <span
											class="fs-xs text-muted">백년가약</span> <span class="fs-xs text-muted">·
											2023. 5. 23
										</span>

										<div class="mt-1 pt-1">
											<h6 class="fw-semibold mb-0 pb-0">
												<a href="${path}/board/view2"> [태그 잊지말고 달기] Q&A 좋은 답글 달리는 꿀팁!
												</a>
											</h6>
											<h6 class="fs-xs text-muted fw-light mt-1 mb-0 py-0">
												<a href="${path}/board/view2" class="text-truncate" style="max-height: 3em; overflow: hidden; display: block;"> 
												커뮤니티 이용하기에 대한 회원분들의 Tip + 간곡한 부탁들이 15년 전부터 일주일 전까지 계속해서 올라오고 있는데요..
												</a>
											</h6>
											<span
												class="badge bg-light text-info badge-border fs-xs my-3">공지사항</span>
										</div>
									</div>
								</div>
								<div class=" col-2 comment-gap flex-end">
								 	<i class="bi bi-eye text-muted me-2 ms-5 ps-3"></i><span class="fs-xs text-muted">22</span>
								</div>
							</div>
						<c:forEach var="item" items="${list}">
						<c:set var="content" value="${item.content }"/> 
							<div
								class="accordion-item border-top pb-1 pt-1 row toPage"
								onclick="window.location.href='${path}/board/view?no=${item.bno}';">
								<div class="col-10">
									<div class="me-3 me-sm-4 align-items-center mt-1">
										<c:if test="${loginMember != null}">
										<img class="rounded-circle real-content"
											src="${path}/resources/memberImage/${loginMember.id}.png" width="17"> 
											</c:if>
											<c:if test="${loginMember == null}">
											<img class="rounded-circle"
											src="${path}/resources/img/community/avatar.jpg" width="17"> 
											</c:if>
											<span
											class="fs-xs text-muted"><c:out
												value="${item.writerId}" /></span> <span class="fs-xs text-muted">·
											<fmt:formatDate type="date" value="${item.createDate}" />
										</span>

										<div class="mt-1 pt-1">
											<h6 class="fw-semibold mb-0 pb-0">
												<a href="${path}/board/view?no=${item.bno}"> <c:out
														value="${item.title}" />
												</a>
											</h6>
											<h6 class="fs-xs text-muted fw-light mt-1 mb-0 py-0">
												<a href="${path}/board/view?no=${item.bno}" class="text-truncate" style="max-height: 3em; overflow: hidden; display: block;"> 
												<c:out value="${content}" />
												</a>
											</h6>
											<span
												class="badge bg-faded-info text-info  badge-border border-0 fs-xs my-3">질문</span>
										</div>
									</div>
								</div>
								<div class=" col-2 comment-gap flex-end">
								 	<i class="bi bi-eye text-muted me-2 ms-5 ps-3"></i><span class="fs-xs text-muted"><c:out value="${item.readCount}"/></span>
								</div>
							</div>
						</c:forEach>
					</c:if>
				</div>
			</section>
			<!-- page부 시작 -->
			<div align="center">
				<jsp:include page="/WEB-INF/views/common/pagination.jsp" />
			</div>
			<!-- page부 끝 -->
		</div>
	</div>
</div>

<script type="text/javascript">

	function movePage(page) {
		searchForm.page.value = page;
		searchForm.submit();
	}
</script>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script type="text/javascript">
  $(document).ready(function() {
    $('.tag.btn.badge').click(function() {
      var badgeId = this.id;
      var filterValue = badgeId.substring(6); // Extract the filter value from the badgeId
      filterArticles(filterValue);
    });

    function filterArticles(filterValue) {
      $.ajax({
        url: '${path}/filter-articles', // Replace with the actual URL to handle the filtering on the server-side
        type: 'GET',
        data: { filter: filterValue },
        success: function(response) {
          // Update the article list with the filtered results
          $('.card-body').html(response);
        },
        error: function(xhr, status, error) {
          console.error(error);
        }
      });
    }
  });
  

</script>





<jsp:include page="/WEB-INF/views/common/footer.jsp" />