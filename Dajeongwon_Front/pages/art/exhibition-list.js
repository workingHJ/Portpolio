import {useContext, useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PaginationP from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormGroup from "../../components/FormGroup";
import ListItem from "../components/exhibitionListItem";
import ExhibitionCardOverlay from "../components/ExhibitionCardOverlay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "simplebar/dist/simplebar.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import apiClient from "../../services/apiClient";
import {areas} from "../../services/sidogugun-react";
import SwiperCore, {Navigation, Pagination} from "swiper/core";
import {Swiper, SwiperSlide} from "swiper/react";
import CardImageHoverOverlay from "../../components/CardImageHoverOverlay";
import {LoginContext} from "../_app";
import "leaflet/dist/leaflet.css";

SwiperCore.use([Navigation, Pagination]);

const ExhibitionList = ({data, newExhibitionData}) => {
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    return () => body.classList.remove("fixed-bottom-btn");
  });

  // Media query for displaying Offcanvas on screens larger than 991px
  const isDesktop = useMediaQuery({query: "(min-width: 992px)"});

  // Offcanvas show/hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 전시 일정
  const [selectedDate, setSelectedDate] = useState(new Date());
  const forDatePick = new Date(selectedDate);
  // Date picker
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // 지역 검색
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedSubarea, setSelectedSubarea] = useState(null);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedSubarea(null);
  };

  const handleSubareaChange = (e) => {
    setSelectedSubarea(e.target.value);
  };

  const selectedAreaObject = areas.find((area) => area.name === selectedArea);

  //sorting
  const [sort, setSort] = useState("Accuracy");
  const handleSortChange = (e) => {
    setSort(e.target.value);
    handleSubmit();
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleKeywordChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (event) => {
    if (!searchTerm && !selectedArea) {
      alert("검색어 또는 지역을 입력하세요.");
      return;
    }

    const inputData = {
      title: searchTerm,
      area: selectedArea,
      placeAddr: selectedSubarea,
      selectedDate: selectedDate,
    };

    getExhibitionData(inputData);
  };

  const [searchResults, setSearchResults] = useState([]);
  const [showData, setShowData] = useState(false);

  const getExhibitionData = async (inputData) => {
    try {
      const response = await apiClient.get("/art/exhibitionList", {
        params: inputData,
      });
      setSearchResults(response.data.list);
      console.log(searchResults);
      setShowData(true);
    } catch (error) {
      alert("에러" + error);
      setShowData(false);
      setSearchResults([]);
    }
  };

  //파지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout pageTitle="전시 목록" activeNav="Pages">
      {/* Page container */}
      <Container as="section" className="container pt-5 pb-4 mb-lg-2">
        <div
          style={{
            backgroundImage: "url('/images/header/exhibition.png')",
            backgroundSize: "cover",
          }}
          className="d-flex justify-content-center align-items-center flex-column py-5 my-5"
        >
          <div className="display-2 hanamdaum text-shadow pt-4 text-white">전시 검색</div>
          <div className="pyeongChang-regular text-white mt-4 fs-sm">한 번에 검색할 수 있는 양은 30개로 제한됩니다.</div>
          <div className="pyeongChang-regular text-white mt-2 fs-sm">검색이 원활하게 되지 않는 경우 검색어를 바꿔주세요.</div>
        </div>
      </Container>
      <Container>
        <Row className="g-0 mt-n5 pb-5 mb-5">
          {/* Filters sidebar (Offcanvas on screens < 992px) */}
          <Col as="aside" lg={4} xl={3} className=" border-end-lg px-1 px-xl-1 px-xxl-1 pt-lg-2">
            <div>
              <Row>
                <div className="pt-0 pt-lg-4 px-lg-0 pyeongChang-regular d-flex justify-content-center">
                  <FormGroup
                    className="rounded-pill mb-lg-2 "
                    style={{
                      width: "90%",
                    }}
                  >
                    <InputGroup>
                      <InputGroup.Text className="text-muted">
                        <i className="fi-search"></i>
                      </InputGroup.Text>
                      <Form.Control placeholder="전시 이름을 입력하세요" value={searchTerm} onChange={handleKeywordChange} />
                    </InputGroup>
                    <Button variant="primary rounded-pill d-lg-inline-block d-none" onClick={handleSubmit}>
                      검색
                    </Button>
                    <Button variant="primary btn-icon rounded-circle flex-shrink-0 d-lg-none d-inline-fle">
                      <i className="fi-search mt-n2"></i>
                    </Button>
                  </FormGroup>
                </div>
              </Row>
              <hr className="mt-3" />

              <Row className="pyeongChang-regular mt-4">
                <div className="d-flex justify-content-center">
                  <Form.Group
                    controlId="select-normal"
                    className="mb-3"
                    style={{
                      width: "90%",
                    }}
                  >
                    <h2 className="h4 mb-3 hanamdaum">
                      <i className="fi-map-pin text-primary fs-5 mt-n1 me-2"></i>
                      전시장 위치
                    </h2>
                    <Form.Select className="mb-2" onChange={handleAreaChange}>
                      <option>시/도 선택</option>
                      {areas.map((area, index) => (
                        <option key={index} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Select onChange={handleSubareaChange}>
                      <option>구/군 선택</option>
                      {selectedAreaObject &&
                        selectedAreaObject.subareas.map((subarea, index) => (
                          <option key={index} value={subarea}>
                            {subarea}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              </Row>
              <Row className="pyeongChang-regular mt-5">
                <div className="d-flex justify-content-center">
                  <Form.Group
                    className="mb-3"
                    style={{
                      width: "90%",
                    }}
                  >
                    <h2 className="h4 mb-3 hanamdaum">
                      <i className="fi-calendar-alt text-primary fs-5 mt-n1 me-2"></i>
                      전시 일정
                    </h2>
                    <InputGroup>
                      <Form.Control as={DatePicker} selected={forDatePick} onChange={(date) => handleDateChange(date)} dateFormat="yyyy, MMMM d" className="rounded pe-5" lang="ko" />
                      <i className="fi-calendar position-absolute top-50 end-0 translate-middle-y me-3"></i>
                    </InputGroup>
                  </Form.Group>
                </div>
              </Row>
            </div>
          </Col>

          {/* Content */}
          <Col lg={8} xl={9} className="position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
            {showData && (
              <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2 pyeongChang-regular">
                <Form.Group controlId="sortby" className="d-flex align-items-center flex-shrink-0">
                  <Form.Label className="text-body fs-sm me-2 mb-0 pe-1 text-nowrap pyeongChang-regular">
                    <i className="fi-arrows-sort text-muted mt-n1 me-2"></i>
                    정렬 기준
                  </Form.Label>
                  <Form.Select size="sm" onChange={handleSortChange}>
                    <option value="Accuracy">관련도</option>
                  </Form.Select>
                </Form.Group>
                <hr className="d-none d-sm-block w-100 mx-4" />
                <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
                  <i className="fi-check-circle me-2 mb-1"></i>
                  <span className="fs-sm mt-n1">{searchResults.length} 개의 검색결과</span>
                </div>
              </div>
            )}

            {showData == false && (
              <>
                <div className="text-center mt-3">
                  <h2 className="pyeongChang-bold mb-5 pb-3">이 전시 어때요</h2>
                  <Swiper spaceBetween={50} slidesPerView={3} loop navigation pagination={{el: "#bullets", clickable: true}}>
                    {newExhibitionData.map((exhibition, index) => (
                      <SwiperSlide key={index}>
                        <ExhibitionCardOverlay
                          href={`exhibitionDetail/?id=${exhibition.seq}`}
                          key={exhibition.seq}
                          img={{
                            src: exhibition.imgUrl,
                            width: "504px",
                            height: "1000px",
                            alt: exhibition.title,
                          }}
                          title={decodeHTMLString(exhibition.title)}
                          artist={exhibition.place}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div id="bullets" className="swiper-pagination position-relative bottom-0 mt-2 mb-lg-3"></div>
              </>
            )}
            {/* Catalog grid */}
            {showData ? (
              <Row xs={1} sm={2} xl={3} className="gy-4 gx-3 gx-xxl-4 py-4">
                {currentItems.map((item, indx) => (
                  <Col key={indx} className="pb-sm-2">
                    <ListItem
                      href={`exhibitionDetail/?id=${item.seq}`}
                      key={item.seq}
                      img={{
                        src: item.imgUrl,
                        width: "504px",
                        height: "700px",
                        alt: item.title,
                      }}
                      title={item.title}
                      area={item.area}
                      place={item.place}
                      wishlistButton={{
                        tooltip: "Add to Favorites",
                        props: {
                          onClick: () => alert("insert 구현해야 함"),
                        },
                      }}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Row style={{height: "600px"}}></Row>
            )}
            {showData && (
              <>
                {/* Pagination */}
                <nav className="border-top pb-md-4 pt-4" aria-label="Pagination">
                  <PaginationP className="mb-1">
                    {Array.from(Array(Math.ceil(searchResults.length / itemsPerPage)), (_, i) => i + 1).map((page) => (
                      <PaginationP.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                        {page}
                      </PaginationP.Item>
                    ))}
                  </PaginationP>
                </nav>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps() {
  const count = 4;
  try {
    const resExhibitions = await axios.get("art/newExhibitionList", {
      params: {count},
    });
    const newExhibitionData = resExhibitions.data;

    return {
      props: {
        newExhibitionData: newExhibitionData,
      },
    };
  } catch (error) {
    console.error("데이터 가져오다가 오류 남!!!!!!!!!!" + error);
    return {
      // 오류 나면 빈 객체 반환
      props: {
        newExhibitionData: [],
      },
    };
  }
}

export default ExhibitionList;
