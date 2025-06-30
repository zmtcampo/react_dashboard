import React from "react";
import * as d3 from "d3";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Updated color palette for all types
const CHART_COLORS = {
  // Condition colors
  All: "#0277BD", // medium blue
  Good: "#ff9f4b", // orange
  Fair: "#c3d4ee", // light blue
  Poor: "#579ac7", // muted blue
};

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

const BridgeStackedChart1 = ({ dataPath, config }) => {
  const [data, setData] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(
    config.defaultOption || "Deck"
  );

  const [hiddenSeries, setHiddenSeries] = React.useState(new Set());

  React.useEffect(() => {
    fetch(dataPath)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = d3.csvParse(csvText);
        const transformedData = parsedData
          .filter((d) => d.Value === selectedOption)
          .map((d) => {
            const obj = { year: d.year };

            // Add values based on the bars configuration
            config.bars.forEach((bar) => {
              if (bar.name) {
                // Extract the actual value using the correct key format
                const key = `${bar.key.split("-")[0]}- ${bar.type}`;
                obj[bar.name] = +d[key] || 0;
              }
            });

            return obj;
          });
        setData(transformedData);
      })
      .catch((error) => {
        console.error("Error loading chart data:", error);
      });
  }, [dataPath, selectedOption, config.bars]);

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

  // Custom tooltip component matching ChartComponent
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
          style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#000000" }}
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

  const renderChart = () => (
    <BarChart
      data={data}
      margin={{ top: 10, right: 30, left: 50, bottom: 20 }}
      style={{ backgroundColor: "white" }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
      <XAxis
        dataKey="year"
        tick={{ fill: "#000000", fontSize: 12 }}
        stroke="#666666"
      />
      <YAxis
        tick={{ fill: "#000000", fontSize: 12 }}
        stroke="#666666"
        tickFormatter={(value) => value.toLocaleString()}
        label={{
          value: config.yAxis?.label || "",
          angle: -90,
          position: "insideLeft",
          offset: -40,
        }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend onClick={handleLegendClick} iconSize={10} iconType="circle" />
      {config.bars.map(
        (bar) =>
          bar.name && (
            <Bar
              key={bar.name}
              dataKey={bar.name}
              name={bar.name}
              stackId="a"
              fill={CHART_COLORS[bar.name]}
              hide={hiddenSeries.has(bar.name)}
            />
          )
      )}
    </BarChart>
  );

  const selectStyle = {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #9E9E9E",
    backgroundColor: "#E3F2FD",
    cursor: "pointer",
    color: "#000000",
    fontWeight: "500",
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="bridgeTypeSelect"
          style={{
            marginRight: "0.5rem",
            fontWeight: "500",
            color: "#ffffff",
          }}
        >
          Select Value Type:
        </label>
        <select
          id="bridgeTypeSelect"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={selectStyle}
        >
          {config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default BridgeStackedChart1;
