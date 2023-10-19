import {useRef, useState, useEffect, useContext, createContext} from "react";
import Link from "next/link";
import React from "react";
import {Form} from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ImageLoader from "../../components/ImageLoader";
import StarRating from "../../components/StarRating";
import {useRouter} from "next/router";
import {LoginContext} from "../_app";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import apiClient from "../../services/apiClient";

const AccountHeader = ({breadcrumb, getLoginInfo}) => {
  const {loginInfo, setLoginInfo} = useContext(LoginContext);

  const selectFile = useRef("");
  const [uploadedImage, setUploadedImage] = useState(""); // 업로드된 이미지 URL 상태

  registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize, FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginImageResize, FilePondPluginImageTransform);

  const serverConfig = {
    process: {
      url: "http://localhost:80/member/uploadmImg",
      method: "POST",
      withCredentials: true,
      headers: {},
      onload: (response) => {
        console.log("Upload successful:", response);
        getLoginInfo();
      },
      onerror: (response) => {
        console.error("Upload error:", response);
      },
    },
  };

  return (
    <>
      <Breadcrumb className="mb-4 pt-2 pt-lg-3 GmarketSansMedium">
        <Breadcrumb.Item linkAs={Link} href="/city-guide">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} href="/city-guide/account-info">
          회원정보
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{breadcrumb}</Breadcrumb.Item>
      </Breadcrumb>
      {loginInfo && (
        <div className="d-flex align-items-center justify-content-between pb-4 mb-2 GmarketSansMedium">
          <div className="d-flex align-items-center">
            <div className="position-relative flex-shrink-0" style={{width: "100px"}}>
              {loginInfo.snsType === null || loginInfo.snsType === "none" ? (
                <FilePond
                  files={uploadedImage}
                  onupdatefiles={setUploadedImage}
                  server={serverConfig}
                  maxFileSize="1MB"
                  name="memberImg"
                  labelIdle={`<img src="http://localhost:80${loginInfo.mimg}" alt="Image" style="max-width: 100%; height: auto; objectFit: cover">`}
                  acceptedFileTypes={["image/png", "image/jpeg"]}
                  stylePanelLayout="compact circle"
                  imagePreviewHeight={160}
                  imageCropAspectRatio="1:1"
                  imageResizeTargetWidth={200}
                  imageResizeTargetHeight={200}
                  className="file-uploader bg-secondary memberImg"
                />
              ) : (
                <FilePond
                  files={uploadedImage}
                  onupdatefiles={setUploadedImage}
                  server={serverConfig}
                  maxFileSize="1MB"
                  name="memberImg"
                  labelIdle={`<img src="${loginInfo.mimg}" alt="Image" style="max-width: 100%; height: auto;">`}
                  acceptedFileTypes={["image/png", "image/jpeg"]}
                  stylePanelLayout="compact circle"
                  imagePreviewHeight={160}
                  imageCropAspectRatio="1:1"
                  imageResizeTargetWidth={200}
                  imageResizeTargetHeight={200}
                  className="file-uploader bg-secondary memberImg"
                />
              )}
            </div>
            <div className="ps-3 ps-sm-4">
              <h3 className="h4 mb-2">{loginInfo.nickName}</h3>
              <div className="fs-5"> {loginInfo.email}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountHeader;
