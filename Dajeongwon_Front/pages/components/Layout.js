import {useState, useEffect, useContext, createContext} from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ImageLoader from "../../components/ImageLoader";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "../../components/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import StickyNavbar from "../../components/StickyNavbar";
import SignInModalLight from "../../components/partials/SignInModalLight";
import SignUpModalLight from "../../components/partials/SignUpModalLight";
import apiClient from "../../services/apiClient";
import {useRouter} from "next/router";
import {LoginContext} from "../_app";
import Header from "./Header";

// 로그인 상태 확인 함수
const Layout = (props) => {
  const [showChildrenEffect, setShowChildrenEffect] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    setShowChildrenEffect(true);
  }, []);

  return (
    <>
      <Head>
        <title>{`다정원 - ${props.pageTitle}`}</title>
      </Head>

      {/* Page wrapper for sticky footer
      Wraps everything except footer to push footer to the bottom of the page if there is little content */}
      <main className="page-wrapper">
        {/* Navbar (main site header with branding and navigation) */}
        <Header></Header>
        {/* Page content */}
        {props.children}
      </main>

      {/* Footer */}
      <footer className="footer py-4 bg-dark text-light pyeongChang-regular">
        <Container className="mb-4 py-4 pb-lg-5">
          <Row className="gy-4">
            {/* Logo + contacts */}
            <Col lg={3} md={6} sm={4}>
              <div className="mb-4 pb-sm-2">
                <Link href="/city-guide" className="d-inline-flex">
                  <ImageLoader priority src="/images/logo/헤더용 로고 색반전.png" width={150} height={60} placeholder={false} alt="Finder" />
                </Link>
              </div>
              <Nav as="ul" className="nav-light flex-column">
                <Nav.Item as="li" className="mb-2">
                  <Nav.Link href="mailto:DajeongWon@gmail.com" className="fw-normal text-light text-nowrap p-0">
                    <i className="fi-mail mt-n1 me-1 align-middle text-primary"></i>
                    DajeongWon@gmail.com
                  </Nav.Link>
                </Nav.Item>
                <p className="order-lg-1 order-2 fs-sm mb-2 mb-lg-0 mt-2">
                  <span className="text-light opacity-60">&copy; All rights reserved. Made by </span>
                  <a href="https://createx.studio/" className="nav-link-light fw-bold" target="_blank" rel="noreferrer">
                    MultiCampus Final 01
                  </a>
                </p>
              </Nav>
            </Col>

            {/* Quick links */}
            <Col lg={2} md={3} sm={4} variant="">
              <h3 className="fs-4 text-light">바로가기</h3>
              <ul className="list-unstyled fs-base">
                <li className="mb-3">
                  <Link href="#" className="nav-link-light fs-5">
                    참여 가능한 정원
                  </Link>
                </li>
                <li className="mb-3">
                  <Link href="#" className="nav-link-light fs-5">
                    정원 만들기
                  </Link>
                </li>
                <li>
                  <Link href="#" className="nav-link-light fs-5">
                    내가 참여 중인 정원
                  </Link>
                </li>
              </ul>
            </Col>

            {/* Profile links */}
            <Col lg={2} md={3} sm={4}>
              <h3 className="fs-4 text-light">작품 찾기</h3>
              <ul className="list-unstyled fs-base">
                <li>
                  <Link href="#" className="nav-link-light fs-5 me-2">
                    영화
                  </Link>
                  <Link href="#" className="nav-link-light fs-5 me-2">
                    공연
                  </Link>
                  <Link href="#" className="nav-link-light fs-5 me-2">
                    전시
                  </Link>
                  <Link href="art/book-list" className="fs-5 nav-link-light">
                    도서
                  </Link>
                </li>
              </ul>
            </Col>

            {/* Subscription form */}
            <Col lg={{span: 4, offset: 1}}>
              <h3 className="h4 text-light">구독하고 소식 받기</h3>
              <p className="fs-6 mb-4 opacity-60">다정원을 구독하고 소식을 받아보세요.</p>
              <FormGroup light className="rounded-pill">
                <InputGroup size="normal">
                  <InputGroup.Text className="text-muted">
                    <i className="fi-mail"></i>
                  </InputGroup.Text>
                  <FormControl placeholder="이메일을 입력하세요" />
                </InputGroup>
                <Button variant="primary rounded-pill" size="normal">
                  구독
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
