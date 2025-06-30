import React from "react";
import Logo from "../assets/logo.png";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import TPLogo from "../assets/tracker.png"; // Adjust the path as necessary

function Footer() {
  return (
    <div className="bg-gray-800 p-6 md:p-10 flex flex-col md:flex-row justify-center items-center text-white mt-18 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-[1280px] mx-auto gap-8">
        {/* Left: Logo and Info */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="flex gap-1 items-center">
            <img
              src={TPLogo}
              alt="Logo"
              className="h-auto w-10 md:w-15 rounded-full mr-2"
            />
            <div className="text-[#008085] text-[14px] md:text-[18px] font-semibold">
              Performance Tracker
            </div>
          </Link>
          <p>190 N Independence Mall West, 8th Floor,</p>
          <p>Philadelphia, PA 19106-1520</p>
          <p>
            <a className="underline" href="tel:+215.592.1800">
              215.592.1800
            </a>
            {" | "}
            <a className="underline" href="mailto:ischwarzenberg@dvrpc.org">
              ischwarzenberg@dvrpc.org
            </a>
            {" | "}
            <a
              className="underline"
              href="https://trackingprogress.netlify.app/Policies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Policies
            </a>
          </p>
          <p className="mt-2 text-xs">
            © Delaware Valley Regional Planning Commission
          </p>
        </div>
        {/* Right: Social Icons */}
        <div className="flex-1 flex flex-col items-center md:items-end gap-3">
          <div className="font-semibold mb-2">Connect With Us!</div>
          <div className="flex flex-wrap gap-4 text-2xl">
            <a
              href="mailto:ischwarzenberg@dvrpc.org"
              aria-label="Email"
              className="hover:text-[#008085] transition"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://facebook.com/dvrpc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#008085] transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/dvrpc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[#008085] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/dvrpc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#008085] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/company/dvrpc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#008085] transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://youtube.com/user/DVRPC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#008085] transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
