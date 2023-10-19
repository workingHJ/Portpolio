<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="회원정보 조회" name="title"/>
</jsp:include>

<jsp:include page="/WEB-INF/views/member/myPageSideBar.jsp"/>
        <!-- Page content-->
        <div class="col-lg-9 pt-4 pb-2 pb-sm-4">
          <h1 class="h2 mb-4 ms-4">회원 정보</h1>
          <!-- Basic info-->
          <section class="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
            <div class="card-body ps-3 py-3 mb-0">
              <div class="d-flex align-items-center mt-sm-n1 mb-0 mb-lg-1 mb-xl-3"><i
                  class="ai-user text-primary lead pe-1 me-2 mb-2 pb-1"></i>
                <h2 class="h4 mb-0">기본 정보</h2>
              </div>
              <div class="d-md-flex align-items-center">
                <div class="d-sm-flex align-items-center">
                   <!--회원 프로필 사진-->
                  <div class="rounded-circle bg-size-cover bg-position-center flex-shrink-0"
                    style="width: 80px; height: 80px; background-image: url(${path}/resources/memberImage/${loginMember.id}.png);">
                  </div>
                  <div class="pt-3 pt-sm-0 ps-sm-3">
                    <h3 class="h5 mb-2">${loginMember.name}<i class="ai-circle-check-filled fs-base text-primary ms-2"></i>
                    </h3>
                    <!--회원 닉네임-->
                    <div class="text-muted fw-medium d-flex flex-wrap flex-sm-nowrap align-iteems-center">
                      <div class="d-flex align-items-center me-3">${loginMember.id}</div><!--회원 아이디-->
                      <div class="d-flex align-items-center text-nowrap"></div>
                    </div>
                  </div>
                </div>
                <div class="w-100 pt-3 pt-md-0 ms-md-auto" style="max-width: 212px;">
                </div>
              </div>
            </div>
            <div class="row ps-3 py-4 mb-2 mb-sm-3">
              <div class="col-md-6 mb-4 mb-md-0">
                <table class="table mb-0">
                  <tr><!--이메일-->
                    <td class="border-0 text-muted py-1 px-0">Email</td>
                    <td class="border-0 text-dark fw-medium py-1 ps-3">${loginMember.email}</td>
                  </tr>
                  <tr><!--연락처-->
                    <td class="border-0 text-muted py-1 px-0">Phone</td>
                    <td class="border-0 text-dark fw-medium py-1 ps-3">${loginMember.phone}</td>
                  </tr>
                  <tr><!--주소-->
                    <td class="border-0 text-muted py-1 px-0">Address</td>
                    <td class="border-0 text-dark fw-medium py-1 ps-3">${loginMember.address}</td>
                  </tr>
                </table>
              </div>
            </div>
          </section>
          <div class="row row-cols-1 row-cols-md-2 g-4 mb-4 ms-1">
            <!-- 작성한 글-->
            <section class="col">
              <div class="card h-100 border-0 py-1 p-md-2 pe-4 me-3">
                <div class="card-body pt-4 ps-3">
                  <div class="d-flex align-items-center mt-sm-n1 pb-2 mb-1 mb-lg-2"><i
                      class="ai-note text-primary lead pe-1 me-2 mb-2 pb-1"></i>
                    <h2 class="h4 mb-0">작성한 글</h2>
                  </div>
                  <!-- 작성글 리스트 시작 -->
                  <c:if test="${empty boardList}">
				<tr>
					<td colspan="6">작성한 글이 없습니다.</td>
				</tr>
			     </c:if> 
               <c:if test="${not empty boardList}">
                 <c:forEach var="item" items="${boardList}">
                  <div class="d-flex align-items-center pb-1 mb-2">
                    <h5 class="mb-0 me-3 pb-1"><a class="text-decoration-none"  href="${path}/board/view?no=${item.bno}" class="text-truncate" style="max-height: 3em; overflow: hidden; display: block;"><c:out value="${item.title}"/></a>
                    </h5>
                  </div>
                  <p class="mb-4">
                    <a class="text-body text-decoration-none"  href="${path}/board/view?no=${item.bno}" class="text-truncate" style="max-height: 3em; overflow: hidden; display: block;">
                      <c:out value="${item.content}"/>
                    </a>
                  </p>
                 </c:forEach>
                </c:if>
                <!-- 작성글 리스트 끝 --> 
                </div>
              </div>
            </section>
            <!-- 작성한 댓글-->
            <section class="col">
              <div class="card h-100 border-0 py-1 p-md-2">
                <div class="card-body pt-4 ps-3">
                  <div class="d-flex align-items-center mt-sm-n1 pb-2 mb-1 mb-lg-2"><i
                      class="ai-messages text-primary lead pe-1 me-2 mb-2 pb-1"></i>
                    <h2 class="h4 mb-0">작성한 댓글</h2>
                  </div>
                  <!-- 작성댓글 리스트 시작 -->
                 <c:if test="${empty replyList}">
                <tr>
					<td colspan="6">작성한 댓글이 없습니다.</td>
				</tr>
			     </c:if> 
			    <c:if test="${not empty replyList}">
                 <c:forEach var="item" items="${replyList}">
                  <div class="d-flex align-items-center pb-1 mb-2">
<!--                     <h5 class="mb-0 me-3 pb-1"><a class="text-decoration-none" href="#">댓글 제목 여기</a>
                    </h5> -->
                  </div>
                  <p class="mb-4">
                    <a class="text-body text-decoration-none" href="${path}/board/view?no=${item.bno}">
                      <c:out value="${item.content}"/>
                    </a>
                  </p>
                  </c:forEach>
                </c:if>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

<jsp:include page="/WEB-INF/views/common/footer.jsp"/>