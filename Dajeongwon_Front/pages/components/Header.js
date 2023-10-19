import {useState, useEffect, useContext, createContext} from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ImageLoader from "../../components/ImageLoader";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "../../components/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import StickyNavbar from "../../components/StickyNavbar";
import SignInModalLight from "../../components/partials/SignInModalLight";
import SignUpModalLight from "../../components/partials/SignUpModalLight";
import apiClient from "../../services/apiClient";
import {useRouter} from "next/router";
import {LoginContext} from "../_app";

const Header = ({props}) => {
  // 로그인 관리
  const [loggedIn, setLoggedIn] = useState(false);
  const {loginInfo, setLoginInfo} = useContext(LoginContext);
  const [snsType, setSnsType] = useState("none");
  const router = useRouter();
  const currentPath = router.asPath;

  let active = "";
  if (currentPath.includes("/exhibition")) {
    active = "exhibition";
  } else if (currentPath.includes("/performance")) {
    active = "performance";
  } else if (currentPath.includes("/book")) {
    active = "book";
  } else if (currentPath.includes("/movie")) {
    active = "movie";
  } else if (currentPath.includes("/MyGarden")) {
    active = "myGarden";
  }

  useEffect(() => {
    getLoginInfo();
  }, []);

  // 로그인 정보 가져오는 거
  const getLoginInfo = async () => {
    // 카카오 / 네이버 / 일반

    const url = new URL(window.location.href); // 현재 페이지의 URL을 가져옴
    let authCode = url.searchParams.get("code"); // 가져온 URL에서 인가코드를 가져옴
    let urlSnsType = url.searchParams.get("state"); // 가져온 URL에서 state를 가져옴
    setSnsType(urlSnsType);

    if (urlSnsType !== null) {
      const url = new URL(window.location.href); // 현재 페이지의 URL을 가져옴
      if (urlSnsType === "naver") {
        // 네이버 로그인
        try {
          var response = await apiClient.post("http://localhost/oauth2/naver/login", {
            withCredentials: true,
            code: authCode,
          });
          setLoginInfo(response.data.member);
        } catch (e) {
          console.log(e);
        }
      }
      if (urlSnsType === "kakao") {
        // 카카오 로그인
        try {
          var response = await apiClient.post("http://localhost/oauth2/kakao/login", {
            withCredentials: true,
            code: authCode,
          });
          setLoginInfo(response.data.member);
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      try {
        const response = await apiClient.get("/loginInfo", {withCredentials: true});
        setLoginInfo(response.data.member);
      } catch (error) {
        alert(error);
      }
    }
  };

  // Sign in modal
  const [signinShow, setSigninShow] = useState(false);
  const handleSigninClose = () => setSigninShow(false);
  const handleSigninShow = () => setSigninShow(true);

  // Sign up modal
  const [signupShow, setSignupShow] = useState(false);

  const handleSignupClose = () => setSignupShow(false);
  const handleSignUpShow = () => setSignupShow(true);

  // Swap modals
  const handleSignInToUp = (e) => {
    e.preventDefault();
    setSigninShow(false);
    setSignupShow(true);
  };

  const handleSignUpToIn = (e) => {
    e.preventDefault();
    setSigninShow(true);
    setSignupShow(false);
  };

  const logOut = async () => {
    try {
      const response = await apiClient.get("/logout", {withCredentials: true});
      if (response.data.result === true) {
        alert("로그아웃되었습니다.");
        setLoginInfo(null);
        setLoggedIn(false);
        location.reload();
      } else {
        alert("로그아웃 과정에 문제 생김");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {/* Sign in modal */}
      {!loggedIn && (
        <SignInModalLight centered size="lg" pillButtons show={signinShow} onHide={handleSigninClose} onSwap={handleSignInToUp} completed={getLoginInfo} snsType={snsType} setSnsType={setSnsType} />
      )}
      {/* Sign up modal */}
      {!loggedIn && <SignUpModalLight centered size="lg" pillButtons show={signupShow} onHide={handleSignupClose} onSwap={handleSignUpToIn} snsType={snsType} setSnsType={setSnsType} />}
      <Navbar as={StickyNavbar} expand="lg" className="fixed-top navbar bg-white">
        <Container>
          <Navbar.Brand as={Link} href="/" className="me-3 me-xl-4">
            <ImageLoader priority src="/images/logo/헤더용 로고 투명화.png" width={130} height={50} placeholder={false} alt="헤더 이미지" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" className="ms-auto" />

          {/* Display content depending on user auth status  */}
          {loginInfo ? (
            <>
              <Button size="middle" variant="link d-lg-block order-lg-3" style={{fontWeight: "normal"}}>
                <Nav.Link href="/user/MyGarden" className={`text-decoration-none fs-5 ${active === "myGarden" ? "text-primary" : ""}`}>
                  <i className="fi-gardening me-2 fs-5"></i>내 정원
                </Nav.Link>
              </Button>
              <Dropdown className="d-none d-lg-block order-lg-3 my-n2 me-3">
                <Dropdown.Toggle as={Link} href="./" className="nav-link dropdown-toggle-flush d-flex py-1 px-0" style={{width: "45px"}}>
                  {/* 여기에 유저 이미지 들어가야 함  */}
                  {loginInfo &&
                    loginInfo.mimg != null &&
                    (loginInfo.snsType === null || loginInfo.snsType === "none" ? (
                      <ImageLoader src={"http://localhost:80" + loginInfo.mimg} width={100} height={100} placeholder={false} className="rounded-circle" alt="userName" />
                    ) : (
                      <ImageLoader src={loginInfo.mimg} width={100} height={100} placeholder={false} className="rounded-circle" alt="userName" />
                    ))}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="white" renderOnMount align="end" className="fs-6">
                  <Dropdown.Item as={Link} href="/user/account-info">
                    <i className="fi-settings me-2"></i>내 정보 수정
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} href="/user/MyGarden">
                    <i className="fi-plant me-2"></i>
                    내가 참여한 정원
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} href="/user/account-reviews">
                    <i className="fi-file me-2"></i>
                    내가 쓴 글
                  </Dropdown.Item>
                  <Dropdown.Divider as="div" />
                  <Dropdown.Item onClick={() => logOut()}>
                    <i className="fi-logout me-2"></i>
                    로그아웃
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Button size="base" variant="link d-none d-lg-block order-lg-3 color-hdGray fs-5 fw-normal" onClick={handleSigninShow}>
                <i className="fi-user me-2"></i>
                로그인
              </Button>
              <Button size="base" variant="link d-none d-lg-block order-lg-3 color-hdGray fs-5 fw-normal" onClick={handleSignUpShow}>
                <i className="fi-login me-2"></i>
                회원가입
              </Button>
            </>
          )}

          <Navbar.Collapse id="navbarNav" className="order-md-2">
            <Nav navbarScroll style={{maxHeight: "35rem"}}>
              <Nav.Item as={Dropdown} className="me-lg-2">
                <Dropdown.Toggle as={Nav.Link} className="align-items-center fs-5 pe-lg-4">
                  모임
                  <span className="d-none d-lg-block position-absolute top-50 end-0 translate-middle-y border-end border-light" style={{width: "1px", height: "30px"}}></span>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="white" renderOnMount>
                  <Dropdown.Item as={Link} href="/garden/gardenList">
                    <i className="fi-list fs-base me-2"></i>
                    모임 찾기
                  </Dropdown.Item>
                  <Dropdown.Divider as="div" />
                  <Dropdown.Item as={Link} href="/garden/gardenMake-1">
                    <i className="fi-pencil fs-base me-2"></i>
                    모임 만들기
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="/art/movie-list" className={`fs-5 ${active === "movie" ? "text-primary" : ""}`}>
                  영화
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="/art/performance-list" className={`fs-5 ${active === "performance" ? "text-primary" : ""}`}>
                  공연
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="/art/exhibition-list" className={`fs-5 ${active === "exhibition" ? "text-primary" : ""}`}>
                  전시
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="/art/book-list" className={`fs-5 ${active === "book" ? "text-primary" : ""}`}>
                  도서
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} href="/board/list" className={`fs-5 ${active === "list" ? "text-primary" : ""}`}>
                  자유게시판
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      ;
    </>
  );
};

export default Header;
