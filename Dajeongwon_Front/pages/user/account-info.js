import {useRef, useState, useEffect, useContext, createContext} from "react";
import Layout from "../components/Layout";
import AccountHeader from "../components/AccountHeader";
import AccountNav from "../components/AccountNav";
import PasswordToggle from "../../components/PasswordToggle";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import {useAccordionButton} from "react-bootstrap/AccordionButton";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PwUpModalLight from "../../components/partials/PwUpModalLight";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";
import {useRouter} from "next/router";
import ImageLoader from "../../components/ImageLoader";

const AccountInfoPage = () => {
  // Add class to body to enable gray background
  const {loginInfo, setLoginInfo} = useContext(LoginContext);

  // 로그인 정보 가져오는 거
  const getLoginInfo = async () => {
    try {
      var response = await apiClient.get("/loginInfo", {withCredentials: true});
      if (response.data.result === true) {
        setLoginInfo(response.data.member);
      } else {
        alert("로그인이 되지 않았습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Custom accordion toggle
  const CustomToggle = ({eventKey}) => {
    const handleClick = useAccordionButton(eventKey, (e) => e.preventDefault());
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
        <a href="#" className="nav-link py-0" onClick={handleClick}>
          <i className="fi-edit"></i>
        </a>
      </OverlayTrigger>
    );
  };

  // State: 비밀번호 변경 모달 열기/닫기
  const [pwupShow, setPwupShow] = useState(false);
  const handlePwupClose = () => setPwupShow(false);
  const handlePwupShow = () => setPwupShow(true);

  // Email field state

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleMimgChange = (e) => {
    setMimg(e.target.value);
  };

  // Password field state
  const [email, setEmail] = useState("");
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault(); // 이벤트의 기본 동작 중단

    if (nickName.length === 0) {
      alert("변경할 닉네임을 입력해 주세요.");
      return;
    }
    try {
      const response = await apiClient.post(
        "/update",
        {
          mno: loginInfo.mno,
          email: loginInfo.email,
          nickName: nickName,
        },
        {withCredentials: true}
      );
      console.log(response);
      if (response.data.result === true) {
        alert("회원정보가 수정되었습니다.");
        getLoginInfo();
      } else {
        alert("회원정보 수정 실패!");
      }
    } catch (e) {
      console.log(e);
      alert("회원정보 수정 실패!!");
    }
  };

  return (
    <Layout pageTitle="회원정보 수정" activeNav="Account" userLoggedIn>
      {/* Page container */}
      <Container className="mt-5 mb-md-4 py-5">
        {/* Page header */}
        <AccountHeader breadcrumb="회원정보 수정" getLoginInfo={getLoginInfo} />

        {loginInfo != null && (
          <Card className="shadow-sm">
            <Card.Body className="p-4 p-md-5">
              {/* Account navigation */}
              <AccountNav activeNav="/user/account-info" />

              {/* Page content */}
              <h1 className="h3 mb-4 pt-2 GmarketSansMedium">회원정보 수정</h1>
              <Accordion className="rounded-3 p-3 mb-2">
                {/* Name */}
                <div className="border-bottom pb-3 mb-3 GmarketSansMedium">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="pe-2">
                      <h2 className="form-label fw-bold mt-1 mb-2 ms-3 fs-5">Email</h2>
                      <p className="mb-0 ms-3 pt-2 mt-2 fs-4">{loginInfo.email}</p>
                    </div>
                  </div>
                </div>

                {/* Gender */}
                <div className="border-bottom pb-3 mb-3 GmarketSansMedium">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="pe-2">
                      <h2 className="form-label fw-bold mt-1 mb-2 ms-3 fs-5">닉네임</h2>
                      <p className="mb-0 ms-3 pt-2 mt-2 fs-5">{loginInfo.nickName}</p>
                    </div>
                    <CustomToggle eventKey="nickname" />
                  </div>
                  <Accordion.Collapse eventKey="nickname">
                    <FormControl type="text" className="mt-3" value={nickName} onChange={handleNicknameChange} placeholder="변경할 닉네임을 입력해 주세요." />
                  </Accordion.Collapse>
                </div>
              </Accordion>

              <div className="d-flex align-items-center justify-content-end mt-4 pyeongChang-regular">
                <Button variant="outline-primary px-3 me-3" onClick={handlePwupShow}>
                  비밀번호 변경
                </Button>
                &nbsp;
                <Button type="submit" variant="primary  px-3" onClick={handleUpdateSubmit}>
                  회원정보 저장
                </Button>
              </div>
              {/* Sign in modal */}
              {<PwUpModalLight centered size="lg" pillButtons show={pwupShow} onHide={handlePwupClose} />}
            </Card.Body>
          </Card>
        )}
      </Container>
    </Layout>
  );
};

// - TO DO
// - 1. 비밀번호 누르면 현재 비밀번호 / 바꿀 비밀번호 띄우기(현재 비밀번호 확인 버튼 만들기)
// - 2.  수정 버튼 submit하면 alert으로 현재 mNo랑 수정하려는 데이터 전송하기 (정보 수정, 패스워드 체인지, delete account 모두)

export default AccountInfoPage;
