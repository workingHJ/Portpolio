import {useEffect, useState, useContext} from "react";
import {useMediaQuery} from "react-responsive";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormGroup from "../../components/FormGroup";
import "simplebar/dist/simplebar.min.css";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";
import DropdownSelect from "../../components/DropdownSelect";
import ArtCardInSearch from "../../components/ArtCardInSearch";

import "leaflet/dist/leaflet.css";
import {useRouter} from "next/router";
import {FormControl} from "react-bootstrap";

const BookList = ({FirstData}) => {
  const router = useRouter();
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  const {title, category} = router.query;
  // 검색 조건 설정
  const [inputTitle, setInputTitle] = useState(title);
  const [selected, setSelected] = useState(category);

  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    return () => body.classList.remove("fixed-bottom-btn");
  }, []);

  // Media query for displaying Offcanvas on screens larger than 991px
  const isDesktop = useMediaQuery({query: "(min-width: 992px)"});

  // Offcanvas show/hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //결과
  const [artList, setArtList] = useState(FirstData);
  const handleSearch = (event) => {
    event.preventDefault();
    if (category === "") {
      alert("카테고리를 선택해주세요.");
      return;
    }
    if (title == "" || title === null) {
      alert("검색어를 입력해주세요.");
      return;
    }
  };

  const artSearch = async () => {
    try {
      const response = await apiClient.get("/art/searchArt", {
        params: {
          title: inputTitle,
          category: selected,
          limit: 20,
        },
      });
      if (response.data.result == true) {
        setArtList(response.data.artList);
      } else {
        throw new Error("서버에서 문제가 생겼어요.");
      }
    } catch (error) {
      alert(error + "검색에 실패했습니다. 다정원 관리자에게 문의해주세요.");
    }
  };

  return (
    <Layout pageTitle="통합 검색" activeNav="Pages">
      {/* 헤더 */}
      <Container as="section" className="container pb-1 pb-4 mb-5">
        <div
          style={{
            backgroundImage: "url('/images/header/union.png')",
            backgroundSize: "cover",
          }}
          className="d-flex justify-content-center align-items-center flex-column py-5 mt-5"
        >
          <div className="display-2 hanamdaum text-shadow pt-4 mt-3 mb-3 text-white">통합 검색</div>
          <FormGroup className="d-flext w-75 rounded-pill py-1 mt-4 mb-5 mb-sm-4 pyeongChang-regular" onSubmit={handleSearch}>
            <DropdownSelect defaultValue={category} icon="fi-list" className="w-25 border-end pe-3" onSelect={setSelected} />
            <InputGroup size="lg ms-1">
              <InputGroup.Text className="text-muted ps-3">
                <i className="fi-search me-2"></i>
              </InputGroup.Text>
              <FormControl aria-label="Search field" placeholder="작품 이름 검색" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
            </InputGroup>
            <hr className="d-md-none my-2" />
            <div className="d-sm-flex">
              <Button size="base" type="submit" className="rounded-pill w-100 w-md-auto ms-sm-3" onClick={() => artSearch()}>
                검색
              </Button>
            </div>
          </FormGroup>
        </div>

        <Container className="w-100 bg-secondary pt-4 pb-5">
          <Row className="pyeongChang-regular">
            {artList &&
              artList.map((art) => (
                <Col key={art.ano}>
                  <ArtCardInSearch
                    key={art.ano}
                    img={{
                      src: art.aimg,
                      size: [250, 350],
                      alt: art.title,
                    }}
                    href={`${art.category}Detail/?id=`}
                    title={art.title}
                    creator={art.creator}
                    category={art.category}
                    isbn={art.isbn}
                    mvNo={art.mvNo}
                    mt20id={art.mt20id}
                    seq={art.seq}
                    className="d-flex flex-column me-3 mb-3 px-3"
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </Container>
      {/* Filters sidebar toggle button (visible < 991px) */}
      <Button size="sm" className="w-100 rounded-0 fixed-bottom d-lg-none" onClick={handleShow}>
        <i className="fi-filter me-2"></i>
        Filters
      </Button>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {title, category} = context.query;
  try {
    console.log(title, category);
    const response = await apiClient.get("/art/searchArt", {
      params: {title: title, category: category, limit: 20},
    });
    let FirstData = null;
    if (response.data.result == true) {
      FirstData = response.data.artList;
      console.log(FirstData);
    } else {
      throw new Error("서버에서 문제가 생겼어요.");
    }
    return {
      props: {
        FirstData,
      },
    };
  } catch (error) {
    console.error("데이터 가져오다가 오류 남!!!!!!!!!!" + error);
    return {
      // 오류 나면 빈 객체 반환
      props: {
        FirstData: null,
      },
    };
  }
}

export default BookList;
