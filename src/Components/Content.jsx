import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

function Content() {
  return (
    <div id="content" className=" max-w-full md:mt-2 mx-auto">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Content;
