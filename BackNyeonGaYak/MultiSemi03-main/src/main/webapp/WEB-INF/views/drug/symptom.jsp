<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>


<c:set var="path" value="${pageContext.request.contextPath}" />


<jsp:include page="/WEB-INF/views/common/header.jsp">
    <jsp:param value="약 검색" name="title" />
</jsp:include>

						<!--  left NAV -->
						<jsp:include page="/WEB-INF/views/drug/leftNav.jsp"/>
						
						<!--  Card  -->
						<div class="col-xl-8 col-xxl-9_5 ps-4">
						<jsp:include page="/WEB-INF/views/drug/cardGrid.jsp"/>
						</div>
						
						<!-- Pagination -->
						<nav aria-label="Page navigation">
						    <ul class="pagination justify-content-center py-4 my-5">
						        <!-- 이전으로 가기-->
						        <li class="page-item toPage" onclick="movePage(${pageInfo.prevPage});">
						            <i class="ai-arrow-left fs-xl"></i>
						        </li>
						        <!-- 1부터 N-->
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
						                    <a class="page-link" onclick="forPage(${status.current});">
						                        ${status.current}
						                    </a>
						                </li>
						            </c:if>
						        </c:forEach>
						
						        <!-- 다음으로 가기-->
						        <li class="page-item toPage">
						            <a onclick="forPage(${pageInfo.nextPage});" aria-label="Next" class="page-link">
						                <i class="ai-arrow-right fs-xl"></i>
						            </a>
						        </li>
						    </ul>
						</nav>
                    </div>
                </section>


<!--  Custom js -->
<script>
	// url에서 param 가져오기
	function getParameterByName(name) {
	  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	  return results == null
	    ? ""
	    : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	
	function forPage(page) {
	  let efcyQesitm = getParameterByName("efcyQesitm");
	  var paramMap = {};
	  console.log(efcyQesitm)
	  paramMap["efcyQesitm"] = efcyQesitm;

	  var form = document.createElement("form");
	  form.setAttribute("method", "GET");
	  form.setAttribute("name", "searchForm");
	  form.setAttribute("action", "${path}/drug/symp");

	  for (var key in paramMap) {
	    if (paramMap.hasOwnProperty(key)) {
	      var input = document.createElement("input");
	      input.setAttribute("type", "hidden");
	      input.setAttribute("name", key);
	      input.setAttribute("value", paramMap[key]);
	      form.appendChild(input);
	    }
	  }

	  var pageInput = document.createElement("input");
	  pageInput.setAttribute("type", "hidden");
	  pageInput.setAttribute("name", "page");
	  form.appendChild(pageInput);

	  document.body.appendChild(form);
	  searchForm.page.value = page;
	  form.submit();
	}
</script>    


<jsp:include page="/WEB-INF/views/common/footer.jsp" />
