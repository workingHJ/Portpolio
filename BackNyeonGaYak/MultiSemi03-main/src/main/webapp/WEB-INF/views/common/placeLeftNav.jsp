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
                    <h4 class="pt-1 pt-lg-0 mt-lg-n2 ps-lg-2" style="border-bottom: solid #212121 2px"> 위치 찾기 </h4>
                    <ul class="nav flex-column mb-lg-5 mb-4">
                        <li class="pb-c mb-1 ps-3"><a class="nav-link d-flex p-0" href="${path}/pharm/search">근처 약국</a></li>
                        <li class="pb-c mb-1 ps-3 pt-2 mt-nav"><a class="nav-link d-flex p-0" href="${path}/aidkit_k/asearch">안전상비의약품 판매점</a>
                        </li>
                        <li class="pb-c mb-1 ps-3 pt-2 mt-nav"><a class="nav-link d-flex p-0 " href="${path}/hmc/search">건강검진 기관</a></li>
                        <li class="pb-c mb-1 ps-3 pt-2 mt-nav"><a class="nav-link d-flex p-0" href="${path}/Animalhospital/AnimalhospitalSearch">동물 병원</a>
                        </li>
                        <li class="pb-c mb-1 ps-3 pt-2 mt-nav"><a class="nav-link d-flex p-0" href="${path}/Animalpharm/AnimalpharmSearch">동물 약국</a>
                        </li>
                    </ul>
                </div>
            </aside>