<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> 


<c:set var="path" value="${pageContext.request.contextPath}" />


<jsp:include page="/WEB-INF/views/common/header.jsp">
    <jsp:param value="${drug.itemName } " name="title" />
</jsp:include>

<div class="container fc-gray500 mt-4">
    <i class="ai-arrow-left fs-xl"></i>
    <span onclick="goBack()" class="toPage mb-3"> 이전 페이지로 돌아가기 </span>
</div>

<script>
    function goBack() {
        window.history.back();
    }
</script>

<section class="container d-lg-grid ps-5 py-5 my-4">
    <div class="searchHeader text-center pb-3">
        <div class="fs-6 fc-primary">
            <span>${drug.entpName }</span>
            <h2> ${drug.itemName }</h2>
        </div>
    </div>
    <div class="row pb-4 mediHead">
        <div class="col-xl-4 d-inline-block pt-3 ps-5">
            <div>
                <img src="${drug.itemImage }" class="mediImage mt-2 toPage" alt="${drug.itemName }"/>
            </div>
        </div>

        <div class="col-xl-c pe-0 ms-3 my-3">
            <div class="pb-3 symptoms">
                <c:forEach var="item" items="${drug.efcyQesitmItems}">
                    <span class="badge bg-faded-primary text-primary fs-sm px-3 ms-2 mb-2"> ${item}</span>
                </c:forEach>
            </div>
            <div class="ms-3 pt-3 mt-2">
                <h4 class="pb-0 fc-primary"> 복용법 </h4>
                <div class="line-height-180 fs-6">
                    ${drug.useMethodQesitm }
                </div>
            </div>
        </div>
    </div>
    <div class="row pt-5 px-5">
        <div class="container">
            <h4 class="mb-0">
                주의사항
            </h4>
            <div class="line-height-180 fs-6">
                ${drug.atpnQesitm }
            </div>
        </div>
    </div>
    <div class="row pt-5 px-5">
        <div class="container">
            <h4 class="mb-0">
                상호작용
            </h4>
            <div class="line-height-180 fs-6">
                ${drug.intrcQesitm }
            </div>
        </div>
    </div>
    <div class="row pt-5 px-5">
        <div class="container">
            <h4 class="mb-0">
                보관법
            </h4>
            <div class="line-height-180 fs-6">
                ${depositMethodQesitm }
            </div>
        </div>
    </div>
    <div class="row py-5 px-5">
        <div class="container">
            <h4 class="mb-0"> 부작용 </h4>
            <div class="line-height-180 fs-6">
                ${drug.seQesitm }
            </div>
        </div>
    </div>
</section>



<jsp:include page="/WEB-INF/views/common/footer.jsp" />