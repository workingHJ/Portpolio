import React, {useEffect, useState, useContext} from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "swiper/css";
import "swiper/css/navigation";
import {getItemById} from "./book-list";
import ImageLoader from "../../components/ImageLoader";
import {Card, ListGroup, Modal, Nav} from "react-bootstrap";
import Link from "next/link";
import IndetailItem from "../components/IndetailItem";
import axios from "axios";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";

const BookDetail = ({bookDetail}) => {
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  const [newBookDetail, setNewBookDetail] = useState(null);
  const [bestSellList, setBestSellList] = useState(null);
  const title = decodeHTMLString(bookDetail.title);
  const description = decodeHTMLString(bookDetail.description);

  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    fetchNewBookList();
    fetchBestSellsList();
    return () => body.classList.remove("fixed-bottom-btn");
  }, []);

  const router = useRouter();
  const {id} = router.query;

  //모달 띄우기
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    getAdminGardenData(loginInfo);
  };

  const [selectedGarden, setSelectedGarden] = useState(null);

  // 정원에 추가
  const chooseGarden = (gNo) => {
    setSelectedGarden(gNo);
  };

  const fetchNewBookList = async () => {
    try {
      const count = 5;
      const response = await apiClient.get("/art/newBookList", {
        params: {count},
      });
      setNewBookDetail(response.data);
    } catch (error) {
      console.error("데이터 가져오다가 오류 발생: " + error);
      setNewBookDetail(null);
    }
  };

  const fetchBestSellsList = async () => {
    try {
      const response = await apiClient.get("/art/bestSellsList");
      setBestSellList(response.data);
    } catch (error) {
      console.error("데이터 가져오다가 오류 발생: " + error);
      setNewBookDetail(null);
    }
  };

  const addGarden = () => {
    const chooseData = {
      mNo: loginInfo.mno,
      gNo: selectedGarden,
      book: bookDetail,
      category: "book",
    };

    insertToGarden(chooseData);
    handleClose();
  };

  // gardenData
  const [adminGardenData, setAdminGardenData] = useState(null);

  const getAdminGardenData = async (loginInfo) => {
    try {
      const response = await apiClient.get("/garden/getAdminGardenData", {
        params: loginInfo,
      });
      if (response.status === 200) {
        setAdminGardenData(response.data.adminGardenList);
        setShowModal(true);
      } else {
        alert("문제생김");
      }
    } catch (error) {
      alert("에러" + error);
      setAdminGardenData([]);
    }
  };

  const insertToGarden = async (chooseData) => {
    try {
      const response = await apiClient.post("/art/insertBookToGarden", {
        params: chooseData,
      });
      if (response.status === 200) {
        alert(response.data);
      } else if (response.status === 400) {
        alert(response.data);
      }
    } catch (error) {
      alert("에러" + error);
    }
  };

  const pubDateObj = new Date(bookDetail.pubDate);
  const formattedPubDate = pubDateObj.toLocaleDateString("ko-kr", {
    year: "numeric",
  });

  return (
    <Layout pageTitle="상세" activeNav="Pages">
      {/* Page content */}
      <Container as="section" className="mt-5 mb-md-4 py-5 GmarketSansMedium">
        {/* Page title */}
        <div className="w-100 bg-secondary ps-4">
          <h1 className="pb-4 pt-4 hanamdaum fw-normal text-primary">{title}</h1>
        </div>
        {/* Featured post */}
        <Row className="mt-4 pt-3 mb-3">
          <Col lg={3} className="ms-2">
            <Link href={bookDetail.link} className="rounded-3 overflow-hidden d-flex position-relative" style={{width: "fit-content"}}>
              <ImageLoader src={bookDetail.cover} width={300} height={400}></ImageLoader>
            </Link>
          </Col>
          <Col className="ms-2">
            <Row>
              {bookDetail.bestDuration && (
                <div className="fw-normal mb-1 d-flex">
                  <div className="text-primary h3">#</div> <div className="ms-1 h3 fw-normal"> 베스트셀러 </div>
                </div>
              )}
              {bookDetail.isbn13 && (
                <div className="text-gray600 mb-2 h5 fw-normal">
                  ISBN {bookDetail.isbn13} | 판매가 : {bookDetail.priceSales}원
                </div>
              )}
              <div className="h5 text-gray600 fw-normal mb-4">
                <span className="me-3 ">{bookDetail.author}</span>
                <span className="me-2">{bookDetail.publisher}</span>
                <span>({formattedPubDate})</span>
              </div>
              {bookDetail.description && (
                <>
                  <div className="h4 mb-2 mt-2">책 소개</div>
                  <div className="lh-160 text-indent1em fs-5"> {description} </div>
                </>
              )}
              {loginInfo && (
                <div className="text-end mt-5">
                  <Button className="rounded-3 fw-normal px-3 w-100 fs-5" variant="outline-primary" onClick={handleShow}>
                    <i className="fi-plus me-2"> </i>정원에 추가
                  </Button>
                </div>
              )}
            </Row>
          </Col>
        </Row>

        <Modal className="pyeongChang-regular" centered show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="my-1 ms-2">모임에 작품 추가하기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Nav className="flex-column">
              {adminGardenData &&
                adminGardenData.map((garden) => (
                  <Nav.Link className="fs-6 " action key={garden.g_no} onClick={() => chooseGarden(garden.gno)}>
                    {garden.title}
                  </Nav.Link>
                ))}
            </Nav>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={addGarden}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ===============================여기까지 본체 ========================= */}

        <hr className="text-gray500"></hr>

        {/* =================================주목할 만한 신간===================== */}
        <Row className="mt-4 justify-content-between mb-0">
          <h2 className="hanamdaum mt-3 mb-4"> 주목할 만한 신간 </h2>
          {newBookDetail &&
            newBookDetail.map((item) => (
              <>
                <Col lg={2} key={item.isbn13} className="pb-1 me-4">
                  <IndetailItem
                    key={item.isbn13}
                    href={`bookDetail/?id=${item.isbn13}`}
                    img={{
                      src: item.cover,
                      width: "504px",
                      height: "700px",
                      alt: item.title,
                    }}
                    title={item.title}
                    author={item.author}
                    wishlistButton={{
                      tooltip: "모임에 추가하기",
                      props: {
                        onClick: () => alert("모임에 추가 로직 짜야합니당"),
                      },
                    }}
                  />
                </Col>
              </>
            ))}
        </Row>

        {/* =================================베스트셀러===================== */}
        <Row className="mt-4 justify-content-between mb-5">
          <h2 className="hanamdaum mt-3 mb-4"> 주간 베스트셀러 </h2>
          {bestSellList &&
            bestSellList.map((item) => (
              <>
                <Col lg={2} key={item.isbn13} className="pb-sm-2 me-4">
                  <IndetailItem
                    key={item.isbn13}
                    href={item.link}
                    img={{
                      src: item.cover,
                      width: "504px",
                      height: "700px",
                      alt: item.title,
                    }}
                    title={item.title}
                    author={item.author}
                    wishlistButton={{
                      tooltip: "모임에 추가하기",
                      props: {
                        onClick: () => alert("모임에 추가 로직 짜야합니당"),
                      },
                    }}
                  />
                </Col>
              </>
            ))}
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {id} = context.query;
  try {
    const [bookResponse] = await Promise.all([
      apiClient.get("/art/bookDetail", {
        params: {id},
      }),
    ]);
    const bookDetail = bookResponse.data;

    return {
      props: {
        bookDetail,
      },
    };
  } catch (error) {
    console.error("데이터 가져오다가 오류 남!!!!!!!!!!" + error);
    return {
      // 오류 나면 빈 객체 반환
      props: {
        bookDetail: null,
      },
    };
  }
}

export default BookDetail;
