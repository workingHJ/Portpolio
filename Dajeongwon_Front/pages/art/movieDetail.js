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

const MovieDetail = ({movieDetail}) => {
  const {loginInfo, gardenList} = useContext(LoginContext);

  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    fetchGetDirectorNm();
    fetcGetGenre();
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

  const [sameDirectorData, setSameDirectorData] = useState(null);
  const [sameGenreData, setSameGenreData] = useState(null);

  const fetchGetDirectorNm = async () => {
    try {
      const count = 5;
      const response = await apiClient.get("/movies/movieDirector", {
        params: {directorNm: movieDetail.directorNm},
      });
      setSameDirectorData(response.data);
    } catch (error) {
      console.error("데이터 가져오다가 오류 발생: " + error);
      setSameDirectorData(null);
    }
  };

  const fetcGetGenre = async () => {
    try {
      const response = await apiClient.get("/movies/movieGenre2", {
        params: {genre: movieDetail.genre},
      });
      setSameGenreData(response.data);
    } catch (error) {
      console.error("데이터 가져오다가 오류 발생: " + error);
      setSameGenreData(null);
    }
  };

  // todo
  //
  const addGarden = () => {
    const chooseData = {
      mNo: loginInfo.mno,
      gNo: selectedGarden,
      movie: movieDetail,
      category: "movie",
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

  // 백엔드로 구현 먼저
  // chooseData- >
  // mNo: loginInfo.mno, // 유지
  // gNo: selectedGarden, // 유지
  // book: movieDetail,  // 변경
  // category: "book",   // 변경
  // requestBody로 받아야 함 / postman에서
  const insertToGarden = async (chooseData) => {
    try {
      const response = await apiClient.post("/art/insertMovieToGarden", {
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

  return (
    <Layout pageTitle="상세" activeNav="Pages">
      {/* Page content */}
      <Container as="section" className="mt-5 mb-md-4 py-5 GmarketSansMedium">
        {/* Page title */}
        <div className="w-100 bg-secondary ps-4 d-flex">
          <h1 className="pb-2 pt-4 hanamdaum fw-normal text-primary">{movieDetail.title}</h1>
          <span className="pt-4 mt-4 ms-3 pyeongChange-regular"> {movieDetail.titleEng} </span>
        </div>
        <Row className="mt-4 pt-3 mb-3">
          <Col lg={3} className="ms-2">
            {movieDetail.posters && (
              <Link href={movieDetail.posters} className="rounded-3 overflow-hidden d-flex position-relative" style={{width: "fit-content"}}>
                <ImageLoader src={movieDetail.posters.trim()} width={300} height={400}></ImageLoader>
              </Link>
            )}
          </Col>
          <Col className="ms-2">
            <Row>
              {movieDetail.awards1 && (
                <div className="fw-normal mb-1 d-flex">
                  <div className="ms-1 fw-normal"> {movieDetail.awards1} </div>
                </div>
              )}
              {movieDetail.genre && <div className="text-gray600 mb-2 h5 fw-normal">{movieDetail.genre}</div>}
              <div className="h5 text-gray600 fw-normal mb-4">
                <span className="me-3 text-black">{movieDetail.directorNm}</span>
                <span className="me-2">{movieDetail.company}</span>
                <span className="me-2">{movieDetail.prodYear}</span>
                <span className="me-2">{movieDetail.nation}</span>
              </div>
              {movieDetail.plotText && (
                <>
                  <div className="h4 mb-2 mt-2">영화 줄거리</div>
                  <div className="lh-160 text-indent1em fs-5"> {movieDetail.plotText} </div>
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

        {/* =================================같은 감독 ===================== */}
        <Row className="mt-4 justify-content-start me-5 pe-3 mb-0">
          <h2 className="hanamdaum mt-3 mb-4"> 같은 감독 영화 </h2>
          {sameDirectorData &&
            sameDirectorData.map((item) => (
              <>
                <Col lg={2} key={item.mvno} className="pb-1 me-4">
                  <IndetailItem
                    href={`movieDetail/?id=${item.mvno}`}
                    img={{
                      src: item.posters.trim(),
                      width: "504px",
                      height: "700px",
                      alt: item.title,
                    }}
                    title={item.title}
                    author={item.directorNm}
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

        {/* ================================ 같은 장르 영화 ===================== */}
        <Row className="mt-4 justify-content-start me-5 mb-5">
          <h2 className="hanamdaum mt-3 mb-4"> 같은 장르 영화 </h2>
          {sameGenreData &&
            sameGenreData.map((item) => (
              <>
                <Col lg={2} key={item.mvno} className="pb-sm-2 me-4">
                  <IndetailItem
                    href={item.posters.trim()}
                    img={{
                      src: item.posters,
                      width: "504px",
                      height: "700px",
                      alt: item.title,
                    }}
                    title={item.title}
                    author={item.directorNm}
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
  let movieDetail = null;
  try {
    const response = await apiClient.get("/movies/movieDetail", {
      params: {mvno: id},
    });
    movieDetail = response.data;
    return {
      props: {
        movieDetail: movieDetail || null,
      },
    };
  } catch (error) {
    console.error("데이터 가져오다가 오류 남!!!!!!!!!!" + error);
    return {
      // 오류 나면 빈 객체 반환
      props: {
        movieDetail: null,
      },
    };
  }
}

export default MovieDetail;
