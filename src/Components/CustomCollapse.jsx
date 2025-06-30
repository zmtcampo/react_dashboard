import React, { useState, useRef } from "react";

function CustomCollapse({ header, children }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="w-[90%] md:w-full max-w-lg mx-auto my-6">
      <button
        className="w-full flex justify-between items-center bg-[#008085] text-white px-6 py-4 rounded-t-lg font-semibold focus:outline-none transition"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{header}</span>
        <span
          className={`transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight : 0,
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          background: "#f9fafb",
        }}
        className="rounded-b-lg px-6"
      >
        <div
          className={`py-4 ${
            open ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default CustomCollapse;
