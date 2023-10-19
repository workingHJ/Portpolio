<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>


<c:set var="path" value="${pageContext.request.contextPath}" />

<jsp:include page="/WEB-INF/views/common/header.jsp">
    <jsp:param value="소식" name="title" />
</jsp:include>

<div class="container pt-3 mt-3 mb-5">
        <div class="row mx-0 align-items-center gy-2 mb-4 pb-1 mt-3 pb-sm-2 pb-lg-4">
            <div class="col-lg-5">
                <h1 class="my-2 fc-primary">소식</h1>
            </div>
        </div>
        <div class="row mx-0 align-items-center gy-2 mb-4 pb-1 mt-3 pb-sm-2 pb-lg-3">
            <div class="col-lg-5">
                <h2 class="my-2 fc-black">뉴스</h2>
            </div>
        </div>
        <div class="mb-4 pb-3 d-flex flex-column">
         <form name="searchForm" id="news" action="${path}/news/list" method="get">
        <c:forEach var="item" items="${list }">
        
        
            <!-- Post-->
            <article class="row mx-0 g-0 border-0 mb-4">
            <c:choose>
            <c:when test="${fn:contains(item.nw_title,'피우는 비타민')}">
            <a
                    class="col-sm-5 col-lg-4 bg-repeat-0 bg-size-cover bg-position-center rounded-5"
                    href="https://health.chosun.com/site/data/html_dir/2016/11/11/2016111100966.html"
                    style="background-image: url('${path}/resources/img/news/vitastick.jfif'); min-height: 16rem"></a>
            </c:when>
            <c:when test="${fn:contains(item.nw_title,'자궁경부암')}">
            <a
                    class="col-sm-5 col-lg-4 bg-repeat-0 bg-size-cover bg-position-center rounded-5"
                    href="http://www.dailydgnews.com/mobile/article.html?no=150049"
                    style="background-image: url('${path}/resources/img/news/syringe.jpg'); min-height: 16rem"></a>
            </c:when>
            <c:when test="${fn:contains(item.nw_title,'진통제')}">
            <a
                    class="col-sm-5 col-lg-4 bg-repeat-0 bg-size-cover bg-position-center rounded-5"
                    href="https://jhealthmedia.joins.com/article/article_view.asp?pno=20440"
                    style="background-image: url('${path}/resources/img/news/painkiller.jpg'); min-height: 16rem"></a>
            </c:when>
            </c:choose>
                    
            <c:choose>
            	<c:when test="${fn:contains(item.nw_title,'피우는 비타민')}">
                <div class="col-sm-7 col-lg-8">
                    <div class="pt-3 pb-sm-4 ps-sm-4 pe-lg-4 news">
                        <h3 class="ms-2"><a href="https://health.chosun.com/site/data/html_dir/2016/11/11/2016111100966.html">${item.nw_title}</a></h3>
            	</c:when>
            	<c:when test="${fn:contains(item.nw_title,'자궁경부암')}">
                <div class="col-sm-7 col-lg-8">
                    <div class="pt-3 pb-sm-4 ps-sm-4 pe-lg-4 news">
                        <h3 class="ms-2"><a href="http://www.dailydgnews.com/mobile/article.html?no=150049">${item.nw_title}</a></h3>
            	</c:when>
            	<c:when test="${fn:contains(item.nw_title,'진통제')}">
                <div class="col-sm-7 col-lg-8">
                    <div class="pt-3 pb-sm-4 ps-sm-4 pe-lg-4 news">
                        <h3 class="ms-2"><a href="https://jhealthmedia.joins.com/article/article_view.asp?pno=20440">${item.nw_title}</a></h3>
            	</c:when>
            </c:choose>
                        
                        
                        <div class="ms-2 news">
                            <p>
                            ${item.nw_content}
                            </p>
                        </div>
                        <div class="d-flex flex-wrap align-items-center mt-3 pt-1 ms-2">
                            <a class="nav-link text-muted fs-sm fw-normal p-0 mt-2 me-3" href="#">
                                ${item.nw_share} <i class="ai-share fs-lg ms-1"></i>
                            </a>
                            <a class="nav-link text-muted fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">
                                ${item.nw_rply}<i class="ai-message fs-lg ms-1"></i>
                            </a>
                            <span class="fs-xs opacity-20 mt-2 mx-3">|</span>
                            <span class="fs-sm text-muted mt-2">${item.nw_date}</span>
                        </div>
                    </div>
                </div>
            </article>
            </c:forEach>
            </form>
        <div class="row mx-0 align-items-center gy-2 mb-4 pb-1 mt-3 pb-sm-2 pb-lg-3 community">
            <div class="col-lg-5">
                <h2 class="my-2 fc-black toPage" onclick="location.href='${path}/board/list'">커뮤니티</h2>
            </div>
            <div class="d-flex my-2 justify-content-end">
                <nav class="nav2 my-1" style="margin: 40px;">
                    <ul2 class="ul2">
                        <li2 class="li2" style="margin-right: 60px; ">
                            <a class="a2 activeLine fc-primary" href="${path}/board/list">인기순</a>
                        </li2>
                        <li2 class="li2"><a class="a2 fc-gray500" href="${path}/board/list">최신순</a></li2>
                    </ul2>
                </nav>
            </div>
            <div class="my-3">
                <div class="row mx-0 my-4 pb-3">
                    <h4 class="toPage hovCor pb-0 px-0 mb-0 w-content" onclick="location.href='${path}/board/list'">
                        날이 더워지면서 차가운 물이나 음료수를 먹는데 치아가 너무 시립니다</h4>
                    <div class="">
                        <div class="px-0 d-flex flex-wrap align-items-center">
                            <a class="nav-link text-muted fs-sm fw-normal p-0 mt-2 me-3" href="#">
                                6 <i class="ai-share fs-lg ms-1"></i>
                            </a>
                            <a class="nav-link text-muted fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">
                                12<i class="ai-message fs-lg ms-1"></i>
                            </a>
                            <span class="fs-xs opacity-20 mt-2 mx-3">|</span>
                            <span class="fs-sm text-muted mt-2">8 hours ago</span>
                        </div>
                    </div>
                </div>
                <div class="row mx-0 my-4 pb-3">
                    <h4 class="toPage hovCor pb-0 px-0 mb-0 w-content" onclick="location.href='${path}/board/list'">
                     코로나진단키드 한달이상 지난것도 상관없을까요?</h4>
                    <div class="">
                        <div class="px-0 d-flex flex-wrap align-items-center">
                            <a class="nav-link text-muted fs-sm fw-normal p-0 mt-2 me-3" href="#">
                                6 <i class="ai-share fs-lg ms-1"></i>
                            </a>
                            <a class="nav-link text-muted fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">
                                12<i class="ai-message fs-lg ms-1"></i>
                            </a>
                            <span class="fs-xs opacity-20 mt-2 mx-3">|</span>
                            <span class="fs-sm text-muted mt-2">8 hours ago</span>
                        </div>
                    </div>
                </div>
                <div class="row mx-0 my-4 pb-3">
                    <h4 class="toPage hovCor pb-0 px-0 mb-0 w-content" onclick="location.href='${path}/board/list'">
                    건강검진 받는데 심전도관련 질문드립니다.
                    </h4>
                    <div class="">
                        <div class="px-0 d-flex flex-wrap align-items-center">
                            <a class="nav-link text-muted fs-sm fw-normal p-0 mt-2 me-3" href="#">
                                6 <i class="ai-share fs-lg ms-1"></i>
                            </a>
                            <a class="nav-link text-muted fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">
                                12<i class="ai-message fs-lg ms-1"></i>
                            </a>
                            <span class="fs-xs opacity-20 mt-2 mx-3">|</span>
                            <span class="fs-sm text-muted mt-2">8 hours ago</span>
                        </div>
                    </div>
                </div>
                <div class="row mx-0 my-4 pb-3">
                    <h4 class="toPage hovCor pb-0 px-0 mb-0 w-content" onclick="location.href='${path}/board/list'"> 
                    14세 칼슘제 얼만큼 먹여야할까요?</h4>
                    <div class="">
                        <div class="px-0 d-flex flex-wrap align-items-center">
                            <a class="nav-link text-muted fs-sm fw-normal p-0 mt-2 me-3" href="#">
                                6 <i class="ai-share fs-lg ms-1"></i>
                            </a>
                            <a class="nav-link text-muted fs-sm fw-normal d-flex align-items-end p-0 mt-2" href="#">
                                12<i class="ai-message fs-lg ms-1"></i>
                            </a>
                            <span class="fs-xs opacity-20 mt-2 mx-3">|</span>
                            <span class="fs-sm text-muted mt-2">8 hours ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-5">
            <h2 class="my-2 fc-black">지금 뜨는 리뷰</h2>
        </div>
        <!-- Testimonials slider: Style 2 -->
        <div class="my-5 card border-0 bg-secondary">
            <div class="card-body">
                <figure>
                    <blockquote class="blockquote">
                        <p>너무 피곤해서 비타민 D를 챙겨보자고 생각하고 먹기 시작했는데 젤리형태라서 맛있고 좋았어요!! 더 먹어봐야 알겠지만 활력이 도는 느낌입니다 ㅎㅎ 애들 먹이기도 좋을 거
                            같아요 강추! </p>
                    </blockquote>
                    <figcaption class="blockquote-footer">매일매일피곤한사람</figcaption>
                </figure>
            </div>
        </div>
    </div>


















<jsp:include page="/WEB-INF/views/common/footer.jsp" />

            


     