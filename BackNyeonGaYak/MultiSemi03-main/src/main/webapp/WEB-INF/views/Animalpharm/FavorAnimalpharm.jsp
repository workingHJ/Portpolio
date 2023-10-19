<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />

<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="즐겨찾는 동물약국" name="title" />
</jsp:include>

<jsp:include page="/WEB-INF/views/member/myPageSideBar.jsp" />

<div class="col-lg-9 pt-4 pb-2 pb-sm-4">
	<div class="d-flex align-items-center mb-4">
		<h1 class="h2 mb-0">
			자주 찾는 동물약국<span class="fs-base fw-normal text-muted">
				(${fn:length(list)} items)</span>
		</h1>
	</div>

         <div class="vstack gap-4">
                <c:forEach var="item" items="${list}">
                <div class="card shadow p-2">
                    <div class="row g-0">
                        
                        <div class="col-md-4 mt-2 mb-2 ps-2 position-relative">
                            <!-- Image item -->
                            <div class="container-lg">
                                <div class="card rounded-2 overflow-hidden">
                                    <img src="https://search.pstatic.net/common/?autoRotate=true&quality=100&type=f640_380&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200610_24%2F1591784543916m85h3_JPEG%2Fp8ozD7jd0cSa3W-5QLoD8Zb0.jpeg.jpg"
                                        alt="Card image">
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-8">
                            <div class="card-body py-md-2 d-flex flex-column h-100 position-relative">
                               
		                        <button
		                            class="btn-icon btn-sm order-0 position-absolute end-0 pe-4 pt-4 border-0 bg-transparent"
		                            type="button">
		                            
		                            <i class="ai-heart-filled fs-xl" style="color: var(--ar-warning)"
		                                onclick="addFavor(this, ${item.aPNo}, ${loginMember.Pno})"></i>
		                        </button>
                                
                                <h5 class="card-title mt-1 mb-2 pb-1"> ${item.aPName} </h5>
                                
                                <div class="mb-1">
                                    <i class="ai-map-pin"></i>
                                    <span name="address" class="ms-1 fs-sm"> ${item.apAddress} </span>
                                </div>
                                <div class="mb-1 ">
                                    <i class="ai-phone"></i>
                                    <span name="phone" class="ms-1 fs-sm"> ${item.aPTel} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </c:forEach>


<jsp:include page="/WEB-INF/views/common/footer.jsp" />


