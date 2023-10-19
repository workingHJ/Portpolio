import {useContext, useEffect, useState} from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import StarRating from "../../components/StarRating";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import "react-datepicker/dist/react-datepicker.css";
import "swiper/css";
import "swiper/css/navigation";
import apiClient from "../../services/apiClient";
import {LoginContext} from "../_app";
import Avatar from "../../components/Avatar";
import {useRouter} from "next/router";
import {Breadcrumb} from "react-bootstrap";

const ArtReview = ({reviewData}) => {
  const {loginInfo, decodeHTMLString} = useContext(LoginContext);
  const router = useRouter();
  const {gNo, aNo, rNo, accessType} = router.query;
  useEffect(() => {
    setDeleted(false);
  }, []);

  const handleDeleteReviewSubmit = () => {
    if (loginInfo && loginInfo.mno === reviewData.mno) {
      deleteReviewData();
    }
  };

  // 리뷰 삭제 모달
  const [deleteReviewModalShow, setDelteReviewModalShow] = useState(false);
  const handleDeleteReviewModalShow = () => setDelteReviewModalShow(true);
  const handleDeleteReviewModalClose = () => setDelteReviewModalShow(false);
  const [deletedMessage, setDeletedMessage] = useState("");
  const [deleted, setDeleted] = useState(true);

  // 리뷰 삭제 apiPont
  // 삭제 이후 되돌려 보내기
  const deleteReviewData = async () => {
    try {
      const response = await apiClient.get("/garden/deleteArtReview", {
        params: {rNo: rNo},
      });
      setDeletedMessage(response.data.message);
      if (response.data.result === true) {
        setDeleted(true);
      } else {
        setDeleted(false);
      }
    } catch (error) {
      alert("리뷰 삭제 에러" + error);
    }
  };

  return (
    <Layout pageTitle="작품 내 감상" activeNav="Account" userLoggedIn>
      <Container className="pt-4 pb-lg-4 mt-5 mb-sm-2 pyeongChang-regular">
        <Link href={`artDetail?accessType=${accessType}&gNo=${gNo}&aNo=${aNo}`} className="nav-link">
          <i className="fi-arrow-long-left me-2"> </i> 정원으로 돌아가기
        </Link>
        <Row className="pt-3 mt-3 mb-2 flex-row">
          <h2 className="fw-normal mb-2 hanamdaum d-inline-box ">{reviewData.title}</h2>
        </Row>
        {/* 글 작성자만 볼 수 있는 화면 */}
        <div className="text-end mb-4">
          {loginInfo && loginInfo.mno === reviewData.mno && (
            <>
              <Link href={`reviewWrite?accessType=${accessType}&gNo=${gNo}&aNo=${aNo}&rNo=${rNo}`}>
                <Button variant="primary rounded-3" className="me-2" size="sm">
                  <i className="fi-edit me-2"> </i>수정
                </Button>
              </Link>
              <Button variant="outline-primary rounded-3" size="sm" onClick={handleDeleteReviewModalShow}>
                <i className="fi-trash me-2"></i>
                삭제
              </Button>
            </>
          )}
        </div>

        <Row className="bg-secondary rounded-3 pt-3 px-md-4 mb-5 GmarketSansMedium justify-content-center mt-3">
          <div>
            <div className="d-flex flex-row mt-3">
              <div className="d-flex">
                <Avatar
                  className="me-2"
                  img={{
                    src: reviewData.writerImg,
                    alt: reviewData.writerNickName,
                  }}
                  writerSNStype={reviewData.writerSNStype}
                  size={[40, 40]}
                />
                <div className="mt-1 h6 pt-1 text-hdGray fw-normal">{reviewData.writerNickName}</div>
                <StarRating size="lg" className="ms-3 me-3 pt-2" rating={reviewData.rate}></StarRating>
              </div>
              <div className="ms-auto mt-2 text-gray500">작성일 : {reviewData.createDate}</div>
            </div>
          </div>
          <div className="mt-4 mb-4 fs-5 pb-5 lh-180 fw-normal" style={{whiteSpace: "pre-wrap"}}>
            {reviewData.content}
          </div>
        </Row>
      </Container>

      {deleteReviewModalShow && (
        <Modal className="pyeongChang-regular" centered show={handleDeleteReviewModalShow} onHide={handleDeleteReviewModalClose}>
          <Modal.Header className="d-block position-relative border-0 pb-0 px-sm-5 px-4">
            <Modal.Title as="h4" className="mt-4 text-center">
              감상 삭제
            </Modal.Title>
            <CloseButton onClick={handleDeleteReviewModalClose} aria-label="Close modal" className="position-absolute top-0 end-0 mt-3 me-3" />
          </Modal.Header>
          <Modal.Body className="px-sm-5 px-4">
            {/* 삭제 됐으면 위 아니면 아래 */}
            {deleted === false ? (
              <>
                <div>
                  정말로 감상을 <span className="primary"> 삭제 </span> 하시겠어요? 삭제하시면 볼 수 없게 돼요.
                </div>
                <Button type="submit" variant="primary d-block w-100" className="my-3" onClick={handleDeleteReviewSubmit}>
                  <i className="fi-trash me-2"></i>
                  삭제하기
                </Button>
              </>
            ) : (
              <>
                <div> {deletedMessage} </div>
                <Link href={`artDetail?gNo=${gNo}&aNo=${aNo}`}>
                  <Button type="submit" variant="primary d-block w-100" className="my-3" onClick={handleDeleteReviewSubmit}>
                    <i className="fi-chevrons-left me-2"></i> 작품 페이지로 돌아가기
                  </Button>
                </Link>
              </>
            )}
          </Modal.Body>
        </Modal>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const {gNo, aNo, rNo} = context.query;

  try {
    let reviewData = null;
    const response = await apiClient.get("/garden/artReview", {
      params: {
        gNo: gNo,
        aNo: aNo,
        rNo: rNo,
      },
    });

    if (response.data.result === true) {
      reviewData = response.data.reviewData;
    } else {
      throw new Error("artReview 가져오는 데 실패함");
    }

    return {
      props: {
        reviewData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        reviewData: null,
      },
    };
  }
}

export default ArtReview;
