<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<%-- <c:set var="imgPath" value="${pageContext.request.contextPath}/resources/img/폴더명/파일명"/>
 --%>
<!--  {path}/resources/img/폴더명/파일명
 -->
 

<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="백년가약" name="title"/>
</jsp:include>
	
		<!-- 헤딩 배너-->
		<section class="overflow-hidden bg-lightyellow">
			<div class="container pt-5 pt-sm-5 pb-sm-4 pb-5 pb-md-4 py-xl-4 mt-0">
				<div class="row align-items-center py-0 mt-md-2 my-lg-3 my-xl-4 my-xxl-5">
					<div
						class="col-lg-6 order-lg-2 d-flex justify-content-center justify-content-lg-end mb-4 mb-md-5 mb-lg-0 pb-3 pb-md-0 ">
						<div class="parallax main" style="max-width: 500px;">
							<div class="parallax-layer" data-depth="0.1">
								<img src="${path}/resources/img/landing/header_01.png" alt="Layer">
							</div>
							<div class="parallax-layer" data-depth="-0.2">
								<img src="${path}/resources/img/landing/header_02.png" alt="Layer">
							</div>
							<div class="parallax-layer" data-depth="0.25">
								<img src="${path}/resources/img/landing/header_03.png" style="position: absolute; left: -60px;">
							</div>
						</div>
					</div>
					<div class="col-lg-6 order-lg-1">
						<h1 class="display-4 main-text fw-bold pb-sm-2 pb-md-2 mt-3 ms-3">
							<div class="mt-2">백년동안 건강하게,</div>
							<div>함께하기로 약속했다면</div>
						</h1>
						<p class="fs-4 text-lg-start pb-xl-2 mb-4 ms-3" style="max-width: 600px;">건강을 챙기는 일은 가족과 친구를 챙기는
							일이니까.</p>
						<form class="input-group mx-auto mx-lg-0 bg-gray-custom rounded-4" style="max-width: 700px;"
								action="${path }/drug/search" method="get">
							<span class="input-group-text text-muted"><i class="ai-search fs-4 pb-0"></i></span> 
							<input class="form-control mt-2 fs-4" type="search" placeholder="약 이름을 입력하세요."
							name="itemName" value="${paramMap.itemName }">
							<button class="btn btn-warning text-black fw-bold fs-6 me-2 my-1" 
							onclick="location.href='${path}/drug/search'" type="submit">검색</button>
						</form>
					</div>
				</div>
			</div>
		</section>
		<!-- 증상별 약 추천-->
		<div class="px-5 mx-xxl-5">
			<section class=" pt-0 pt-md-5">
				<div class="container pt-1 pt-sm-2 pb-sm-2 pb-md-2 py-xl-2 mt-3">
					<div class="row pt-3 pt-lg-0 pb-1 ms-1">
						<div class="col-3">
							<h2>증상별 약품 추천</h2>
						</div>
						<div class="col-9 symtoms">
							<button
								class="btn fs-5 rounded-pill fw-bold btn-secondary text-bg-secondary mx-1 py-1_5">#감기</button>
							<button
								class="btn fs-5 rounded-pill fw-bold btn-secondary text-bg-secondary mx-1 py-1_5">#어지러움</button>
							<button
								class="btn fs-5 rounded-pill fw-bold btn-secondary text-bg-dark mx-1 py-1_5">#진통</button>
							<button
								class="btn fs-5 rounded-pill fw-bold btn-secondary text-bg-secondary mx-1 py-1_5 ">#상처</button>
						</div>
					</div>
					<div class="row py-1 py-lg-1 py-xl-1 g-5 g-md-5 mx-0">
						<!-- Package item -->
						<div class="col-sm-1 col-md-3 col-lg-3 col-xl-3">
							<!-- Card START -->
							<div class="medicine-card medicine-card-img-scale bg-transparent">
								<div class="medicine-card-img-scale-wrapper shadow p-3 mb-4 bg-white rounded">
									<!-- Card Image -->
									<img src="${path}/resources/img/landing/medicine_1.png" class="medicine-card-img" alt="">
									<!-- Overlay -->
									<div class="card-img-overlay d-flex flex-column z-index-1 p-4 toPage"
										onclick="location.href='#'">
										<!-- Card overlay top -->
										<div class="d-flex justify-content-between position-relative">
											<span class="badge text-bg-dark py-2 fs-5">진통</span>
											<!-- <img src="${pageContext.request.contextPath}/resources/img/landing/bookmark.png" class="bookmark" style="max-width: 50px;" alt=""> -->
											<div class="heartBookmark">
												<i class="ai-heart fs-xl fc-gray500"></i>
											</div>
										</div>

									</div>
								</div>
							</div>
							<!-- Card END -->
						</div>

						<!-- Package item -->
						<div class="col-sm-1 col-md-3 col-lg-3 col-xl-3">
							<!-- Card START -->
							<div class="medicine-card medicine-card-img-scale bg-transparent">
								<div class="medicine-card-img-scale-wrapper shadow p-3 mb-4 bg-white rounded">
									<!-- Card Image -->
									<img src="${path}/resources/img/landing/medicine_2.png" class="medicine-card-img rounded-2">
									<!-- Overlay -->
									<div class=" card-img-overlay d-flex flex-column z-index-1 p-4 toPage"
										onclick="location.href='#'">
										<!-- Card overlay top -->
										<div class="d-flex justify-content-between position-relative">
											<span class="badge text-bg-dark py-2 fs-5">진통</span>
											<div class="heartBookmark">
												<i class="ai-heart fs-xl fc-gray500"></i>
											</div>
										</div>
										<div class="w-100 mt-auto"></div>
									</div>
								</div>
							</div>
							<!-- Card END -->
						</div>

						<!-- Package item -->
						<div class="col-sm-1 col-md-3 col-lg-3 col-xl-3">
							<div class="medicine-card medicine-card-img-scale bg-transparent">
								<div class="medicine-card-img-scale-wrapper shadow p-3 mb-4 bg-white rounded">
									<!-- Card Image -->
									<img src="${path}/resources/img/landing/medicine_3.png" class="medicine-card-img rounded-2">
									<!-- Overlay -->
									<div class="card-img-overlay d-flex flex-column z-index-1 p-4 toPage"
										onclick="location.href='#'">
										<!-- Card overlay top -->
										<div class="d-flex justify-content-between position-relative" for="#toDrug2">
											<span class="badge text-bg-dark py-2 fs-5">진통</span>
											<div class="heartBookmark">
												<i class="ai-heart fs-xl fc-gray500"></i>
											</div>
										</div>
										<!-- Card overlay bottom -->
										<div class="w-100 mt-auto"></div>
									</div>
								</div>

							</div>
						</div>

						<!-- Package item -->
						<div class="col-sm-1 col-md-3 col-lg-3 col-xl-3">
							<div class="medicine-card medicine-card-img-scale bg-transparent">
								<div class=" shadow p-3 mb-4 bg-white rounded">
									<!-- Card Image -->
									<img src="${path}/resources/img/landing/medicine_4.png" class="" alt="">
									<!-- Overlay -->
									<div class="card-img-overlay d-flex flex-column z-index-1 p-4 toPage"
										style="height: 14rem;" onclick="location.href='#'">
										<!-- Card overlay top -->
										<div class="d-flex justify-content-between position-relative">
											<span class="badge text-bg-dark py-2 fs-5">진통</span>
											<div class="heartBookmark">
												<i class="ai-heart fs-xl fc-gray500"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Row END -->
				</div>
			</section>

			<!-- 병원/약국 찾기-->
			<section class="overflow-hidden">
				<div class="container pt-4 pb-0">
					<div class="row ms-1">
						<h2 class="pt-3 pt-lg-0 pb-1">병원/약국 찾기</h2>
					</div>
					<div class="row pt-3 pb-0 g-4 g-md-5 mx-0 px-4">
						<div class="find-card col-6 col-sm-4 col-lg-2 col-xl-2">
							<div class="bg-transparent text-center">
								<img src="${path}/resources/img/landing/약 검색하기.png" class="rounded-circle toPage"
									onclick="location.href='${path}/drug/search'">
								<div class="card-body p-0 pt-3">
									<h4 class="h4">
										<a href="${path}/drug/search">약 검색하기</a>
									</h4>
								</div>
							</div>
						</div>
						<div class="find-card col-6 col-sm-4 col-lg-2 col-xl-2">
							<div class="bg-transparent text-center ">
								<img src="${path}/resources/img/landing/근처 약국 찾기.png" class="rounded-circle toPage"
									onclick="location.href='${path}/pharm/search'">
								<div class="card-body p-0 pt-3">
									<h4 class="h4">
										<a href="${path}/pharm/search">근처 약국 찾기</a>
									</h4>
								</div>
							</div>
						</div>

						<div class="find-card col-6 col-sm-4 col-lg-2 col-xl-2">
							<div class="bg-transparent text-center">

								<img src="${path}/resources/img/landing/상비의약품 판매점.png" class="rounded-circle toPage"
									onclick="location.href='${path}/aidkit_k/asearch'">

								<div class="card-body p-0 pt-3">
									<h4 class="h4">
										<a href="${path}/aidkit_k/asearch">상비의약품 판매</a>
									</h4>
								</div>
							</div>
						</div>

						<div class="find-card col-6 col-sm-4 col-lg-2 col-xl-2">
							<div class="bg-transparent text-center">

								<img src="${path}/resources/img/landing/건강검진 기관.png" class="rounded-circle toPage"
									onclick="location.href='${path}/hmc/search'">
								<div class="card-body p-0 pt-3">
									<h4 class="h4">
										<a href="${path}/hmc/search">건강검진 기관</a>
									</h4>
								</div>
							</div>
						</div>

						<div class="find-card col-6 col-sm-4 col-lg-2 col-xl-2">
							<div class="bg-transparent text-center">
								<img src="${pageContext.request.contextPath}/resources/img/landing/동물병원 찾기.png" class="rounded-circle toPage"
									onclick="location.href='#'">
								<div class="card-body p-0 pt-3">
									<h4 class="h4">
										<a href="AnimalSearch.html">동물병원 찾기</a>
									</h4>
								</div>
							</div>
						</div>
						<div class="find-card col-6 col-sm-4 col-lg-2 col-xl-2">
							<div class="bg-transparent text-center">
								<img src="${path}/resources/img/landing/동물약국 찾기.png" class="rounded-circletoPage"
									onclick="location.href='#'">
								<div class="card-body p-0 pt-3">
									<h4 class="h4">
										<a href="#">동물약국 찾기</a>
									</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
		<!-- 건강기능식품-->
		<section class="position-relative">
			<div class="supplement position-absolute top-0 start-0 w-100">
				<div class="binded-item position-absolute top-0 start-0 w-100 bg-size-cover bg-position-center active"
					id="bg-1" style="background: url(${path}/resources/img/landing/supplement/banner.jpg);">
				</div>
				<div class="binded-item position-absolute top-0 start-0 w-100 bg-size-cover bg-position-center"
					id="bg-2" style="background-image: url(${path}/resources/img/landing/supplement/banner2.jpg);">
				</div>
				<div class="binded-item position-absolute top-0 start-0 w-100 bg-size-cover bg-position-center"
					id="bg-3" style="background-image: url(${path}/resources/img/landing/supplement/supplement-banner.png);">
				</div>
			</div>
			<div class="container py-2 py-sm-4 py-lg-5 my-md-3 my-lg-0 my-xl-3 my-xxl-2">
				<div class="row align-items-center my-xxl-2">
					<div class="col-md-6 position-relative zindex-2 mb-5 mb-md-0">
						<div style="max-width: 580px;">
							<!-- Swiper slider-->
							<div class="swiper" data-swiper-options="{
            &quot;spaceBetween&quot;: 40,
            &quot;loop&quot;: true,
            &quot;bindedContent&quot;: true,
            &quot;controlledSlider&quot;: &quot;#cards&quot;,
            &quot;navigation&quot;: {
              &quot;prevEl&quot;: &quot;#prev-collection&quot;,
              &quot;nextEl&quot;: &quot;#next-collection&quot;
            }
          }">
								<div class="swiper-wrapper">
									<div class="swiper-slide" data-swiper-binded="#bg-1">
										<h2 class="display-5 text-white text-uppercase pb-2 mb-md-4 mb-xl-5">
											오쏘몰(Orthomol)<br>한병으로 챙기는 오늘의 컨디션
										</h2>
									</div>
									<div class="swiper-slide" data-swiper-binded="#bg-2">
										<h2 class="display-5 text-white text-uppercase pb-2 mb-md-4 mb-xl-5">
											아임비타<br>당신이 찾던 진정한 비타민
										</h2>
									</div>
									<div class="swiper-slide" data-swiper-binded="#bg-3">
										<h2 class="display-5 text-primary text-uppercase pb-2 mb-md-4 mb-xl-5">
											여기<br>이미지랑 수정필요함
										</h2>
									</div>
								</div>
							</div>
							<!-- Swiper controls (Prev/next buttons)-->
							<div class="d-flex pb-2 mb-3 mb-md-4 mb-xl-5">
								<button class="btn btn-icon  btn-outline-light rounded-circle me-3" type="button"
									id="prev-collection">
									<i class="ai-arrow-left"></i>
								</button>
								<button class="btn btn-icon  btn-outline-light rounded-circle" type="button"
									id="next-collection">
									<i class="ai-arrow-right"></i>
								</button>
							</div>
							<!-- Swiper slider-->
							<div class="swiper" id="cards" data-swiper-options="{
                &quot;allowTouchMove&quot;: false,
                &quot;spaceBetween&quot;: 40,
                &quot;loop&quot;: true
              }">

							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

    <div class="px-5 mx-xxl-5">
      <!-- 기사 & 커뮤니티-->
      <section class="overflow-hidden">
        <div class="container">
          <div class="row ms-1">
            <div class="post col-lg-5 order-lg-1">
              <h2 class="pt-3 pt-lg-0 pb-1">주목할 기사<a href="${path}/news/list" style="font-size : 15px;  margin-left : 303px;">+더보기</a></h2>
              <div class="my-1 my-lg-0">
                <article class="position-relative d-flex align-items-center mb-4"><img class="rounded"
                    src="${path}/resources/img/hff/HFF-02.png" width="92" alt="Post image">
                  <div class="ps-3">
                    <h3 class="mb-2"><a href="https://health.chosun.com/site/data/html_dir/2016/11/11/2016111100966.html" class="fc-black">피우는 비타민,정말 비타민 섭취 효과 있을까?</a></h3><span
                      class="fs-5 text-muted">2023년 06월 01일</span>
                  </div>
                </article>
                <article class="position-relative d-flex align-items-center mb-4"><img class="rounded"
                    src="${path}/resources/img/hff/HFF-03.png" width="92" alt="Post image">
                  <div class="ps-3">
                    <h3 class="mb-2"><a href="http://www.dailydgnews.com/mobile/article.html?no=150049" class="fc-black">자궁경부암 주사 남자도 맞아야 하나요?</a></h3><span
                      class="fs-5 text-muted">2023년 03월 17일</span>
                  </div>
                </article>
                <article class="position-relative d-flex align-items-center"><img class="rounded"
                    src="${path}/resources/img/hff/HFF-01.png" width="92" alt="Post image">
                  <div class="ps-3">
                    <h3 class="mb-2"><a href="https://jhealthmedia.joins.com/article/article_view.asp?pno=20440" class="fc-black">진통제 자주 먹으면 내성 생길까</a></h3><span
                      class="fs-5 text-muted">2022년 09월 17일</span>
                  </div>
                </article>
              </div>
            </div>
            <div class="vertical-line col-lg-1 col-md-auto order-lg-2 pt-xl-5">
              <div class="vl"></div>
            </div>
            <div class="article col-lg-6 order-lg-3">
              <h2 class="pt-3 pt-lg-0 pb-1">커뮤니티<a href="${path}/board/list" style="font-size : 15px;  margin-left : 432px;">+더보기</a></h2>
              <article class="my-1 my-lg-0 pb-4">
                <h3 class="pb-0 mt-2"><a href="#.html" class="fc-black">날이 더워지면서 차가운 물이나 음료수를 먹는데 치아가 너무 시립니다</a></h3>
                <div class="d-flex flex-wrap align-items-center mt-n2 mb-2"><a
                    class="nav-link text-muted fs-5 fw-normal p-0 mt-2 me-3" href="#">4<i
                      class="ai-share fs-lg ms-1"></i></a><a
                    class="nav-link text-muted fs-5 fw-normal d-flex align-items-end p-0 mt-2" href="#">6<i
                      class="ai-message fs-lg ms-1"></i></a>
                  <span class="fs-xs opacity-20 mt-2 mx-3">|</span><span class="fs-5 text-muted mt-2 pb-0">9시간 전</span>
                </div>
              </article>
              <article class="my-1 my-lg-0 mt-2 pb-4">
                <h3 class="pb-0 mt-2"><a href="#.html" class="fc-black">코로나진단키드 한달이상 지난것도 상관없을까요?</a></h3>
                <div class="d-flex flex-wrap align-items-center mt-n2 mb-2"><a
                    class="nav-link text-muted fs-5 fw-normal p-0 mt-2 me-3" href="#">7<i
                      class="ai-share fs-lg ms-1"></i></a><a
                    class="nav-link text-muted fs-5 fw-normal d-flex align-items-end p-0 mt-2" href="#">12<i
                      class="ai-message fs-lg ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span
                    class="fs-5 text-muted mt-2 pb-0">2일 전</span></div>
              </article>
              <article class="my-1 my-lg-0 mt-2 pb-4">
                <h3 class="pb-0 mt-2"><a href="#.html" class="fc-black">건강검진 받는데 심전도관련 질문드립니다.</a>
                </h3>
                <div class="d-flex flex-wrap align-items-center mt-n2 mb-2"><a
                    class="nav-link text-muted fs-5 fw-normal p-0 mt-2 me-3" href="#">5<i
                      class="ai-share fs-lg ms-1"></i></a><a
                    class="nav-link text-muted fs-5 fw-normal d-flex align-items-end p-0 mt-2" href="#">11<i
                      class="ai-message fs-lg ms-1"></i></a><span class="fs-xs opacity-20 mt-2 mx-3">|</span><span
                    class="fs-5 text-muted mt-2 pb-0">3일 전</span></div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <!-- 간단하게 매일매일-->
      <section class="overflow-hidden pb-3 mb-5">
        <div class="container pt-2 pt-sm-4 pb-sm-2 pb-md-4 py-xl-4">
          <div class="row ms-1">
            <h2 class="pt-3 pt-lg-0 pb-1">간단하게 매일매일</h2>
          </div>
          <div class="row py-3 py-lg-4 g-4 mx-0">
            <div class="overflow-hidden col-6 col-sm-2 col-lg-3 col-xl-3">
              <div class="position-relative mb-3">
                <span class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-20"></span>
                <div
                  class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100 zindex-2">
                  <a href="https://www.youtube.com/watch?v=isKqR5D4Q6Q"
                    class="btn btn-icon btn-primary rounded-circle stretched-link" data-bs-toggle="video">
                    <i class="ai-play-filled"></i>
                  </a>
                </div>
                <img
                  src="https://i.ytimg.com/vi/isKqR5D4Q6Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB5BmcIW-kSg6fUa-H0IqjebwtUDQ"
                  class="card-img-top" alt="Card image">
              </div>
              <div class="card-body">
                <h3 class="mb-0 ">영양제 다 버리고 '이걸' 드시면 건강 더 좋아집니다 (조승우 한약사. 통합본)</h3>
                <p class="card-text fs-5">조회수 111만회 · 3주 전</p>
              </div>
            </div>
            <div class="overflow-hidden col-6 col-sm-2 col-lg-3 col-xl-3">
              <div class="position-relative mb-3">
                <span class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-20"></span>
                <div
                  class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100 zindex-2">
                  <a href="https://www.youtube.com/watch?v=1_k89Hwtego"
                    class="btn btn-icon btn-primary rounded-circle stretched-link" data-bs-toggle="video">
                    <i class="ai-play-filled"></i>
                  </a>
                </div>
                <img
                  src="https://i.ytimg.com/vi/1_k89Hwtego/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhkGr990w0zz8qLLEYD_JehHB91g"
                  class="card-img-top" alt="Card image">
              </div>
              <div class="card-body">
                <h3 class="mb-0">사과 이렇게 먹으면 독을 먹는 겁니다!! 특히 이런 분들은 특히 조심하세요!!</h3>
                <p class="card-text fs-5">조회수 59만회 · 3개월 전</p>
              </div>
            </div>
            <div class="overflow-hidden col-6 col-sm-2 col-lg-3 col-xl-3">
              <div class="position-relative mb-3">
                <span class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-20"></span>
                <div
                  class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100 zindex-2">
                  <a href="https://www.youtube.com/watch?v=6moz0JNvU1Y"
                    class="btn btn-icon btn-primary rounded-circle stretched-link" data-bs-toggle="video">
                    <i class="ai-play-filled"></i>
                  </a>
                </div>
                <img
                  src="https://i.ytimg.com/vi/6moz0JNvU1Y/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDnkYmfyghqk2oh4ASiiCdXWraKlQ"
                  class="card-img-top" alt="Card image">
              </div>
              <div class="card-body">
                <h3 class="mb-0">미국 상위 1% 부자들이 늙지 않기 위해 하는 일 | 건강 습관, 노화 방지</h3>
                <p class="card-text fs-5">조회수 93만회 · 1개월 전</p>
              </div>
            </div>
            <div class="overflow-hidden col-6 col-sm-2 col-lg-3 col-xl-3">
              <div class="position-relative mb-3">
                <span class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-20"></span>
                <div
                  class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 w-100 h-100 zindex-2">
                  <a href="https://www.youtube.com/watch?v=ocoJnbADSoY"
                    class="btn btn-icon btn-primary rounded-circle stretched-link" data-bs-toggle="video">
                    <i class="ai-play-filled"></i>
                  </a>
                </div>
                <img
                  src="https://i.ytimg.com/vi/ocoJnbADSoY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAgML4M8mw-7HpVXphIlDaS6M3BVA"
                  class="card-img-top" alt="Card image">
              </div>
              <div class="card-body">
                <h3 class="mb-0">[건강 알고리즘]90%가 몸 망치는 러닝…딱 2가지만 체크!</h3>
                <p class="card-text fs-5">조회수 256만회 · 1년 전</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


	<script src="${path}/resources/js/custom/landing.js"></script>
	<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
	
	