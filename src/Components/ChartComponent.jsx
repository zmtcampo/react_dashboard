import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart, // Add this import
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { csv } from "d3";
import CommuteChart from "./MarkdownCharts/CommuteChart/CommuteChart"; // Import the new commute chart component
import MilesDriven from "./MarkdownCharts/MilesDrivenCharts/MilesDrivenChart"; // Import the miles driven chart component
import BusinessFormation from "./MarkdownCharts/BusinessFormationCharts/BusinessFormation"; // Import the business formation chart component
import Education1 from "./MarkdownCharts/EducationAttainment/Education1"; // Import the education chart component
import Education2 from "./MarkdownCharts/EducationAttainment/Education2"; // Import the second education chart component
import Education3 from "./MarkdownCharts/EducationAttainment/Education3"; // Import the third education chart component
import PopulationGrowth1 from "./MarkdownCharts/PopulationGrowth/PopulationGrowth1"; // Import the population growth chart component
import BridgeStackedChart from "./MarkdownCharts/BridgeCharts/BridgeChart"; // Import the new chart component
import BridgeStackedChart1 from "./MarkdownCharts/BridgeCharts/BridgeChart1";
import GDP1 from "./MarkdownCharts/GDP/gdp1"; // Import the GDP chart component
import GDP2 from "./MarkdownCharts/GDP/gdp2"; // Import the GDP chart component
import JobGrowth from "./MarkdownCharts/JobGrowth/jobgrowth"; // Import the job growth chart component

// Update the color palette with more distinct and contrasting colors
const CHART_COLORS = [
  "#1565C0", // darker blue
  "#C62828", // darker red
  "#2E7D32", // darker green
  "#6A1B9A", // darker purple
  "#E65100", // darker orange
  "#00838F", // darker cyan
  "#4E342E", // darker brown
  "#F9A825", // darker yellow
  "#37474F", // darker blue grey
  "#AD1457", // darker pink
  "#00695C", // darker teal
  "#4527A0", // darker purplevfdkjgf
];

const customLegendStyle = {
  ".recharts-legend-item": {
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "4px",
    transition: "all 0.2s ease",
    backgroundColor: "white",
    margin: "0 4px",
    border: "1px solid #E0E0E0",
  },
  ".recharts-legend-item:hover": {
    backgroundColor: "#F5F5F5",
    border: "1px solid #BDBDBD",
  },
  ".recharts-legend-item.inactive": {
    opacity: 0.5,
  },
};

const Chart = ({ type, dataPath, config }) => {
  const [chartHeight, setChartHeight] = React.useState(
    window.innerWidth > 768 ? 600 : 400
  );
  // Add new state for ownership filter
  const [selectedOwnership, setSelectedOwnership] = React.useState("All");
  const [data, setData] = React.useState([]);
  const [hiddenSeries, setHiddenSeries] = React.useState(new Set());
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [availableValues, setAvailableValues] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [availableOptions, setAvailableOptions] = React.useState([]);

  const axisDomain = [0, 100];
  const axisTicks = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
    95, 100,
  ];

  // Add formatYAxis function before the renderChart function
  const formatYAxis = (value) => {
    if (config.yAxis?.type === "percentage") {
      return `${value}%`;
    }
    return value;
  };

  // Update the renderChart function's YAxis component in all chart types
  const renderChart = () => {
    const commonChartProps = {
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
      style: { backgroundColor: "white" },
    };

    const commonYAxisProps = {
      tick: { fill: "#000000", fontSize: 12 },
      stroke: "#666666",
      tickLine: { stroke: "#666666" },
      domain: [0, "auto"], // Changed to auto for actual values
      tickFormatter: (value) => {
        if (config.yAxis?.format === "number") {
          return value.toLocaleString(); // Format numbers with commas
        }
        return formatYAxis(value);
      },
      // Add padding to spread out the values
      padding: { top: 40, bottom: 0 },
    };

    switch (type) {
      case "line":
        return (
          <LineChart {...commonChartProps} data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E0E0E0"
              fill="white"
            />
            <XAxis
              dataKey={config.xAxis}
              tick={{ fill: "#000000", fontSize: 12 }}
              stroke="#666666"
              tickLine={{ stroke: "#666666" }}
            />
            <YAxis {...commonYAxisProps} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend
              onClick={handleLegendClick}
              wrapperStyle={customLegendStyle}
              iconSize={10}
              iconType="circle"
            />
            {config.lines
              .filter((line) => {
                if (selectedOwnership === "All") {
                  // For bridge conditions, show only State, Local, and Other when All is selected
                  return (
                    line.key.endsWith("- State") ||
                    line.key.endsWith("- Local") ||
                    line.key.endsWith("- Other")
                  );
                }
                return line.key.endsWith(`- ${selectedOwnership}`);
              })
              .map((line, index) => (
                <Line
                  key={index}
                  type="cardinal"
                  dataKey={line.key}
                  stroke={
                    line.color || CHART_COLORS[index % CHART_COLORS.length]
                  }
                  strokeWidth={3}
                  dot={{
                    strokeWidth: 2,
                    r: 4,
                    fill: "white",
                    stroke:
                      line.color || CHART_COLORS[index % CHART_COLORS.length],
                  }}
                  activeDot={{
                    r: 8,
                    strokeWidth: 2,
                    fill: "white",
                    stroke:
                      line.color || CHART_COLORS[index % CHART_COLORS.length],
                  }}
                  name={line.name}
                  hide={hiddenSeries.has(line.key)}
                />
              ))}
          </LineChart>
        );

      case "bar":
        return (
          <BarChart {...commonChartProps} data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E0E0E0"
              fill="white"
            />
            <XAxis
              dataKey={config.xAxis}
              tick={{ fill: "#000000", fontSize: 12 }}
              stroke="#666666"
              tickLine={{ stroke: "#666666" }}
            />
            <YAxis {...commonYAxisProps} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend
              onClick={handleLegendClick}
              wrapperStyle={customLegendStyle}
              iconSize={10}
              iconType="square"
            />
            {config.bars.map((bar, index) => (
              <Bar
                key={index}
                dataKey={bar.key}
                fill={bar.color || CHART_COLORS[index % CHART_COLORS.length]}
                name={bar.name}
                stackId={config.stacked ? "stack" : undefined}
                hide={hiddenSeries.has(bar.key)}
                opacity={1}
              />
            ))}
          </BarChart>
        );

      case "mixed":
        return (
          <ComposedChart {...commonChartProps} data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E0E0E0"
              fill="white"
            />

            <XAxis
              dataKey={config.xAxis}
              tick={{ fill: "#000000", fontSize: 12 }}
              stroke="#666666"
              tickLine={{ stroke: "#666666" }}
            />

            {/* Left Y Axis (used by data) */}
            <YAxis
              yAxisId="left"
              domain={axisDomain}
              ticks={axisTicks}
              tick={{ fill: "#000000", fontSize: 12 }}
              stroke="#666666"
              tickLine={{ stroke: "#666666" }}
              label={{
                value: "Days",
                angle: -90,
                marginLeft: 10,
                position: "insideLeft",
              }}
            />

            {/* Right Y Axis (not used by data, but forced to match left) */}
            <YAxis
              yAxisId="right" // <--- different ID, but forced to match
              orientation="right"
              domain={axisDomain}
              ticks={axisTicks}
              tick={{ fill: "#000000", fontSize: 12 }}
              stroke="#666666"
              tickLine={{ stroke: "#666666" }}
              label={{ value: "", angle: 90, position: "insideRight" }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />

            <Legend
              onClick={handleLegendClick}
              wrapperStyle={customLegendStyle}
              iconSize={10}
            />

            {config.bars?.map((bar, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey={bar.key}
                fill={bar.color || CHART_COLORS[index % CHART_COLORS.length]}
                name={bar.name}
                hide={hiddenSeries.has(bar.key)}
                opacity={0.8}
                yAxisId="left"
              />
            ))}

            {config.lines?.map((line, index) => (
              <Line
                key={`line-${index}`}
                type="cardinal"
                dataKey={line.key}
                stroke={
                  line.color ||
                  CHART_COLORS[
                    (index + (config.bars?.length || 0)) % CHART_COLORS.length
                  ]
                }
                strokeWidth={3}
                dot={{
                  strokeWidth: 2,
                  r: 4,
                  fill: "white",
                  stroke:
                    line.color ||
                    CHART_COLORS[
                      (index + (config.bars?.length || 0)) % CHART_COLORS.length
                    ],
                }}
                activeDot={{
                  r: 8,
                  strokeWidth: 2,
                  fill: "white",
                  stroke:
                    line.color ||
                    CHART_COLORS[
                      (index + (config.bars?.length || 0)) % CHART_COLORS.length
                    ],
                }}
                name={line.name}
                hide={hiddenSeries.has(line.key)}
                yAxisId="left"
              />
            ))}
          </ComposedChart>
        );

      case "stacked":
        return (
          <BarChart {...commonChartProps} data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E0E0E0"
              fill="white"
            />
            <XAxis
              dataKey={config.xAxis}
              tick={{ fill: "#000000", fontSize: 12 }}
              stroke="#666666"
              tickLine={{ stroke: "#666666" }}
            />
            <YAxis
              {...commonYAxisProps}
              label={{
                value: config.yAxis?.label || "Days",
                angle: -90,
                position: "insideLeft",
                offset: 10,
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Legend
              onClick={handleLegendClick}
              wrapperStyle={customLegendStyle}
              iconSize={10}
              iconType="square"
            />
            {config.bars
              .filter((bar) => {
                if (!selectedOption) return true; // Show all bars when no option is selected

                // Handle different filtering based on data type
                if (config.optionKey === "Value") {
                  return bar.type === selectedOwnership;
                } else {
                  return bar.type === selectedOption;
                }
              })
              .map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.key}
                  fill={bar.color || CHART_COLORS[index % CHART_COLORS.length]}
                  name={bar.name}
                  stackId="stack"
                  hide={hiddenSeries.has(bar.key)}
                >
                  {config.yAxis?.showValues &&
                    data.map((entry, idx) => (
                      <text
                        key={idx}
                        x={0}
                        y={0}
                        dx={30}
                        dy={20}
                        fill="#000000"
                        fontSize={12}
                        textAnchor="middle"
                      >
                        {entry[bar.key]
                          ? Number(entry[bar.key]).toLocaleString()
                          : ""}
                      </text>
                    ))}
                </Bar>
              ))}
          </BarChart>
        );

      case "bridgeStacked":
        return <BridgeStackedChart dataPath={dataPath} config={config} />; // Render the new chart type
      case "bridgeStacked1":
        return <BridgeStackedChart1 dataPath={dataPath} config={config} />; // Render the new chart type
      case "businessFormation":
        return <BusinessFormation dataPath={dataPath} config={config} />; // Render the business formation chart type
      case "commute":
        return <CommuteChart dataPath={dataPath} config={config} />; // Render the new commute chart type
      case "milesdriven":
        return <MilesDriven dataPath={dataPath} config={config} />; // Render the miles driven chart
      case "education1":
        return <Education1 dataPath={dataPath} config={config} />; // Render the first education chart
      case "education2":
        return <Education2 dataPath={dataPath} config={config} />; // Render the second education chart
      case "education3":
        return <Education3 dataPath={dataPath} config={config} />; // Render the third education chart
      case "populationGrowth1":
        return <PopulationGrowth1 dataPath={dataPath} config={config} />; // Render the first population growth chart
      case "gdp1":
        return <GDP1 dataPath={dataPath} config={config} />; // Render the
      case "gdp2":
        return <GDP2 dataPath={dataPath} config={config} />; // Render the
      case "jobgrowth":
        return <JobGrowth dataPath={dataPath} config={config} />; // Render the
      default:
        return null;
    }
  };

  // Add this new useEffect to handle initial header visibility
  React.useEffect(() => {
    if (config.lines && config.lines.length > 5) {
      const initialHidden = new Set();
      config.lines.forEach((line, index) => {
        if (index >= 4) {
          initialHidden.add(line.key);
        }
      });
      setHiddenSeries(initialHidden);
    }
  }, [config.lines]);

  // Update the useEffect hook for CSV data filtering
  React.useEffect(() => {
    csv(dataPath).then((csvData) => {
      if (config.options) {
        setAvailableOptions(config.options);
        if (!selectedOption && config.options.length > 0) {
          setSelectedOption(config.options[0].value);
        }
      }

      let filteredData = csvData;

      // Handle different chart types and their filtering
      switch (type) {
        case "stacked":
          if (selectedOption) {
            // For stacked charts, filter based on the type property in config.bars
            filteredData = csvData;
          }
          break;

        case "mixed":
          // No filtering needed for mixed charts
          filteredData = csvData;
          break;

        case "line":
          // For bridge conditions, filter by Value
          if (selectedOption && config.optionKey === "Value") {
            filteredData = filteredData.filter(
              (item) => item[config.optionKey] === selectedOption
            );
          }
          break;

        default:
          if (selectedOption) {
            filteredData = filteredData.filter(
              (item) => item.type === selectedOption
            );
          }
      }

      setData(filteredData);
    });
  }, [dataPath, selectedOption, type, config.options, config.optionKey]);

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Reset ownership selection when changing value type
    setSelectedOwnership("All");
  };

  // Add ownership change handler
  const handleOwnershipChange = (event) => {
    setSelectedOwnership(event.target.value);
  };

  const handleLegendClick = (entry) => {
    setHiddenSeries((prev) => {
      const newHidden = new Set(prev);
      if (newHidden.has(entry.dataKey)) {
        newHidden.delete(entry.dataKey);
      } else {
        newHidden.add(entry.dataKey);
      }
      return newHidden;
    });
  };

  // Add a custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #666666",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          padding: "10px",
          fontSize: "12px",
        }}
      >
        <p
          style={{
            margin: "0 0 5px 0",
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {label}
        </p>
        {payload.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "3px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: entry.color,
                borderRadius: "2px",
                marginRight: "5px",
              }}
            />
            <span style={{ color: "#000000" }}>
              {entry.name}: {Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Update the select styles in the return section
  const selectStyle = {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #9E9E9E",
    backgroundColor: "#E3F2FD", // Light blue background
    cursor: "pointer",
    color: "#000000", // Black text for options
    fontWeight: "500",
  };

  const labelStyle = {
    fontWeight: 500,
    color: "#FFFFFF", // White text for labels

    padding: "0.5rem",
    borderRadius: "4px",
  };

  // Add this useEffect for handling resize
  React.useEffect(() => {
    const handleResize = () => {
      setChartHeight(window.innerWidth > 768 ? 600 : 400);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Only show options selector if config.option is true */}
        {config.option && config.options && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <label htmlFor="optionSelect" style={labelStyle}>
              {config.optionLabel || "Select Option"}:
            </label>
            <select
              id="optionSelect"
              value={selectedOption || ""}
              onChange={handleOptionChange}
              style={selectStyle}
            >
              {config.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Add ownership type selector */}
        {config.ownershipType && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <label htmlFor="ownershipSelect" style={labelStyle}>
              {config.ownershipType.label || "Select Ownership"}:
            </label>
            <select
              id="ownershipSelect"
              value={selectedOwnership}
              onChange={handleOwnershipChange}
              style={selectStyle}
            >
              {config.ownershipType.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
