import {useEffect, useState, useContext} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ImageLoader from "../../components/ImageLoader";
import Avatar from "../../components/Avatar";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloseButton from "react-bootstrap/CloseButton";
import Layout from "../components/Layout";
import {Badge, FormControl, Pagination, Spinner} from "react-bootstrap";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ArtCard from "../../components/ArtCard";
import GardenDetailArt from "../components/GardenDetailArt";
import apiClient from "../../services/apiClient";
import MemberInArtCard from "../../components/MemberInArtCard";
import {LoginContext} from "../_app";
import ArtSearchModal from "../components/ArtSearchModal";

const GardenDetail = ({light, props, gardenData}) => {
  const [loading, setLoading] = useState(!gardenData);
  const [data, setData] = useState({gardenData});
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  const [totalCount, setTotalCount] = useState(gardenData.artTotal);
  const [completedCount, setCompletedCount] = useState(gardenData.completed);

  //artList 가져오는 거
  const [artList, setArtList] = useState([]);

  const router = useRouter();
  const {type, gNo} = router.query;

  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    const main = document.querySelector(".page-wrapper");
    main.classList.add("bg-gNw");
    if (data) {
      // 데이터 로딩이 완료되면 로딩 상태를 false로 변경
      getArtList(gardenData.gno);
      setLoading(false);
      getMemberList();
    }

    return () => {
      body.classList.remove("fixed-bottom-btn");
      body.classList.remove("bg-gNw");
    };
  }, []);

  useEffect(() => {
    if (loginInfo) {
      getIsAdmin();
    }
  }, [loginInfo]);

  useEffect(() => {
    getArtTotalCount();
  }, [artList]);

  // Offcanvas show/hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //isAdmin, isMember 체크
  const [isAdmin, setIsAdmin] = useState("N");
  const [isMember, setIsMember] = useState(false);
  const getIsAdmin = async () => {
    const response = await apiClient.get("/garden/checkMember", {
      params: {gNo: gardenData.gno, mNo: loginInfo.mno},
    });
    if (response.data.isMember === false) {
      setIsMember(false);
    } else {
      setIsMember(true);
      setIsAdmin(response.data.isAdmin);
    }
  };

  const getArtList = async (gNo) => {
    const response = await apiClient.get("/garden/getArtList", {
      params: {gNo},
    });
    if (response.data.result == "ok") {
      setArtList(response.data.artList);
      setFilteredArtList(response.data.artList);
    } else {
      alert("artList를 가져오려다가 문제가 발생했습니다");
      setArtList(null);
    }
  };

  // memberList
  const [memberList, setMemberList] = useState([]);
  const getMemberList = async () => {
    const response = await apiClient.get("/garden/getGardenMembers", {
      params: {gNo: gardenData.gno},
    });
    if (response.data.result == true) {
      setMemberList(response.data.memberList);
      setFilteredMembers(response.data.memberList);
    } else {
      alert("memberList를 가져오려다가 문제가 발생했습니다");
      setMemberList(null);
    }
  };

  // 데이트 피커
  const [defaultDate, setDefaultDate] = useState(new Date());
  if (data.gardenData?.meetingDate) {
    setDefaultDate(data.gardenData.meetingDate);
  }
  const forDatePick = new Date(defaultDate);

  // 모임 설명 수정하는 모달
  const [descModalShow, setDescModalShow] = useState(false);
  const handleDescModalClose = () => setDescModalShow(false);
  const handleDescModalShow = () => setDescModalShow(true);

  // 모임 설명 데이터
  const [desc, setDesc] = useState(data.gardenData.description);
  const handleDescChange = (event) => {
    const newDesc = event.target.value;
    setDesc(newDesc);
  };

  //타이틀 데이터
  const [title, setTitle] = useState(data.gardenData.title);
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  };

  const [regularTime, setRegularTime] = useState(data.gardenData.regularTime);
  const handleRegularTime = (event) => {
    const newRegularTime = event.target.value;
    setRegularTime(newRegularTime);
  };

  //업데이트 이후 자동로딩
  const updateGardenData = () => {
    const updatedGardenData = {...data.gardenData, title: title, description: desc, regularTime: regularTime};
    setData({...data, gardenData: updatedGardenData});
  };

  // 모임 설명 수정모달 데이터 체크
  const [descValidated, setDescValidated] = useState(false);
  const handleTitleDescSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      updateDescTitle(desc, title, regularTime);
      handleDescModalClose();
    }
    setDescValidated(true);
  };

  // desc title 데이터 전달
  const updateDescTitle = async (desc, title, regularTime) => {
    const response = await apiClient.get("/garden/updateDescTitle", {
      params: {
        gNo: data.gardenData.gno,
        description: desc,
        title: title,
        regularTime: regularTime,
      },
    });
    if (response.data.result == "ok") {
      updateGardenData();
    } else {
      alert("뭔가 문제 생김");
    }
  };

  // 일정 수정 모달
  const [dateModalShow, setDateModalShow] = useState(false);
  const handleDateModalClose = () => setDateModalShow(false);
  const handleDateModalShow = () => setDateModalShow(true);
  const handleDateChange = (date) => {
    const updatedDate = date.toISOString().split("T")[0]; // 날짜를 문자열로 변환하여 저장합니다.
    setGarden((prevGarden) => ({
      ...prevGarden,
      meetingDate: updatedDate,
    }));
  };

  //  일정 수정 모달 데이터 체크
  const [dateValidated, setDateValidated] = useState(false);
  const handleDateSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      handleDateModalClose();
    }
    setDateValidated(true);
  };

  // 모임(정원) json, 자바 객체 json으로 변환
  // const year = data.gardenData?.meetingDate?.substring(0, 4);
  // const month = data.gardenData?.meetingDate?.substring(6, 7);
  // const day = data.gardenData?.meetingDate?.substring(8, 10);

  // 작품 수정 모드
  const [editMode, setEditMode] = useState(false);
  // 검색 모드
  const [searchMode, setSearchMode] = useState(false);
  // 멤버 수정 모드
  const [memberListMode, setMemberListMode] = useState(false);

  //파지네이션
  //현재 페이지에 해당하는 아이템 추출
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = artList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(artList.length / itemsPerPage);

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Pagination.Item key={i} active={currentPage === i} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return pageButtons;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 검색 시 노출되는 거
  const [searchValue, setSearchValue] = useState("");
  const [filteredArtList, setFilteredArtList] = useState(null);

  const handleSearchChange = (event) => {
    event.preventDefault();
    filterArtList(searchValue);
  };

  const filterArtList = (searchValue) => {
    const filtered = artList.filter((art) => art.title.includes(searchValue));
    setFilteredArtList(filtered);
  };

  // 작품 삭제
  const handleArtDelete = (aNo, reviewCount) => {
    if (reviewCount > 0) {
      handleConfirmModalShow;
    }
    deleteArt(aNo);
  };

  // 작품 삭제 확인 모달
  const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false);
  const handleConfirmModalClose = () => setDeleteConfirmModalShow(false);
  const handleConfirmModalShow = () => setDeleteConfirmModalShow(true);

  const deleteArt = async (aNo, reviewCount) => {
    const response = await apiClient.get("/garden/deleteArt", {
      params: {
        gNo: data.gardenData.gno,
        aNo: aNo,
      },
    });
    if (response.data.result == "ok") {
      getArtList(gNo);
    } else {
      alert("작품을 삭제하는 데 실패했습니다. 한 번 더 확인해주세요.");
    }
  };

  // 모임 내 멤버 검색
  const [searchMemberValue, setSearchMemberValue] = useState("");
  const [filteredMembers, setFilteredMembers] = useState();

  const handleMemberSearch = (event) => {
    event.preventDefault();
    filterMembers(searchMemberValue);
  };

  const filterMembers = (searchMemberValue) => {
    console.log(searchMemberValue);
    const filtered = memberList.filter((member) => member.nickName.includes(searchMemberValue));
    console.log(filtered);
    setFilteredMembers(filtered);
  };

  //인원 추가
  const addMember = async () => {
    try {
      const response = await apiClient.get("/garden/addMember", {
        params: {
          gNo: gardenData.gno,
          mNo: inviteValidate.mNo,
        },
      });
      if (response.data.result == true) {
        handleAddMemberModalClose();
        getMemberList();
      } else {
      }
    } catch (error) {
      alert(error + " 인원 추가에 실패했습니다. 다정원 관리자에게 문의해주세요.");
    }
  };

  // 아이디 검색
  const getMemberByEmail = async (inviteMember) => {
    try {
      const response = await apiClient.get("/member/getMemberByEmail", {
        params: {
          gNo: data.gardenData.gno,
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
        });
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

  // 인원 추가 모달
  const [addMemberModalShow, setAddMemberModalShow] = useState(false);
  const handleAddMemberModalShow = () => setAddMemberModalShow(true);
  const handleAddMemberModalClose = () => setAddMemberModalShow(false);

  const [inviteMember, setInviteMember] = useState("");
  const [inviteValidate, setInviteValidate] = useState({});

  const handleAddMemberSubmit = (event) => {
    event.preventDefault();
    addMember();
    getMemberList();
  };

  const particiPateToGarden = async () => {
    alert("정원에 정말로 가입하시겠어요?");
    try {
      const response = await apiClient.get("/garden/addMember", {
        params: {
          gNo: gardenData.gno,
          mNo: loginInfo.mno,
        },
      });
      if (response.data.result == true) {
        alert("모임에 가입되었습니다.");
        getIsAdmin();
        getMemberList();
      } else {
      }
    } catch (error) {
      alert(error + " 멤버 가입에 실패했습니다. 다정원 관리자에게 문의해주세요.");
    }
  };

  // 멤버 삭제 모달
  const [deleteMemberModalShow, setDeleteMemberModalShow] = useState(false);
  const handleDeleteMemberModalShow = () => setDeleteMemberModalShow(true);
  const handleDeleteMemberModalClose = () => setDeleteMemberModalShow(false);
  const [kickOutReason, setKickOutReason] = useState("");

  const handleDeleteMemberSubmit = (event) => {
    event.preventDefault();
    getOutfromGarden();
    isMember(false);
  };

  const getOutfromGarden = async () => {
    try {
      const response = await apiClient.get("/garden/kickOutMember", {
        params: {
          gNo: gNo,
          deportedMNo: loginInfo.mno,
          executeMNo: loginInfo.mno,
          kickOutReason: kickOutReason,
        },
      });
      const message = response.data.message;
      if (response.data.result === true) {
        alert("정원에서 탈퇴되었습니다.");
        handleDeleteMemberModalClose();
        getMemberList();
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error);
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // 작품 추가 모달
  const [addArtModalShow, setAddArtModalShow] = useState(false);
  const handleAddArtModalClose = () => {
    setAddArtModalShow(false);
  };
  const handleAddArtModalShow = () => setAddArtModalShow(true);

  // ArtToTal Count

  const getArtTotalCount = async () => {
    try {
      const response = await apiClient.get("/garden/getArtTotalCount", {
        params: {
          gNo: gNo,
        },
      });
      if (response.data.result === true) {
        setTotalCount(response.data.totalCount);
        setCompletedCount(response.data.completeCount);
      } else {
        throw new Error("오류");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleArtRemoveComplete = () => {
    setEditMode(false);
    getArtTotalCount();
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Layout pageTitle={data.gardenData && data.gardenData.title} activeNav="Pages">
      {/* Page container */}
      {data.gardenData && (
        <Container className="mt-5 mb-md-3 mb-lg-4 py-5">
          {/* HeaderImg */}
          <div>
            <div className="position-relative">
              <ImageLoader src={`http:localhost:80/${data.gardenData.imgPath}`} objectFit="cover" width={1296} height={450} alt="Garden image" className="rounded-3" />
            </div>
            {/* 중간의 카드 */}
            <Card className="position-absolute gardenTitle d-flex justify-content-center">
              <div className="position-absolute gardenAuthorImg">
                <Avatar
                  img={{
                    src: data.gardenData.makerImg,
                    alt: "Avatar",
                  }}
                  size={[80, 80]}
                />
              </div>
              <Card.Body>
                <Card.Title as="h3" className="text-center hanamdaum  text-black">
                  {data.gardenData.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </div>

          <Row className="mt-5 pt-5">
            {/* Sidebar (offcanvas on screens < 992px) */}
            <Col as="aside" lg={4}>
              <Offcanvas show={show} onHide={handleClose} responsive="lg" className="pe-lg-3">
                <Offcanvas.Header closeButton className="shadow-sm mb-2">
                  <Offcanvas.Title as="h5">Sidebar</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {/* 정원 설명 */}
                  <Card className="card-flush py-2 py-lg-0 mb-4 pyeongChang-regular">
                    <Card.Body className="d-flex flex-column">
                      <Card.Subtitle as="h6" className="mb-3">
                        {data.gardenData.title}
                      </Card.Subtitle>
                      <div>
                        <Card.Text className="d-inline-block lh-160 mb-3">{data.gardenData.description}</Card.Text>
                      </div>
                      <div>
                        <Card.Text className="text-gray500 fs-sm">
                          <i className="fi-check me-2"> </i>모일 일정 :
                          {data.gardenData.regularTime === "none" ? <span className="ms-2">그때그때 정해요!</span> : <span> {data.gardenData.regularTime} </span>}
                        </Card.Text>
                      </div>
                      {/* 관리자일 때만 보이는 거  */}
                      {isAdmin === "Y" && (
                        <Button className="littleButton rounded-pill  ms-auto" size="sm" style={{width: "60px"}} onClick={handleDescModalShow}>
                          수정
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                  {/* 모임 설명 수정 모달 */}
                  <Modal className="pyeongChang-regular" centered show={descModalShow} onHide={handleDescModalClose}>
                    <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
                      <Modal.Title as="h4" className="mt-4 text-center">
                        모임 정보 수정
                      </Modal.Title>
                      <CloseButton onClick={handleDescModalClose} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
                    </Modal.Header>
                    <Modal.Body className="px-sm-5 px-4">
                      <Form noValidate validated={descValidated} onSubmit={handleTitleDescSubmit}>
                        <Form.Group controlId="title-text" className="mb-3">
                          <Form.Label className="fw-bold"> 모임 제목 </Form.Label>
                          <Form.Control type="search" value={title} onChange={handleTitleChange} required />
                          <Form.Control.Feedback type="invalid"> 모임 제목을 입력해주세요. </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="desc-text" className="mb-4">
                          <Form.Label className="fw-bold">설명</Form.Label>
                          <Form.Control as="textarea" rows={5} value={desc} onChange={handleDescChange} required />
                          <Form.Control.Feedback type="invalid"> 내용을 입력해주세요. </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="regularTime" className="mb-3">
                          <Form.Label> 모일 일정 </Form.Label>
                          <Form.Select defaultValue={data.gardenData.regularTime} onChange={handleRegularTime}>
                            <option value="none" disabled>
                              그때그때 다르게 만나요
                            </option>
                            <option value="1주에 한 번">1주에 한 번</option>
                            <option value="2주에 한 번">2주에 한 번</option>
                            <option value="한 달에 한 번">한 달에 한 번</option>
                          </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="primary d-block w-100 mb-4">
                          저장
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  {/* 이만큼 키웠어용 */}
                  <Card className="card-flush pb-2 pb-lg-0 mb-4 bg-lightYellow">
                    <Card.Body>
                      <Card.Text className="fs-base pyeongChang-regular mb-2"> 본 작품 개수</Card.Text>
                      <Card.Text className="h4 hanamdaum text-primary  mb-0 position-relative">
                        <span> {completedCount}</span> /<span> {totalCount}</span>
                      </Card.Text>
                      <Card.Text className="position-absolute text-vertical statusText hanamdaum pe-1 mt-4 h4">
                        <span> 이만큼 키웠어요 </span>
                      </Card.Text>
                      <div className="d-flex justify-content-center">
                        <ImageLoader src={`/images/꽃/${data.gardenData.flower}${data.gardenData.flowerStatus}.png`} width={100} height={186}></ImageLoader>
                      </div>
                    </Card.Body>
                  </Card>
                  {/* 다음 일정 */}
                  {loginInfo && (
                    <Card className="card-flush pb-2 pb-lg-0 mb-4">
                      <Card.Body>
                        <>
                          <div className="d-flex mb-2">
                            <h3 className="h5 hanamdaum ">다음 일정</h3>
                            {/* 관리자 */}
                            {isAdmin === "Y" && (
                              <Button className="littleButton rounded-pill ms-auto" onClick={handleDateModalShow} size="sm">
                                수정
                              </Button>
                            )}
                          </div>
                          {data.gardenData.meetingDate ? (
                            <div className="hanamdaum h2  mb-2 text-end">
                              <span className="me-2">
                                <span className="text-primary"> {month}</span>월
                              </span>
                              <span className="text-primary">{day}</span>일
                            </div>
                          ) : (
                            <div className="hanamdaum h4 mb-2 text-end">
                              <span> 정해진 일정이 없어요! </span>
                            </div>
                          )}
                        </>
                      </Card.Body>
                    </Card>
                  )}
                  {/* 일정 수정하는 Modal  */}
                  <Modal className="pyeongChang-regular" centered show={dateModalShow} onHide={handleDateModalClose}>
                    <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
                      <Modal.Title as="h4" className="mt-4 text-center">
                        현재 일정 수정
                      </Modal.Title>
                      <CloseButton onClick={handleDateModalClose} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
                    </Modal.Header>
                    <Modal.Body className="px-sm-5 px-4">
                      <Form noValidate validated={dateValidated} onSubmit={handleDateSubmit}>
                        <Form.Group controlId="date-time-input">
                          <InputGroup>
                            <Form.Control as={DatePicker} selected={forDatePick} onChange={(date) => handleDateChange(date)} dateFormat="yyyy, MMMM d" className="rounded pe-5" lang="ko" />
                            <i className="fi-calendar position-absolute top-50 end-0 translate-middle-y me-3"></i>
                          </InputGroup>
                        </Form.Group>
                        <Button type="submit" variant="primary d-block w-100 mb-4 mt-3">
                          저장
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  {/* 모임 멤버 */}
                  <Card className="card-flush pb-2 pb-lg-0 mb-2">
                    <Card.Body>
                      <div className="d-flex">
                        <h3 className="h5 mb-3 hanamdaum">정원 인원</h3>
                        {/* 멤버일 때만 */}
                        {isMember && (
                          <div className="text-decoration-none text-primary cursor ms-auto pyeongChang-regular" onClick={() => setMemberListMode(true)}>
                            <i className="fi-plus me-1 fs-sm "></i>
                            더보기
                          </div>
                        )}
                      </div>
                      <div className="pyeongChang-regular">
                        {memberList.length > 5 ? (
                          <>
                            {memberList.slice(0, 5).map((member) => (
                              <div key={member.mno} className="mb-3 d-flex">
                                <Avatar
                                  className={"me-2"}
                                  img={{
                                    src: member.mimg,
                                    alt: member.nickName,
                                  }}
                                  size={[30, 30]}
                                  writerSNStype={member.snsType}
                                />
                                <span className="text-hdgray"> {member.nickName}</span>
                                {member.gardenAdmin === "Y" ? (
                                  <Badge className="ms-3 rounded-pill text-dark-brown pt-2" bg="warning">
                                    관리자
                                  </Badge>
                                ) : (
                                  ""
                                )}
                              </div>
                            ))}
                            <div className="mb-3 d-flex">
                              <span className="text-gray500">... (총 {memberList.length}명) </span>
                            </div>
                          </>
                        ) : (
                          memberList.map((member) => (
                            <div key={member.mno} className="mb-3 d-flex">
                              <Avatar
                                className={"me-2"}
                                img={{
                                  src: member.mimg,
                                  alt: member.nickName,
                                }}
                                size={[30, 30]}
                                writerSNStype={member.snsType}
                              ></Avatar>
                              <span className="text-hdgray"> {member.nickName}</span>
                              {member.gardenAdmin === "Y" ? (
                                <Badge className="ms-3 rounded-pill text-dark-brown pt-2" bg="warning">
                                  관리자
                                </Badge>
                              ) : (
                                ""
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                  {loginInfo &&
                    data.gardenData.makerMNo != loginInfo.mno &&
                    (isMember ? (
                      <Button className="w-100 pyeongChang-regular mt-3 fs-6" size="lg" variant="translucent-primary" onClick={handleDeleteMemberModalShow}>
                        <i className="fi-user-x me-2"></i>
                        정원에서 나가기
                      </Button>
                    ) : (
                      <Button className="w-100 pyeongChang-regular mt-3 fs-6" size="lg" variant="translucent-primary" onClick={particiPateToGarden}>
                        <i className="fi-user-plus me-2"></i>
                        정원에 가입하기
                      </Button>
                    ))}

                  {/* 멤버 삭제 모달창 */}
                  {deleteMemberModalShow && (
                    <Modal className="pyeongChang-regular" centered show={handleDeleteMemberModalShow} onHide={handleDeleteMemberModalClose}>
                      <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
                        <Modal.Title as="h4" className="mt-4 text-center">
                          모임에서 탈퇴하기
                        </Modal.Title>
                        <CloseButton onClick={handleDeleteMemberModalClose} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
                      </Modal.Header>
                      <Modal.Body className="px-sm-5 px-4">
                        <Form onSubmit={handleDeleteMemberSubmit}>
                          <Form.Group>
                            <Form.Label className="mb-3 fs-6">
                              <span className="text-primary"> {data.gardenData.title} </span> 에서 나가시겠어요? 간략한 사유를 적어주세요.
                            </Form.Label>
                            <Form.Control controlId="addMember" value={kickOutReason} onChange={(e) => setKickOutReason(e.target.value)} className="rounded-3 mb-3"></Form.Control>
                            <Button type="submit" variant="primary d-block w-100" className="my-3">
                              <i className="fi-logout me-2"></i>
                              나가기
                            </Button>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  )}
                </Offcanvas.Body>
              </Offcanvas>
            </Col>
            {!memberListMode ? (
              <Col lg={8} className="card px-5">
                <div className="d-flex flex-wrap mt-5">
                  {editMode == false ? (
                    <>
                      <h2 className="hanamdaum"> 작품 목록 </h2>
                      <div className="ms-auto pyeongChang-regular">
                        <>
                          {searchMode ? (
                            <Button className="rounded-3 px-3 h-75 me-3" variant="outline-primary" onClick={() => setSearchMode(false)}>
                              <i className="fi-x me-2"></i>
                              검색 종료
                            </Button>
                          ) : (
                            <Button className="rounded-3 px-3 h-75 me-3" variant="outline-primary" onClick={() => setSearchMode(true)}>
                              <i className="fi-search me-2"></i>
                              작품 검색하기
                            </Button>
                          )}
                        </>
                        {isAdmin === "Y" && (
                          <Button className="rounded-3 px-3 h-75" onClick={() => setEditMode(true)}>
                            <i className="fi-edit me-2"></i>
                            목록 수정하기
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="hanamdaum"> 작품 목록 수정하기 </h2>
                      <div className="ms-auto pyeongChang-regular">
                        <Button className="rounded-3 px-3 h-75 me-2" variant="outline-primary" onClick={handleAddArtModalShow}>
                          <i className="fi-plus me-2"></i>
                          작품 추가하기
                        </Button>
                        <Button className="rounded-3 px-3 h-75 me-2" variant="primary" onClick={handleArtRemoveComplete}>
                          <i className="fi-arrow-forward-up me-2"></i>
                          수정 완료
                        </Button>
                      </div>

                      <ArtSearchModal
                        centered
                        pillButtons
                        show={addArtModalShow}
                        size="lg"
                        updateArtCount={getArtTotalCount}
                        completed={getArtList}
                        gNo={gNo}
                        existArtList={artList}
                        onHide={handleAddArtModalClose}
                      />
                    </>
                  )}
                </div>
                <div className="d-flex text-gray500 pb-2 mb-2">
                  <i className="fi-calendar me-2 pt-1"> </i>
                  <h6 className="text-gray500 pyeongChang-regular fw-normal">
                    {data.gardenData.endDate !== null ? (
                      <>
                        {data.gardenData.startDate.substring(0, 10)} ~ {data.gardenData.endDate.substring(0, 10)}
                      </>
                    ) : (
                      <>{data.gardenData.startDate.substring(0, 10)} ~ 기간 없음</>
                    )}
                  </h6>
                </div>

                {(editMode || searchMode) && (
                  <FormGroup className="d-block d-md-flex rounded-md-pill mb-5 pb-2 mb-sm-4 pyeongChang-regular" onSubmit={handleSearchChange}>
                    <InputGroup size="lg">
                      <InputGroup.Text className="text-muted ps-3">
                        <i className="fi-search"></i>
                      </InputGroup.Text>
                      <FormControl
                        aria-label="Search field"
                        placeholder="작품 이름 검색"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} // 검색어 입력 값을 searchValue로 설정
                      />
                    </InputGroup>
                    <hr className="d-md-none my-2" />
                    <div className="d-sm-flex">
                      <Button size="base" type="submit" className="rounded-pill w-100 w-md-auto ms-sm-3">
                        검색
                      </Button>
                    </div>
                  </FormGroup>
                )}

                {/* 작품 그리드 */}
                <Row className="d-flex pyeongChang-regular mt-2">
                  {/* currentItems 또는 filteredArtList를 조건에 따라 매핑합니다 */}
                  {currentItems &&
                    (searchMode === false
                      ? currentItems.map((art) => (
                          <ArtCard
                            editMode={editMode}
                            key={art.ano}
                            href={`artDetail?accessType=${gardenData.accessType}&gNo=${gardenData.gno}&aNo=${art.ano}`}
                            img={{
                              src: art.aimg,
                              size: [250, 350],
                              alt: "Image",
                            }}
                            rating={art.rating}
                            category={art.category}
                            title={decodeHTMLString(art.title)}
                            creator={art.creator}
                            reviewCount={art.reviewCount}
                            confirmModal={deleteConfirmModalShow}
                            status={art.status}
                            className="d-flex flex-column px-3"
                            onClick={() => handleArtDelete(art.ano, art.reviewCount)}
                          />
                        ))
                      : filteredArtList.map((art) => (
                          <ArtCard
                            editMode={editMode}
                            key={art.ano}
                            href={`artDetail?aNo=${art.ano}`}
                            img={{
                              src: art.aimg,
                              size: [250, 350],
                              alt: "Image",
                            }}
                            rating={art.rating}
                            category={art.category}
                            title={decodeHTMLString(art.title)}
                            creator={art.creator}
                            reviewCount={art.reviewCount}
                            confirmModal={deleteConfirmModalShow}
                            status={art.status}
                            className="d-flex flex-column mb-3 px-3"
                            onClick={() => handleArtDelete(art.ano)}
                          />
                        )))}
                  {!currentItems && searchMode === false && <div>현재 작품이 없어요! </div>}
                </Row>

                {/* 작품 삭제 모달 */}
                <Modal className="pyeongChang-regular" centered show={deleteConfirmModalShow} onHide={handleConfirmModalClose}>
                  <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
                    <Modal.Title as="h4" className="mt-4 text-center">
                      삭제 확인
                    </Modal.Title>
                    <CloseButton onClick={handleConfirmModalClose} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
                  </Modal.Header>
                  <Modal.Body className="px-sm-5 px-4">이미 감상이 작성된 작품입니다. 삭제하는 경우 감상을 볼 수 없게 돼요! 정말로 삭제하시겠어요?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary me-2" size="sm">
                      취소
                    </Button>
                    <Button variant="primary" size="sm">
                      삭제
                    </Button>
                  </Modal.Footer>
                </Modal>
                {artList && artList.length < 12 && <div style={{minHeight: "300px"}}></div>}
                {/* Pagination */}
                <nav className="d-flex justify-content-center mb-5" aria-label="Pagination">
                  <Pagination>{renderPageButtons()}</Pagination>
                </nav>
              </Col>
            ) : (
              <Col lg={8} className="card px-5">
                <div className="d-flex flex-wrap mt-5">
                  <h2 className="hanamdaum mb-4"> 정원 인원 목록 </h2>
                  <Button className="ms-auto h-50 pyeongChang-regular rounded-3 px-3" onClick={() => setMemberListMode(false)}>
                    <i className="fi-grid me-3"></i>작품 목록 보기
                  </Button>
                </div>
                <Row className="pyeongChang-regular">
                  <Col lg={6}>
                    <FormGroup className="d-block d-md-flex rounded-md-pill mb-5 py-0 mb-sm-4" onSubmit={handleMemberSearch}>
                      <InputGroup size="lg">
                        <InputGroup.Text className="text-muted ps-3">
                          <i className="fi-search me-2"></i>
                        </InputGroup.Text>
                        <FormControl
                          controlId="memberEmailSearch"
                          aria-label="Search field"
                          placeholder="멤버 닉네임 검색"
                          value={searchMemberValue}
                          onChange={(e) => setSearchMemberValue(e.target.value)} // 검색어 입력 값을 MemberSearchValue로 설ㅈㅇ
                        />
                      </InputGroup>
                      <Button size="base" type="submit" className="rounded-pill w-100 w-md-auto py-1 ms-sm-3">
                        검색
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col className="text-end">
                    {isAdmin === "Y" && (
                      <Button variant="outline-primary rounded-3" onClick={handleAddMemberModalShow}>
                        <i className="fi-user-plus me-3"></i>인원 추가
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row className="justify-content-between">
                  {filteredMembers.map((member) => (
                    <MemberInArtCard
                      img={member.mimg}
                      gNo={data.gardenData.gno}
                      mNo={member.mno}
                      loggedInMNo={loginInfo.mno}
                      sysType={member.sysType}
                      makerMNo={data.gardenData.makerMNo}
                      nickName={member.nickName}
                      isAdmin={member.gardenAdmin}
                      auth={isAdmin}
                      completed={getMemberList}
                    />
                  ))}
                </Row>
              </Col>
            )}
          </Row>

          {/* 인원 추가 모달창 */}
          <Modal className="pyeongChang-regular" centered show={addMemberModalShow} onHide={handleAddMemberModalClose}>
            <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
              <Modal.Title as="h4" className="mt-4 text-center">
                인원 추가
              </Modal.Title>
              <CloseButton onClick={handleAddMemberModalClose} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
            </Modal.Header>
            <Modal.Body className="px-sm-5 px-4">
              <Form onSubmit={handleAddMemberSubmit}>
                <Form.Group>
                  <Form.Label className="mb-3 fs-6">
                    초대할 멤버의 <span className="text-primary">이메일</span>을 입력해주세요
                  </Form.Label>
                  <Form.Control controlId="addMember" value={inviteMember} onChange={(e) => setInviteMember(e.target.value)} className="rounded-3 mb-3"></Form.Control>
                  <Button variant="outline-primary d-block w-100 mb-4" onClick={() => getMemberByEmail(inviteMember)}>
                    추가할 인원 확인하기
                  </Button>
                  {inviteValidate &&
                    (inviteValidate.nickName ? (
                      <div>
                        <span className="text-primary">{inviteValidate.nickName}</span>
                        {inviteValidate.message}
                      </div>
                    ) : (
                      inviteValidate.message
                    ))}

                  {inviteValidate.result === true && (
                    <Button type="submit" variant="primary d-block w-100" className="my-3">
                      인원 추가하기
                    </Button>
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      )}

      {/* Filters sidebar toggle button (visible < 991px) */}
      <Button size="sm" className="w-100 rounded-0 fixed-bottom d-lg-none" onClick={handleShow}>
        <i className="fi-sidebar-left me-2"></i>
        Sidebar
      </Button>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {type, gNo} = context.query;

  try {
    let gardenData = null;
    const response = await apiClient.get("/garden/getGarden", {
      params: {
        gNo: gNo,
      },
    });

    if (response.data.result === "ok") {
      gardenData = response.data.garden;
    } else {
      throw new Error("Failed to fetch public garden");
    }

    return {
      props: {
        gardenData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        gardenData: null,
      },
    };
  }
}

export default GardenDetail;
