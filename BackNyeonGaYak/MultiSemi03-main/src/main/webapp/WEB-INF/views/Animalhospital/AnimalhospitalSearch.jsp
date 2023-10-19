<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<c:set var="path" value="${pageContext.request.contextPath}" />

<jsp:include page="/WEB-INF/views/common/header.jsp">
    <jsp:param value="동물병원 검색" name="title" />
</jsp:include>

<jsp:include page="/WEB-INF/views/common/placeLeftNav.jsp"></jsp:include>
    
        <div class="col-xl-8 col-xxl-9_5 ps-4">
            <h4 class="pt-1 pt-lg-0 mt-lg-n2 ps-lg-2" style="border-bottom: solid #212121 2px; margin-bottom:10px"> 동물 병원 찾기 </h4>
            <form class="container mb-4" action="${path}/Animalhospital/AnimalhospitalSearch" method="get" id="AnimalhospitalSearch" name="searchForm">
            	<input type="hidden" name="page">
                <div class="d-flex justify-content-end align-items-center text-end pt-2 pb-2 mb-3">
                    <span style="display: inline-block; line-height: 180%; font-size: 13px;" class="pe-3">
                       동물약국 검색은 현재 서울과 경기도만 지원하고 있습니다.
                    </span>
                </div>
                
                <div class="input-group input-group-sm mb-3">
                    <select class="form-select" name="sido" id="sido" value="${paramMap.sido}"></select>
                    <select class="form-select" name="gugun" id="gugun" value="${paramMap.gugun}"></select>
                    <input class="form-control" type="text" name="address" id="dong" placeholder="도로명" value="${paramMap.address}">
                </div>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text">
                        <i class="ai-home"></i>
                    </span>
                    <input type="search" class="form-control" placeholder="동물병원 이름을 입력하세요" id="ahname" name="ahname" value="${paramMap.ahname}">
                    <button type="submit" class="btn btn-warning">
                    <i class="ai-search" style="color:#212121;"></i></button>
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
                imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                var positions = [
                    <c:forEach var="Animalhospital" items="${list}" varStatus="status">
                        {
                            title : '${Animalhospital.ahname}',
                        address : '${Animalhospital.ahaddress}'
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
                                image : markerImage
                            });
                            // 지도에 마커 올리기 
                            marker.setMap(map);

                            // LatLngBounds 객체에 좌표를 추가합니다
                            bounds.extend(coords);
                           
                            
                            var content = '<div class="customoverlay">' +
                            '  <a href="https://map.kakao.com/link/search/' + position.title + '" target="_blank">' +
                            '    <span class="title">' +  position.title + '</span>' +
                            '  </a>' +
                            '</div>';
                            
                           	// custom 오버레이 표시 위치
                           	var customOverlay = new kakao.maps.CustomOverlay({
                           		map : map,
                           		position : coords,
                           		content : content,
                           		yAnchor : 1
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
         
            <div class="vstack gap-4">
                <c:forEach var="item" items="${list}">
                <div class="card shadow p-2">
                    <div class="row g-0">
                       
                        <div class="col-md-4 mt-2 mb-2 ps-2 position-relative">
                            <!-- Image item -->
                            <div class="container-lg">
                                <div class="card rounded-2 overflow-hidden" style="display: flex; justify-content: center; align-items: center; width:290px; height:210px;">
                                    <img src="${item.ahimg}"
                                        alt="Card image">
                                </div>
                            </div>
                        </div>
                        <!-- Card -->
                        <div class="col-md-8">
                            <div class="card-body py-md-2 d-flex flex-column h-100 position-relative">
		                        <c:if test="${loginMember != null }">
                                	<button class="btn-icon btn-sm order-0 position-absolute top-0 end-0 mt-2 me-3"
                                        type="button">
				                        <i class="ai-heart-filled fs-xl" style="color: var(--ar-warning)"
				                            ></i>
                                    </button>
                            </c:if>
                                <!-- Title -->
                                <h5 class="card-title mt-1 mb-2 pb-1"> ${item.ahname} </h5>
                                <!-- Address -->
                                <div class="mb-1">
                                    <i class="ai-map-pin"></i>
                                    <span name="address" class="ms-1 fs-sm"> ${item.ahaddress} </span>
                                </div>
                                <div class="mb-1 ">
                                    <i class="ai-phone"></i>
                                    <span name="phone" class="ms-1 fs-sm"> ${item.ahtel} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </c:forEach>
                
				<nav aria-label="Page navigation">
				    <ul class="pagination justify-content-center py-4 my-5">
				        <li class="page-item toPage" onclick="movePage(${pageInfo.prevPage});">
				            <i class="ai-arrow-left fs-xl"></i>
				        </li>
				        <c:forEach begin="${pageInfo.startPage }" end="${pageInfo.endPage}" step="1" varStatus="status">
				            <c:if test="${status.current == pageInfo.currentPage }">
				                <li class="page-item active" aria-current="page">
				                    <span class="page-link pe-none"> ${status.current }
				                        <span class="visually-hidden">(current)</span>
				                    </span>
				                </li>
				            </c:if>
				            <c:if test="${status.current != pageInfo.currentPage }">
				                <li class="page-item toPage" aria-current="page">
				                    <a class="page-link" onclick="movePage(${status.current});">
				                        ${status.current}
				                    </a>
				                </li>
				            </c:if>
				        </c:forEach>
				
				        <li class="page-item toPage">
				            <a onclick="movePage(${pageInfo.nextPage});" aria-label="Next" class="page-link">
				                <i class="ai-arrow-right fs-xl"></i>
				            </a>
				        </li>
				    </ul>
				</nav>
				
				 <script type="text/javascript">
				       function movePage(page) {
				          searchForm.page.value = page;
				          searchForm.submit();
				   		 }
				</script>
				
			<script>
            function addFavor(favorAnimalhospital, ahno, mno) {
                var $favorAnimalhospital = $(favorAnimalhospital);
                $.ajax({
                    type: "POST",
                    url: "/semi03/Animalhospital/addFavor",
                    data: JSON.stringify({ ahno: ahno, mno: mno }),
                    dataType: "json",
                    contentType: "application/json;charset=UTF-8",
                    success: function (response) {
                        alert(response.message);

                        if (response.message === "즐겨찾기에 추가되었습니다.") {
                            $favorAnimalpharm.attr("class", "ai-heart-filled fs-xl");
                            $favorAnimalpharm.css("color", "var(--ar-warning)");
                        }
                        if (response.message === "이미 즐겨찾기에 추가되어 있습니다. 삭제합니다.") {
                            $favorAnimalpharm.attr("class", "ai-heart fs-xl");
                            $favorAnimalpharm.css("color", "var(--ar-gray-500)");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log("에러 발생:", error);
                    }
                });
            }

        </script>

            </div>
        </div>
    </div>
</div>
</main>


<script type="text/javascript" src="${path}/resources/js/custom/sidogugun.js"></script>
<jsp:include page="/WEB-INF/views/common/footer.jsp" />