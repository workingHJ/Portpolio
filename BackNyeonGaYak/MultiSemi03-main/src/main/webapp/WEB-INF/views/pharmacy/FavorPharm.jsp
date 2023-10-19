<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />

<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="즐겨찾는 약국" name="title" />
</jsp:include>

<jsp:include page="/WEB-INF/views/member/myPageSideBar.jsp" />

<div class="col-lg-9 pt-4 pb-2 pb-sm-4">
	<div class="d-flex align-items-center mb-4">
		<h1 class="h2 mb-0">
			자주 찾는 약국<span class="fs-base fw-normal text-muted">
				(${fn:length(list)} items)</span>
		</h1>
	</div>
         <div class="vstack gap-4">
                <c:forEach var="item" items="${list}">
                <div class="card shadow p-2">
                    <div class="row g-0">
                        <!-- Card img -->
                        <div class="col-md-4 mt-2 mb-2 ps-2 position-relative">
                            <!-- Image item -->
                            <div class="container-lg">
                                <div class="card rounded-2 overflow-hidden" 
                                style="display: flex; justify-content: center; align-items: center; width:290px; height:210px;">
                                    <img src="${item.pharmImg}"
                                        alt="Card image">
                                </div>
                            </div>
                        </div>
                        <!-- Card body -->
                        <div class="col-md-8">
                            <div class="card-body px-5 py-2 mt-2 flex-column h-100 position-relative">
                                <!-- Bookmark icon -->
                                	<button class="btn-icon btn-sm order-0 position-absolute top-0 end-0 mt-2 me-3"
                                        type="button">
				                        <i class="ai-heart-filled fs-xl" style="color: var(--ar-warning)"
				                            onclick="addFavor(this, ${item.dutyNo}, ${loginMember.mno})"></i>
                                    </button>
                                <!-- Title -->
                                <h5 class="card-title mt-1 mb-2 pb-1"> ${item.dutyName} </h5>
                                <!-- Address -->
                                <div class="mb-2">
                                    <i class="ai-map-pin"></i>
                                    <span name="address" class="ms-1 fs-sm"> ${item.dutyAddr} </span>
                                </div>
                                <div class="mb-2">
                                    <i class="ai-phone"></i>
                                    <span name="phone" class="ms-1 fs-sm"> ${item.dutyTel1} </span>
                                </div>
                                <div class="mb-2">
                                    <i class="ai-time"></i>
                                    <span name="runtime" class="ms-1 fs-sm"> ${item.dutyTime1s}~${item.dutyTime1c} </span>
                                </div>
                                <div class="py-2" name="day">
                                    <c:if test="${not empty item.dutyTime1s}">
	                                    <span class="badge bg-faded-primary text-primary fs-sm me-1" name="mon">월</span>
                                    </c:if>
                               	     <c:if test="${empty item.dutyTime1s}">
                                    	<span class="badge bg-secondary fs-sm me-1" name="mon">월</span>
                                    </c:if>
                                    
                                    <c:if test="${not empty item.dutyTime2s}">
	                                    <span class="badge bg-faded-primary text-primary fs-sm me-1" name="tue">화</span>
                                    </c:if>
                               	     <c:if test="${empty item.dutyTime2s}">
                                    	<span class="badge bg-secondary fs-sm me-1" name="tue">화</span>
                                    </c:if>
                                    
                                    <c:if test="${not empty item.dutyTime3s}">
	                                    <span class="badge bg-faded-primary text-primary fs-sm me-1" name="wen">수</span>
                                    </c:if>
                               	     <c:if test="${empty item.dutyTime3s}">
                                    	<span class="badge bg-secondary fs-sm me-1" name="wen">수</span>
                                    </c:if>
                                    
                                    <c:if test="${not empty item.dutyTime4s}">
	                                    <span class="badge bg-faded-primary text-primary fs-sm me-1" name="thu">목</span>
                                    </c:if>
                               	     <c:if test="${empty item.dutyTime4s}">
                                    	<span class="badge bg-secondary fs-sm me-1" name="thu">목</span>
                                    </c:if>
                                    
                                    <c:if test="${not empty item.dutyTime5s}">
	                                    <span class="badge bg-faded-primary text-primary fs-sm me-1" name="fri">금</span>
                                    </c:if>
                               	     <c:if test="${empty item.dutyTime5s}">
                                    	<span class="badge bg-secondary fs-sm me-1" name="fri">금</span>
                                    </c:if>
                                    
                                    <c:if test="${not empty item.dutyTime6s}">
	                                    <span class="badge bg-faded-primary text-primary fs-sm me-1" name="sat">토</span>
                                    </c:if>
                               	     <c:if test="${empty item.dutyTime6s}">
                                    	<span class="badge bg-secondary fs-sm me-1" name="sat">토</span>
                                    </c:if>
                                    
                                    <c:if test="${not empty item.dutyTime7s}">
	                                    <span class="badge bg-faded-primary text-primary fs-sm me-1" name="sun">일</span>
                                    </c:if>
                               	     <c:if test="${empty item.dutyTime7s}">
                                    	<span class="badge bg-secondary fs-sm me-1" name="sun">일</span>
                                    </c:if>
                                    
                                    <c:if test="${not empty item.dutyTime8s}">
	                                    <span class="badge bg-faded-primary text-primary fs-sm me-1" name="hol">공휴일</span>
                                    </c:if>
                               	     <c:if test="${empty item.dutyTime8s}">
                                    	<span class="badge bg-secondary fs-sm me-1" name="hol">공휴일</span>
                                    </c:if>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
                </c:forEach>


	<script>
            function addFavor(favorPharmacy, dutyNo, mno) {
                var $favorPharmacy = $(favorPharmacy);
                $.ajax({
                    type: "POST",
                    url: "/semi03/pharm/addFavor",
                    data: JSON.stringify({ dutyNo: dutyNo, mno: mno }),
                    dataType: "json",
                    contentType: "application/json;charset=UTF-8",
                    success: function (response) {
                        alert(response.message);

                        if (response.message === "즐겨찾기에 추가되었습니다.") {
                            $favorPharmacy.attr("class", "ai-heart-filled fs-xl");
                            $favorPharmacy.css("color", "var(--ar-warning)");
                        }
                        if (response.message === "이미 즐겨찾기에 추가되어 있습니다. 삭제합니다.") {
                            $favorPharmacy.attr("class", "ai-heart fs-xl");
                            $favorPharmacy.css("color", "var(--ar-gray-500)");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log("에러 발생:", error);
                    }
                });
            }

        </script>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />


