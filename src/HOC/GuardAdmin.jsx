import React from "react";
import { Redirect } from "react-router-dom";

function GuardAdmin(props) {
  let admin = {};
  if (localStorage.getItem("admin")) {
    admin = JSON.parse(localStorage.getItem("admin"));
  }

  if (admin.maLoaiNguoiDung === "QuanTri") {
    return props.children;
  } else {
    return <Redirect to="/" />;
  }

  return <></>;
}

export default GuardAdmin;
