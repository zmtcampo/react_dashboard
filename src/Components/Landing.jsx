import React from "react";
import { Link } from "react-router-dom";
import DashboardButtonIcon from "../assets/DashboardButtonIcon.png";
import CustomCollapse from "./CustomCollapse"; // Import your custom collapse
import splashicon from "../assets/splash-icon.png"; // Adjust the path as necessary

function Landing() {
  return (
    <div className="text-center text-gray-700 ">
      {/* <h2 className="text-2xl font-semibold mt-7">
        <span className="text-[#008085]">Tracking Progress</span> Indicators
        Dashboard
      </h2>
      <p className="text-2xl pt-5 text-gray-500">
        Measuring progress toward our regional vision
      </p>
      <a href="#content" className="flex justify-center ">
        <button className="mt-5 bg-[#008085] flex items-center text-white py-2 px-4 rounded-[10px] hover:bg-[#006f6f] transition duration-300">
          <img
            src={DashboardButtonIcon}
            alt="Dashboard Icon"
            className="h-16 w-16 mr-2"
          />
          <span id="#content" className="text-xl text-white font-semibold">
            Go to Dashboard
          </span>
        </button>
      </a> */}
      {/* <CustomCollapse header="More Info">
        <p className="text-left mb-2">
          Tracking Progress is an interactive dashboard for exploring regularly
          updated data to gauge our progress toward achieve the{" "}
          <a
            href="#"
            className="underline italic"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connections 2050
          </a>{" "}
          vision of an <strong>equitable</strong>, <strong>resilient</strong>,
          and <strong>sustainable</strong>{" "}
          <a
            href="#"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Greater Philadelphia region.
          </a>
          .
        </p>
        <p className="text-left">
          Regional indicators are used to communicate how the region is
          performing at a given time, identify successful programs, align
          DVRPC's planning and implementation activities, and inform regional
          strategies. The data in Tracking Progress is also a valuable resource
          for other planners, analysts and anyone interested in the conditions
          and future of the Greater Philadelphia region.
        </p>
        <img
          src={splashicon}
          alt="Splash Icon"
          className="h-auto w-40 mx-auto  mt-4"
        />
      </CustomCollapse> */}
    </div>
  );
}

export default Landing;
