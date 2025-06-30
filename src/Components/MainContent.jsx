import React, { useState } from "react";
import {
  FaWind,
  FaBuilding,
  FaHandshake,
  FaBus,
  FaCar,
  FaGraduationCap,
  FaChartLine,
  FaTemperatureHigh,
  FaHome,
  FaFileContract,
  FaDollarSign,
  FaBriefcase,
  FaUsers,
  FaTree,
  FaRoad,
  FaPiggyBank,
  FaCity,
  FaSubway,
  FaShieldAlt,
  FaTint,
  FaCalendarAlt,
  FaChartBar,
} from "react-icons/fa";
import { useCategory } from "../Context/CategoryContext";
import TabViewer from "./TabViewer";
import { GiSuspensionBridge } from "react-icons/gi";
import {
  SmileOutlined,
  LikeOutlined,
  MehOutlined,
  FrownOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { IoMdArrowBack } from "react-icons/io";
import { MdUpcoming } from "react-icons/md";

// Update these items based on the markdown files
const items = [
  {
    icon: <GiSuspensionBridge size={40} color="#ffffff" />,
    trendIcon: <SmileOutlined size={40} color="#ffffff" />,
    trendDetails: "62% drop",
    title: "Bridge Conditions",
    details: "in deficient bridge deck area",
    markdownPath: "/markdown/Bridge Conditions",
  },
  {
    icon: <FaBuilding size={40} color="#ffffff" />,
    trendIcon: <SmileOutlined size={40} color="#ffffff" />,
    trendDetails: "95% growth",
    title: "Business Formations",
    details: "in annual applications",
    markdownPath: "/markdown/Business Formations",
  },

  {
    icon: <FaBus size={40} color="#ffffff" />,
    trendIcon: <MehOutlined size={40} color="#ffffff" />,
    trendDetails: "10.8% fewer",
    title: "Commute Mode",
    details: "residents drive alone to work",
    markdownPath: "/markdown/Commute Mode",
  },
  {
    icon: <FaGraduationCap size={40} color="#ffffff" />,
    trendIcon: <LikeOutlined size={40} color="#ffffff" />,
    trendDetails: "10% rise",
    title: "Educational Attainment",
    details: "in population over 25 with high school diploma",
    markdownPath: "/markdown/Educational Attainment",
  },
  {
    icon: <FaChartLine size={40} color="#ffffff" />,
    trendIcon: <MehOutlined size={40} color="#ffffff" />,
    trendDetails: "1.7% gain",
    title: "Gross Domestic Product",
    details: "annual average GDP growth",
    markdownPath: "/markdown/Gross Domestic Product",
  },
  {
    icon: <FaBriefcase size={40} color="#ffffff" />,
    trendIcon: <SmileOutlined size={40} color="#ffffff" />,
    trendDetails: "25% increase",
    title: "Job Growth",
    details: "in jobs",
    markdownPath: "/markdown/Job Growth",
  },
  {
    icon: <FaUsers size={40} color="#ffffff" />,
    trendIcon: <MehOutlined size={40} color="#ffffff" />,
    trendDetails: "0.5% decrease",
    title: "Miles Driven",
    details: "in daily miles driven per person",
    markdownPath: "/markdown/Miles Driven",
  },

  {
    icon: <FaUsers size={40} color="#ffffff" />,
    trendIcon: <LikeOutlined size={40} color="#ffffff" />,
    trendDetails: "10.6% increase",
    title: "Population Growth",
    details: "in population",
    markdownPath: "/markdown/Population Growth",
  },

  {
    icon: <FaCalendarAlt size={40} color="#ffffff" />,
    trendIcon: <MdUpcoming size={40} color="#ffffff" />,
    trendDetails: "2050 Coming Soon",
    title: "2050",
    details: "",
    markdownPath: "#",
  },
];

// Update categoryMapping to match the folders exactly
const categoryMapping = {
  community: ["Educational Attainment", "Population Growth", "2050"],
  transportation: ["Bridge Conditions", "Commute Mode", "Miles Driven", "2050"],
  economy: [
    "Business Formations",
    "Gross Domestic Product",
    "Job Growth",
    "2050",
  ],
};

// First, add this mapping near the top of the file, after the items array
const trendTypeMapping = {
  "very-good": <SmileOutlined style={{ fontSize: "40px" }} />,
  good: <LikeOutlined style={{ fontSize: "40px" }} />,
  neutral: <MehOutlined style={{ fontSize: "40px" }} />,
  "not-good": <FrownOutlined style={{ fontSize: "40px" }} />,
  poor: <DislikeOutlined style={{ fontSize: "40px" }} />,
};

function MainContent() {
  const { selectedCategory, selectedTrend, setIsSidebarVisible } =
    useCategory();
  const [selectedPath, setSelectedPath] = useState(null);

  const isItemActive = (item) => {
    if (!selectedCategory && !selectedTrend) return true;

    if (
      selectedCategory &&
      !categoryMapping[selectedCategory]?.includes(item.title)
    ) {
      return false;
    }

    if (selectedTrend) {
      // Convert trendIcon to string for comparison
      const itemTrendType = item.trendType;
      return itemTrendType === selectedTrend;
    }

    return true;
  };

  const getItemBackground = (title) => {
    if (!selectedCategory) return "#008085"; // Default color

    // Check if the item belongs to the selected category
    const isActive = categoryMapping[selectedCategory]?.includes(title);
    if (!isActive) return "#4a5568"; // Inactive color

    // Category-specific colors
    const colors = {
      sustainability: "#762a83",
      equity: "#9970ab",
      resilience: "#c2a5cf",
      environment: "#FFFFA6",
      community: "#a6dba0",
      transportation: "#5aae61",
      economy: "#1b7837",
    };

    return colors[selectedCategory];
  };

  // Update the getTextAndIconColor function
  const getTextAndIconColor = (title) => {
    if (!selectedCategory) return "#ffffff";

    // Check if the item belongs to the selected category
    const isActive = categoryMapping[selectedCategory]?.includes(title);
    if (!isActive) return "#9CA3AF";

    // Light background colors that need dark text
    const lightBackgrounds = ["environment", "community", "resilience"];
    return lightBackgrounds.includes(selectedCategory) ? "#000000" : "#ffffff";
  };

  // First, modify the handleBoxClick function to prevent 2050 clicks
  const handleBoxClick = (markdownPath, title) => {
    if (title === "2050") return; // Prevent click for 2050
    setSelectedPath(markdownPath);
    setIsSidebarVisible(false);
  };

  // Then update the div onClick in the render section
  // Find this section in the return statement and modify it:
  // Update handleBoxClick to hide sidebar
  const handleBack = () => {
    setSelectedPath(null);
    setIsSidebarVisible(true);
  };

  if (selectedPath) {
    const selectedItem = items.find(
      (item) => item.markdownPath === selectedPath
    );

    return (
      <div className="flex-grow bg-gray-900 ">
        <button
          onClick={handleBack}
          className="m-4 px-4 py-2  sticky top-20 md:top-30 z-40 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          <div className="flex items-center space-x-2 font-semibold cursor-pointer">
            <IoMdArrowBack />
            <span>To Dashboard</span>
          </div>
        </button>
        <TabViewer
          folderPath={selectedPath}
          trendIcon={selectedItem.trendIcon}
          trendDetails={selectedItem.trendDetails}
          details={selectedItem.details}
          title={selectedItem.title}
        />
      </div>
    );
  }

  // Update the main return statement to include overflow styling
  return (
    <div className="md:ml-[15%] md:flex-[85%] bg-gray-900 p-4 md:h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-8 w-full max-w-full">
        {items.map((item, idx) => (
          <div
            onClick={() =>
              item.title !== "2050"
                ? handleBoxClick(item.markdownPath, item.title)
                : null
            }
            className={`layout-item rounded-lg shadow-md ${
              !isItemActive(item) ? "pointer-events-none opacity-50" : ""
            } ${
              item.title === "2050" ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            key={idx}
          >
            <div className="flip-card-inner text-center h-56">
              <div
                className="flip-card-front"
                style={{
                  backgroundColor: getItemBackground(item.title),
                  color: getTextAndIconColor(item.title),
                }}
              >
                {React.cloneElement(item.icon, {
                  color: getTextAndIconColor(item.title),
                  style: { color: getTextAndIconColor(item.title) },
                })}
                <div className="mt-4 text-lg font-semibold hover-text">
                  {item.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
