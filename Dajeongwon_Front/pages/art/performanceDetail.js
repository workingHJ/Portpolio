import React, {useEffect, useState, useContext} from "react";
import {useSelector} from "react-redux";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "swiper/css";
import "swiper/css/navigation";
import ImageLoader from "../../components/ImageLoader";
import {Card, ListGroup, Modal, Nav} from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";
import {useRouter} from "next/router";

const PerformanceDetail = ({performanceDetail}) => {
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  const [title, setTitle] = useState("");
  const [award, setAward] = useState("");

  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    setTitle(decodeHTMLString(performanceDetail.prfnm));
    setAward(formatAwardText(performanceDetail.awards));
    return () => body.classList.remove("fixed-bottom-btn");
  }, []);

  //모달 띄우기
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    getAdminGardenData(loginInfo);
  };

  function formatDateString(dateString) {
    if (dateString == null) {
      return "기간 없음";
    }
    const dateObj = new Date(dateString);
    const formatOptions = {year: "numeric", month: "long", day: "numeric"};
    return new Intl.DateTimeFormat("ko-kr", formatOptions).format(dateObj);
  }

  function formatAwardText(awardText) {
    return awardText.split("<br>").join("\n");
  }

  const [selectedGarden, setSelectedGarden] = useState(null);

  // 정원에 추가
  const chooseGarden = (gNo) => {
    setSelectedGarden(gNo);
  };

  const addGarden = () => {
    const chooseData = {
      mNo: loginInfo.mno,
      gNo: selectedGarden,
      perform: performanceDetail,
      category: "perform",
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
      const response = await apiClient.post("/art/insertPerformToGarden", {
        params: chooseData,
      });
      if (response.status === 200) {
        alert(response.data);
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert("에러" + error);
    }
  };

  const pubDateObj1 = new Date(performanceDetail.prfpdfrom);
  const pubDateObj2 = new Date(performanceDetail.prfpdto);
  const formattedPubDate1 = pubDateObj1.toLocaleDateString("ko-kr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const formattedPubDate2 = pubDateObj2.toLocaleDateString("ko-kr", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=82c9940ede5c064b8a57be8fdbc8d8e2&autoload=false";
    script.onload = () => {
      kakao.maps.load(function () {
        var mapContainer = document.getElementById("map"); // 지도의 중심좌표
        var gpsX = parseFloat(performanceDetail.lo);
        var gpsY = parseFloat(performanceDetail.la);
        var mapOption = {
          center: new kakao.maps.LatLng(gpsY, gpsX), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 지도에 마커를 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(gpsY, gpsX),
        });

        var content =
          '<div class="wrap" style="background-color: white; padding: 10px; border-radius: 10px;">' +
          '        <div class="body">' +
          `            <h6 style="text-size: 1.2em; margin-bottom: 5px;">${performanceDetail.fcltynm} </h6>` +
          ' <hr style="color: gray-600"></hr>' +
          '            <div class="desc" style="margin-top: 7px;>' +
          '                <div class="ellipsis">' +
          `${performanceDetail.adres}` +
          "</div>" +
          "            </div>" +
          "        </div>" +
          "</div>";

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition(),
          yAnchor: 1.5, // moves the overlay up above the marker; value between 0 (top) and 1 (bottom)
        });
      });
    };
    document.head.appendChild(script);
  }, [performanceDetail]);

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
            <div className="rounded-3 overflow-hidden d-flex position-relative" style={{width: "fit-content"}}>
              <ImageLoader src={performanceDetail.poster} width={300} height={400}></ImageLoader>
            </div>
          </Col>
          <Col className="ms-2">
            <Row>
              {performanceDetail.mt20id && (
                <div className="fw-normal mb-1 d-flex">
                  <div className="text-primary h3">#</div> <div className="ms-1 h3 fw-normal"> 공연예술 </div>
                </div>
              )}
              <div className="h5 text-gray600 fw-normal mb-2">
                <h6 className="text-gray600 fw-normal me-2">
                  {formattedPubDate1} - {formattedPubDate2}
                </h6>
                <div className="d-flex mb-3">
                  <div className="fs-6 text-hdGray">{performanceDetail.pcseguidance != null && performanceDetail.pcseguidance != "" && <span>{performanceDetail.pcseguidance}</span>}</div>
                </div>
                <h6 className="text-gray600 fw-normal me-2">
                  {performanceDetail.prfstate} | {performanceDetail.fcltynm}
                </h6>
              </div>

              {/* 여기에 contents가 없으면 전시 소개가 없어지는 코드를 짜야하는데 내용이 대부분 없어서 문제다... */}
              {performanceDetail.awards == "-" && performanceDetail.prfcast != null && (
                <>
                  <div className="h4 mb-2 mt-2">공연 소개</div>
                  <div className="lh-160 fs-5"> 출연진 : {performanceDetail.prfcast} </div>
                </>
              )}
              {performanceDetail.awards != "-" && performanceDetail.awards != null && (
                <>
                  <div className="h4 mb-3">공연 소개</div>
                  <div className="lh-180 fs-5" style={{whiteSpace: "pre-line"}}>
                    수상 내역 : {award}
                  </div>
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

        {/* =================================전시장 위치===================== */}
        <Row className="mt-4 justify-content-between mb-5">
          <h2 className="hanamdaum mt-3 mb-4"> 공연장 위치 </h2>
          <div id="map" className="rounded-3" style={{height: "400px"}}></div>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {id} = context.query;
  try {
    const [performanceResponse] = await Promise.all([
      apiClient.get("/art/performanceDetail", {
        params: {id},
      }),
    ]);
    const performanceDetail = performanceResponse.data;
    return {
      props: {
        performanceDetail,
      },
    };
  } catch (error) {
    console.error("데이터 가져오다가 오류 남!!!!!!!!!!" + error);
    return {
      // 오류 나면 빈 객체 반환
      props: {
        performanceDetail: null,
      },
    };
  }
}

export default PerformanceDetail;
