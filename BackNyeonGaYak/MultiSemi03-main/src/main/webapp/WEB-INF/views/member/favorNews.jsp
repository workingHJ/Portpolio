<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />

<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="관심 소식" name="title" />
</jsp:include>

<jsp:include page="/WEB-INF/views/member/myPageSideBar.jsp" />

        <!-- 본문-->
        <div class="container col-9 pt-5 pb-lg-5 pb-md-4 pb-2 my-5">
          <div class="row align-items-center gy-3 mb-4 pb-4 ps-0 ms-0">
            <div class="col-lg-5">
              <h3 class="mb-lg-0 favoritetext">관심 소식</h3>
            </div>
            <div class="col-xl-2 offset-xl-1 col-lg-3 col-sm-5">
              <select class="form-select">
                <option>최신순</option>
                <option>조회순</option>
                <option>추천순</option>
              </select>
            </div>
            <div class="col-lg-4 col-sm-7">
              <div class="position-relative"><i
                  class="ai-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                <input class="form-control ps-5" type="search" placeholder="키워드 검색">
              </div>
            </div>
          </div>
          <!-- Post-->
          <article class="row g-0 border-0 mb-3 pb-3 ">
            <a class="col-sm-5 col-lg-4 bg-repeat-0 bg-size-cover bg-position-center rounded-5 darken-on-hover"
              href="blog-single-v1.html"
              style="background-image: url(${path}/resources/img/favoriteNews/post_2.jpg); max-height: 13rem"></a>
            <div class="col-sm-7 col-lg-8">
              <div class="pt-1 pb-sm-4 ps-sm-4 pe-lg-4">
                <h5 class="my-0"><a href="#.html">당신에게 필요한 운동</a></h5>
                <p class="fs-sm">근력을 강화하기 위해서는 모든 운동 단위가 최대한 동원되도록 근육에 높은 부하를 주어 최대한의 일을 수행하도록 해야 하며 이는 운동 신경의 지속적이고도...
                </p>
                <div class="d-flex flex-wrap align-items-center mt-n2"><a
                    class="nav-link text-muted fs-xs p-0 mt-2 me-3" href="#">6<i class="ai-share fs-xs ms-1"></i></a><a
                    class="nav-link text-muted fs-xs fw-normal d-flex align-items-end p-0 mt-2" href="#">12<i
                      class="ai-message fs-xs ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span
                    class="fs-sm text-muted mt-2">8시간 전</span>
                </div>
              </div>
            </div>
          </article>
          <article class="row g-0 border-0 mb-3 pb-3"><a
              class="col-sm-5 col-lg-4 bg-repeat-0 bg-size-cover bg-position-center rounded-5 darken-on-hover"
              href="blog-single-v1.html"
              style="background-image: url(${path}/resources/img/favoriteNews/post_1.jpg); max-height: 13rem"></a>
            <div class="col-sm-7 col-lg-8">
              <div class="pt-1 pb-sm-4 ps-sm-4 pe-lg-4">
                <h5 class="my-0"><a href="#.html">안전한 가정상비약</a></h5>
                <p class="fs-sm">약국이 문 닫았을 때 편의점에서도 안전상비의약품을 구매할 수 있는데요! 안전상비의약품이란, 일반의약품 중 주로 가벼운 증상에 시급하게 사용하며 환자 스스로
                  사용할 수 있는 것으로서...</p>
                <div class="d-flex flex-wrap align-items-center mt-n2"><a
                    class="nav-link text-muted fs-xs p-0 mt-2 me-3" href="#">6<i class="ai-share fs-xs ms-1"></i></a><a
                    class="nav-link text-muted fs-xs fw-normal d-flex align-items-end p-0 mt-2" href="#">12<i
                      class="ai-message fs-xs ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span
                    class="fs-sm text-muted mt-2">8시간 전</span>
                </div>
              </div>
            </div>

          </article>
          <article class="row g-0 border-0 mb-3 pb-3"><a
              class="col-sm-5 col-lg-4 bg-repeat-0 bg-size-cover bg-position-center rounded-5 darken-on-hover"
              href="blog-single-v1.html"
              style="background-image: url(${path}/resources/img/favoriteNews/post_3.jpeg); max-height: 13rem"></a>
            <div class="col-sm-7 col-lg-8">
              <div class="pt-1 pb-sm-4 ps-sm-4 pe-lg-4">
                <h5 class="my-0"><a href="#.html">한국-유럽, 미래 보건위기 대비 정보공유·연구협력 등 약속</a></h5>
                <p class="fs-sm">보건복지부(장관 조규홍)는 유럽연합 집행위원회 보건비상대응기구(the Health Emergency Preparedness and Response
                  Authority)와 의료 대응수단 분야 보건의료 비상사태 대비 및 대응에 대한 행정약정...</p>
                <div class="d-flex flex-wrap align-items-center mt-n2"><a
                    class="nav-link text-muted fs-xs p-0 mt-2 me-3" href="#">6<i class="ai-share fs-xs ms-1"></i></a><a
                    class="nav-link text-muted fs-xs fw-normal d-flex align-items-end p-0 mt-2" href="#">12<i
                      class="ai-message fs-xs ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span
                    class="fs-sm text-muted mt-2">8시간 전</span>
                </div>
              </div>
            </div>
          </article>
          <article class="row g-0 border-0 mb-3 pb-3"><a
              class="col-sm-5 col-lg-4 bg-repeat-0 bg-size-cover bg-position-center rounded-5 darken-on-hover"
              href="blog-single-v1.html"
              style="background-image: url(${path}/resources/img/favoriteNews/post_4.jpg); max-height: 13rem"></a>
            <div class="col-sm-7 col-lg-8">
              <div class="pt-1 pb-sm-4 ps-sm-4 pe-lg-4">
                <h5 class="my-0"><a href="#.html">운동에도 때가 있다? 아침·점심·저녁 추천 운동</a></h5>
                <p class="fs-sm">‘운동해야지!’라고 다짐은 했어도 막상 무슨 운동을 해야 할지 막막해서 선뜻 시작을 못하는 사람들도 많다. 각자 스케줄에 따라 아침에 운동하는 게 편할
                  수도, 또는 점심이나 저녁 시간대가 편할 수도 있다. 그렇다면 시간대별로...</p>
                <div class="d-flex flex-wrap align-items-center mt-n2"><a
                    class="nav-link text-muted fs-xs p-0 mt-2 me-3" href="#">6<i class="ai-share fs-xs ms-1"></i></a><a
                    class="nav-link text-muted fs-xs fw-normal d-flex align-items-end p-0 mt-2" href="#">12<i
                      class="ai-message fs-xs ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span
                    class="fs-sm text-muted mt-2">8시간 전</span>
                </div>
              </div>
            </div>
          </article>
          <article class="row g-0 border-0 mb-3 pb-3"><a
              class="col-sm-5 col-lg-4 bg-repeat-0 bg-size-cover bg-position-center rounded-5 darken-on-hover"
              href="blog-single-v1.html"
              style="background-image: url(${path}/resources/img/favoriteNews/post_5.png); max-height: 13rem"></a>
            <div class="col-sm-7 col-lg-8">
              <div class="pt-1 pb-sm-4 ps-sm-4 pe-lg-4">
                <h5 class="my-0"><a href="#.html">의사 대체한다고 난리였던 의료AI 잠잠해진 이유는?</a></h5>
                <p class="fs-sm">이세돌을 비롯한 몇몇 분야의 인간 대표들이 인공지능 '알파고'에 추풍낙엽처럼 떨어져 나가던 시절이 있었다....</p>
                <div class="d-flex flex-wrap align-items-center mt-n2"><a
                    class="nav-link text-muted fs-xs p-0 mt-2 me-3" href="#">6<i class="ai-share fs-xs ms-1"></i></a><a
                    class="nav-link text-muted fs-xs fw-normal d-flex align-items-end p-0 mt-2" href="#">12<i
                      class="ai-message fs-xs ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span
                    class="fs-sm text-muted mt-2">8시간 전</span>
                </div>
              </div>
            </div>
          </article>
          <!-- 더보기-->
          <div class="row gy-3 align-items-center mt-lg-5 pt-2 pt-md-3 pt-lg-0 mb-md-2 mb-xl-4">
            <div class="col-12 order-md-2 order-3 text-center">
              <button class="btn btn-primary w-md-auto w-100" type="button">소식 더보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />