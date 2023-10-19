<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> 
<c:set var="path" value="${pageContext.request.contextPath}" />

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
                    <a class="page-link" onclick="movePage(${status.current});">
                        ${status.current}
                    </a>
                </li>
            </c:if>
        </c:forEach>

        <!-- 다음으로 가기-->
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