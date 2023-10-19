import {useContext, useEffect, useState, useRef} from "react";
import Layout from "../components/Layout";
import Pagination from "react-bootstrap/Pagination";
import GardenReview from "../components/GardenReview";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import GardenReviewCard from "../components/GardenReviewCard";
import StarRating from "../../components/StarRating";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import CloseButton from "react-bootstrap/CloseButton";
import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";
import Avatar from "../../components/Avatar";
import {Formik} from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import {useRouter} from "next/router";

const ArtReview = () => {
  const {loginInfo} = useContext(LoginContext);
  const router = useRouter();
  const {accessType, gNo, aNo, rNo} = router.query;
  useEffect(() => {
    if (rNo) {
      // 업데이트 하는 경우(rNo가 있으면)
      getReviewData();
    }
  }, []);

  // 리뷰 데이터 가져오는 endPoint
  const getReviewData = async () => {
    try {
      const response = await apiClient.get("/garden/artReview", {
        params: {gNo: gNo, aNo: aNo, rNo: rNo},
      });
      setTitle(response.data.reviewData.title);
      setContent(response.data.reviewData.content);
      setRating(response.data.reviewData.rate);
    } catch (error) {
      console.log("에러" + error);
    }
  };

  //변수
  const [validated, setValidated] = useState(false);

  // 타이틀
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  //별점
  const [rating, setRating] = useState(5);
  const handleRatingChange = (event) => {
    const selectedRating = parseInt(event.target.value);
    setRating(selectedRating);
  };

  //내용
  const [content, setContent] = useState("");
  const handleContentChange = (event) => {
    setContent(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  //제출
  const handleSubmit = (event) => {
    event.preventDefault();
    if (loginInfo === null) {
      alert("로그인 정보를 확인할 수 없습니다. 로그인 후 시도해주세요.");
      event.stopPropagation();
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      saveReviewData();
      router.push(`artDetail?accessType=${accessType}&gNo=${gNo}&aNo=${aNo}&rNo=${rNo}`);
    }
    setValidated(true);
    event.stopPropagation();
  };

  // 리뷰 저장 apiPoint
  //  등록 이후 이전 페이지로 이동해야 함(alert)
  const saveReviewData = async () => {
    try {
      const response = await apiClient.post("/garden/saveArtReview", {
        gNo: gNo,
        aNo: aNo,
        rNo: rNo,
        mNo: loginInfo.mno,
        title: title,
        content: content,
        rating: rating,
      });
      const message = response.data.message;
      console.log(response.data.result);
      if (response.data.result === 1) {
        console.log(message);
        getReviewData();
      } else {
        throw new Error("테스트");
      }
    } catch (error) {
      console.log("등록하는 데에 문제가 발생했습니다" + error);
    }
  };

  return (
    <Layout pageTitle="작품 내 감상" activeNav="Account" userLoggedIn>
      <Container className="pt-4 pb-lg-4 mt-5 mb-sm-2 pyeongChang-regular">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="pt-3 flex-row">
            <Form.Group as={Col} md="4" controlId="title" className="w-100 border-bottom mb-3">
              <Form.Control
                type="text"
                name="title"
                className="border-0 py-3 fs-3 hanamdaum"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={handleTitleChange}
                required
                minLength={3}
                maxLength={50}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid" className="float-left">
              3글자 이상 50글자 미만으로 입력해주세요.
            </Form.Control.Feedback>
          </Row>
          <Row className="bg-secondary rounded-3 pb-4 pt-3 px-md-4 mb-3 GmarketSansMedium mt-3">
            <div className="ms-4 d-flex mt-2 flew-row">
              <StarRating size="lg" className="mt-2 me-3" rating={rating}></StarRating>
              <Form.Group as={Col} lg={1} controlId="rating">
                <Form.Select controlId="rating" className="border-0 bg-secondary" onChange={handleRatingChange} value={rating}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="mt-2 fs-5 mb-2 lh-160 fw-normal">
              <Form.Group controlId="title" className="w-100 bg-secondary border-bottom">
                <Form.Control
                  as="textarea"
                  name="content"
                  className="border-0 py-3 fs-5 bg-secondary"
                  placeholder="내용을 입력해주세요 "
                  value={content}
                  onChange={handleContentChange}
                  style={{minHeight: "500px", resize: "none", whiteSpace: "pre-line"}}
                  required
                  minLength={10}
                  maxLength={10000}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid"> 10글자 이상으로 입력해주세요. </Form.Control.Feedback>
            </div>
          </Row>
          <Row>
            <Button className="ms-auto rounded-3 ps-3 pe-4 me-0" type="submit" style={{width: "7rem"}}>
              <i className="fi-paperclip me-3 pt-1"> </i> 저장
            </Button>
          </Row>
        </Form>
      </Container>
    </Layout>
  );
};

export default ArtReview;
