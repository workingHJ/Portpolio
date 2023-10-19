import {useEffect, useState, useContext} from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import GardenCardHorizon from "../../components/GardenCardHorizon";
import "swiper/css";
import "swiper/css/navigation";
import {LoginContext} from "../_app";
import apiClient from "../../services/apiClient";
import AccountHeader from "../components/AccountHeader";
import AccountNav from "../components/AccountNav";
import {Card} from "react-bootstrap";

const myGardenList = () => {
  const {loginInfo} = useContext(LoginContext);
  const [gardenList, setGardenList] = useState(null);

  // Add extra class to body
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("fixed-bottom-btn");
    document.body.classList.add("bg-secondary");
    getGardenData();
    return () => {
      body.classList.remove("fixed-bottom-btn");
      body.classList.remove("bg-secondary");
    };
  }, [loginInfo]);

  // Offcanvas show/hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function formatDateString(dateString) {
    if (dateString == null) {
      return "기간 없음";
    }
    const dateObj = new Date(dateString);
    const formatOptions = {year: "numeric", month: "long", day: "numeric"};
    return new Intl.DateTimeFormat("ko-kr", formatOptions).format(dateObj);
  }

  const [message, setMessage] = useState("");
  const getGardenData = async () => {
    try {
      const response = await apiClient.get("/member/getGardens");
      if (response.data.result === true) {
        setGardenList(response.data.GardenList);
      } else {
        setMessage("가입된 정원이 없어요!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setGardenList(null);
    }
  };

  return (
    <Layout pageTitle="내 정원" activeNav="Pages">
      {/* Page content */}
      <Container className="mt-5 mb-md-4 py-5">
        {/* Breadcrumbs */}
        <AccountHeader breadcrumb="회원정보 수정" />
        <Card className="shadow-sm">
          <Card.Body className="p-4 p-md-5">
            <AccountNav activeNav="/user/MyGarden" />
            <div className="bg-light rounded-3 py-2 px-md-4 mb-5 pyeongChang-regular">
              {loginInfo ? (
                <div className="mt-4">
                  {gardenList && gardenList.length > 0 ? (
                    gardenList.map((garden) => (
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
                        className="mt-4 mb-5"
                        accessType={garden.accessType}
                      />
                    ))
                  ) : (
                    <Row style={{height: "300px"}}>
                      <h4 className="text-center">가입한 정원이 없어요.</h4>
                    </Row>
                  )}
                </div>
              ) : (
                <Row style={{height: "300px"}}>
                  <h4 className="text-center">로그인이 필요합니다.</h4>
                </Row>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Sidebar toggle button (visible < 992px) */}
      <Button size="sm" className="w-100 rounded-0 fixed-bottom d-lg-none" onClick={handleShow}>
        <i className="fi-sidebar-left me-2"></i>
        Sidebar
      </Button>
    </Layout>
  );
};

export default myGardenList;
