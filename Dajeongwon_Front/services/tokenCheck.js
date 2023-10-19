// 토큰의 만료 여부 확인
function isTokenExpired(expirationTime) {
  console.log(expirationTime);
  return expirationTime < Date.now();
}

// 토큰 체크 및 로그아웃
export function checkTokenAndLogout() {
  const jwtToken = localStorage.getItem("accessToken");
  const expirationTime = localStorage.getItem("tokenExpiresIn") * 1000;
  if (jwtToken && isTokenExpired(expirationTime)) {
    // 토큰 만료 시 로그아웃 처리
    localStorage.removeItem("accessToken");
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
  }
}
