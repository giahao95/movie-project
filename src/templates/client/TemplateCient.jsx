import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../pages/footer/Footer";

function TemplateCient(props) {
  const { Component } = props;
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Component />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default TemplateCient;
