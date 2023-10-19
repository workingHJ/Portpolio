import {useState, useEffect, useContext,} from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import ImageLoader from "../ImageLoader";
import PasswordToggle from "../PasswordToggle";
import apiClient from "../../services/apiClient";
import { LoginContext } from "../../pages/_app";

const PwUpModalLight = ({onSwap, pillButtons, ...props}) => {
  // Form validation
  const [validated, setValidated] = useState(false);
  const {loginInfo, setLoginInfo} = useContext(LoginContext);

  useEffect(() => {
    getLoginInfo();
}, []);


const getLoginInfo = async () => {
  try {
      var response = await apiClient.get('/loginInfo', { withCredentials: true });
      if (response.data.result === true) {
          setLoginInfo(response.data.member);
      } else {
          alert('로그인이 되지 않았습니다.');
          location.href = "/";
      }
  } catch (e) {
      console.log(e);
  }
}
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
    if(password !== confirmPassword){
      alert('패스워드가 일치하지 않습니다.')
      return;
  }
  passwordUpdateRequest(data.get('Password'));

  };
  const passwordUpdateRequest = async (userPwd) => {
    try {
        const response = await apiClient.post('/updatePwd', 
        {
          password : password
        }, { withCredentials: true });
        console.log(response);
        if (response.data.result === true) {
            alert('비밀번호가 수정되었습니다.');
            location.reload();
        } else {
            alert('비밀번호 수정 실패!');

        }
    } catch (e) {
        console.log(e);
        alert('비밀번호 수정 실패!');
    }
    setValidated(true);
}
  return (
    <Modal {...props} className="pwup-modal">
      <Modal.Body className="px-0 py-2 py-sm-0">
        
        <CloseButton onClick={props.onHide} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
        <div className="row mx-0 align-items-center">
          <div className="col-md-6 border-end-md p-4 p-sm-5">
            <h2 className="h3 mb-4 mb-sm-5 hanamdaum">비밀번호 수정</h2>
            <div className="d-flex justify-content-center">
              <ImageLoader src="/images/signin-modal/signin.svg" width={344} height={292} alt="Illusration" />
            </div>
          </div>
          <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5 GmarketSansMedium ">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="si-email" className="mb-4 GmarketSansMedium">
              <Form.Label htmlFor="si-password" className="mb-0">
                    변경할 비밀번호
                  </Form.Label>
                <PasswordToggle id="si-password" placeholder="새로운 비밀번호 입력" value={password} onChange={handlePasswordChange} required />
              </Form.Group>
              <Form.Group className="mb-4 GmarketSansMedium">
                <div className="d-flex align-items-center justify-content-between mb-2">
                <Form.Label htmlFor="si-password2" className="mb-0">
                   변경할 비밀번호 확인
                  </Form.Label>
                </div>
                <PasswordToggle id="si-confirmPassword" placeholder="새로운 비밀번호 입력" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
              </Form.Group>
              <br/>
              <Button type="submit" size="lg" variant={`primary ${pillButtons ? "rounded-pill" : ""} w-100 GmarketSansMedium`}>
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
