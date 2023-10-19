function setActiveClass() {
  // 현재 페이지 URL 가져오기
  var currentURL = window.location.href;

  // li 요소들을 선택
  var liElements = document.querySelectorAll(".nav-item");

  // 각 li 요소에 대해 반복
  liElements.forEach(function (li) {
    // 링크 요소 선택
    var link = li.querySelector(".nav-link");
	console.log(link);

    // 링크의 href 속성 값과 현재 페이지 URL 비교
    if (link.href === currentURL) {
      // 현재 페이지인 경우 active 클래스 추가
      li.classList.add("active");
      link.classList.add("active"); // .nav-link에도 active 클래스 추가
    }
  });

  // .nav-link 요소들을 선택
  var navLinkElements = document.querySelectorAll(".nav-link");

  // 각 .nav-link 요소에 대해 반복
  navLinkElements.forEach(function (navLink) {
    // 링크의 href 속성 값과 현재 페이지 URL 비교
    if (navLink.href === currentURL) {
      // 현재 페이지인 경우 active 클래스 추가
      navLink.classList.add("active");
    }
  });
}

// 함수 실행
setActiveClass();
