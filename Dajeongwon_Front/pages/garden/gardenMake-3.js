import {use, useState, useReducer, useContext, useEffect} from "react";
import Layout from "../components/Layout";
import {useRouter} from "next/router";
import FormGroup from "../../components/FormGroup";
import {Form, InputGroup, Row, FormControl, Col} from "react-bootstrap";
import GardenMakeLayout from "../../components/partials/GardenMakeLayout";
import ImageLoader from "../../components/ImageLoader";
import {Button} from "react-bootstrap";
import {LoginContext} from "../_app";
import {Link} from "react-scroll";
import apiClient from "../../services/apiClient";
import ArtCardInSearch from "../../components/ArtCardInSearch";

const gardenMakeThree = () => {
  const router = useRouter();
  const {gNo, accessType} = router.query;
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);

  const [category, setCategory] = useState("");
  const handleCategoryClick = (e) => {
    setCategory(e.target.value);
  };
  const [title, setTitle] = useState("");
  const [artList, setArtList] = useState();

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

  const artListSubmit = () => {
    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      const response = await apiClient.post("/art/inserArtListToGarden", {
        addedList,
        gNo,
      });
      console.log(response.data.result);
      if (response.data.result === true) {
        router.push(`/garden/gardenDetail?type=${accessType}&gNo=${gNo}`);
      } else {
        throw new Error("서버에서 문제가 생겼어요.");
      }
    } catch (error) {
      alert(error + "검색에 실패했습니다. 다정원 관리자에게 문의해주세요.");
    }
  };

  const artSearch = async () => {
    try {
      const response = await apiClient.get("/art/searchArt", {
        params: {
          title: title,
          category: category,
          limit: 4,
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

  const [addedList, setAddedList] = useState([]);
  const addArtList = (art) => {
    // 이미 선택된 아트인지 확인
    const isArtSelected = addedList.some((selectedArt) => selectedArt.title === art.title);
    // 이미 선택된 아트면 추가하지 않음
    if (!isArtSelected) {
      setAddedList([...addedList, art]);
    }
  };

  const removeArtFromAddedList = (art) => {
    // art를 addedList에서 제거
    const updatedAddedList = addedList.filter((addedArt) => addedArt.title !== art.title);
    setAddedList(updatedAddedList);
  };

  return (
    <Layout pageTitle="모임 만들기" activeNav="Account" userLoggedIn>
      <GardenMakeLayout activeStep="작품 고르기">
        <div className="d-flex">
          <h2 className="h4 mb-3 hanamdaum me-4">
            <i className="fi-folder-plus text-primary fs-5 pb-2 me-2"></i>
            작품 선택
          </h2>
          <span className="pyeongChang-regular text-gray500 pt-1"> 작품을 검색해서 추가해 보세요. 이따가 선택해도 괜찮아요. </span>
        </div>
        <div className="pyeongChang-regular">
          <Button className="me-2" variant={`${category === "movie" ? "primary" : "outline-primary"}`} value="movie" onClick={handleCategoryClick}>
            영화
          </Button>
          <Button className="me-2" variant={`${category === "exhibition" ? "primary" : "outline-primary"}`} value="exhibition" onClick={handleCategoryClick}>
            전시
          </Button>
          <Button className="me-2" variant={`${category === "perform" ? "primary" : "outline-primary"}`} value="perform" onClick={handleCategoryClick}>
            공연
          </Button>
          <Button className="me-2" variant={`${category === "book" ? "primary" : "outline-primary"}`} value="book" onClick={handleCategoryClick}>
            도서
          </Button>
        </div>
        <FormGroup className="d-block d-md-flex rounded-pill py-1 mt-4 mb-5 mb-sm-4 pyeongChang-regular" onSubmit={handleSearch}>
          <InputGroup size="lg">
            <InputGroup.Text className="text-muted ps-3">
              <i className="fi-search"></i>
            </InputGroup.Text>
            <FormControl aria-label="Search field" placeholder="작품 이름 검색" value={title} onChange={(e) => setTitle(e.target.value)} />
          </InputGroup>
          <hr className="d-md-none my-2" />
          <div className="d-sm-flex">
            <Button size="base" type="submit" className="rounded-pill w-100 w-md-auto ms-sm-3" onClick={() => artSearch()}>
              검색
            </Button>
          </div>
        </FormGroup>
        <div className="pyeongChang-regular">
          {artList && (
            <div className="mb-3">
              이미지나 글자를 <span className="text-primary"> 클릭</span>하면 목록에 추가돼요. 만약 검색 결과가 적다면 각 분야 상세페이지에서 검색해주세요.
            </div>
          )}
          <div className="flex-row d-flex justify-content-start">
            {artList &&
              artList.map((art) => (
                <div key={art.ano} onClick={() => addArtList(art)}>
                  <ArtCardInSearch
                    img={{
                      src: art.aimg,
                      size: [250, 350],
                      alt: art.title,
                    }}
                    title={decodeHTMLString(art.title)}
                    creator={art.creator}
                    category={art.category}
                    className="d-flex flex-column me-3 mb-3 px-3"
                  />
                </div>
              ))}
          </div>
        </div>
        {addedList.length > 0 && (
          <>
            <div className="d-flex mt-3">
              <h2 className="h4 mb-1 hanamdaum me-4">
                <i className="fi-plus text-primary fs-5 mt-n1 me-2"></i>
                추가한 작품
              </h2>
              <span className="pyeongChang-regular text-gray500 pt-1"> 한 번 더 누르면 삭제돼요. </span>
            </div>
            <div className="d-flex mt-3 mb-3">
              {addedList.map((art) => (
                <Button variant="outline-secondary pyeongChang-regular" className="me-3" onClick={() => removeArtFromAddedList(art)}>
                  {art.title} <i className="fi-minus ms-3 pt-1"></i>
                </Button>
              ))}
            </div>
          </>
        )}
        <Row className="text-end pyeongChang-regular flex-row">
          <div>
            <Link href={`/garden/gardenDetail?type=${accessType}&gNo=${gNo}`} className="text-end text-decoration-none me-4">
              다음에 하기
            </Link>
            {addedList?.length > 0 && (
              <Button className="rounded-3" onClick={artListSubmit}>
                작품 추가 후 모임으로 이동
              </Button>
            )}
          </div>
        </Row>
      </GardenMakeLayout>
    </Layout>
  );
};

export default gardenMakeThree;
