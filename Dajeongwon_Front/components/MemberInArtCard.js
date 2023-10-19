import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import ImageLoader from "./ImageLoader";
import {Badge, Button, CloseButton, Col, Form, FormGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import apiClient from "../services/apiClient";

const MemberInArtCard = ({img, nickName, gNo, makerMNo, loggedInMNo, auth, mNo, light, className, onClick, isAdmin, completed, sysType, ...props}) => {
  useEffect(() => {});
  const extraClass = className ? ` ${className}` : "";
  let imgPath;

  if (sysType === "none" || sysType == null) {
    imgPath = "http:localhost:80/" + img;
  } else {
    imgPath = img;
  }
  let isMaker = false;
  if (makerMNo == mNo) {
    isMaker = true;
  }

  // 멤버 삭제 모달
  const [deleteMemberModalShow, setDeleteMemberModalShow] = useState(false);
  const handleDeleteMemberModalShow = () => setDeleteMemberModalShow(true);
  const handleDeleteMemberModalClose = () => setDeleteMemberModalShow(false);
  const [kickOutReason, setKickOutReason] = useState("");

  const handleDeleteMemberSubmit = (event) => {
    event.preventDefault();
    kickOutMember();
  };

  const kickOutMember = async () => {
    try {
      const response = await apiClient.get("/garden/kickOutMember", {
        params: {
          gNo: gNo,
          deportedMNo: mNo,
          executeMNo: loggedInMNo,
          kickOutReason: kickOutReason,
        },
      });
      const message = response.data.message;
      if (response.data.result === true) {
        alert(message);
        handleDeleteMemberModalClose();
        completed();
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleAuthClick = () => {
    if (makerMNo == loggedInMNo) {
      setMemberAuth();
    }
  };

  const setMemberAuth = async () => {
    let confirmationMessage;
    if (isAdmin === "Y") {
      confirmationMessage = "클릭한 멤버는 현재 관리자입니다. 일반으로 변경할까요?";
    } else {
      confirmationMessage = "클릭한 멤버를 관리자로 변경하시겠어요?";
    }

    if (confirm(confirmationMessage)) {
      try {
        const response = await apiClient.get("/garden/setMemberAuth", {
          params: {
            gNo: gNo,
            mNo: mNo,
            isAdmin: isAdmin,
          },
        });
        const message = response.data.message;
        if (response.data.result === true) {
          alert(message);
          completed();
        } else {
          alert(message);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <div {...props} className={`card card-hover mb-4 w-48 position-relative bg-secondary${extraClass}`}>
        <div className="card-body py-2 pyeongChang-regular">
          <div className="d-flex align-items-center" onClick={handleAuthClick}>
            <div className="position-relative rounded-circle overflow-hidden flex-shrink-0 d-none d-sm-block pb-2" style={{width: 70, height: 70}}>
              {img && <ImageLoader src={imgPath} layout="fill" objectFit="cover" quality={90} alt={img.alt} light={light ? 1 : 0} />}
            </div>
            <div className="ms-5 overflow-hidden memberCard">
              <h5 className="card-title mt-2">{nickName}</h5>
            </div>
            {isAdmin === "Y" && (
              <div>
                <Badge className="ms-4 rounded-pill text-dark-brown pt-2" bg="warning">
                  관리자
                </Badge>
              </div>
            )}
          </div>
          {!isMaker && auth === "Y" && loggedInMNo != mNo && (
            <Button className="position-absolute top-0 end-0" variant="primary rounded-3 btn-icon" size="sm" onClick={handleDeleteMemberModalShow}>
              <i className="fi-minus-circle fs-lg"></i>
            </Button>
          )}
        </div>
      </div>

      {/* 멤버 삭제 모달창 */}
      {deleteMemberModalShow && (
        <Modal className="pyeongChang-regular" centered show={handleDeleteMemberModalShow} onHide={handleDeleteMemberModalClose}>
          <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
            <Modal.Title as="h4" className="mt-4 text-center">
              인원 추방
            </Modal.Title>
            <CloseButton onClick={handleDeleteMemberModalClose} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
          </Modal.Header>
          <Modal.Body className="px-sm-5 px-4">
            <Form onSubmit={handleDeleteMemberSubmit}>
              <Form.Group>
                <Form.Label className="mb-3 fs-6">
                  <span className="text-primary"> {nickName}</span>님을 정말로 추방하시겠어요? 사유를 간단히 적어주세요.
                </Form.Label>
                <Form.Control controlId="addMember" value={kickOutReason} onChange={(e) => setKickOutReason(e.target.value)} className="rounded-3 mb-3"></Form.Control>
                <Button type="submit" variant="primary d-block w-100" className="my-3">
                  인원 추방하기
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default MemberInArtCard;
