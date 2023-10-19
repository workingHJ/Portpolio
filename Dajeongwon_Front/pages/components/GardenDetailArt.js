import {Button, Col, Pagination, Row} from "react-bootstrap";
import ArtCard from "../../components/ArtCard";

const GardenDetailArt = (artList, title, startDate, isAdmin, endDate) => {
  <Col lg={8} className="card px-5">
    <div> 테스트으으 </div>
    <div className="d-flex flex-wrap mt-5">
      <h2 className="hanamdaum"> {title} </h2>
      <Button className="ms-auto pyeongChang-regular rounded-3 px-3 h-75">
        <i className="fi-edit me-2"></i>
        목록 수정하기
      </Button>
    </div>
    <div className="d-flex text-gray500 pb-3 mb-4">
      <i className="fi-calendar me-2 pt-1"> </i>
      <h6 className="text-gray500 pyeongChang-regular fw-normal">
        {startDate} ~ {endDate}
      </h6>
    </div>

    {/* 작품 그리드 */}
    <Row className="d-flex justify-content-between pyeongChang-regular">
      {artList ? (
        <div>테스트</div>
      ) : (
        <div>
          <h5> 현재 목록이 비었어요! </h5>
        </div>
      )}
    </Row>

    <Pagination className="justify-content-center mt-5 pt-4">
      <Pagination.Item active>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Item>{8}</Pagination.Item>
      <Pagination.Item>
        <i className="fi-chevron-right"></i>
      </Pagination.Item>
    </Pagination>
  </Col>;
};

export default GardenDetailArt;
