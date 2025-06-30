import React, { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Chart from "./ChartComponent";
import "./TabViewer.css"; // Assuming you have some styles for the component

const formatFolderTitle = (folderPath) => {
  const folder = folderPath.split("/").pop();
  return folder.replace(/[_-]/g, " ");
};

const TabViewer = ({ folderPath, title }) => {
  const [tabs] = useState(["why_its_important"]);
  const [activeTab, setActiveTab] = useState("why_its_important");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [folderTitle, setFolderTitle] = useState("");
  const [allContent, setAllContent] = useState({});
  const [sharedCharts, setSharedCharts] = useState([]);

  // Extract charts from markdown content
  const extractCharts = (content) => {
    const chartRegex = /chart:{([^}]*)}/g;
    const charts = [];
    let match;

    while ((match = chartRegex.exec(content))) {
      try {
        const chart = JSON.parse(`{${match[1]}}`);
        charts.push(chart);
      } catch (e) {
        console.error("Error parsing chart:", e);
      }
    }
    return charts;
  };

  // Fetch all tab content initially
  useEffect(() => {
    const fetchAllContent = async () => {
      const content = {};
      const allCharts = [];

      for (const tab of tabs) {
        try {
          const res = await fetch(`${folderPath}/${tab}.md`);
          if (res.ok) {
            const text = await res.text();
            content[tab] = text;
            const charts = extractCharts(text);
            allCharts.push(...charts);
          }
        } catch (err) {
          console.error(`Error loading ${tab}:`, err);
        }
      }

      setAllContent(content);
      setSharedCharts(allCharts);
    };

    fetchAllContent();
  }, [folderPath]);

  // Update active tab content
  useEffect(() => {
    setError(null);
    if (allContent[activeTab]) {
      setContent(allContent[activeTab]);
    } else {
      setContent("");
    }
  }, [activeTab, allContent]);

  useEffect(() => {
    const title = formatFolderTitle(folderPath);
    setFolderTitle(title);
    document.title = `${title} - Performance Tracker`;
  }, [folderPath]);

  const components = useMemo(
    () => ({
      // Custom component to handle chart markdown syntax
      p: ({ children }) => {
        if (typeof children === "string" && children.startsWith("chart:")) {
          try {
            const config = JSON.parse(children.slice(6));
            // Check if this chart exists in other tabs
            const isShared = sharedCharts.some(
              (chart) =>
                chart.file === config.file && chart.type === config.type
            );

            return (
              <div className={isShared ? "shared-chart" : ""}>
                <Chart
                  type={config.type}
                  dataPath={`/data/${config.file}`}
                  config={config}
                />
              </div>
            );
          } catch (e) {
            console.error("Error parsing chart config:", e);
          }
        }
        return <p>{children}</p>;
      },
    }),
    [sharedCharts]
  );

  return (
    <div className="w-full md:max-w-[70%] pb-20 border border-gray-800 rounded-lg shadow mx-auto h-full bg-gray-900 text-white p-4">
      <div className="flex items-center justify-center max-w-[1024px] mx-auto mb-6">
        <h1 className="text-[16px] text-center md:text-xl font-bold">
          {title}
        </h1>
      </div>

      <div className="prose prose-invert mt-10 max-w-[1024px] text-justify mx-auto">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default TabViewer;
