import {useRef, useState, useEffect, useContext, createContext} from "react";
import Layout from "../components/Layout";
import AccountHeader from "../components/AccountHeader";
import AccountNav from "../components/AccountNav";
import PasswordToggle from "../../components/PasswordToggle";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import {useAccordionButton} from "react-bootstrap/AccordionButton";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PwUpModalLight from "../../components/partials/PwUpModalLight";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";
import {useRouter} from "next/router";
import ImageLoader from "../../components/ImageLoader";
import Review from "../../components/Review";
import axios from "axios";
import {Col, Row} from "react-bootstrap";
import Link from "next/link";

const ReviewsPage = () => {
  // Add class to body to enable gray background
  const {loginInfo, setLoginInfo} = useContext(LoginContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMyReviews();
  }, []);

  // 로그인 정보 가져오는 거
  const getLoginInfo = async () => {
    try {
      var response = await apiClient.get("/loginInfo", {withCredentials: true});
      if (response.data.result === true) {
        setLoginInfo(response.data.member);
      } else {
        alert("로그인이 되지 않았습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMyReviews = async () => {
    try {
      const response = await apiClient.get("/getMyReviews", {withCredentials: true});
      if (response.data.result === true) {
        console.log("response.data.reviewList : " + JSON.stringify(response.data.reviewList[0]));
        setReviews(response.data.reviewList);
      } else {
        alert("리뷰가 없습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout pageTitle="작성한 리뷰" activeNav="Account" userLoggedIn>
      {/* Page container */}
      <Container className="mt-5 mb-md-4 py-5">
        {/* Page header */}
        <AccountHeader breadcrumb="작성한 리뷰" getLoginInfo={getLoginInfo} />
        <Card className="shadow-sm">
          <Card.Body className="p-4 p-md-5">
            <AccountNav activeNav="/user/account-reviews" />
            <Container>
              <Row>
                {reviews.map((review) => (
                  <Row className="rounded-3 mx-y py-4 my-3 bg-secondary GmarketSansMedium">
                    <div className="ms-4 d-flex overflow-hidden justify-content-center rounded-3" style={{width: "fit-content"}}>
                      <ImageLoader src={review.aimg} className="rounded-3" width="200px" height="300px"></ImageLoader>
                    </div>
                    <Col className="ms-3">
                      <Row>
                        <div className="d-flex">
                          <div className="hanamdaum h5 mt-2 mb-3 textBox" style={{width: "800px"}}>
                            {review.title}
                          </div>
                          <Link className="ms-auto text-decoration-none mt-2s pt-2 " href={`/garden/artDetail?accessType=${review.accessType}&gNo=${review.gno}&aNo=${review.ano}`}>
                            바로가기
                          </Link>
                        </div>
                        <div className="textBox-3 fs-6 lh-160" style={{minHeight: "170px"}}>
                          {review.content}
                        </div>
                        <div className="mt-4 pt-2 d-flex">
                          <div> 작성일 : {review.createDate}</div>
                          <div className="ms-4"> 수정일 : {review.modifiedDate}</div>
                          <div className="ms-auto">{review.gtitle}</div>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default ReviewsPage;
