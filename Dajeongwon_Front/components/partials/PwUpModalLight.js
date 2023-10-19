import {useState, useEffect, useContext} from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import ImageLoader from "../ImageLoader";
import PasswordToggle from "../PasswordToggle";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../../pages/_app";

const PwUpModalLight = ({onSwap, pillButtons, ...props}) => {
  // Form validation
  const [validated, setValidated] = useState(false);
  const {loginInfo, setLoginInfo} = useContext(LoginContext);

  // 입력값
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 입력 핸들
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value); // 추가: 비밀번호 확인용 상태값 업데이트
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (password !== confirmPassword) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }
    passwordUpdateRequest(data.get("Password"));
  };
  const passwordUpdateRequest = async (userPwd) => {
    try {
      const response = await apiClient.post(
        "/updatePwd",
        {
          password: password,
        },
        {withCredentials: true}
      );
      console.log(response);
      if (response.data.result === true) {
        alert("비밀번호가 수정되었습니다.");
        props.onHide();
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("비밀번호 수정 실패!");
      }
    } catch (e) {
      console.log(e);
      alert("비밀번호 수정 실패!");
    }
    setValidated(true);
  };
  return (
    <Modal {...props} className="pwup-modal ">
      <Modal.Body className="px-0 py-2 py-sm-0">
        <CloseButton onClick={props.onHide} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
        <div className="row mx-0 align-items-center">
          <div className="my-3 py-3 px-3 pyeongChang-regular">
            <Modal.Title className="text-center mb-3">비밀번호 변경</Modal.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="si-email" className="mb-4 GmarketSansMedium">
                <Form.Label htmlFor="si-password" className="mb-2 fs-6">
                  변경할 비밀번호
                </Form.Label>
                <PasswordToggle id="si-password" placeholder="새로운 비밀번호 입력" value={password} onChange={handlePasswordChange} required />
              </Form.Group>
              <Form.Group className="mb-2 GmarketSansMedium">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Form.Label htmlFor="si-password2" className="mb-0 fs-6">
                    변경할 비밀번호 확인
                  </Form.Label>
                </div>
                <PasswordToggle id="si-confirmPassword" placeholder="새로운 비밀번호 입력" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
              </Form.Group>
              <br />
              <Button type="submit" size="lg" variant={`primary ${pillButtons ? "rounded-pill" : ""} w-100 GmarketSansMedium fs-6 fw-normal`}>
                비밀번호 변경
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PwUpModalLight;
