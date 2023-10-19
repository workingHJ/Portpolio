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

const ExhibitionDetail = ({exhibitionDetail}) => {
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    setTitle(decodeHTMLString(exhibitionDetail.title));
    setContent(decodeHTMLString(exhibitionDetail.contents1));
    return () => body.classList.remove("fixed-bottom-btn");
  }, []);

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

  const addGarden = () => {
    const chooseData = {
      mNo: loginInfo.mno,
      gNo: selectedGarden,
      exhibition: exhibitionDetail,
      category: "exhibition",
    };

    insertToGarden(chooseData);
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
      const response = await apiClient.post("/art/insertExhibitionToGarden", {
        params: chooseData,
      });
      if (response.status === 200) {
        alert("정원에 추가되었습니다");
      } else {
        alert("정원에 추가하는 데에 문제가 발생했습니다. 다정원 관리자에게 문의해주세요.");
      }
    } catch (error) {
      alert("에러" + error);
    }
  };

  const pubDateObj1 = new Date(exhibitionDetail.startDate);
  const pubDateObj2 = new Date(exhibitionDetail.endDate);
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
        var gpsX = parseFloat(exhibitionDetail.gpsX);
        var gpsY = parseFloat(exhibitionDetail.gpsY);
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
          `            <h6 style="text-size: 1.2em; margin-bottom: 5px;">${exhibitionDetail.place} </h6>` +
          ' <hr style="color: gray-600"></hr>' +
          '            <div class="desc" style="margin-top: 7px;>' +
          '                <div class="ellipsis">' +
          `${exhibitionDetail.placeAddr}` +
          "</div>" +
          '                <div><a href="' +
          exhibitionDetail.placeUrl +
          '" target="_blank" class="link">홈페이지</a></div>' +
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
  }, [exhibitionDetail]);

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
              <ImageLoader src={exhibitionDetail.imgUrl} width={300} height={400}></ImageLoader>
            </div>
          </Col>
          <Col className="ms-2">
            <Row>
              {exhibitionDetail.seq && (
                <div className="fw-normal mb-1 d-flex">
                  <div className="text-primary h3">#</div> <div className="ms-1 h3 fw-normal"> 문화예술전시 </div>
                </div>
              )}
              <div className="h5 text-gray600 fw-normal mb-2">
                <h6 className="text-gray600 fw-normal me-2">{title}</h6>
                <h6 className="text-gray600 fw-normal me-2">
                  {formattedPubDate1} - {formattedPubDate2}
                </h6>
                <h6 className="text-gray600 fw-normal me-2">
                  {exhibitionDetail.area} | {exhibitionDetail.place}
                </h6>
                <h6 className="text-gray600 fw-normal me-2">
                  {exhibitionDetail.phone} / {exhibitionDetail.price}
                </h6>
              </div>

              {/* 여기에 contents가 없으면 전시 소개가 없어지는 코드를 짜야하는데 내용이 대부분 없어서 문제다... */}
              {exhibitionDetail.contents1 && (
                <>
                  <div className="h4 mb-2 ">전시 소개</div>
                  <div className="lh-160 text-indent1em fs-5"> {content} </div>
                </>
              )}
              {loginInfo && (
                <div className="text-end mt-4 mb-3">
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
          <h2 className="hanamdaum mt-3 mb-4"> 전시장 위치 </h2>
          <div id="map" className="rounded-3" style={{height: "400px"}}></div>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {id} = context.query;
  try {
    const [exhibitionResponse] = await Promise.all([
      apiClient.get("/art/exhibitionDetail", {
        params: {id},
      }),
    ]);
    const exhibitionDetail = exhibitionResponse.data;
    return {
      props: {
        exhibitionDetail,
      },
    };
  } catch (error) {
    console.error("데이터 가져오다가 오류 남!!!!!!!!!!" + error);
    return {
      // 오류 나면 빈 객체 반환
      props: {
        exhibitionDetail: null,
      },
    };
  }
}

export default ExhibitionDetail;
