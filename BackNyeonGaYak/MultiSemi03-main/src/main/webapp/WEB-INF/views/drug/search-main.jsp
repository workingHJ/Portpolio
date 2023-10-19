<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />


<jsp:include page="/WEB-INF/views/common/header.jsp">
    <jsp:param value="약 검색" name="title" />
</jsp:include>

<jsp:include page="/WEB-INF/views/drug/leftNav.jsp"/>

        <!-- 본체 헤더 검색 -->
        <form name="searchForm" action="${path }/drug/search" class="col-xl-8 col-xxl-9_5 ps-4" method="get">
            <input type="hidden" name="page">
            <div class="container">
                <div class="row position-relative">
                    <div class="mediBoxPrev">
                        <div class="me-2" style="margin-left: 16px;">
                            <img src="${path}/resources/img/drugSearch/pill.png" style="width: 15px;">
                        </div>
                        <div class="fw-bold ms-1">
                            약 검색
                        </div>
                    </div>
                    <div class="mediBox mb-2">
                        <div class=" w-90 mt-4 pt-2 pb-3 border-bottom">
                            <div class="input-group">
                                <i class="ms-1 ai-search" style="padding-top: 3px;"> </i>
                                <input class="ms-2 border-0" name="itemName" placeholder="약 이름을 입력하세요."
                                    style="width: 95% !important;" type="text" value="${paramMap.itemName }">
                            </div>
                        </div>
                        <div class="w-90 my-3">
                            <div class="input-group">
                                <i class="ms-1 ai-pencil" style="padding-top: 3px;"> </i>
                                <input class="ms-2 border-0" name="drugFront" placeholder="약에 쓰여 있는 문자를 입력하세요"
                                    style="width: 95% !important;" value="${paramMap.drugFront }">
                            </div>
                        </div>
                        <div class="w-90 mb-3 d-flex justify-content-between text-center align-content-center"
                            id="drugShape">
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="drugShapeAll"
                                    value="전체" ${paramMap.drugShape == null || fn:contains(paramMap.drugShape, '전체' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="drugShapeAll"> <img src="${path}/resources/img/capsule/ALL.png"
                                                width="40px"> </label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="drugShapeAll"> 전체 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeCircle"
                                    value="원형" ${fn:contains(paramMap.drugShape, '원형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeCircle"> <img src="${path}/resources/img/capsule/원형2.png"
                                                width="20px"> </label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapeCircle"> 원형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeOval"
                                    value="타원형" ${fn:contains(paramMap.drugShape, '타원형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeOval"><img src="${path}/resources/img/capsule/타원형2.png"
                                                width="35px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel DrugLabel" for="shapeOval"> 타원형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeHC"
                                    value="반원형" ${fn:contains(paramMap.drugShape, '반원형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeHC"> <img src="${path}/resources/img/capsule/반원형2.png"
                                                width="35px"> </label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapeHC"> 반원형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeTri"
                                    value="삼각형" ${fn:contains(paramMap.drugShape, '삼각형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeTri"> <img src="${path}/resources/img/capsule/삼각형2.png"
                                                width="25px"> </label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapeTri"> 삼각형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeSqu"
                                    value="사각형" ${fn:contains(paramMap.drugShape, '사각형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeSqu"><img src="${path}/resources/img/capsule/사각형2.png"
                                                width="20px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapeSqu"> 사각형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeDia"
                                    value="마름모형" ${fn:contains(paramMap.drugShape, '마름모형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeDia"> <img src="${path}/resources/img/capsule/마름모형2.png"
                                                width="30px"> </label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapeDia"> 마름모형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeReq"
                                    value="장방형" ${fn:contains(paramMap.drugShape, '장방형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeReq"> <img src="${path}/resources/img/capsule/장방형2.png"
                                                width="40px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapeReq"> 장방형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapePenta"
                                    value="오각형" ${fn:contains(paramMap.drugShape, '오각형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapePenta"> <img src="${path}/resources/img/capsule/오각형2.png"
                                                width="25px"> </label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapePenta"> 오각형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeHexa"
                                    value="육각형" ${fn:contains(paramMap.drugShape, '육각형' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeHexa"><img src="${path}/resources/img/capsule/육각형2.png"
                                                width="25px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapeHexa"> 육각형 </label>
                                </div>
                            </div>
                            <div class="col-1 capBox">
                                <input type="radio" class="d-none" name="drugShape" id="shapeEtc"
                                    value="기타" ${fn:contains(paramMap.drugShape, '기타' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="shapeEtc"><img src="${path}/resources/img/capsule/ETC.png"
                                                width="40px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="shapeEtc"> 기타 </label>
                                </div>
                            </div>
                        </div>
                        <div class="w-90 mb-3 d-flex justify-content-between text-center" id="drugColor">
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="drugColorAll"
                                    value="전체" ${paramMap.drugColorAll == null || fn:contains(paramMap.drugColorAll, '전체' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorAll"></div>
                                    <label class="fs-sm drugLabel" for="drugColorAll"> 전체 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="white"
                                    value="하양" ${fn:contains(paramMap.drugColor, '하양' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorWhite"></div>
                                    <label class="fs-sm drugLabel" for="white"> 하양 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="yellow"
                                    value="노랑" ${fn:contains(paramMap.drugColor, '노랑' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorYellow"></div>
                                    <label class="fs-sm drugLabel" for="yellow"> 노랑 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="orange"
                                    value="주황" ${fn:contains(paramMap.drugColor, '주황' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorOrange"></div>
                                    <label class="fs-sm drugLabel" for="orange"> 주황 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="pink"
                                    value="분홍" ${fn:contains(paramMap.drugColor, '분홍' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorPink"></div>
                                    <label class="fs-sm drugLabel" for="pink"> 분홍 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="red"
                                    value="빨강" ${fn:contains(paramMap.drugColor, '빨강' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorRed"></div>
                                    <label class="fs-sm drugLabel" for="red"> 빨강 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="brown"
                                    value="갈색" ${fn:contains(paramMap.drugColor, '갈색' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorBrown"></div>
                                    <label class="fs-sm drugLabel" for="brown"> 갈색 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="lightGreen"
                                    value="연두" ${fn:contains(paramMap.drugColor, '연두' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorLG"></div>
                                    <label class="fs-sm drugLabel" for="lightGreen"> 연두 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="green"
                                    value="초록" ${fn:contains(paramMap.drugColor, '초록' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorGreen"></div>
                                    <label class="fs-sm drugLabel" for="green"> 초록 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="blue"
                                    value="파랑" ${fn:contains(paramMap.drugColor, '파랑' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorBlue"></div>
                                    <label class="fs-sm drugLabel" for="blue"> 파랑 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="navy"
                                    value="남색" ${fn:contains(paramMap.drugColor, '남색' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorNavy"></div>
                                    <label class="fs-sm drugLabel" for="navy"> 남색 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="purple"
                                    value="보라" ${fn:contains(paramMap.drugColor, '보라' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorPurple"></div>
                                    <label class="fs-sm drugLabel" for="purple"> 보라 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="gray"
                                    value="회색" ${fn:contains(paramMap.drugColor, '회색' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorGray"></div>
                                    <label class="fs-sm drugLabel" for="gray"> 회색 </label>
                                </div>
                            </div>
                            <div class="capBoxCol">
                                <input type="radio" class="d-none" name="drugColor" id="black"
                                    value="검정" ${fn:contains(paramMap.drugColor, '검정' ) ? 'checked' : '' }>
                                <div>
                                    <div class="colorBlack"></div>
                                    <label class="fs-sm drugLabel" for="black"> 검정 </label>
                                </div>
                            </div>
                        </div>
                        <div class="w-90 mb-3 d-flex text-center">
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="drugType" id="drugTypeAll"
                                    value="전체" ${paramMap.drugTypeAll == null || fn:contains(paramMap.drugTypeAll, '전체' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="drugTypeAll"> <img src="${path}/resources/img/capsule/ALL.png"
                                                width="40px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="drugTypeAll"> 전체 </label>
                                </div>
                            </div>
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="drugType" id="capsuleTablet"
                                    value="정제류" ${fn:contains(paramMap.drugType, '정제류' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="capsuleTablet"> <img src="${path}/resources/img/capsule/캡슐/정제류.png"
                                                width="40px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="capsuleTablet"> 정제류 </label>
                                </div>
                            </div>
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="drugType" id="capsuleHard"
                                    value="경질캡슐" ${fn:contains(paramMap.drugType, '경질캡슐' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="capsuleHard"> <img src="${path}/resources/img/capsule/캡슐/경질캡슐.png"
                                                width="40px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="capsuleHard"> 경질캡슐 </label>
                                </div>
                            </div>
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="drugType" id="capsuleSoft"
                                    value="연질캡슐" ${fn:contains(paramMap.drugType, '연질캡슐' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="capsuleSoft"> <img src="${path}/resources/img/capsule/캡슐/연질캡슐.png"
                                                width="40px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="capsuleSoft"> 연질캡슐 </label>
                                </div>
                            </div>
                        </div>
                        <div class="w-90 mb-2 d-flex text-center">
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="itemLine" id="itemLineAll"
                                    value="전체"  ${paramMap.itemLineAll == null || fn:contains(paramMap.itemLineAll, '전체' ) ? 'checked' : '' } >
                                <div>
                                    <div>
                                        <label for="itemLineAll"> <img src="${path}/resources/img/capsule/ALL.png"
                                                width="40px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="itemLineAll"> 전체 </label>
                                </div>
                            </div>
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="itemLine" id="lineNone"
                                    value="없음" ${fn:contains(paramMap.itemLineAll, '없음' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="lineNone"> <img src="${path}/resources/img/capsule/원형2.png"
                                                width="20px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="lineNone"> 선 없음 </label>
                                </div>
                            </div>
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="itemLine" id="lineRow"
                                    value="ㅡ자" ${fn:contains(paramMap.itemLineAll, 'ㅡ자' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="lineRow"> <img src="${path}/resources/img/capsule/-형.png"
                                                width="20px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="lineRow"> ㅡ자 </label>
                                </div>
                            </div>
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="itemLine" id="lineCross"
                                    value="+자" ${fn:contains(paramMap.itemLineAll, '+자' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="lineCross"> <img src="${path}/resources/img/capsule/십자형.png"
                                                width="20px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="lineCross"> +자 </label>
                                </div>
                            </div>
                            <div class="col-1 me-7px capBox">
                                <input type="radio" class="d-none" name="itemLine" id="lineEtc"
                                    value="기타" ${fn:contains(paramMap.itemLineAll, '기타' ) ? 'checked' : '' }>
                                <div>
                                    <div>
                                        <label for="lineEtc"> <img src="${path}/resources/img/capsule/ETC.png"
                                                width="40px"></label>
                                    </div>
                                    <label class="fs-sm drugLabel" for="lineEtc"> 기타 </label>
                                </div>
                            </div>
                        </div>
                        <div class="w-90 d-flex justify-content-end">
                            <div class="">
                                <button type="reset"
                                    class="btn btn-sm btn-outline-primary fw-semibold me-2 rounded-pill"
                                    style="width: 90px !important; font-size: 0.85rem;" id="reset">
                                    초기화
                                </button>
                                <button type="submit" class=" btn btn-sm btn-warning text-black fw-bold rounded-pill"
                                    style="width: 90px !important; font-size: 0.85rem;">
                                    검색
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="pt-4 mt-4">
                    <div class="container">
                    	<!--  Drug Card Grid -->
						<jsp:include page="/WEB-INF/views/drug/cardGrid.jsp" />
                        <!-- Pagination -->
						<jsp:include page="/WEB-INF/views/common/pagination.jsp" />
                    </div>
                </section>
            </div>
        </form>
    </div>
    <!--  Custom js -->
    
 	  <script type="text/javascript" src="${path}/resources/js/custom/mediLine.js"></script> 
    <!-- Main content END -->
</section>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />