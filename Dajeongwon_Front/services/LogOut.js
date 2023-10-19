import * as React from "react";
import {useState, useEffect} from "react";
import apiClient from "./apiClient";

const Logout = async () => {
  try {
    const response = await apiClient.get("/logout", {withCredentials: true});
    console.log(response);
    if (response.data.result === true) {
      alert("로그아웃 되었습니다.");
      location.href = "/";
    } else {
      alert("로그아웃에 실패하였습니다.");
      location.href = "/";
    }
  } catch (e) {
    console.log(e);
  }
};

export default Logout;
