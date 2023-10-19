<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>


<!-- 헤딩 배너-->
    <div class="container mt-4 mt-lg-5 mb-lg-4 my-xl-5">
      <div class="row pt-0 mt-0">
        <aside class="col-lg-3 pe-lg-4 pe-xl-5 mt-n2">
          <div class="position-lg-sticky top-0">
            <div class="offcanvas-lg offcanvas-start" id="sidebarAccount">
              <button class="btn-close position-absolute top-0 end-0 mt-3 me-3 d-lg-none" type="button"
                data-bs-dismiss="offcanvas" data-bs-target="#sidebarAccount"></button>
              <div class="offcanvas-body">
                <div class="pb-2 pb-lg-0 mb-4 mb-lg-5"><img class="d-block rounded-circle mb-2"
                    src="${path}/resources/memberImage/${loginMember.id}.png" width="80" alt="Isabella Bocouse">
                  <h3 class="h5 mb-0 pb-0 mt-2 pt-2">${loginMember.name}</h3>
                  <p class="fs-sm text-muted mt-0 pt-0 mb-0"> ${loginMember.email}</p>
                </div>
                <nav class="nav flex-column pb-2 pb-lg-4 mb-3">
                  <h4 class="fs-xs fw-medium text-muted text-uppercase pb-1 mb-2">계정</h4><a
                    class="nav-link fw-semibold py-0 px-0" a href="${path }/member/view"><i
                      class="ai-user-check opacity-60 me-2 mt-2 mb-2"></i>마이페이지</a><a
                    class="nav-link fw-semibold py-0 px-0"  href="${path }/member/settings"><i
                      class="ai-settings opacity-60 me-2 mt-2 mb-2"></i>회원정보 수정</a>
                </nav>
                <nav class="nav flex-column pb-2 pb-lg-4 mb-1">
                  <h4 class="fs-xs fw-medium text-muted text-uppercase pb-1 mb-2">즐겨찾기</h4>
                  <a class="nav-link fw-semibold py-0 px-0" href="${path }/member/FavorDrug">
                  <i class="ai-cart opacity-60 me-2 mt-2 mb-2"></i>자주 먹는 약</a>
                  <a class="nav-link fw-semibold py-0 px-0" href="${path}/pharmacy/FavorPharm">
                  <i class="ai-map-pin opacity-60 me-2 mt-2 mb-2"></i>자주 찾는 약국</a>
                  <a class="nav-link fw-semibold py-0 px-0" href="${path}//myPage/favorNews">
                  <i class="ai-activity opacity-60 me-2 mt-2 mb-2"></i>관심 소식</a>
                </nav>
                <nav class="nav flex-column"><a class="nav-link fw-semibold py-2 px-0"  href="${path}/logout"><i
                      class="ai-logout opacity-60 me-2 mt-2 mb-2"></i>로그아웃</a></nav>
              </div>
            </div>
          </div>
        </aside>