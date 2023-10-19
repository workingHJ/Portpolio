import {useEffect, useState, useContext} from "react";
import {useMediaQuery} from "react-responsive";
import axios from "axios";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormGroup from "../../components/FormGroup";
import FormGroup2 from "../../components/FormGroup2";
import IconBox from "../../components/IconBox";
import IconBoxJY from "../components/IconBoxJY";
import VenueCard from "../../components/VenueCard";
import NewBookList from "../components/newBookListItem";
import BookItem from "../components/bookItem";
import "simplebar/dist/simplebar.min.css";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";

import "leaflet/dist/leaflet.css";

const BookList = ({data}) => {
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  // 페이지당 보여줄 거 개수
  const itemsPerPage = 9;

  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    return () => body.classList.remove("fixed-bottom-btn");
  }, []);

  // Media query for displaying Offcanvas on screens larger than 991px
  const isDesktop = useMediaQuery({query: "(min-width: 992px)"});

  // 검색 조건 설정
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Title");
  const [sort, setSort] = useState("Accuracy");
  const [searchTypeError, setSearchTypeError] = useState(false);

  // Offcanvas show/hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 데이터
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // 파지네이션
  const [currentPage, setCurrentPage] = useState(1);

  //현재 페이지에 해당하는 아이템 추출
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

  const handleIconBoxClick = (value) => {
    setCategoryId(value);
    categorySearch(value);
  };

  const categorySearch = async (categoryId) => {
    try {
      const response = await apiClient.get("/art/bookRecommend", {
        params: categoryId,
      });
      setSearchResults(response.data);
      setShowSearchData(true);
    } catch (error) {
      alert("에러" + error);
      setShowSearchData(false);
      setSearchResults([]);
    }
  };

  // Function to fetch data from the external API
  const fetchData = async (inputData) => {
    try {
      const response = await apiClient.get("/art/bookList", {
        params: inputData,
      });
      setSearchResults(response.data);
      setShowSearchData(true);
    } catch (error) {
      alert("에러" + error);
      setShowSearchData(false);
      setSearchResults([]);
    }
  };

  const handleKeyPress = (event) => {
    event.preventDefault(); // Prevent form submission
    handleSubmit();
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
      sort: sort,
    };

    fetchData(inputData);
  };

  // Categories
  const categories = [
    {icon: "fi-literature", title: "소설/시/희곡", value: 1},
    {icon: "fi-sf", title: "SF 소설", value: 50930},
    {icon: "fi-world-liter", title: "세계문학", value: 50955},
    {icon: "fi-english", title: "영서 문학", value: 97454},
    {icon: "fi-book", title: "에세이", value: 55889},
    {icon: "fi-graduation", title: "인문학", value: 656},
    {icon: "fi-university2", title: "대학교재", value: 8257},
    {icon: "fi-self-confidence", title: "자기계발", value: 336},
  ];

  const [categoryId, setCategoryId] = useState({});

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    handleSubmit();
  };

  return (
    <Layout pageTitle="도서 목록" activeNav="Pages">
      {/* 헤더 */}
      <Container as="section" className="container pt-5 pb-4 mb-lg-2">
        <div
          style={{
            backgroundImage: "url('/images/header/book.png')",
            backgroundSize: "cover",
          }}
          className="d-flex justify-content-center align-items-center flex-column py-5 my-5"
        >
          <div className="display-2 hanamdaum text-shadow pt-4 text-white">도서 검색</div>
          <div className="pyeongChang-regular text-white mt-4 fs-sm">한 번에 검색할 수 있는 양은 30개로 제한됩니다.</div>
          <div className="pyeongChang-regular text-white mt-2 fs-sm">검색이 원활하게 되지 않는 경우 검색어를 바꿔주세요.</div>
        </div>
      </Container>

      {/* Page container */}
      <Container>
        <Row className="mt-n5 pb-5 mb-5">
          {/* Filters sidebar (Offcanvas on screens < 992px) */}
          <Col as="aside" lg={4} xl={3} className="border-end-lg px-0 pt-lg-2">
            <Row className="ms-2">
              <FormGroup2
                onSubmit={handleKeyPress}
                className="rounded-pill mb-lg-2 pyeongChang-regular"
                style={{
                  width: "90%",
                }}
              >
                <InputGroup>
                  <InputGroup.Text className="text-muted">
                    <i className="fi-search"></i>
                  </InputGroup.Text>
                  <Form.Control placeholder="검색 조건 입력" value={searchTerm} onChange={handleKeywordChange} />
                </InputGroup>
                <Button variant="primary rounded-pill d-lg-inline-block d-none" onClick={handleSubmit}>
                  검색
                </Button>
              </FormGroup2>
              {searchTypeError && <div className="mt-2 pyeongChang-regular ms-4 text-danger">검색어를 입력해주세요.</div>}
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
                    <input type="radio" name="searchType" value="Author" checked={searchType === "Author"} onChange={handleTypeChange} />
                    <span className="d-flex align-items-center justify-content-center">작가</span>
                  </label>

                  <label className="searchTypeRadio">
                    <input type="radio" name="searchType" value="Publisher" checked={searchType === "Publisher"} onChange={handleTypeChange} />
                    <span className="d-flex align-items-center justify-content-center">출판사</span>
                  </label>
                </div>
              </div>
            </Row>
            <hr />

            <Row lg={2} xs={1} className="g-3 mt-1 pyeongChang-regular p-2 mb-2 pb-1">
              {categories.map((item, index) => (
                <Col key={index}>
                  <IconBoxJY
                    type="card-shadow"
                    media={item.icon}
                    mediaColor="iconGray"
                    title={decodeHTMLString(item.title)}
                    selected={categoryId.CategoryId === item.value}
                    align="center"
                    value={{CategoryId: item.value}}
                    onClick={() => handleIconBoxClick({CategoryId: item.value})}
                    className={categoryId.CategoryId === item.value ? "text-primary" : ""}
                  />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Content */}
          <Col lg={8} xl={9} className="position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
            {/* Sorting */}
            <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2 pyeongChang-regular">
              <Form.Group controlId="sortby" className="d-flex align-items-center flex-shrink-0">
                <Form.Label className="text-body fs-sm me-2 mb-0 pe-1 text-nowrap pyeongChang-regular">
                  <i className="fi-arrows-sort text-muted mt-n1 me-2"></i>
                  정렬 기준
                </Form.Label>
                <Form.Select size="sm" onChange={handleSortChange}>
                  <option value="Accuracy">관련도</option>
                  <option value="SalesPoint">판매량</option>
                  <option value="PublishTime">출간일</option>
                </Form.Select>
              </Form.Group>
              <hr className="d-none d-sm-block w-100 mx-4" />
              <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
                <i className="fi-check-circle me-2 mb-1"></i>
                <span className="fs-sm mt-n1">{searchResults.length} 개의 검색결과</span>
              </div>
            </div>

            {showSearchData == false && (
              <>
                <div className="text-center mt-4 ">
                  <h2 className="pyeongChang-bold">주목할 만한 신간</h2>
                  <Row xs={1} sm={2} xl={4} className="gy-4 gx-3 gx-xxl-4 py-4">
                    {data.map((item, index) => (
                      <>
                        <Col key={item.index} className="pb-sm-2">
                          <NewBookList
                            href={`bookDetail/?id=${item.isbn13}`}
                            key={item.isbn13}
                            img={{
                              src: item.cover,
                              width: "504px",
                              height: "700px",
                              alt: item.title,
                            }}
                            title={decodeHTMLString(item.title)}
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
                </div>
              </>
            )}
            {/* Catalog grid */}
            {showSearchData ? (
              <Row xs={1} sm={2} xl={3} className="gy-4 gx-3 gx-xxl-4 py-4">
                {currentItems.map((item, indx) => (
                  <Col key={indx} className="pb-sm-2">
                    <BookItem
                      item={item}
                      img={{
                        src: item.cover,
                        width: "504px",
                        height: "700px",
                        alt: item.title,
                      }}
                      title={decodeHTMLString(item.title)}
                      author={item.author}
                      isbn13={item.isbn13}
                      wishlistButton={{
                        tooltip: "Add to Favorites",
                        props: {
                          onClick: () => console.log("Venu has been added to your Favorites list!"),
                        },
                      }}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Row style={{height: "600px"}}></Row>
            )}

            {showSearchData && (
              <>
                {/* Pagination */}
                <nav className="border-top pb-md-4 pt-4" aria-label="Pagination">
                  <Pagination>{renderPageButtons()}</Pagination>
                </nav>
              </>
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
  const count = 4;
  try {
    const res = await axios.get("art/newBookList", {
      params: {count},
    });
    const newListdata = res.data;
    return {
      props: {
        data: newListdata,
      },
    };
  } catch (error) {
    console.error("데이터 가져오다가 오류 남!!!!!!!!!!" + error);
    return {
      // 오류 나면 빈 객체 반환
      props: {
        data: [],
      },
    };
  }
}

export default BookList;
