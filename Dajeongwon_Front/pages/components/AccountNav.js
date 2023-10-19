import {useState} from "react";
import Link from "next/link";
import Collapse from "react-bootstrap/Collapse";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const AccountNav = ({activeNav}) => {
  // Collapse state
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-md-n3 mb-4 GmarketSansMedium">
      <Button
        size="lg"
        variant="outline-primary rounded-pill w-100 d-md-none"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        aria-controls="accountNav"
        aria-expanded={open}
      >
        <i className="fi-align-justify me-2"></i>
        Account Menu
      </Button>
      <Collapse in={open} className="d-md-block">
        <div id="accountNav">
          <Nav variant="pills flex-column flex-md-row pt-3 pt-md-0 pb-md-4 border-bottom-md" defaultActiveKey={activeNav}>
            <Nav.Item className="mb-md-0 me-md-2 pe-md-1">
              <Nav.Link as={Link} href="/user/account-info">
                <i className="fi-user mt-n1 me-2 fs-base"></i>
                회원정보 수정
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-md-0 me-md-2 pe-md-1">
              <Nav.Link as={Link} href="/user/MyGarden">
                <i className="fi-users mt-n1 me-2 fs-base"></i>
                내가 참여한 모임
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="mb-md-0 me-md-2 pe-md-1">
              <Nav.Link as={Link} href="/user/account-reviews">
                <i className="fi-pencil mt-n1 me-2 fs-base"></i>
                내가 쓴 감상
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </Collapse>
    </div>
  );
};

export default AccountNav;
