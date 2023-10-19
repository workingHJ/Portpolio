import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import ImageLoader from "./ImageLoader";
import {Badge, Button, CloseButton, Col, Form, FormGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import apiClient from "../services/apiClient";

const MemberInGardenMake = ({img, nickName, mNo, light, className, onClick, sysType, ...props}) => {
  useEffect(() => {});
  const extraClass = className ? ` ${className}` : "";
  let imgPath;

  if (sysType === "none" || sysType == null) {
    imgPath = "http:localhost:80/" + img;
  } else {
    imgPath = img;
  }

  return (
    <>
      <div {...props} className={`card card-hover mb-4 w-48 position-relative bg-secondary${extraClass}`} key={mNo}>
        <div className="card-body py-2 pyeongChang-regular">
          <div className="d-flex align-items-center">
            <div className="position-relative rounded-circle overflow-hidden flex-shrink-0 d-none d-sm-block pb-2" style={{width: 70, height: 70}}>
              {img && <ImageLoader src={imgPath} layout="fill" objectFit="cover" quality={90} alt={img.alt} light={light ? 1 : 0} />}
            </div>
            <div className="ms-5 overflow-hidden memberCard">
              <h5 className="card-title mt-2">{nickName}</h5>
            </div>
          </div>
          <Button className="position-absolute top-0 end-0" variant="primary rounded-3 btn-icon" size="sm" onClick={() => onClick(mNo)}>
            <i className="fi-minus-circle fs-lg"></i>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MemberInGardenMake;
