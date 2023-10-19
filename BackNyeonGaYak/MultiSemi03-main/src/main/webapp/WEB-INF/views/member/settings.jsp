<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="path" value="${pageContext.request.contextPath}" />

<jsp:include page="/WEB-INF/views/common/header.jsp">
	<jsp:param value="회원정보 수정" name="title" />
</jsp:include>
<jsp:include page="/WEB-INF/views/member/myPageSideBar.jsp"/>
                <!-- Page content-->
                <div class="col-lg-9 pt-4 pb-2 pb-sm-4">
                    <h1 class="h2 mb-4 ms-0 pb-2">
                        <span><i class="ai-user-group text-primary me-2"></i> </span>
                        <span>회원 정보 수정</span>
                    </h1>
					<form id="memberSettingsFrm" name="memberSettingsFrm" action="${path}/member/update" method="post" enctype="multipart/form-data">
                    <div class="d-flex align-items-center">
                        <div class="dropdown"><a
                                class="ms-1 d-flex flex-column justify-content-end position-relative overflow-hidden rounded-circle bg-size-cover bg-position-center flex-shrink-0"
                                href="upfile" data-bs-toggle="dropdown" aria-expanded="false"
                                style="width: 80px; height: 80px; background-image: url(${path}/resources/memberImage/${loginMember.id}.png);"><span
                                    class="d-block text-light text-center lh-1 pb-1"
                                    style="background-color: rgba(0,0,0,.5)"><i class="ai-camera"></i></span></a>
                            	<div class="dropdown-menu my-1">
		                            <a class="dropdown-item fw-normal">
		                            	<input id="upfile" type="file" name="upfile" style="display: none;">
		                            	<label for="upfile"> <i class="ai-camera fs-base opacity-70 me-2"></i>Upload new photo</label>
		                            </a>
		                            <a class="dropdown-item text-danger fw-normal" href="#"><i
                                        class="ai-trash fs-base me-2"></i>Delete photo</a>
                            	</div>
                        </div>
                        <div class="ps-4 ms-2">
                            <h5> ${loginMember.name} 님 </h5>
                        </div>
                    </div>
                    <div class="row g-3 g-sm-4 mt-0 mt-lg-2">
                    	<div class="col-sm-6">
						<label class="form-label fs-6 fw-bold" for="id">아이디</label> <input
							class="form-control" type="text" value="${loginMember.id}"
							placeholder="${loginMember.name}" id="id" name="id" readonly>
					    </div>
                        <div class="col-sm-6">
                            <label class="form-label fs-6 fw-bold" for="id">닉네임</label>
                            <input class="form-control" type="text" value="${loginMember.name}" placeholder="${loginMember.name}" id="name" name="name">
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label fs-6 fw-bold" for="email">이메일</label>
                            <input class="form-control" type="email" value="${loginMember.email}" placeholder="${loginMember.email}" id="email" name="email">
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label fs-6 fw-bold" for="address">주소</label>
                            <input class="form-control" type="text" value="${loginMember.address}" placeholder="${loginMember.address}"
                                id="address" name="address">
                        </div>
                        <div class="col-sm-6">
                            <label class="form-label fs-6 fw-bold" for="tel">전화번호</label>
                            <input class="form-control" type="tel" value="${loginMember.phone}" placeholder="${loginMember.phone}" id="tel" name="phone">
                        </div>
                        <div class="col-12 d-flex justify-content-end pt-3" style="margin-bottom: 10%;">
                            <button class="btn btn-primary ms-3" style="margin-right: 61%;" type="button" id="updatePwd" data-bs-toggle="modal" data-bs-target="#updatePwdModal">비밀번호 변경</button>
                            <button class="btn btn-secondary" type="button" onclick="goback()">취소</button>
                            <!-- <button class="btn btn-warning" style="font" type="button">변경 내용 저장</button> -->
                            <button type="submit" class="btn btn-warning"
                                style="color:#212121; margin-left: 20px; font-weight: bold;">변경 내용 저장</button>
                      </form>
                      <!-- 비밀번호 변경 모달 -->
					<div class="modal" tabindex="-1" role="dialog" id="updatePwdModal">
						<div class="modal-dialog " role="document">
							<div class="modal-content">
								<div class="modal-header pb-0">
									<h3>비밀번호 변경</h3>
									<button class="btn-close" type="button" data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<div class="modal-body pt-4 tab-content">
									<form class="tab-pane fade show active mt-n2" novalidate
										id="updatePwd" autocomplete="off"
										action="${path}/member/updatePwd" method="post">
										<div class="mb-3 mb-sm-4">
											<label for="su-password" class="form-label">변경할 비밀번호 </label>
											<div class="password-toggle">
												<input type="password" class="form-control mt-2"
													name="password" id="pass1" required> <label
													class="password-toggle-btn"> <input
													class="password-toggle-check" type="checkbox"> <span
													class="password-toggle-indicator"></span>
												</label>
											</div>
										</div>
										<div class="mb-3 mb-sm-4">
											<label for="su-password-confirm" class="form-label">변경할
												비밀번호 확인 </label>
											<div class="password-toggle">
												<input type="password" class="form-control mt-2" id="pass2"
													required> <label class="password-toggle-btn">
													<input class="password-toggle-check" type="checkbox">
													<span class="password-toggle-indicator"></span>
												</label>
											</div>
										</div>
										<button type="submit" class="btn btn-primary w-100"
											id="updateSubmit">비밀번호 변경</button>
									</form>
								</div>
							</div>
						</div>
					</div>
			<script>
			<%-- 뒤로가기--%>
					function goback() {
						window.history.back();
					}
			</script>
                </div>
             </div>
           </div>
         </div>
        </div>
    </main>
<jsp:include page="/WEB-INF/views/common/footer.jsp" />