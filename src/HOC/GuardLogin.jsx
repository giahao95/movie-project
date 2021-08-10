import React from "react";
import { Redirect } from "react-router-dom";

function GuardLogin(props) {
  let user = {};
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  if (user.accessToken) {
    return props.children;
  } else {
    return <Redirect to="/signin-up" />;
  }

  return <></>;
}

export default GuardLogin;
