import React, { useState } from "react";
import { Select } from "antd";
import { GrPowerCycle } from "react-icons/gr";
import {
  BarChartOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CarOutlined,
  BankOutlined,
  SmileOutlined,
  LikeOutlined,
  MehOutlined,
  FrownOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { useCategory } from "../Context/CategoryContext";

function Sidebar() {
  const { Option } = Select;
  const {
    setSelectedCategory,
    selectedCategory,
    selectedTrend,
    isSidebarVisible,
  } = useCategory();

  // Add early return if sidebar should be hidden
  if (!isSidebarVisible) {
    return null;
  }

  const [selectedFilter, setSelectedFilter] = useState("category");

  const handleCategoryClick = (category) => {
    const lowercaseCategory = category.toLowerCase();
    // If clicking the same category that's already selected, clear the filter
    if (lowercaseCategory === selectedCategory) {
      setSelectedCategory(null);
    } else {
      // If clicking a different category, set it as the new filter
      setSelectedCategory(lowercaseCategory);
    }
  };

  const handleTrendClick = (trend) => {
    if (trend === selectedTrend) {
      setSelectedTrend(null);
    } else {
      setSelectedTrend(trend);
      setSelectedCategory(null);
    }
  };

  const renderContent = () => {
    return (
      <>
        <div
          onClick={() => handleCategoryClick("community")}
          className={`${categoryClass} bg-[#a6dba0] hover:shadow-[0_4px_15px_rgba(251,191,36,0.5)] hover:bg-[#a6dba0] cursor-pointer transition-all duration-100 ease-in-out mx-2 md:mx-0`}
        >
          <TeamOutlined style={{ fontSize: "24px", color: "#000000" }} />
          <span className="text-black text-base ml-2">Community</span>
        </div>
        <div
          onClick={() => handleCategoryClick("transportation")}
          className={`${categoryClass} bg-[#5aae61] hover:shadow-[0_4px_15px_rgba(251,191,36,0.5)] hover:bg-[#5aae61] cursor-pointer transition-all duration-100 ease-in-out mx-2 md:mx-0`}
        >
          <CarOutlined style={{ fontSize: "24px", color: "#000000" }} />
          <span className="text-black text-base ml-2">Transportation</span>
        </div>
        <div
          onClick={() => handleCategoryClick("economy")}
          className={`${categoryClass} bg-[#1b7837] hover:shadow-[0_4px_15px_rgba(251,191,36,0.5)] hover:bg-[#1b7837] cursor-pointer transition-all duration-100 ease-in-out mx-2 md:mx-0`}
        >
          <BankOutlined style={{ fontSize: "24px", color: "#ffffff" }} />
          <span className="text-white text-base ml-2">Economy</span>
        </div>
      </>
    );
  };

  return (
    <div className="md:fixed md:top-20 flex mt-[2px] pr-2 flex-col left-0 md:w-[15%] md:h-[calc(100vh-5rem)] bg-white">
      <div className="flex flex-col h-full">
        <div className="text-gray-600 w-full h-full flex flex-col">
          {/* Filter header */}
          <div className="w-full h-[60px] flex px-1 bg-gray-700 items-center justify-center">
            <div className="flex items-center">
              <span className="text-white" value="category">
                Categories
              </span>
            </div>
          </div>
          {/* Content container */}
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-hidden">
            <div className="flex flex-row md:flex-col md:h-[calc(100vh-80px)]">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update the category and trend classes with smaller dimensions and remove margins
const categoryClass = `
  min-w-[100px] 
  md:min-w-full 
  flex 
  justify-center 
  items-center 
  md:h-[calc(100vh-430px)] 
  my-2
  p-2
`;

export default Sidebar;
