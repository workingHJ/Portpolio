<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />

<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="게시글 작성" name="title" />
</jsp:include>


<div class="container">
	<div class="row mx-0">
		<div class="col-10 offset-1">
			<!-- 본문 -->
			<section class="container">
				<div class="fc-gray500 mt-5">
				</div>
				<div class="row">
					<div class="offset-2 col-lg-9 col-xl-8 pe-lg-4 pe-xl-0">
						<!-- 제목-->
						<div class="border-bottom">
							<h4 class="mb-2 pb-2">커뮤니티 글쓰기</h4>
							<h6 class="fw-normal mt-0 pt-0 mb-2 fs-sm">${loginMember.id}님,궁금한
								점이나 남기고 싶은 말을 적어주세요!</h6>
						</div>
						<form action="${path}/board/write" method="post"
							enctype="multipart/form-data">
							<div class="row g-3 g-sm-4 mt-0 mt-lg-2">
								<div class="col-12">
									<label class="form-label fs-6" for="id">제목</label> <input
										class="form-control" type="text" name="title"
										placeholder="제목을 입력해주세요">
								</div>
								<div class="col-12">
									<label class="form-label fs-6" for="emain">태그</label> <select
										id="sort" name="sort"
										class=" form-select bg-transparent toPage"
										aria-label=".form-select-sm"
										onchange="document.searchForm.submit();">
										<option value="question"
											${paramMap.sort=='normal' ? 'selected' : '' }>질문</option>
										<option value="notice"
											${paramMap.sort=='normal' ? 'selected' : '' }>공지</option>
										<option value="daily"
											${paramMap.sort=='normal' ? 'selected' : '' }>일상</option>
										<option value="medKnowledge"
											${paramMap.sort=='normal' ? 'selected' : '' }>의학지식</option>
										<option value="healthInfo"
											${paramMap.sort=='normal' ? 'selected' : '' }>건강정보</option>
										<option value="healthSupplement"
											${paramMap.sort=='low' ? 'selected' : '' }>건강식품</option>
										<option value="workout"
											${paramMap.sort=='high' ? 'selected' : '' }>운동</option>
										<option value="recommendation"
											${paramMap.sort=='high' ? 'selected' : '' }>추천아이템</option>
										<option value="suggestion"
											${paramMap.sort=='high' ? 'selected' : '' }>건의사항</option>
									</select>
								</div>
								<!-- 파일 업로드								<div class="col-12">
									<label class="form-label fs-6">첨부파일</label> 
									<input type="file" name="upfile">
								</div>  -->
								<div class="col-12">
									<label class="form-label fs-6" for="emain">본문</label>
									<textarea name="content" rows="15" cols="50"
										class="form-control" placeholder="내용을 입력해주세요" style="white-space:pre-wrap"></textarea>
								</div>
								<div
									class="d-flex justify-content-end align-items-end mb-4 pb-4 mt-3 pt-3">
									<button type="reset"
										class="btn btn-sm btn-outline-primary fw-semibold me-2 rounded-pill"
										style="width: 90px !important; font-size: 0.85rem;">
										취소</button>
									<button type="submit"
										class=" btn btn-sm btn-warning text-black fw-bold rounded-pill"
										style="width: 90px !important; font-size: 0.85rem;">
										등록</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
<br>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />














