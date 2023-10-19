<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>
	
		
		</main>
		<!-- 푸터-->
		<footer class="footer pt-lg-3 pt-ps-5 pb-1 bg-success fs-5">
			<div class="container pt-3 mt-md-2 mt-lg-3">
				<div class="row gy-md-5 gy-4 mb-md-5 mb-4 pb-lg-2">
					<div class="col-lg-3">
						<a class="navbar-brand d-inline-flex align-items-center mb-lg-4 mb-3 ps-4" href="index.html"> <img
								src="https://user-images.githubusercontent.com/132437120/235857660-32ff21e8-52c9-42ab-bd0f-7146c4c7aa43.png">
						</a>
						<p class="mb-4 pb-lg-1 fs-xs text-muted ps-4" style="max-width: 306px;">&copy; MultiCampusSemi03</p>
						<div class="mt-n3 ms-n3 ps-4">
							<a class="btn btn-primary btn-icon  btn-slack rounded-circle mt-3 ms-3" href="#"><i
									class="ai-slack"></i></a><a
								class="btn btn-primary btn-icon  btn-discord rounded-circle mt-3 ms-3" href="#"><i
									class="ai-discord"></i></a><a
								class="btn btn-primary btn-icon  btn-github rounded-circle mt-3 ms-3" href="#"><i
									class="ai-github"></i></a>
						</div>
					</div>
					<div class="col-xl-8 offset-xl-1 col-lg-9">
						<div class="row row-cols-sm-4 row-cols-1">
							<div class="col">
								<ul class="nav flex-column mb-0">
									<li class="nav-item mb-2"><a class="nav-link p-0" href="#">약
											검색</a></li>
									<li class="nav-item mb-2"><a class="nav-link p-0 fw-normal" href="#">이름/모양으로 검색</a></li>
									<li class="nav-item mb-2"><a class="nav-link p-0 fw-normal" href="#">자주 찾는 증상</a></li>
								</ul>
							</div>
							<div class="col">
								<ul class="nav flex-column mb-0">
									<li class="nav-item mb-2"><a class="nav-link p-0" href="#">위치
											찾기</a></li>
									<li class="nav-item mb-2"><a class="nav-link p-0 fw-normal" href="${path}/pharm/search">근처 약국</a></li>
									<li class="nav-item mb-2"><a class="nav-link p-0 fw-normal" href="${path}/aidkit_k/asearch">안전상비의약품 판매점 </a>
									</li>
								</ul>
							</div>
							<div class="col">
								<ul class="nav flex-column mb-0">
									<li class="nav-item mb-2"><a class="nav-link p-0" href="#">건강기능식품</a></li>
								</ul>
							</div>
							<div class="col">
								<ul class="nav flex-column mb-0">
									<li class="nav-item mb-2"><a class="nav-link p-0" href="#">소식</a></li>
									<li class="nav-item mb-2"><a class="nav-link p-0 fw-normal" href="${path}/news/list">뉴스</a></li>
									<li class="nav-item mb-2"><a class="nav-link p-0 fw-normal" href="#">커뮤니티</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	
		  <!-- 위로 올라가기 버튼--><a class="btn-scroll-top" href="#top" data-scroll>
	  <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
	    <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10">
	    </circle>
	  </svg><i class="ai-arrow-up"></i></a>
	
	  <!-- Vendor scripts: js libraries and plugins-->
	  <script src="${path}/resources/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
	  <script src="${path}/resources/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js"></script>
	  <script src="${path}/resources/vendor/parallax-js/dist/parallax.min.js"></script>
	  <script src="${path}/resources/vendor/lightgallery/lightgallery.min.js"></script>
	  <script src="${path}/resources/vendor/lightgallery/plugins/video/lg-video.min.js"></script>
	  <script src="${path}/resources/vendor/swiper/swiper-bundle.min.js"></script>
	  <script src="${path}/resources/vendor/aos/dist/aos.js"></script>
	  
	
	  <!-- Main theme script-->
	  <script src="${path}/resources/js/theme.min.js"></script>
	
	 <!--  CUSTOM -->
 	<script type="text/javascript" src="${path}/resources/js/custom/navActive.js"></script>
  
</body>
</html>