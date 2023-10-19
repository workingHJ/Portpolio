import {useState} from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import ImageLoader from "../ImageLoader";
import PasswordToggle from "../PasswordToggle";
import apiClient from "../../services/apiClient";

const SignUpModalLight = ({onSwap, pillButtons, ...props}) => {
  // Form validation
  const [validated, setValidated] = useState(false);

  // 입력값
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 추가: 비밀번호 확인용 상태값

  // 입력 핸들
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value); // 추가: 비밀번호 확인용 상태값 업데이트
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      try {
        // 프론트엔드에서 백엔드로 로그인 요청 보내기
        const response = await apiClient.post(
          "/enroll",
          {
            email: email,
            nickName: nickname,
            password: password,
          },
          {withCredentials: true}
        );

        if (response.data.result === true) {
          // 로그인 성공 처리
          alert("회원가입 성공!");
          location.reload();
          // 여기서 로그인에 성공한 후 필요한 동작 수행
        } else if (response.data.result === false) {
          // 회원가입 실패 처리
          alert("회원가입 실패");
          location.reload();
        }
      } catch (error) {
        alert("회원가입이 정상적으로 이루어지지 않았습니다.");
      }

      setValidated(true);
      // 여기서 실제 회원가입 처리를 진행할 수 있습니다.
    }
  };

  return (
    <Modal {...props} className="signup-modal">
      <Modal.Body className="px-0 py-2 py-sm-0">
        <CloseButton onClick={props.onHide} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />

        <div className="row mx-0 align-items-center">
          <div className="col-md-6 border-end-md p-4 p-sm-5">
            <h2 className="h3 mb-4 mb-sm-5 hanamdaum">
              회원가입
              <br />
            </h2>
            <ul className="list-unstyled mb-4 mb-sm-5 GmarketSansLight">
              <li className="d-flex mb-2">
                <i className="fi-check-circle text-primary mt-1 me-2"></i>
                <span>모임에 참여해서 함께 작품을 볼 수 있어요</span>
              </li>
              <li className="d-flex mb-2 GmarketSansLight">
                <i className="fi-check-circle text-primary mt-1 me-2"></i>
                <span>작품 감상을 자유롭게 남길 수 있어요</span>
              </li>
              <li className="d-flex mb-0 GmarketSansLight">
                <i className="fi-check-circle text-primary mt-1 me-2 "></i>
                <span>다정원의 이벤트에 참여할 수 있어요</span>
              </li>
            </ul>
            <div className="d-flex justify-content-center">
              <ImageLoader src="/images/signin-modal/signup.svg" width={344} height={404} alt="Illusration" />
            </div>
            <div className="mt-sm-4 pt-md-3 GmarketSansMedium">
              이미 가입 하셨나요?{" "}
              <a href="#" onClick={onSwap}>
                로그인
              </a>
              하세요
            </div>
          </div>
          <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5 GmarketSansMedium ">
            <Button variant={` ${pillButtons ? "" : ""} w-100 mb-0`}>
              <ImageLoader src="/images/로그인/네이버 로그인.png" width={400} height={60} placeholder={false} alt="헤더 이미지" />
            </Button>

            <Button variant={` ${pillButtons ? "" : ""} w-100 mb-0`}>
              <ImageLoader src="/images/로그인/카카오 로그인.png" width={400} height={60} placeholder={false} alt="헤더 이미지" />
            </Button>

            <div className="d-flex align-items-center py-3 mb-3">
              <hr className="w-100" />
              <div className="px-3">Or</div>
              <hr className="w-100" />
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="su-name" className="GmarketSansMedium ">
                <Form.Label className="pt-1">이메일</Form.Label>
                <Form.Control type="email" placeholder="이메일을 입력해 주세요." value={email} onChange={handleEmailChange} required />
                <Button className="d-flex mt-2 ms-auto h-25 py-1 px-3 fs-sm fw-normal" variant="outline-primary">
                  중복 확인
                </Button>
              </Form.Group>
              <Form.Group controlId="su-nickname" className="mb-4 GmarketSansMedium">
                <Form.Label>닉네임</Form.Label>
                <Form.Control type="nickname" placeholder="닉네임을 입력해 주세요." value={nickname} onChange={handleNicknameChange} required />
              </Form.Group>
              <Form.Group className="mb-4 GmarketSansMedium">
                <Form.Label htmlFor="su-password">
                  패스워드 <span className="fs-sm text-muted"></span>
                </Form.Label>
                <PasswordToggle id="su-password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={handlePasswordChange} required />
              </Form.Group>
              <Form.Group className="mb-4 GmarketSansMedium">
                <Form.Label htmlFor="su-confirm-password">패스워드 확인</Form.Label>
                <PasswordToggle id="su-confirm-password" placeholder="비밀번호를 입력해 주세요." value={confirmPassword} onChange={handleConfirmPasswordChange} required />
              </Form.Group>
              <Form.Check
                type="checkbox"
                id="terms-agree"
                label={[
                  <label>
                    <div key={1}></div>
                    <Link key={2} href="#">
                      이용약관
                    </Link>
                    <span key={3}> 및 </span>
                    <Link key={4} href="#">
                      개인정보 보호정책
                    </Link>
                    <span key={5}>에 동의합니다</span>
                  </label>,
                ]}
                required
                className="mb-4 GmarketSansMedium"
              />
              <Button type="submit" size="lg" variant={`primary ${pillButtons ? "rounded-pill" : ""} w-100 GmarketSansMedium`}>
                회원가입
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModalLight;
