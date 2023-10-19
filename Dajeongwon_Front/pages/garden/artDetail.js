import {useContext, useEffect, useState} from "react";
import Layout from "../components/Layout";
import Pagination from "react-bootstrap/Pagination";
import GardenReview from "../components/GardenReview";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import GardenReviewCard from "../components/GardenReviewCard";
import StarRating from "../../components/StarRating";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import CloseButton from "react-bootstrap/CloseButton";
import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";
import {useRouter} from "next/router";
import ImageLoader from "../../components/ImageLoader";

const GardenArt = ({artData, meetingDate, gardenTitle, flower, flowerStatus}) => {
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewList, setReviewList] = useState(null);
  const router = useRouter();
  const {gNo, aNo, accessType} = router.query;
  useEffect(() => {
    getArtList(gNo);
    getReviewList();
    if (artData.meetingDate != null) {
      setMeetingDate(artData.meetingDate);
    }
    getReviewRate();
  }, []);

  const [reviewCount, setReviewCount] = useState(artData.reviewCount);
  const [rating, setRating] = useState(artData.rating);

  // Offcanvas show/hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //모임 일정
  const [modalShow, setModalShow] = useState(false);
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

  const forDatePick = new Date(meetingDate);

  // Date picker
  const handleDateChange = (date) => {
    setMeetingDate(date);
  };

  const getReviewList = async () => {
    try {
      const reviewResponse = await apiClient.get("/garden/artReviewList", {
        params: {
          gNo: gNo,
          aNo: aNo,
        },
      });
      if (reviewResponse.data.result === true) {
        setReviewList(reviewResponse.data.artReviewList);
      }
    } catch (error) {
      console.error("데이터 가져오는 데 실패함", error);
    }
  };

  // 모달 on/off
  const handleDateModalShow = () => setModalShow(true);
  const handleDateModalClose = () => setModalShow(false);
  if (meetingDate != null) {
    const year = `${meetingDate.getFullYear()}`;
    const month = `${meetingDate.getMonth() + 1}`;
    const day = `${meetingDate.getDate()}`;
  }

  //artList 가져오는 거
  const [artList, setArtList] = useState([]);

  const getArtList = async (gNo) => {
    const response = await apiClient.get("/garden/getArtList", {
      params: {gNo},
    });
    if (response.data.result == "ok") {
      const filtered = response.data.artList.filter((art) => {
        return art.ano != aNo;
      });
      setArtList(filtered);
      console.log(filtered, aNo);
    } else {
      alert("artList를 가져오려다가 문제가 발생했습니다");
      setArtList(null);
    }
  };

  const getReviewRate = async () => {
    try {
      const reviewRateResponse = await apiClient.get("/garden/getArtReviewRate", {
        params: {
          gNo: gNo,
          aNo: aNo,
        },
      });
      setReviewCount(reviewRateResponse.data.reviewCount);
      setRating(reviewRateResponse.data.rating);
    } catch (error) {
      console.error("리뷰 reate 가져오다가 에러 남", error);
    }
  };

  //파지네이션
  //현재 페이지에 해당하는 아이템 추출
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviewList?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviewList?.length / itemsPerPage);

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

  const [changedFlowerStatus, setChangedFlowerStatus] = useState("");

  // 다 봤어요 버튼 및 처리
  const [status, setStatus] = useState(artData.status);
  const handleStatusChange = async () => {
    if (status === "INCOMPLETE") {
      const confirmation = confirm("작품을 다 보셨나요?");
      if (!confirmation) {
        return;
      }
    } else if (status === "COMPLETE") {
      const confirmation = confirm("다 본 상태입니다. 정말로 상태를 변경하시겠어요? 꽃의 상태가 정확하지 않을 수 있어요.");
      if (!confirmation) {
        return;
      }
    }

    if (reviewList.length === 0) {
      alert("감상을 작성하지 않고 본 상태로 변경할 수 없어요!");
      return;
    }

    try {
      const response = await apiClient.get("/garden/changeArtStatus", {
        params: {
          aNo: aNo,
          status: status,
          gNo: gNo,
        },
      });
      const message = response.data.message;
      console.log(response.data.result);
      if (response.data.result === true) {
        if (status === "COMPLETE") {
          alert("작품을 보기 전으로 되돌렸어요.");
          setStatus("INCOMPLETE");
        } else {
          alert("다 보셨군요! 축하합니다.");
          setStatus("COMPLETE");
        }
        if (response.data.statusChanged === true) {
          setChangedFlowerStatus(response.data.flowerStatus);
          handleFlowerModalModalShow();
        }
      } else {
        alert(message);
      }
    } catch (error) {
      alert("등록하는 데에 문제가 발생했습니다" + error);
    }
  };

  const [flowerModalShow, setFlowerModalShow] = useState(false);
  const handleFlowerModalModalShow = () => setFlowerModalShow(true);
  const handleFlowerModalModalClose = () => setFlowerModalShow(false);

  return (
    <Layout pageTitle="모임 내 작품" activeNav="Account" userLoggedIn>
      <Container className="pt-4 pb-lg-4 mt-5 mb-sm-2 pyeongChang-regular">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 pb-3 pt-md-3">
          <Breadcrumb.Item linkAs={Link} href="/">
            Home
          </Breadcrumb.Item>
          {accessType == "public" && (
            <Breadcrumb.Item linkAs={Link} href="/garden/gardenList">
              공개 정원 목록
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item linkAs={Link} href={`/garden/gardenDetail?type=${accessType}&gNo=${gNo}`}>
            {gardenTitle}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{artData.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          {/* 사이드바 */}
          <Col as="aside" lg={3} offset={2}>
            <Offcanvas show={show} onHide={handleClose} placement="end" responsive="lg">
              <Offcanvas.Header closeButton className="shadow-sm mb-2">
                <Offcanvas.Title as="h5">Sidebar</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* 작품 포스터 */}
                <Card.Body className="text-center">
                  <img className="rounded-3 mb-4 " src={artData.aimg} alt="Thumbnail" />
                  <h4 className="hanamdaum pb-0 mb-2">{artData.title}</h4>
                  <StarRating size="lg" cl rating={rating}></StarRating>
                  <div className="text-beige fs-sm mt-1">
                    ({reviewCount} 개 / {rating.toFixed(1)} 점)
                  </div>
                </Card.Body>

                {/* 다봤어요 버튼 */}
                <Button size="lg" variant={status === "COMPLETE" ? "primary" : "translucent-primary"} className="w-100 mb-3 mt-3" style={{left: 0, right: 0, border: 0}} onClick={handleStatusChange}>
                  <span className={`hanamdaum fw-normal fs-4`}>다 봤어요!</span>
                </Button>
                {flowerModalShow && (
                  <Modal className="pyeongChang-regular" centered show={handleFlowerModalModalShow} onHide={handleFlowerModalModalClose}>
                    <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
                      <Modal.Title as="h5" className="mt-4 text-center">
                        꽃이 이만큼 자랐어요!
                      </Modal.Title>
                      <Modal.Body>
                        <div className="d-flex justify-content-center mt-3 pt-2 mb-2">
                          <ImageLoader src={`/images/꽃/${flower}${changedFlowerStatus}.png`} width={100} height={186}></ImageLoader>
                        </div>
                      </Modal.Body>
                      {changedFlowerStatus == 4 && <div>{flower}를 다 길렀어요! 다른 식물을 기를 수 있는 서비스는 준비중이에요.</div>}
                      <CloseButton onClick={handleFlowerModalModalClose} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
                    </Modal.Header>
                    <Modal.Body className="px-sm-5 px-4">
                      <div></div>
                    </Modal.Body>
                  </Modal>
                )}

                {/* 다음 일정 */}
                {/* 로그인한 경우, 이 모임의 참여자인 경우만 보여주는 거 */}
                <Card className="card-flush pb-2 pb-lg-0 mb-4 mt-4">
                  <Card.Body>
                    <div className="d-flex mb-2">
                      <h3 className="h5 hanamdaum ">다음 일정</h3>
                      {/* 모임 관리자인 경우에만 */}
                      <Button className="littleButton rounded-pill ms-auto" onClick={handleDateModalShow} size="sm">
                        수정
                      </Button>
                    </div>
                    {artData.meetingDate ? (
                      <div className="hanamdaum h2  mb-2 text-end">
                        <span className="me-2">
                          <span className="text-primary"> {month}</span>월
                        </span>
                        <span className="text-primary">{day}</span>일
                      </div>
                    ) : (
                      <div className="hanamdaum fs-5 mb-2 text-end">설정된 일정이 없어요!</div>
                    )}
                  </Card.Body>
                </Card>

                <Modal className="pyeongChang-regular" centered show={modalShow} onHide={handleDateModalClose}>
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

                {/* 이후에 볼 작품 */}
                <Card.Body className="w-100 mt-5 pt-1">
                  <h3 className="h5">모임에 포함된 다른 작품</h3>
                  <Swiper
                    modules={[Navigation]}
                    slidesPerView={1}
                    navigation={{
                      prevEl: "#prev",
                      nextEl: "#next",
                    }}
                    loop
                    grabCursor
                    style={{margin: "-20px"}}
                  >
                    {artList &&
                      artList.map((art) => (
                        <SwiperSlide as="article" key={art.ano} className="h-auto" style={{padding: "20px"}}>
                          <GardenReviewCard
                            type="card"
                            href={`artDetail?gNo=${gNo}&aNo=${art.ano}`}
                            img={{
                              src: art.aimg,
                              size: [520, 520],
                              alt: art.title,
                              style: {
                                objectFit: "scale-down",
                                width: "100%", // Adjust the width as needed for the container
                                height: "auto",
                              },
                            }}
                            category={art.category}
                            title={art.title}
                            company={art.creator}
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <div className="d-flex justify-content-center mt-3">
                    <Button id="prev" variant="prev" className="position-relative mx-2" />
                    <Button id="next" variant="next" className="position-relative mx-2" />
                  </div>
                </Card.Body>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>

          {/* 본문 */}
          <Col offset={1} md={7} lg={8} className="mb-5 ms-5">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3">
              <h1 className="mb-0 hanamdaum fw-normal">감상</h1>
              <Link href={`reviewWrite?accessType=${accessType}&gNo=${gNo}&aNo=${aNo}`}>
                <Button size="sm" variant="primary" className="fs-6 rounded-3">
                  <i className="fi-edit pe-2"></i>작성
                </Button>
              </Link>
            </div>

            {/* 리뷰 */}
            {reviewList && reviewList.length != 0 ? (
              <div>
                {reviewList &&
                  currentItems.map((review) => (
                    <GardenReview
                      key={review.rno}
                      title={review.title}
                      author={{
                        thumbSrc: review.writerImg,
                        thumbSize: 24,
                        thumbShape: "rounded-circle",
                        name: review.writerNickName,
                      }}
                      accessType={accessType}
                      rNo={review.rno}
                      gNo={gNo}
                      aNo={aNo}
                      rating={review.rate}
                      className="border-bottom mb-4 pb-4"
                      writerSNStype={review.writerSNStype}
                    >
                      {review.content}
                    </GardenReview>
                  ))}

                {/* Pagination */}
                <nav className="d-flex justify-content-center mt-5" aria-label="Pagination">
                  <Pagination>{renderPageButtons()}</Pagination>
                </nav>
                {reviewList && reviewList.length < 5 && <div style={{height: "400px"}}></div>}
              </div>
            ) : (
              <Row className="card bg-secondary d-flex align-self-center" style={{height: "1000px"}}>
                <h4 className="mt-5 text-center"> 아직 작성된 감상이 없어요! </h4>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {gNo, aNo} = context.query;

  try {
    let artData = null;
    let meetingDate = null;
    let gardenTitle = null;
    let flowerStatus = null;
    let flower = null;

    const artResponse = await apiClient.get("/garden/artDetail", {
      params: {
        gNo: gNo,
        aNo: aNo,
      },
    });

    if (artResponse.data.result === true) {
      artData = artResponse.data.artData;
      meetingDate = artResponse.data.meetingDate;
      gardenTitle = artResponse.data.gardenTitle;
      flowerStatus = artResponse.data.flowerStatus;
      flower = artResponse.data.flower;
    } else {
      throw new Error("Failed to fetch public garden");
    }

    return {
      props: {
        artData,
        meetingDate,
        gardenTitle,
        flower,
        flowerStatus,
      },
    };
  } catch (error) {
    console.error("데이터 가져오는 데 실패함", error);
    return {
      props: {
        gardenData: null,
        meetingDate: null,
        gardenTitle: null,
        flower: null,
        flowerStatus: null,
      },
    };
  }
}

export default GardenArt;
