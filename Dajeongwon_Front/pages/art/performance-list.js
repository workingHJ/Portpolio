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
import IconBoxJY from "../components/IconBoxJY";
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

import "leaflet/dist/leaflet.css";
import {LoginContext} from "../_app";

SwiperCore.use([Navigation, Pagination]);

const PerformanceList = ({data, newPerformanceData}) => {
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

  const [searchResults, setSearchResults] = useState([]);
  const [showData, setShowData] = useState(false);

  // Categories
  const categories = [
    {icon: "fi-play", title: "연극", value: "연극"},
    {icon: "fi-musical", title: "뮤지컬", value: "뮤지컬"},
    {icon: "fi-consert", title: "콘서트", value: "대중음악"},
    {icon: "fi-classic", title: "클래식", value: "서양음악(클래식)"},
    {icon: "fi-janggu", title: "국악", value: "한국음악(국악)"},
    {icon: "fi-box", title: "서커스/마술", value: "서커스/마술"},
  ];

  // 공연 일정
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

  // 검색

  const [searchTerm, setSearchTerm] = useState("");

  const handleKeywordChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (event) => {
    event.preventDefault(); // Prevent form submission
    handleSubmit();
  };

  // 이부분부터 확인
  const [categoryData, setCategoryData] = useState("");

  const handleIconBoxClick = (value) => {
    setCategoryData(value);
    handleSubmit(value);
  };

  const handleSubmit = (categoryData) => {
    if (searchTerm) {
      setSearchByTerm(true);
    }
    const inputData = {
      prfnm: searchTerm,
      area: selectedArea,
      subarea: selectedSubarea,
      selectedDate: selectedDate,
      genrenm: categoryData,
    };
    getPerformanceData(inputData);
  };

  const getPerformanceData = async (inputData) => {
    try {
      const response = await apiClient.get("/art/performanceList", {
        params: inputData,
      });
      setSearchResults(response.data.list);
      console.log(searchResults);
      console.log(currentItems);
      setShowData(true);
    } catch (error) {
      alert("에러" + error);
      setShowData(false);
      setSearchResults([]);
    }
  };

  const [searchByTerm, setSearchByTerm] = useState();

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
    <Layout pageTitle="공연 목록" activeNav="Pages">
      <Container as="section" className="container pt-5 mb-lg-2">
        <div
          style={{
            backgroundImage: "url('/images/header/perform.png')",
            backgroundSize: "cover",
          }}
          className="d-flex justify-content-center align-items-center flex-column py-5 my-5"
        >
          <div className="display-2 hanamdaum text-shadow pt-4 text-white">공연 검색</div>
          <div className="pyeongChang-regular text-white mt-4 fs-sm">한 번에 검색할 수 있는 양은 30개로 제한됩니다.</div>
          <div className="pyeongChang-regular text-white mt-2 fs-sm">검색이 원활하게 되지 않는 경우 검색어를 바꿔주세요.</div>
        </div>
      </Container>
      {/* Page container */}
      <Container className="mb-5 pb-5">
        <Row className="">
          {/* Filters sidebar (Offcanvas on screens < 992px) */}
          <Col as="aside" lg={4} xl={3} className=" border-end-lg px-1 px-xl-1 px-xxl-1 ">
            <Row>
              <div className="px-lg-0 pt-3 pyeongChang-regular d-flex justify-content-center">
                <FormGroup
                  onSubmit={handleKeyPress}
                  className="rounded-pill mb-lg-2 "
                  style={{
                    width: "90%",
                  }}
                >
                  <InputGroup>
                    <InputGroup.Text className="text-muted">
                      <i className="fi-search"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="공연 이름을 입력하세요" value={searchTerm} onChange={handleKeywordChange} />
                  </InputGroup>
                  <Button variant="primary rounded-pill d-lg-inline-block d-none" onClick={() => handleSubmit()}>
                    검색
                  </Button>
                  <Button variant="primary btn-icon rounded-circle flex-shrink-0 d-lg-none d-inline-fle">
                    <i className="fi-search mt-n2"></i>
                  </Button>
                </FormGroup>
              </div>
            </Row>
            <hr className="mt-3" />
            <Row lg={2} xs={1} className="g-3 mt-1 pyeongChang-regular p-2 mb-4">
              {categories.map((item, index) => (
                <Col key={index}>
                  <IconBoxJY
                    type="card-shadow"
                    media={item.icon}
                    mediaColor="iconGray"
                    title={item.title}
                    selected={categoryData === item.value}
                    align="center"
                    value={item.value}
                    onClick={() => handleIconBoxClick(item.value)}
                    className={categoryData === item.value ? "text-primary" : ""}
                  />
                </Col>
              ))}
            </Row>
            <Row className="pyeongChang-regular mt-5">
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
                    공연장 위치
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
                    공연 일정
                  </h2>
                  <InputGroup>
                    <Form.Control as={DatePicker} selected={forDatePick} onChange={(date) => handleDateChange(date)} dateFormat="yyyy, MMMM d" className="rounded pe-5" lang="ko" />
                    <i className="fi-calendar position-absolute top-50 end-0 translate-middle-y me-3"></i>
                  </InputGroup>
                </Form.Group>
              </div>
            </Row>
          </Col>

          {/* Content */}
          <Col lg={8} xl={9} className="position-relative overflow-hidden px-3 px-xl-4 px-xxl-5">
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
                <div className="text-center mt-4 ">
                  <h2 className="pyeongChang-bold mb-5 pb-3">수상작</h2>
                  <Swiper spaceBetween={50} loop slidesPerView={3} navigation pagination={{el: "#bullets", clickable: true}}>
                    {newPerformanceData.map((performance, index) => (
                      <SwiperSlide key={index}>
                        <ListItem
                          href={`performanceDetail/?id=${performance.mt20id}`}
                          key={performance.mt20id}
                          img={{
                            src: performance.poster,
                            width: "504px",
                            height: "700px",
                            alt: performance.prfnm,
                          }}
                          title={performance.prfnm}
                          area={performance.genrenm}
                          place={performance.prfstate}
                          runtime={performance.prfruntime}
                          pcseguidance={performance.pcseguidance}
                          wishlistButton={{
                            tooltip: "Add to Favorites",
                            props: {
                              onClick: () => alert("insert 구현해야 함"),
                            },
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div id="bullets" className="swiper-pagination position-relative bottom-0 mt-2 mb-lg-3"></div>
              </>
            )}
            <Row xs={1} sm={2} xl={3} className="gy-4 gx-3 gx-xxl-4 py-4">
              {searchResults.length > 0 && !searchByTerm
                ? currentItems.map((item, indx) => (
                    <Col key={indx} className="pb-sm-2">
                      <ListItem
                        href={`performanceDetail/?id=${item.mt20id}`}
                        img={{
                          src: item.poster,
                          width: "504px",
                          height: "700px",
                          alt: item.prfnm,
                        }}
                        title={item.prfnm}
                        area={item.genrenm}
                        place={item.prfstate}
                        pcseguidance={item.pcseguidance}
                        runtime={item.prfruntime}
                        wishlistButton={{
                          tooltip: "Add to Favorites",
                          props: {
                            onClick: () => alert("insert 구현해야 함"),
                          },
                        }}
                      />
                    </Col>
                  ))
                : searchResults.map((item, indx) => (
                    <Col key={indx} className="pb-sm-2">
                      <ListItem
                        href={`performanceDetail/?id=${item.mt20id}`}
                        img={{
                          src: item.poster,
                          width: "504px",
                          height: "700px",
                          alt: item.prfnm,
                        }}
                        title={item.prfnm}
                        area={item.genrenm}
                        place={item.prfstate}
                        runtime={item.prfruntime}
                        pcseguidance={item.pcseguidance}
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

            {/* Pagination */}
            {currentItems.length > 0 && (
              <nav className="d-flex justify-content-center" aria-label="Pagination">
                <PaginationP className="mb-1">
                  {Array.from(Array(Math.ceil(searchResults.length / itemsPerPage)), (_, i) => i + 1).map((page) => (
                    <PaginationP.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                      {page}
                    </PaginationP.Item>
                  ))}
                </PaginationP>
              </nav>
            )}
          </Col>
        </Row>
      </Container>

      {/* Filters sidebar toggle button (visible < 991px) */}
      <Button size="sm" className="w-100 rounded-0 fixed-bottom d-lg-none" onClick={handleShow}>
        <i className="fi-filter me-2"></i>
        Filters
      </Button>
    </Layout>
  );
};

export async function getServerSideProps() {
  const page = 10;
  try {
    const resPerformances = await axios.get("art/performanceAwards", {
      params: {page},
    });
    let newPerformanceData = resPerformances.data;

    return {
      props: {
        newPerformanceData: newPerformanceData,
      },
    };
  } catch (error) {
    console.error("데이터 가져오다가 오류 남!!!!!!!!!!" + error);
    return {
      // 오류 나면 빈 객체 반환
      props: {
        newPerformanceData: [],
      },
    };
  }
}

export default PerformanceList;
