import React, {useContext, useEffect, useState} from "react";
import * as Formik from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Steps, {Step} from "../Steps";
import Form from "react-bootstrap/Form";
import {LoginContext} from "../../pages/_app";

const GardenMakeLayout = ({activeStep, children, prevStep, nextStep, lastStep}) => {
  // Add class to body to enable gray background
  useEffect(() => {
    const body = document.querySelector("body");
    document.body.classList.add("bg-secondary");
    return () => body.classList.remove("bg-secondary");
  });

  const {loginInfo} = useContext(LoginContext);

  // Steps
  const steps = ["정원 정보 입력", "인원 추가하기", "작품 고르기"];

  return (
    <Container className="py-5 mt-5 mb-md-4">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-3 mb-md-4 pt-md-3 pyeongChang-regular">
        <Breadcrumb.Item linkAs={Link} href="/job-board">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>정원 만들기</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="justify-content-center pb-sm-2 mt-5">
        <Col lg={11} xl={10}>
          {/* Steps */}
          <div className="bg-light rounded-3 py-4 px-md-4 mb-5 pyeongChang-regular">
            <Steps>
              {steps.map((step, indx) => {
                if (steps.indexOf(activeStep) >= indx) {
                  return (
                    <Step key={indx} active>
                      {step}
                    </Step>
                  );
                } else {
                  return <Step key={indx}>{step}</Step>;
                }
              })}
            </Steps>
          </div>

          {/* Page content */}
          {loginInfo ? (
            <div className="bg-light rounded-3 p-4 p-md-5 mb-3">{children}</div>
          ) : (
            <div className="bg-light rounded-3 p-4 p-md-5 mb-3 hanamdaum h4 text-center">로그인 이후 접근해주세요!</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GardenMakeLayout;
