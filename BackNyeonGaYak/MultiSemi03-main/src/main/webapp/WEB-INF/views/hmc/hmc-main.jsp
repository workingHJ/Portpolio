<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />


<jsp:include page="/WEB-INF/views/common/header.jsp">
    <jsp:param value="건강검진기관 찾기" name="title" />
</jsp:include>

<jsp:include page="/WEB-INF/views/common/placeLeftNav.jsp"></jsp:include>


<div class="col-xl-8 col-xxl-9_5 ps-4">
    <h4 class="pt-1 pt-lg-0 mt-lg-n2 ps-lg-2" style="border-bottom: solid #212121 2px; margin-bottom:6px">
        검진 기관 찾기 </h4>
    <div class="container mb-4" id="hmcSearch"
        style="padding-left: 0px; margin-left: 0px; padding-right: 0px; margin-right: 0px; padding-bottom: 11px;">

        <!--  ============================Input창============================ -->
        <form name="searchForm" id="hmcForm" action="${path }/hmc/search" method="get">

            <input type="hidden" name="page">
            <div class="input-group-text" style="padding: 20px 0px 0px 0px; margin-top: 10px; margin-bottom: 10px">
                <select class="form-select" name="sido" id="sido" style="margin-right: 10px;">
                </select>
                <select class="form-select" name="gugun" id="gugun" style="margin-right: 10px;">
                </select>
                <input class="form-control" name="address" id="roadAdd" type="text" style="margin-right: 10px;"
                    placeholder="도로명이나 동을 입력하세요"
                    value="${paramMap.locAddr }"></input>
                <input class="form-control-a" name="hmcNm" type="text" id="hmcNm" placeholder="검진기관명 입력" value="${paramMap.hmcNm }">
            </div>
            <div class="input-group-text"
                style="padding-bottom: 14px; margin-left: 0px; margin-top:12px; padding-right: 0px;">
                <span style="margin:auto; margin-left: 0px;">
                    <input type="checkbox" class="d-none" id="btn-check-All" name="hmcType1" value="allCd">
                    <label class="btn btn-hmc" for="btn-check-All">전체</label>
                </span>
                <span style="margin:auto">
                    <input type="checkbox" class="d-none" id="btn-check-2" name="hmcType1" value="grenChrgTypeCd"
                        ${fn:contains(hmcType1, 'grenChrgTypeCd' ) ? 'checked' :'' }>
                    <label class="btn btn-hmc" for="btn-check-2">일반</label>
                </span>
                <span style="margin:auto">
                    <input type="checkbox" class="d-none" id="btn-check-3" name="hmcType1" value="mchkChrgTypeCd"
                        ${fn:contains(hmcType1, 'mchkChrgTypeCd' ) ? 'checked' :'' }>
                    <label class="btn btn-hmc" for="btn-check-3">구강</label>
                </span>
                <span style="margin:auto">
                    <input type="checkbox" class="d-none" id="btn-check-4" name="hmcType1" value="ichkChrgTypeCd"
                        ${fn:contains(hmcType1, 'ichkChrgTypeCd' ) ? 'checked' :'' }>
                    <label class="btn btn-hmc" for="btn-check-4">영유아</label>
                </span>
                <span style="margin:auto">
                    <input type="checkbox" class="d-none" id="btn-check-C-All" name="hmcType2" value="allCancerCd">
                    <label class="btn btn-hmc px-3" for="btn-check-C-All">암검진(전체)</label>
                </span>
                <span style="margin:auto">
                    <input type="checkbox" class="d-none" id="btn-check-6" name="hmcType2" value="bcExmdChrgTypeCd"
                        ${fn:contains(hmcType2, 'bcExmdChrgTypeCd' ) ? 'checked' : '' } />
                    <label class="btn btn-hmc" for="btn-check-6">유방암</label>
                </span>
                <span style="margin:auto">
                    <input type="checkbox" class="d-none" id="btn-check-7" name="hmcType2" value="ccExmdChrgTypeCd"
                        ${fn:contains(hmcType2, 'ccExmdChrgTypeCd' ) ? 'checked' : '' } />
                    <label class="btn btn-hmc" for="btn-check-7">대장암</label>
                </span>
                <span style="margin:auto">
                    <input type="checkbox" class="d-none" id="btn-check-8" name="hmcType2" value="cvxcaExmdChrgTypeCd"
                        ${fn:contains(hmcType2, 'cvxcaExmdChrgTypeCd' ) ? 'checked' : '' } />
                    <label class="btn btn-hmc px-3" for="btn-check-8">자궁경부암</label>
                </span>
                <span style="margin:auto">
                    <input type="checkbox" class="d-none" id="btn-check-9" name="hmcType2" value="lvcaExmdChrgTypeCd"
                        ${fn:contains(hmcType2, 'lvcaExmdChrgTypeCd' ) ? 'checked' : '' } />
                    <label class="btn btn-hmc" for="btn-check-9">간암</label>
                </span>
                <span style="margin:auto; margin-right: 0px;">
                    <input type="checkbox" class="d-none" id="btn-check-10" name="hmcType2" value="stmcaExmdChrgTypeCd"
                        ${fn:contains(hmcType2, 'stmcaExmdChrgTypeCd' ) ? 'checked' : '' } />
                    <label class="btn btn-hmc" for="btn-check-10">위암</label>
                </span>
            </div>
            <div class="container pb-2" style="border-bottom:1px var(--ar-gray-400) solid;">
                <button type="submit" class="btn btn-warning" id="search"
                    style="width: 100px; margin-left: 90.8%; margin-top: 8px; margin-bottom: 13px; color:#212121;">검색</button>
            </div>
        </form>
        <!----------------------------------맵 넣는 자리 -------------------------->
        <div class="container mb-4 mt-4">
            <div id="map" style="width :100%; height:400px;"></div>
            <script type="text/javascript"
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b6c62d8d51783fb3d20dfac055869d2f&libraries=services,clusterer,drawing"></script>
            <!--  아니 왜 CSS에 넣어놓으면 안 뜨고 여기넣으면 뜨냐? -->
            <style>
                .customoverlay {
                    position: relative;
                    bottom: 85px;
                    border-radius: 6px;
                    border: 1px solid #ccc;
                    border-bottom: 2px solid #ddd;
                    float: left;
                }

                .customoverlay:nth-of-type(n) {
                    border: 0;
                    box-shadow: 0px 1px 2px #888;
                }

                .customoverlay a {
                    display: block;
                    text-decoration: none;
                    color: #000;
                    text-align: center;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: bold;
                    overflow: hidden;
                    background: var(--ar-primary);
                    background: #17C3B2 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
                }

                .customoverlay .title {
                    display: block;
                    text-align: center;
                    background: #fff;
                    margin-right: 35px;
                    padding: 7px 9px;
                    font-size: 14px;
                    font-weight: bold;
                }

                .customoverlay:after {
                    content: '';
                    position: absolute;
                    margin-left: -12px;
                    left: 50%;
                    bottom: -12px;
                    width: 22px;
                    height: 12px;
                    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
                }
            </style>
            <script>
                var container = document.getElementById('map');
                var options = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3
                };

                // 지도를 생성합니다    
                var map = new kakao.maps.Map(container, options);

                var imageSrc = '${path }/resources/img/location.png', // 마커이미지의 주소입니다    
                    imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
                    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                var positions = [
                    <c:forEach var="hmc" items="${list}" varStatus="status">
                        {
                            title : '${hmc.hmcNm}',
                        address : '${hmc.locAddr}'
                	    }
                        <c:if test="${not status.last}">,</c:if> //반복문 마지막에 ',' 안붙게 하는 거
                    </c:forEach>
                ];
                // 지도를 재설정할 범위정보를 가지고 있을 latlngBounds 객체 생성 
                var bounds = new kakao.maps.LatLngBounds(); //LatLngBounds->지도 재설정용, 사각 정보 표현 
                positions.forEach(function (position) {
                    // 주소로 좌표 검색
                    geocoder.addressSearch(position.address, function (result, status) {
                        // 정상적으로 검색이 완료됐으면 
                        if (status === kakao.maps.services.Status.OK) {

                            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                            const xPoint = coords.getLat();
                            const yPoint = coords.getLng();

                            // 결과값으로 받은 위치를 마커로 표시합니다
                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords,
                                image: markerImage
                            });
                            // 지도에 마커 올리기 
                            marker.setMap(map);

                            // LatLngBounds 객체에 좌표를 추가합니다
                            bounds.extend(coords);


                            var content = '<div class="customoverlay">' +
                            '  <a href="https://map.kakao.com/link/search/' + position.title + '" target="_blank">' +
                            '    <span class="title">' + position.title + '</span>' +
                            '  </a>' +
                            '</div>';

                            // custom 오버레이 표시 위치
                            var customOverlay = new kakao.maps.CustomOverlay({
                                map: map,
                                position: coords,
                                content: content,
                                yAnchor: 1
                            });

                            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                            setBounds();
                        }
                    });
                });
                function setBounds() {
                    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
                    // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
                    map.setBounds(bounds);
                }
            </script>
        </div>
        <!-- 여기서부터 카드 -->
        <div class="vstack gap-4">
            <c:forEach var="item" items="${list }">
                <div class="card shadow p-2">
                    <div class="row g-0">
                        <!-- Card img -->
                        <div class="col-md-4 mt-2 mb-2 ps-2 position-relative">
                            <!-- Image item -->
                            <div class="container-lg">
                                <div class="card rounded-2 overflow-hidden">
                                    <c:choose>
                                        <c:when test="${item.hmcImg } != null">
                                            <img src="${item.hmcImg }" class="mediImage mt-2 toPage"
                                                alt="${item.hmcNm }" />
                                        </c:when>
                                        <c:otherwise>
                                            <img src="${item.hmcImg }"
                                                class="mediImage mt-2 toPage" alt="${item.hmcNm }" />
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                            </div>
                        </div>
                        <!-- Card body -->
                        <div class="col-md-8">
                            <div class="card-body py-md-2 d-flex flex-column h-100 position-relative">
                                <!-- Bookmark icon -->
                                <c:if test="${loginMember != null }">
                                    <button class="btn-icon btn-sm order-0 position-absolute top-0 end-0 mt-2 me-3"
                                        type="button">
                                        <i class=" ai-heart fs-xl" id="heart-line"></i>
                                    </button>
                                </c:if>
                                <!-- Title -->
                                <h5 class="card-title mt-2 mb-2 pb-1 hmcTitle">
                                    ${item.hmcNm } </h5>
                                <!-- Address -->
                                <div class="mb-1 mt-1">
                                    <i class="ai-map-pin"></i>
                                    <span name="address" class="ms-1 fs-sm"> ${item.locAddr } </span>
                                </div>
                                <c:if test="${item.hmcTelNo != null }">
                                    <div class="mb-1 phone">
                                        <i class="ai-phone"></i>
                                        <span name="phone" class="ms-1 fs-sm"> ${item.hmcTelNo } </span>
                                    </div>
                                </c:if>
                                <div class="py-2 my-2" name="cdType">
                                    <c:if test="${item.grenChrgTypeCd > 0 }">
                                        <span class="badge bg-faded-primary text-primary fs-sm me-1">
                                            일반</span>
                                    </c:if>
                                    <c:if test="${item.ichkChrgTypeCd > 0 }">
                                        <span class="badge bg-faded-primary text-primary fs-sm me-1">
                                            영유아</span>
                                    </c:if>
                                    <c:if test="${item.mchkChrgTypeCd > 0 }">
                                        <span class="badge bg-faded-primary text-primary fs-sm me-1">구강
                                        </span>
                                    </c:if>
                                    <c:if test="${item.bcExmdChrgTypeCd > 0 }">
                                        <span class="badge bg-faded-primary text-primary fs-sm me-1">
                                            유방암 </span>
                                    </c:if>
                                    <c:if test="${item.ccExmdChrgTypeCd > 0 }">
                                        <span class="badge bg-faded-primary text-primary fs-sm me-1">
                                            대장암 </span>
                                    </c:if>
                                    <c:if test="${item.cvxcaExmdChrgTypeCd > 0 }">
                                        <span class="badge bg-faded-primary text-primary fs-sm me-1">
                                            자궁경부암 </span>
                                    </c:if>
                                    <c:if test="${item.lvcaExmdChrgTypeCd > 0 }">
                                        <span class="badge bg-faded-primary text-primary fs-sm me-1"> 간암
                                        </span>
                                    </c:if>
                                    <c:if test="${item.stmcaExmdChrgTypeCd > 0 }">
                                        <span class="badge bg-faded-primary text-primary fs-sm me-1"> 위암
                                        </span>
                                    </c:if>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>
</div>
</section>

<jsp:include page="/WEB-INF/views/common/pagination.jsp"></jsp:include>
<jsp:include page="/WEB-INF/views/common/footer.jsp"></jsp:include>


<!--  custom js -->
<script type="text/javascript" src="${path}/resources/js/custom/sidogugun.js"></script>
<script src="${path }/resources/js/custom/hmcbtnClick.js"></script>