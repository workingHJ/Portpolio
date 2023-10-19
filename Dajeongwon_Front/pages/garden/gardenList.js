import {useContext, useEffect, useState} from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Pagination from "react-bootstrap/Pagination";
import Offcanvas from "react-bootstrap/Offcanvas";
import FormGroup from "../../components/FormGroup";
import GardenCardHorizon from "../../components/GardenCardHorizon";
import GardenCard from "../../components/GardenCard";
import RecommendCard from "../../components/RecommendCard";
import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Badge} from "react-bootstrap";
import {LoginContext} from "../_app";
import apiClient from "../../services/apiClient";

const gardenList = (props) => {
  const {loginInfo} = useContext(LoginContext);
  const [myGardenData, setMyGardenData] = useState(null);
  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    getGardenList();
    getMyGardenData();
    return () => body.classList.remove("fixed-bottom-btn");
  }, [loginInfo]);

  // Form validation
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    getGardenList(inputData);
    setValidated(true);
  };

  //변수 설정
  const [inputData, setInputData] = useState({
    aNo: "",
    title: "",
    category: "",
    tag: "",
    sort: "",
  });

  const handleSortClick = async (e) => {
    const {name, value} = e.target;
    const newData = {[name]: value};
    setInputData(newData);
    // Rest of your code
    await getGardenList(newData);
  };

  const handleTitleChange = (e) => {
    const {name, value} = e.target;
    const newData = {[name]: value};
    setInputData(newData);
  };

  // Offcanvas show/hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // gardenData 가져오기
  const [searchResult, setSearchResult] = useState();
  const [bestGardens, setBestGardens] = useState();

  const getGardenList = async (inputData) => {
    try {
      const params = inputData
        ? {
            aNo: inputData.aNo,
            title: inputData.title,
            category: inputData.category,
            tag: inputData.tag,
            sort: inputData.sort,
          }
        : {};
      const response = await apiClient.get("/garden/getPublicGardenList", {
        params,
      });
      if (response.data.result === true) {
        setSearchResult(response.data.gardenList);
        setBestGardens(response.data.bestGardens);
      } else {
        throw new Error("데이터 가져오는 데 문제 생김");
      }
    } catch (error) {
      alert("데이터를 가져오는 데에 문제가 발생했습니다" + error);
    }
  };

  // 파지네이션
  // 현재 페이지에 해당하는 아이템 추출
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResult?.length / itemsPerPage);

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

  // Tags array
  const categories = [
    {id: 1, name: "전체", value: "all"},
    {id: 2, name: "영화", value: "movie"},
    {id: 3, name: "도서", value: "book"},
    {id: 4, name: "전시", value: "exhibition"},
    {id: 5, name: "공연", value: "perform"},
  ];

  const tags = [
    {id: 1, name: "설정 안함", value: "none"},
    {id: 2, name: "로맨스", value: "로맨스"},
    {id: 3, name: "연극", value: "연극"},
    {id: 4, name: "뮤지컬", value: "뮤지컬"},
    {id: 5, name: "클래식", value: "클래식"},
    {id: 6, name: "수상작", value: "수상작"},
    {id: 7, name: "SF", value: "SF"},
    {id: 8, name: "자기계발", value: "자기계발"},
    {id: 9, name: "전쟁", value: "전쟁"},
    {id: 10, name: "미장센", value: "미장센"},
    {id: 11, name: "히어로", value: "히어로"},
    {id: 12, name: "청소년", value: "청소년"},
    {id: 13, name: "공포", value: "공포"},
  ];

  //내가 참여중인 정원 가져오기

  const getMyGardenData = async () => {
    try {
      const response = await apiClient.get("/member/getGardens");
      if (response.data.result === true) {
        console.log("gardenList 호출");
        setMyGardenData(response.data.GardenList);
        console.log(" gardenList " + myGardenData);
      } else {
        console.log("로그인 되어 있지 않음");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMyGardenData(null);
    }
  };

  // 'Editor's choice' posts
  const recommends = [
    {
      aNo: 2,
      href: "작품링크1",
      img: "/images/작품/엘리멘탈.jpg",
      category: ["영화"],
      company: "디즈니 픽사",
      title: "엘리멘탈",
    },
    {
      aNo: 8,
      href: "/job-board/blog-single",
      img: "https://image.aladin.co.kr/product/32063/1/cover/8936439235_1.jpg",
      category: ["도서"],
      company: "김정 (지은이)",
      title: "노 휴먼스 랜드",
    },
  ];

  function formatDateString(dateString) {
    if (dateString == null) {
      return "기간 없음";
    }
    const dateObj = new Date(dateString);
    const formatOptions = {year: "numeric", month: "long", day: "numeric"};
    return new Intl.DateTimeFormat("ko-kr", formatOptions).format(dateObj);
  }

  return (
    <Layout pageTitle="열린 정원" activeNav="Pages">
      {/* Page content */}
      <Container as="section" className="mt-5 mb-md-4 py-5 pyeongChang-regular">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-3 mb-md-4 pt-md-3">
          <Breadcrumb.Item linkAs={Link} href="/job-board">
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active> 모임 찾기</Breadcrumb.Item>
        </Breadcrumb>

        {/* Page title */}
        <h1 className="pb-3 hanamdaum fw-normal">참여할 수 있는 열린 정원</h1>
        <Row>
          <h4>
            <i className="fi-star-filled me-2 text-beige"></i>지금 인기
          </h4>
          <Col lg={8}>
            <Row sm={2} className="gy-4">
              {bestGardens &&
                bestGardens.map((garden) => (
                  <Col as="article" key={garden.gno}>
                    <GardenCard
                      type="card"
                      href={`/garden/gardenDetail?type=${garden.accessType}&gNo=${garden.gno}`}
                      img={{
                        src: "http://localhost:80" + garden.imgPath,
                        alt: garden.title,
                        size: [832, 424],
                        objectFit: "cover",
                      }}
                      categories={garden.categories}
                      title={garden.title}
                      headcount={garden.headcount}
                      capacity={garden.capacity}
                    />
                  </Col>
                ))}
            </Row>

            <div className="py-2">
              <hr className="my-4" />
            </div>
            <div className="d-flex mb-5 align-items-center">
              <div className="text-gray600">
                마음에 드는 정원이 없거나
                <br />
                초대한 사람만 올 수 있게 하려면
              </div>
              <div className="ms-auto">
                <Link href="/garden/gardenMake-1">
                  <Button className="rounded-pill hanamdaum fw-normal fs-6">
                    <i className="fi-gardening me-2 fs-5"></i> 정원 만들기
                  </Button>
                </Link>
              </div>
            </div>

            {/* 정원 목록*/}
            <div className="mt-n4">
              <h4 className="mt-3">
                <i className="fi-star-filled me-2 text-beige"></i>정원 일람
              </h4>
              {searchResult &&
                currentItems.map((garden) => (
                  <GardenCardHorizon
                    key={garden.gno}
                    type="card-horizontal"
                    href={`/garden/gardenDetail?type=${garden.accessType}&gNo=${garden.gno}`}
                    img={{
                      src: "http://localhost:80" + garden.imgPath,
                      alt: garden.title,
                    }}
                    categories={garden.categories}
                    title={garden.title}
                    text={garden.description}
                    organizer={{
                      img: "http://localhost:80" + garden.makerImg,
                      name: garden.makerNickName,
                    }}
                    startDate={formatDateString(garden.startDate)}
                    endDate={formatDateString(garden.endDate)}
                    headcount={garden.headcount}
                    capacity={garden.capacity}
                    className="mt-4 mb-4"
                  />
                ))}
            </div>

            <div className="py-2">
              <hr className="my-4" />
            </div>

            {/* Pagination */}
            <nav className="d-flex justify-content-center" aria-label="Pagination">
              <Pagination>{renderPageButtons()}</Pagination>
            </nav>
          </Col>

          {/* Sidebar */}
          <Col as="aside" lg={4}>
            <Offcanvas show={show} onHide={handleClose} placement="end" responsive="lg">
              <Offcanvas.Header closeButton className="shadow-sm mb-2">
                <Offcanvas.Title as="h5">Sidebar</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* 폼 수정해야 함 */}
                {/* Sorting */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="sortby" className="d-flex align-items-center mb-4">
                    <Form.Label className="fw-normal text-body text-nowrap mb-0 me-2 pe-1">
                      <i className="fi-arrows-sort mt-n1 me-2 align-middle opacity-80"></i>
                      정렬:
                    </Form.Label>
                    <Form.Select name="sort" value={inputData.sort} onChange={handleSortClick}>
                      <option value="newest">최신</option>
                      <option value="highHeadcount">가입자 많은</option>
                      <option value="lowHeadcount">가입자 적은</option>
                    </Form.Select>
                  </Form.Group>
                  {/* Search */}
                  <div className="position-relative mb-4">
                    <Form.Group>
                      <Form.Label className="fs-5 mb-2"> 이름으로 검색하기 </Form.Label>
                      <Form.Control className="pe-5" placeholder="정원 이름을 입력하세요" name="title" value={inputData.title} onChange={handleTitleChange} />
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-2 fs-5" variant="warning">
                      <i className="fi-search pt-1 me-2"> </i> 검색
                    </Button>
                  </div>
                </Form>
                {/* Categories */}
                <Card className="card-flush pb-2 pb-lg-0 mb-4">
                  <Card.Body>
                    <h3 className="h5">관심 분야</h3>
                    {categories.map((category) => (
                      <h6 className="fs-base d-inline-block" key={category.id}>
                        <span className="text-primary"> #</span>
                        <Button name="category" value={category.value} onClick={handleSortClick} className="nav-link d-inline-block py-1 me-2">
                          {category.name}
                        </Button>
                      </h6>
                    ))}
                  </Card.Body>
                </Card>
                {/* Tags */}
                <Card className="card-flush pb-2 pb-lg-0 mb-4">
                  <Card.Body>
                    <h3 className="h5">관심 태그로 찾기</h3>
                    {tags.map((tag) => (
                      <Button key={tag.id} onClick={handleSortClick} name="tag" value={tag.value} size="xs" variant="outline-secondary rounded-pill fs-sm fw-normal me-2 mb-2">
                        {tag.name}
                      </Button>
                    ))}
                  </Card.Body>
                </Card>
                {/* 유저 로그인 여부에 따라서 다르게 하기. 지금은 모르겠어서 냅둠 */}
                {loginInfo && (
                  <Card className="card-flush pb-2 pb-lg-0 mb-4">
                    <Card.Body>
                      <h3 className="h5">참여 중인 정원</h3>
                      {myGardenData &&
                        myGardenData.map((garden) => (
                          <Link key={garden.gno} href={`/garden/gardenDetail?type=${garden.accessType}&gNo=${garden.gno}`} className="nav-link fw-normal d-flex  py-1 px-0">
                            {garden.title}
                            {garden.isAdmin === "Y" ? (
                              <Badge className="ms-3 rounded-pill text-dark-brown" bg="warning">
                                관리자
                              </Badge>
                            ) : (
                              <div></div>
                            )}
                          </Link>
                        ))}
                    </Card.Body>
                  </Card>
                )}

                {/* Editor's Choice */}
                <Card className="card-flush pb-2 pb-lg-0 mb-4">
                  <Card.Body>
                    <h3 className="h5">이달의 작품</h3>
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
                      {recommends.map((recommend) => (
                        <SwiperSlide as="article" key={recommend.aNo} className="h-auto" style={{padding: "20px"}}>
                          <RecommendCard
                            type="card"
                            href={recommend.href}
                            img={{
                              src: recommend.img,
                              size: [700, 520],
                              alt: "Image",
                            }}
                            aNo={recommend.aNo}
                            title={recommend.title}
                            categories={recommend.category}
                            company={recommend.company}
                            onClick={handleSortClick}
                          ></RecommendCard>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="d-flex justify-content-center mt-3">
                      <Button id="prev" variant="prev" className="position-relative mx-2" />
                      <Button id="next" variant="next" className="position-relative mx-2" />
                    </div>
                  </Card.Body>
                </Card>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
        </Row>
      </Container>

      {/* Sidebar toggle button (visible < 992px) */}
      <Button size="sm" className="w-100 rounded-0 fixed-bottom d-lg-none" onClick={handleShow}>
        <i className="fi-sidebar-left me-2"></i>
        Sidebar
      </Button>
    </Layout>
  );
};

export default gardenList;
