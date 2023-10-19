<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error 페이지</title>
    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="${path}/resources/img/favicon_io/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${path}/resources/img/favicon_io/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="${path}/resources/img/favicon_io/favicon-32x32.png">
    <!-- Theme mode-->
    <script>
        let mode = window.localStorage.getItem('mode'),
            root = document.getElementsByTagName('html')[0];
        if (mode !== undefined && mode === 'dark') {
            root.classList.add('dark-mode');
        } else {
            root.classList.remove('dark-mode');
        }
    </script>
    
	<!--  JQuery  -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Main Theme Styles + Bootstrap-->
    <link rel="stylesheet" media="screen" href="${path}/resources/css/theme.min.css">
    <script src="${path}/resources/js/theme.min.js"></script>
    
    <!-- Vendor scripts: js libraries and plugins-->
	<script src="${path}/resources/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
	<script src="${path}/resources/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js"></script>
	<script src="${path}/resources/vendor/parallax-js/dist/parallax.min.js"></script>
	<script src="${path}/resources/vendor/swiper/swiper-bundle.min.js"></script>
    <link rel="stylesheet" media="screen" href="${path}/resources/vendor/simplebar/dist/simplebar.min.css" />
    <link rel="stylesheet" media="screen" href="${path}/resources/vendor/prismjs/themes/prism.css" />
    <link rel="stylesheet" media="screen" href="${path}/resources/vendor/prismjs/plugins/toolbar/prism-toolbar.css" />
    <link rel="stylesheet" media="screen" href="${path}/resources/vendor/prismjs/plugins/line-numbers/prism-line-numbers.css" />
    
	<!-- Main theme script-->
	<script src="${path}/resources/js/theme.min.js"></script> 
    <script src="${path}/resources/js/theme.js"></script>
    <!--  Modal -->
    <script src="${path}/resources/vendor/bootstrap/js/src/modal.js"></script>

	<!-- 위로 올라가기 버튼-->
	<a class="btn-scroll-top" href="#top" data-scroll> <svg
			viewBox="0 0 40 40" fill="currentColor"
			xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19" fill="none"
				stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10">
            </circle>
        </svg><i class="ai-arrow-up"></i></a>
        
	</head>

  <!-- Body-->
  <body>
    <!-- Page loading spinner-->
    <div class="page-loading active">
      <div class="page-loading-inner">
        <div class="page-spinner"></div><span>Loading...</span>
      </div>
    </div>
    <!-- Page wrapper-->
    <main class="page-wrapper">
      <!-- Page content-->
      <div class="container d-flex flex-column justify-content-center min-vh-100 py-5">
        <lottie-player class="d-dark-mode-none mt-n5" src="${path}/resources/json/animation-404-light.json" background="transparent" speed="1" loop autoplay></lottie-player>
        <lottie-player class="d-none d-dark-mode-block mt-n5" src="${path}/resources/json/animation-404-dark.json" background="transparent" speed="1" loop autoplay></lottie-player>
        <div class="text-center pt-4 mt-lg-2">
          <h1 class="display-5">Page not found</h1>
          <p class="fs-lg pb-2 pb-md-0 mb-4 mb-md-5">The page you are looking for was moved, removed or might never existed.</p><a class="btn btn-lg btn-primary" href=${path}>Go to homepage</a>
        </div>
      </div>
    </main>
    <!-- Back to top button--><a class="btn-scroll-top" href="#top" data-scroll>
      <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></circle>
      </svg><i class="ai-arrow-up"></i></a>
    <!-- Vendor scripts: js libraries and plugins-->
    <script src="${path}/resources/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="${path}/resources/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js"></script>
    <script src="${path}/resources/vendor/@lottiefiles/lottie-player/dist/lottie-player.js"></script>
    <!-- Main theme script-->
    <script src="${path}/resources/js/theme.min.js"></script>
  </body>
</html>