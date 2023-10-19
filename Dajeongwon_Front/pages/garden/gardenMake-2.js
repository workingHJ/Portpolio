import {use, useState, useReducer, useContext, useEffect} from "react";
import Layout from "../components/Layout";
import {useRouter} from "next/router";
import {Form, InputGroup, Row, FormControl, Col} from "react-bootstrap";
import GardenMakeLayout from "../../components/partials/GardenMakeLayout";
import ImageLoader from "../../components/ImageLoader";
import {Card, CardImg} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {FormDataContext} from "./gardenMake-1";
import {LoginContext} from "../_app";
import FormGroup from "../../components/FormGroup";
import MemberInGardenMake from "../../components/MemberInGardenMake";
import apiClient from "../../services/apiClient";
import Link from "next/link";

const gardenMakeTwo = () => {
  const router = useRouter();
  const {gNo, accessType} = router.query;
  const {loginInfo} = useContext(LoginContext);

  const [inviteMember, setInviteMember] = useState("");
  const [inviteValidate, setInviteValidate] = useState({});
  const [inviteMemberList, setInviteMemberList] = useState([]);

  const getMemberByEmail = async (inviteMember) => {
    try {
      const response = await apiClient.get("/member/getMemberByEmail", {
        params: {
          gNo: gNo,
          email: inviteMember,
        },
      });
      const message = response.data.message;
      const result = response.data.result;
      if (result === true) {
        setInviteValidate({
          result: result,
          message: message,
          nickName: response.data.nickName,
          mNo: response.data.mNo,
          mImg: response.data.mImg,
          memberSNSType: response.data.memberSNSType,
        });
        inviteMemberList.push(response.data);
        console.log(inviteMemberList);
      } else {
        setInviteValidate({
          result: result,
          message: message,
        });
      }
    } catch (error) {
      alert(error + " 아이디 검색 실패 ");
    }
  };

  const addMembers = async (mNoArray) => {
    try {
      const response = await apiClient.post("/garden/addMembers", {
        gNo: gNo,
        mNoList: mNoArray,
      });
      if (response.data.result == true) {
        alert("멤버를 추가했습니다. 다음 페이지로 이동합니다.");
        router.push(`/garden/gardenMake-3?accessType=${accessType}&gNo=${gNo}`);
      } else {
      }
    } catch (error) {
      alert(error + " 멤버 추가에 실패했습니다. 다정원 관리자에게 문의해주세요.");
    }
  };

  const handleAddMember = () => {
    const mNoArray = inviteMemberList.map((member) => member.mNo);
    addMembers(mNoArray);
  };

  const removeMember = (mNo) => {
    const updatedInviteMemberList = inviteMemberList.filter((member) => member.mNo !== mNo);
    // inviteMemberList 업데이트
    setInviteMemberList(updatedInviteMemberList);
  };

  return (
    <Layout pageTitle="모임 만들기" activeNav="Account" userLoggedIn>
      <GardenMakeLayout activeStep="인원 추가하기" nextStep="/made/gardenMake-3">
        <div className="d-flex">
          <h3 className="hanamdaum">
            <i className="fi-friends text-primary me-3"> </i>인원 추가
          </h3>
          <div className="text-hdGray pyeongChang-regular pt-2 ms-3"> 이따가 해도 괜찮아요</div>
        </div>

        <FormGroup controlId="memberInput" className="rounded-md-pill mt-3 mb-4 pyeongChang-regular">
          <InputGroup className="h-75">
            <InputGroup.Text className="text-muted">
              <i className="fi-search"></i>
            </InputGroup.Text>
            <Form.Control controlId="addMember" placeholder="사용자 이메일" value={inviteMember} onChange={(e) => setInviteMember(e.target.value)} className="rounded-3"></Form.Control>
            <Button variant="primary rounded-pill" onClick={() => getMemberByEmail(inviteMember)}>
              검색
            </Button>
          </InputGroup>
          <Row className="justify-content-between"></Row>
        </FormGroup>
        <Row className="justify-content-between">
          {inviteValidate.result == false && <div className="pyeongChang-regular text-primary mb-2"> 이메일로 검색되지 않습니다. 다시 확인해주세요. </div>}
          {inviteMemberList &&
            inviteMemberList.map((member) => (
              <MemberInGardenMake key={member.mno} img={member.mImg} mNo={member.mNo} sysType={member.sysType} nickName={member.nickName} onClick={() => removeMember(member.mNo)} />
            ))}
        </Row>
        <Row className="text-end pyeongChang-regular flex-row">
          <div>
            <Link href={`/garden/gardenMake-3?gNo=${gNo}`} className="text-end text-decoration-none me-4">
              다음에 하기
            </Link>
            {inviteMemberList.length > 0 && (
              <Button className="rounded-3" onClick={handleAddMember}>
                다음
              </Button>
            )}
          </div>
        </Row>
      </GardenMakeLayout>
    </Layout>
  );
};

export default gardenMakeTwo;
