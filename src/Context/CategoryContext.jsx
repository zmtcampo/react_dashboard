import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedTrend,
        setSelectedTrend,
        isSidebarVisible,
        setIsSidebarVisible,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategory() {
  return useContext(CategoryContext);
}
