import {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import Link from "next/link";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormGroup from "../../components/FormGroup";
import IconBox from "../../components/IconBox";
import IconBoxJY from "../components/IconBoxJY";
import VenueCard from "../../components/VenueCard";
import ListItem from "../components/ListItem";
import "simplebar/dist/simplebar.min.css";
import apiClient from "../../services/apiClient";
import Boxoffice from "../components/BoxOffice";

import "leaflet/dist/leaflet.css";

const CatalogPage = () => {
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

  const fetchMoviesByGenre = async (genre) => {
    try {
      const response = await apiClient.get("/movies/movieGenre", {
        params: {genre: genre},
      });
      // Movie 데이터 처리
      console.log(response.data);
      setSearchResults(response.data);
      setShowSearchData(true);
    } catch (error) {
      console.error("Error fetching movies by genre: ", error);
    }
  };

  const handleCategoryClick = (title, value) => {
    setCategory(value);
    fetchMoviesByGenre(value);
  };

  // Categories
  const categories = [
    {icon: "fi-star-filled", title: "드라마", value: "드라마"},
    {icon: "fi-romance", title: "로맨스", value: "멜로"},
    {icon: "fi-action", title: "액션", value: "액션"},
    {icon: "fi-horror", title: "공포", value: "공포"},
    {icon: "fi-thriller", title: "스릴러", value: "스릴러"},
    {icon: "fi-science", title: "SF", value: "SF"},
    {icon: "fi-mystery", title: "미스터리", value: "미스터리"},
    {icon: "fi-fantasy-movie", title: "판타지", value: "판타지"},
    {icon: "fi-family", title: "가족", value: "가족"},
    {icon: "fi-adventure", title: "어드벤처", value: "어드벤처"},
  ];

  // Category dropdown
  const [category, setCategory] = useState("");

  // data
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // 검색 조건 설정
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Title");
  const [searchTypeError, setSearchTypeError] = useState(false);

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSubmit = (event) => {
    if (!searchTerm) {
      alert("검색어를 입력하세요.");
      setSearchTypeError(true);
      return;
    }

    setSearchTypeError(false);

    const inputData = {
      searchTerm: searchTerm,
      searchType: searchType,
    };

    setCategory(null);

    fetchData(inputData);
  };

  // Call Controller
  const fetchData = async (inputData) => {
    try {
      const response = await apiClient.get("/movies/search", {
        params: inputData,
      });
      setShowSearchData(true);
      setSearchResults(response.data);
    } catch (error) {
      alert("에러" + error);
      setShowSearchData(false);
      setSearchResults([]);
    }
  };

  //파지네이션
  //현재 페이지에 해당하는 아이템 추출
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

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

  return (
    <Layout pageTitle="영화 목록" activeNav="Pages">
      {/* 헤더 */}
      <Container as="section" className="container pt-5 pb-4 mb-lg-2">
        <div
          style={{
            backgroundImage: "url('/images/header/movie.png')",
            backgroundSize: "cover",
          }}
          className="d-flex justify-content-center align-items-center flex-column py-5 my-5"
        >
          <div className="display-2 hanamdaum text-shadow pt-4 text-white">영화 검색</div>
          <div className="pyeongChang-regular text-white mt-4 fs-sm">한 번에 검색할 수 있는 양은 30개로 제한됩니다.</div>
          <div className="pyeongChang-regular text-white mt-2 fs-sm">검색이 원활하게 되지 않는 경우 검색어를 바꿔주세요.</div>
        </div>
      </Container>

      {/* Page container */}
      <Container>
        <Row className="mt-n5 pb-5 mb-5">
          {/* Filters sidebar (Offcanvas on screens < 992px) */}
          <Col as="aside" lg={4} xl={3} className="border-end-lg px-0 pt-lg-2">
            <Row className="ms-1">
              <div>
                <FormGroup
                  className="rounded-pill mb-lg-2 pyeongChang-regular"
                  style={{
                    width: "95%",
                  }}
                >
                  <InputGroup>
                    <InputGroup.Text className="text-muted">
                      <i className="fi-search"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="검색 조건 입력" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </InputGroup>
                  <Button variant="primary rounded-pill d-lg-inline-block d-none" onClick={handleSubmit}>
                    검색
                  </Button>
                </FormGroup>
              </div>
            </Row>

            <Row>
              <div className="pt-0 pt-lg-4 px-lg-0 fw-bold pyeongChang-regular fs-s d-flex justify-content-center mb-4">
                <div
                  style={{
                    width: "90%",
                  }}
                  className=" searchTypeRadio d-flex justify-content-evenly  "
                >
                  <label className="searchTypeRadio">
                    <input type="radio" name="searchType" value="Title" checked={searchType === "Title"} onChange={handleTypeChange} />
                    <span className="d-flex align-items-center justify-content-center">작품명</span>
                  </label>

                  <label className="searchTypeRadio">
                    <input type="radio" name="searchType" value="directorNm" checked={searchType === "directorNm"} onChange={handleTypeChange} />
                    <span className="d-flex align-items-center justify-content-center"> 감독명 </span>
                  </label>

                  <label className="searchTypeRadio">
                    <input type="radio" name="searchType" value="actorNm" checked={searchType === "actorNm"} onChange={handleTypeChange} />
                    <span className="d-flex align-items-center justify-content-center">배우 이름</span>
                  </label>
                </div>
              </div>
            </Row>
            <hr />
            <Row lg={2} xs={1} className="g-3 mt-1 pyeongChang-regular p-2 mb-2 pb-1">
              {categories.map(({icon, title, value}, indx) => (
                <Col key={indx}>
                  <IconBoxJY
                    type="card-shadow"
                    media={icon}
                    selected={category === value}
                    title={title}
                    align="center"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(title, value);
                    }}
                    className={category === value ? "text-primary" : ""}
                  />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Content */}
          <Col lg={8} xl={9} className="position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
            {/* Sorting */}
            <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
              <hr className="d-none d-sm-block w-100 mx-4" />
              <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
                <i className="fi-check-circle me-2"></i>
                <span className="fs-sm mt-n1">{searchResults.length} 개의 검색결과</span>
              </div>
            </div>

            {!showSearchData && (
              <>
                <div className="text-center mt-4 ">
                  <h2 className="pyeongChang-bold text-hdGray">BOX OFFICE</h2>
                  <div className="mt-4 pt-3">
                    <Boxoffice />
                  </div>
                </div>
              </>
            )}

            {/* Catalog grid */}
            {showSearchData && (
              <Row xs={1} sm={2} xl={3} className="gy-4 gx-3 gx-xxl-4 py-4">
                {currentItems.map((movie) => (
                  <Col key={movie.mvno} className="pb-sm-2">
                    <ListItem
                      href={`movieDetail/?id=${movie.mvno}`}
                      img={{
                        src: movie.posters,
                        width: "504px",
                        height: "700px",
                        alt: movie.title,
                      }}
                      title={movie.title}
                      director={movie.directorNm}
                      wishlistButton={{
                        tooltip: "Add to Favorites",
                        props: {
                          onClick: () => console.log("Venu has been added to your Favorites list!"),
                        },
                      }}
                      prodYear={movie.prodYear}
                    />
                  </Col>
                ))}
              </Row>
            )}

            {/* Pagination */}
            <nav className="d-flex justify-content-center" aria-label="Pagination">
              <Pagination>{renderPageButtons()}</Pagination>
            </nav>
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

export default CatalogPage;
