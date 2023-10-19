<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />

<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="즐겨찾는 약" name="title" />
</jsp:include>

<jsp:include page="/WEB-INF/views/member/myPageSideBar.jsp" />
<!-- Page content-->
<div class="col-lg-9 pt-4 pb-2 pb-sm-4">
	<div class="d-flex align-items-center mb-4">
		<h1 class="h2 mb-0">
			자주 먹는 약<span class="fs-base fw-normal text-muted">
				(${fn:length(list)} items)</span>
		</h1>
	</div>
	<c:choose>
		<c:when test="${list == null }">
			<div class="row text-center"> 
				<h3 class="my-5"> 즐겨찾기한 약이 없습니다.</h3>
			</div>
		</c:when>
		<c:otherwise>
				<div class="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4">
		<div class="card-body pb-4">
			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
				<c:forEach var="item" items="${list }">
					<!-- Item-->
					<div class="col pb-2 pb-sm-3">
						<div
							class="card-hover position-relative bg-myPage rounded-1 p-3 mb-4">
							<div class="swiper swiper-nav-onhover"
								data-swiper-options="{&quot;loop&quot;: true, &quot;navigation&quot;: {&quot;prevEl&quot;: &quot;.btn-prev&quot;, &quot;nextEl&quot;: &quot;.btn-next&quot;}}">
								<a class="swiper-wrapper" href="shop-single.html">
									<div class="swiper-slide p-2 p-xl-4">
		                            <c:choose>
		                                <c:when test="${item.itemCoverImg } != null">
		                                    <img src="${item.itemCoverImg }" class="mediImage mt-2 toPage"
		                                        alt="${item.itemName }"
		                                        onclick="location.href='${path}/drug/detail?item.itemNo=${item.item.itemNo}'" />
		                                </c:when>
		                                <c:otherwise>
		                                    <img src="${item.itemImage }" class="mediImage mt-2 toPage" alt="${item.itemName }"
		                                        onclick="location.href='${path}/drug/detail?item.itemNo=${item.itemNo}'" />
		                                </c:otherwise>
		                            </c:choose>
									</div>
								</a>
							</div>
						</div>
						<div class="d-flex mb-1">
							<h3 class="h6 mb-0">
								<a href="shop-single.html"> ${item.itemName }</a>
							</h3>
						</div>
						<div class="d-flex align-items-center">
							<span class="me-2">${item.entpName }</span>
								<i class="ai-heart-filled fs-xl" style="color: var(--ar-warning)" onclick="addFavor(this, ${item.itemNo}, ${loginMember.mno})"></i>
						</div>
					</div>
				</c:forEach>
		</c:otherwise>
	</c:choose>
				<script>
		            function addFavor(favorDrug, itemNo, mno) {
		                var $favorDrug = $(favorDrug);
		                $.ajax({
		                    type: "POST",
		                    url: "/semi03/drug/addFavor",
		                    data: JSON.stringify({ itemNo: itemNo, mno: mno }),
		                    dataType: "json",
		                    contentType: "application/json;charset=UTF-8",
		                    success: function (response) {
		                        alert(response.message);
		                        if (response.message === "즐겨찾기에서 삭제합니다.") {
		                            $favorDrug.attr("class", "ai-heart fs-xl");
		                            $favorDrug.css("color", "var(--ar-gray-500)");
		                        }
		                    },
		                    error: function (xhr, status, error) {
		                        console.log("에러 발생:", error);
		                    }
		                });
		            }
				</script>
				

				<jsp:include page="/WEB-INF/views/common/footer.jsp" />