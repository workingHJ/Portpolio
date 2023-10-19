import {useState, useEffect} from "react";

import Link from "next/link";
import Layout from "./components/Layout";
import ImageLoader from "../components/ImageLoader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "../components/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import ShortCut from "./components/ShortCut";
import VenueCardOverlayJY from "./components/VenueCardOverlayJY";
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import apiClient from "../services/apiClient";
import {useRouter} from "next/router";
import GardenCard from "../components/GardenCard";
import ListItem from "./components/exhibitionListItem";

const IndexPage = () => {
  const localhost = "http://localhost:80";
  const [books, setBooks] = useState([]); // 주목할 만한 신간
  const [exhis1, setExhis1] = useState([]); // 이달의 전시1
  const [exhis2, setExhis2] = useState([]); // 이달의 전시2

  const [cat, setCat] = useState("book"); // 헤더 선택
  const [gardens, setGardens] = useState([]); // 공개정원 가져오기
  const router = useRouter();

  // 검색
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTypeError, setSearchTypeError] = useState(false);
  const [searchType, setSearchType] = useState("Title");
  const [sort, setSort] = useState("Accuracy");
  // 데이터
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getExhiList(); // 이달의 전시 불러오기
    getBookList(); // 주목할 만한 신간 불러오기
    getGardens();
    getPerforms();
  }, []);

  // 주목할 만한 신간 리스트
  const getBookList = async () => {
    try {
      const count = 5;
      const response = await axios.get("http://localhost/art/mainBooks", {params: {count}});
      setBooks(response.data.bookList);
    } catch (e) {
      console.log(e);
    }
  };

  // 이달의 전시 리스트
  const getExhiList = async () => {
    try {
      const count = 6;
      const response = await axios.get("http://localhost/art/exhiOfMonth", {params: {count}});
      setExhis1(response.data.exhiList1);
      setExhis2(response.data.exhiList2);
    } catch (e) {
      console.log(e);
    }
  };

  // 이달의 전시 제목 자르기
  const titleSub = (title) => {
    var str = title.substring(0, 15);
    if (title.length > 15) {
      str += "…";
    }
    return str;
  };

  // 이달의 전시 날짜 설정
  const STEDDate = (startDate, endDate) => {
    var str = "";
    str += startDate.substring(0, 10) + " ~ " + endDate.substring(0, 10);
    return str;
  };

  let nowMonth = new Date().getMonth() + 1; // 이달의 전시 해당 월 가져오기

  const getGardens = async () => {
    try {
      const count = 3;
      const response = await apiClient.get("http://localhost/garden/getIndexGarden", {params: {count}});
      setGardens(response.data.gardenList);
      console.log(response.data.gardenList);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 검색
    if (!searchTerm) {
      alert("검색어를 입력하세요.");
      setSearchTypeError(true);
      return;
    }
    setSearchTypeError(false);
    router.push(`/art/unifiedSearch?title=${searchTerm}&category=${cat}`);
  };

  const handleKeywordChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [newPerformanceData, setNewPerformanceData] = useState([]);
  const getPerforms = async () => {
    try {
      const page = 4;
      const resPerformances = await apiClient.get("art/performanceAwards", {
        params: {page},
      });
      const newPerformanceData = resPerformances.data;
      setNewPerformanceData(newPerformanceData);
    } catch (error) {
      console.error("데이터 가져오다가 오류 남!!!!!!!!!!", error);
    }
  };

  let displayCategory;
  if (cat === "book") {
    displayCategory = "도서";
  } else if (cat === "exhibition") {
    displayCategory = "전시";
  } else if (cat === "movie") {
    displayCategory = "영화";
  } else if (cat === "perform") {
    displayCategory = "공연";
  }

  return (
    <Layout pageTitle="메인페이지" activeNav="Pages">
      {/* 헤더 */}
      <Container as="section" className="container py-5 mt-5 mb-lg-3">
        <Row className="align-items-center mt-md-2">
          <Col lg={7} className="order-lg-2 mb-lg-0 mb-4 pb-2 pb-lg-0">
            <div className="d-flex justify-content-center">
              <ImageLoader src="/images/home/hero.png" width={1492} height={972} alt="Hero image" />
            </div>
          </Col>
          <Col lg={5} className="order-lg-1 pe-lg-0">
            <h1 className="display-6 ps-3 me-lg-n5 d-flex flex-wrap align-items-center justify-content-lg-start justify-content-center hanamdaum h3">
              <span className="me-2">오늘의 세계를 가꿀</span>
              <Dropdown as="span" className="d-inline-block">
                <Dropdown.Toggle className="bg-transparent text-primary border-0 shadow-none text-decoration-none py-1 px-0 fw-normal" style={{fontSize: "inherit"}}>
                  {displayCategory}
                  <Dropdown.Menu align="end">
                    <Dropdown.Item className="fs-base fw-normal" onClick={() => setCat("book")}>
                      도서
                    </Dropdown.Item>
                    <Dropdown.Item className="fs-base fw-normal" onClick={() => setCat("movie")}>
                      영화
                    </Dropdown.Item>
                    <Dropdown.Item className="fs-base fw-normal" onClick={() => setCat("perform")}>
                      공연
                    </Dropdown.Item>
                    <Dropdown.Item className="fs-base fw-normal" onClick={() => setCat("exhibition")}>
                      전시
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Toggle>
              </Dropdown>
            </h1>
            <div className="pyeongChang-regular">
              <div className="text-lg-start fs-4 d-flex justify-content-center">즐거움, 배움,생계, 어떤 이유로든</div>
              <div className="text-lg-start mb-4 mb-lg-5 fs-4 d-flex justify-content-center">함께 우리의 세계가 넓어지는 정원</div>
            </div>

            {/* Search form */}
            <div className="position-relative zindex-5 me-lg-n5">
              <FormGroup className="d-block d-md-flex rounded-md-pill me-lg-n5 pyeongChang-regular">
                <InputGroup size="lg">
                  <InputGroup.Text className="text-muted ps-3">
                    <i className="fi-search"></i>
                  </InputGroup.Text>
                  <FormControl aria-label="Search field" placeholder="작품명을 입력하세요." value={searchTerm} onChange={handleKeywordChange} />
                </InputGroup>
                <hr className="d-md-none my-2" />
                <div className="d-sm-flex">
                  <Button size="lg" className="rounded-pill w-100 w-md-auto ms-sm-3" onClick={handleSubmit}>
                    검색
                  </Button>
                </div>
              </FormGroup>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 공개정원 */}
      <Container as="section" className="container mb-lg-3 ">
        <h2 className="hanamdaum mb-4">
          함께 가꿀 수 있는 공개 정원
          <Link href="/garden/gardenList" className="ps-5 text-decoration-none ms-3 fs-5">
            +더보기
          </Link>
        </h2>
        <div className="d-flex justify-content-evenly  pyeongChang-regular">
          {gardens &&
            gardens.map((garden) => (
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
                  className="px-2"
                />
              </Col>
            ))}
        </div>
      </Container>

      {/* 숏컷 */}
      <Container as="section" className="container pt-5 pb-3 mt-3 mb-2">
        <div className="d-flex justify-content-evenly">
          <ShortCut title="영화" href="./art/movie-list" imgSrc="../images/아이콘/메인/영화.png" />
          <ShortCut title="공연" href="./art/performance-list" imgSrc="../images/아이콘/메인/공연.png" />
          <ShortCut title="전시" href="./art/exhibition-list" imgSrc="../images/아이콘/메인/전시.png" />
          <ShortCut title="도서" href="./art/book-list" imgSrc="../images/아이콘/메인/도서.png" />
          <ShortCut title="자유게시판" href="./board/list" imgSrc="../images/아이콘/메인/모임.png" />
        </div>
      </Container>

      {/* 이달의 전시 */}
      <Container as="section" className="container pt-5 mt-4 pb-3 mb-lg-3 pyeongChang-regular">
        <Row className="">
          <Col lg={8} className="mb-3 mb-sm-0">
            <Row>
              <Col sm={6} className="">
                {exhis1.map((exhi, indx) => (
                  <div key={indx} className="d-flex align-items-start position-relative mb-4 d-flex align-items-center">
                    <img src={exhi.imgUrl} style={{width: "150px", height: "150px"}} alt={exhi.title} className="flex-shrink-0 rounded-3" />
                    <div className="ps-3">
                      <div
                        style={{
                          backgroundColor: "#e7e5e5",
                          width: "60px",
                          borderRadius: "25px",
                        }}
                        className="text-center mb-4"
                      >
                        {exhi.area}
                      </div>
                      <h3 className="mb-2 fs-lg">
                        <Link href={`/art/exhibitionDetail/?id=${exhi.seq}`} className="nav-link stretched-link pyeongChang-regular">
                          {titleSub(exhi.title)}
                        </Link>
                      </h3>
                      <ul className="list-unstyled mb-0 fs-xs pyeongChang-regular">
                        <li className="mb-2">
                          <i className="fi-calendar mt-n1 me-1 fs-base text-muted align-middle"></i>
                          <span className="fs-sm"> {STEDDate(exhi.startDate, exhi.endDate)}</span>
                        </li>
                        <li>
                          <i className="fi-map-pin mt-n1 me-1 fs-base text-muted align-middle"></i>
                          <span className="fs-sm"> {exhi.place}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </Col>
              <Col sm={6} className="">
                {exhis2.map((exhi, indx) => (
                  <div key={indx} className="d-flex align-items-start position-relative mb-4 d-flex align-items-center">
                    <img src={exhi.imgUrl} style={{width: "150px", height: "150px"}} alt={exhi.title} className="flex-shrink-0 rounded-3" />
                    <div className="ps-3">
                      <div
                        style={{
                          backgroundColor: "#e7e5e5",
                          width: "60px",
                          borderRadius: "25px",
                        }}
                        className="text-center mb-4"
                      >
                        {exhi.area}
                      </div>
                      <h3 className="mb-2 fs-lg">
                        <Link href={`/art/exhibitionDetail/?id=${exhi.seq}`} className="nav-link stretched-link pyeongChang-regular mb-3">
                          {titleSub(exhi.title)}
                        </Link>
                      </h3>
                      <ul className="list-unstyled mb-0 fs-xs pyeongChang-regular">
                        <li className="mb-2">
                          <i className="fi-calendar mt-n1 me-1 fs-base text-muted align-middle"></i>
                          <span className="fs-sm"> {STEDDate(exhi.startDate, exhi.endDate)}</span>
                        </li>
                        <li>
                          <i className="fi-map-pin mt-n1 me-1 fs-base text-muted align-middle"></i>
                          <span className="fs-sm"> {exhi.place}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
          {/* Banner */}
          <Col
            lg={4}
            className="text-center position-relative text-lg-start "
            style={{
              backgroundColor: "#f5f4f8",
              borderRadius: "30px",
              height: "495px",
            }}
          >
            <div
              className="position-absolute bottom-0 end-0"
              style={{
                backgroundImage: "url('/images/home/전시꾸미기.png')",
                backgroundSize: "cover",
                width: "300px",
                height: "440px",
              }}
            ></div>
            <div style={{height: "100%"}}>
              <Row>
                <div className="ps-4 pt-5">
                  <h2 className="display-5 hanamdaum" style={{color: "#47573a"}}>
                    이달의 전시
                  </h2>
                </div>
              </Row>
              <Row>
                <div>
                  <p className="hanamdaum pt-5 ms-3" style={{color: "#47573a", fontSize: "250px", whiteSpace: "nowrap", marginBottom: "-100px"}}>
                    {nowMonth}
                  </p>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 상영 중인 공연 */}
      <Container as="section" className=" mt-3 container py-4">
        <h2 className="hanamdaum mb-4 pb-1">상영 중인 공연</h2>
        <Swiper spaceBetween={20} loop slidesPerView={4} navigation pagination={{el: "#bullets", clickable: true}}>
          {newPerformanceData?.map((performance, index) => (
            <SwiperSlide key={index}>
              <ListItem
                href={`/art/performanceDetail/?id=${performance.mt20id}`}
                key={performance.mt20id}
                img={{
                  src: performance.poster,
                  width: "300px",
                  height: "400px",
                  alt: performance.prfnm,
                }}
                title={performance.prfnm}
                area={performance.genrenm}
                place={performance.prfstate}
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
        <div id="bullets" className="swiper-pagination position-relative bottom-0 mt-2 mb-lg-3"></div>
      </Container>

      {/* 뭐 볼지 고민하는 당신에게 */}
      <Container as="section" className="container mt-4 pt-4 pb-4 mb-lg-3">
        <h2 className="hanamdaum mb-4 pb-1">뭐 볼지 고민하는 당신에게</h2>

        {/* Swiper slider */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: "#prevVenue",
            nextEl: "#nextVenue",
          }}
          spaceBetween={24}
          speed={400}
          loop
        >
          {/* Item */}
          <SwiperSlide>
            <Row>
              <Col md={6} className="d-flex position-relative zindex-5">
                <ImageLoader src="https://t1.daumcdn.net/movie/movie-private/b86515aff3e9bcc9708162b5fe249b00224955d1" objectFit="cover" width={1492} height={816} alt="Image" className="rounded-3" />
              </Col>
              <Col md={6} className="ps-2 bg-light">
                <h2 className="from-top hanamdaum">1917</h2>
                <div className="list-unstyled fs-base delay-2 from-start pyeongChang-regular">
                  <div className="d-flex justify-content-end">샘 멘데스</div>
                  <div className="d-flex justify-content-end">조지 맥케이</div>
                  <div className="d-flex justify-content-end">드라마, 시대극, 액션, 어드벤처, 전쟁</div>
                </div>
                <div className="delay-3 lh-160 from-end recommend pyeongChang-regular mt-4 fs-6">
                  두 명의 병사, 하나의 임무! 그들이 싸워야 할 것은 적이 아니라 시간이었다! 제1차 세계대전이 한창인 1917년. 독일군에 의해 모든 통신망이 파괴된 상황 속에서 영국군 병사 '스코필드'(조지
                  맥케이)와 '블레이크'(딘-찰스 채프먼)에게 하나의 미션이 주어졌다. 함정에 빠진 영국군 부대의 수장 '매켄지' 중령(베네딕트 컴버배치)에게 '에린무어' 장군(콜린 퍼스)의 공격 중지 명령을
                  전하는 것! 둘은 1,600명의 아군과 '블레이크'의 형(리차드 매든)을 구하기 위해 전쟁터 한복판을 가로지르며 사투를 이어가는데…
                </div>
                <div className="text-center pyeongChang-regular">
                  <Button as={Link} href={`/art/movieDetail/?id=50418`} variant="primary rounded-pill delay-4 scale-up mt-3">
                    바로가기
                  </Button>
                </div>
              </Col>
            </Row>
          </SwiperSlide>

          {/* Item */}
          <SwiperSlide>
            <Row>
              <Col md={6} className="d-flex position-relative zindex-5 mb-md-0 mb-3">
                <ImageLoader src="/images/작품/헌트.jpg" objectFit="cover" width={1492} height={816} alt="Image" className="rounded-3" objectfit="none" />
              </Col>
              <Col md={6} className="px-3 bg-light">
                <h3 className="h3 from-top hanamdaum">헌트</h3>
                <div className="list-unstyled fs-base delay-2 from-start pyeongChang-regular">
                  <div className="d-flex justify-content-end">이정재</div>
                  <div className="d-flex justify-content-end">정우성, 전혜진, 허성태, 고윤정, 김종수, 정만식</div>
                  <div className="d-flex justify-content-end">액션, 드라마</div>
                </div>
                <div className="delay-3 from-end recommend pyeongChang-regular mt-4 fs-6">
                  조직 내 숨어든 스파이를 색출하라! `사냥꾼`이 될 것인가, `사냥감`이 될 것인가! 망명을 신청한 북한 고위 관리를 통해 정보를 입수한 안기부 해외팀 `박평호`(이정재)와 국내팀
                  `김정도`(정우성)는 조직 내 숨어든 스파이 `동림` 색출 작전을 시작한다. 스파이를 통해 일급 기밀사항들이 유출되어 위기를 맞게 되자 날 선 대립과 경쟁 속, 해외팀과 국내팀은 상대를
                  용의선상에 올려두고 조사에 박차를 가한다. 찾아내지 못하면 스파이로 지목이 될 위기의 상황, 서로를 향해 맹렬한 추적을 펼치던 `박평호`와 `김정도`는 감춰진 실체에 다가서게 되고, 마침내
                  `대한민국 1호 암살 작전`이라는 거대한 사건과 직면하게 되는데…… 하나의 목표, 두 개의 총구 의심과 경계 속 두 남자의 신념을 건 작전이 시작된다
                </div>
                <div className="text-center pyeongChang-bold">
                  <Button as={Link} href={`/art/movieDetail/?id=28056`} variant="primary rounded-pill delay-4 scale-up mt-3">
                    바로가기
                  </Button>
                </div>
              </Col>
            </Row>
          </SwiperSlide>
        </Swiper>

        {/* External Prev/Next buttons */}
        <div className="d-flex pt-2 mt-3">
          <Button id="prevVenue" variant="prev" className="position-relative mx-2" />
          <Button id="nextVenue" variant="next" className="position-relative mx-2" />
        </div>
      </Container>

      {/* 주목할 만한 신간 리스트 */}
      <Container as="section" className="container pt-3 pb-5 mb-lg-3">
        <h2 className="hanamdaum mb-4 pb-1">주목할 만한 신간 리스트</h2>
        <Row>
          {books.map((book) => (
            <Col key={book.isbn13}>
              <div className="position-relative text-center">
                <div className="bg-secondary rounded-3 p-1 mb-3">
                  <div className="d-inline-block">
                    <ImageLoader src={book.cover} width={150} height={200} alt={books[0].name} />
                  </div>
                </div>
                <Link href={`/art/bookDetail/?id=${book.isbn13}`} className="nav-link stretched-link p-0 mb-1 pyeongChang-regular fw-bold fs-5">
                  {book.title}
                </Link>
                <span className="fs-sm pyeongChang-regular fs-7">
                  {book.publisher} | {book.author}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default IndexPage;
