<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>

<section class="container mt-5 pt-5">
    <div class="row mx-0">
        <!-- 왼쪽 사이드바 시작 -->
        <aside class="col-xl-2 col-xxl-2_5">
            <div class="offcanvas-lg ps-2 pe-4">
                <!-- Title -->
                <h4 class="pt-1 pt-lg-0 mt-lg-n2 ps-lg-2" style="border-bottom: solid #212121 2px"
                onclick="location.href='${path}/drug/search'"> 약 검색하기 </h4>
                <!-- 목록 -->
                <ul class="nav flex-column mb-lg-5 mb-4">
                    <li class="nav-item pb-c mb-1 ps-3 pt-0">
                    	<a class="nav-link d-flex p-0"
                    	href="${path}/drug/search"> 이름 / 모양으로 검색</a>
                    </li>
                    <li class="pb-2 ps-3 pt-2 border-bottom-0 fw-bold"> 자주 찾는 증상 </li>
                    <li class="nav-item pb-2 ps-3 pt-1 mt-nav border-bottom-0">
                        <a class="nav-link d-flex p-0 fw-medium" href="javascript:void(0)" onclick="addParamAndSubmit('두통')">두통</a>
                    </li>
                    <li class="nav-item pb-2 ps-3 pt-1 mt-nav border-bottom-0">
                        <a class="nav-link d-flex p-0 fw-medium" href="javascript:void(0)" onclick="addParamAndSubmit('소화불량')">소화불량</a>
                    </li>
                    <li class="nav-item pb-2 ps-3 pt-1 mt-nav border-bottom-0">
                        <a class="nav-link d-flex p-0 fw-medium" href="javascript:void(0)" onclick="addParamAndSubmit('감기로 인한 발열 및 동통(통증)')"> 감기 몸살</a>
                    </li>
                </ul>
            </div>
        </aside>
        
        
        <!-- 왼쪽 사이드바 끝 -->
        
		<script>
		function addParamAndSubmit(efcyQesitm) {
			  var paramMap = {};
			  paramMap["efcyQesitm"] = efcyQesitm;

			  var form = document.createElement("form");
			  form.setAttribute("method", "GET");
			  form.setAttribute("action", "${path }/drug/symp");

			  for (var key in paramMap) {
			    if (paramMap.hasOwnProperty(key)) {
			      var input = document.createElement("input");
			      input.setAttribute("type", "hidden");
			      input.setAttribute("name", key);
			      input.setAttribute("value", paramMap[key]);
			      form.appendChild(input);
			    }
			  }

			  document.body.appendChild(form);
			  form.submit();
			}		
		</script>
