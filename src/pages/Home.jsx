import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Landing from "../Components/Landing";
import Content from "../Components/Content";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="">
      <Navbar />
      <Landing />
      <Content />
    </div>
  );
}

export default Home;
