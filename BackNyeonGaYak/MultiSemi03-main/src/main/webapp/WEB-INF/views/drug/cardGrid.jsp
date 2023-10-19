<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<section class="pt-4 mt-4">
    <div class="container">
        <div class="row g-4">
            <c:forEach var="item" items="${list }">
                <c:set var="itemName" value="${item.itemName}" />
                <c:set var="entpName" value="${item.entpName}" />
                <c:set var="itemNo" value="${item.itemNo}" />
                <div class="col-md-6 col-xl-4">
                    <div class="card p-2 pb-0 h-100">
                        <!-- Image item -->
                        <div class="overflow-hidden text-center imgRound">
							<img src="${path}/${item.itemCoverImg }" class="mediImage mt-2 toPage"
								alt="${item.itemName }"
								onclick="location.href='${path}/drug/detail?itemNo=${itemNo}'" />
						</div>
                        <!-- Card body START -->
                        <div class="px-3 py-2">
                            <c:if test="${loginMember != null }">
                                <c:forEach var="favoritem" items="${favorList }">
                            	<c:choose>
									<c:when test="${itemNo == favoritem.itemNo }">
		                                <button
		                                    class="btn-icon btn-sm order-0 position-absolute end-0 pe-4 pt-4 border-0 bg-transparent"
		                                    type="button">
		                                    <!-- 회원 즐겨찾기용 -->
		                                    <i class="ai-heart-filled fs-xl" style="color: var(--ar-warning)"
		                                        onclick="addFavor(this, ${itemNo}, ${loginMember.mno})"></i>
		                                </button>
									</c:when>
									<c:otherwise>
		                                <button
		                                    class="btn-icon btn-sm order-0 position-absolute end-0 pe-4 pt-4 border-0 bg-transparent"
		                                    type="button">
		                                    <i class="ai-heart fs-xl" style="color: var(--ar-gray-500)"
		                                        onclick="addFavor(this, ${itemNo}, ${loginMember.mno})"></i>
		                                </button>
									</c:otherwise>
                            	</c:choose>
                            	</c:forEach> <!-- favorList -->
                            </c:if>

                            <div class="pt-3 mt-2 pb-2 mb-3 mediSymp" style=" overflow: hidden !important;
													    text-overflow: ellipsis !important;
													    display: -webkit-box !important;
													    -webkit-line-clamp: 2 !important;
													    /* 라인수 */
													    -webkit-box-orient: vertical !important;
													    word-wrap: break-word !important;
													    line-height: 1.4em !important;
													    height: 3.6em !important;">
                                <c:forEach var="item" items="${item.efcyQesitmItems}">
                                    ${item}
                                </c:forEach>
                            </div>
                            <!-- Title -->
                            <div class="card-title pb-0 mb-0 medititle pb-0 mb-0 medititle">
                                <span class="h5 pb-0 mb-0 toPage"
                                    onclick="location.href='${path}/drug/detail?itemNo=${itemNo}'">
                                    ${itemName} </span>
                            </div>
                            <div class="pt-2 pb-2 mb-2 toDetail">
                                <span class="start-0 fs-sm fc-gray500 drugCom pe-2"> ${entpName } </span>
                                <span class=" ">
                                    <button type="button" class="btn btn-primary btn-sm medibtn" name="toDetail"
                                        onclick="location.href='${path}/drug/detail?itemNo=${itemNo}'">
                                        상세 보기</button>
                                </span>
                            </div>
                        </div>
                        <!-- Card body END -->
                    </div>
                </div>
            </c:forEach>
        </div>

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

                        if (response.message === "즐겨찾기에 추가되었습니다.") {
                            $favorDrug.attr("class", "ai-heart-filled fs-xl");
                            $favorDrug.css("color", "var(--ar-warning)");
                        }
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