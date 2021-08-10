import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";

function TemplateAdmin(props) {
  const { Component } = props;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Component />
    </div>
  );
}

export default TemplateAdmin;
