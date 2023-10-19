import {useState, useContext} from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import ImageLoader from "../ImageLoader";
import PasswordToggle from "../PasswordToggle";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../../pages/_app";

const SignInModalLight = ({onSwap, onHide, pillButtons, snsType, setSnsType, completed, ...props}) => {
  // Form validation
  const [validated, setValidated] = useState(false);
  const {loginInfo, setLoginInfo} = useContext(LoginContext);
  // 입력값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 입력 핸들
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const KAKAO_REST_ID = process.env.NEXT_PUBLIC_KAKAO_REST_ID;
  const NAVER_ID = process.env.NEXT_PUBLIC_NAVER_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=kakao`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&state=naver&redirect_uri=${REDIRECT_URI}`;

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    // 로그인 기능 구현
    try {
      // 프론트엔드에서 백엔드로 로그인 요청 보내기
      const response = await apiClient.post("/login", {
        email: email,
        password: password,
      });

      let message = response.data.message;
      if (response.data.result === true) {
        setLoginInfo(response.data.member);
        onHide();
        reset();
      } else {
        event.stopPropagation();
      }
      alert(message);
    } catch (error) {
      alert("로그인에 실패했습니다." + error);
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal {...props} className="signin-modal">
      <Modal.Body className="px-0 py-2 py-sm-0">
        <CloseButton onClick={onHide} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
        <div className="row mx-0 align-items-center">
          <div className="col-md-6 border-end-md p-4 p-sm-5">
            <h2 className="h3 mb-4 mb-sm-5 hanamdaum">로그인</h2>
            <div className="d-flex justify-content-center">
              <ImageLoader src="/images/로그인/로그인.jpg" width={344} height={332} alt="Illusration" />
            </div>
            <div className="mt-4 mt-sm-5 GmarketSansMedium">
              계정이 없으신가요?{" "}
              <a href="#" onClick={onSwap}>
                여기서 가입
              </a>
              하실 수 있어요
            </div>
          </div>
          <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5 GmarketSansMedium ">
            <Button
              variant={` ${pillButtons ? "" : ""} w-100 mb-0`}
              onClick={() => {
                setSnsType("naver");
                window.location.replace(NAVER_AUTH_URL);
              }}
            >
              <ImageLoader src="/images/로그인/네이버 로그인.png" width={400} height={55} placeholder={false} alt="헤더 이미지" />
            </Button>
            <Button
              variant={` ${pillButtons ? "" : ""} w-100 mb-0`}
              onClick={() => {
                setSnsType("kakao");
                window.location.replace(KAKAO_AUTH_URL);
              }}
            >
              <ImageLoader src="/images/로그인/카카오 로그인.png" width={400} height={55} placeholder={false} alt="헤더 이미지" />
            </Button>
            <div className="d-flex align-items-center py-3 mb-3">
              <hr className="w-100" />
              <div className="px-3">Or</div>
              <hr className="w-100" />
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="si-email" className="mb-4 GmarketSansMedium">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="이메일을 입력해 주세요." value={email} onChange={handleEmailChange} required />
              </Form.Group>
              <Form.Group className="mb-4 GmarketSansMedium">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Form.Label htmlFor="si-password" className="mb-0">
                    Password
                  </Form.Label>
                  <Link href="#" className="fs-sm mb-0">
                    비밀번호 찾기
                  </Link>
                </div>
                <PasswordToggle id="si-password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={handlePasswordChange} required />
              </Form.Group>
              <Button type="submit" size="lg" variant={`primary ${pillButtons ? "rounded-pill" : ""} w-100 GmarketSansMedium`}>
                로그인
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModalLight;
