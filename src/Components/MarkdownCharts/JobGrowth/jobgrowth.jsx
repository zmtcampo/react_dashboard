import React, { useEffect, useState } from "react";
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

const BAR_COLORS = [
  "#1f77b4", // blue
  "#ff7f0e", // orange
  "#2ca02c", // green
  "#d62728", // red
  "#9467bd", // purple
  "#8c564b", // brown
  "#e377c2", // pink
  "#7f7f7f", // gray
  "#bcbd22", // olive
  "#17becf", // cyan
  "#aec7e8", // light blue
  "#ffbb78", // light orange
  "#98df8a", // light green
  "#ff9896", // light red
  "rebeccapurple",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "4px",
        }}
      >
        <p style={{ margin: "0 0 5px 0" }}>
          <strong className="text-black font-bold">Year: {label}</strong>
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: "2px 0", color: "black" }}>
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: entry.color,
                marginRight: "5px",
              }}
            ></span>
            {entry.name}: {(entry.value * 100).toFixed(2)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TransitSafetyBarChart = ({ dataPath, config }) => {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("northshore");
  const [activeItems, setActiveItems] = useState({});

  // Get all industry types from Value filters
  const industries = config.filters.Value;

  useEffect(() => {
    // Initialize active items for industries
    setActiveItems(
      industries.reduce((acc, item) => {
        acc[item.value] = true;
        return acc;
      }, {})
    );

    fetch(dataPath)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = d3.csvParse(csvText);
        const years = [...new Set(parsed.map((d) => d.year))].sort();

        const transformed = years.map((year) => {
          const yearData = { year };
          // Add data for each industry for the selected location
          industries.forEach((industry) => {
            const columnName = `${selectedLocation}_${industry.value}`;
            yearData[industry.value] = parseFloat(
              parsed.find((d) => d.year === year)?.[columnName] || 0
            );
          });
          return yearData;
        });

        setData(transformed);
      })
      .catch((err) => {
        console.error("Failed to load CSV", err);
      });
  }, [dataPath, selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleLegendClick = (entry) => {
    setActiveItems((prev) => ({
      ...prev,
      [entry.dataKey]: !prev[entry.dataKey],
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="location-select" style={{ marginRight: "10px" }}>
          Select Geography:
        </label>
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            minWidth: "200px",
            color: "black",
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
            border: "1px solid #ccc",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {config.locations.map((loc) => (
            <option key={loc.value} value={loc.value.split("_")[0]}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            label={{
              value: config.yAxis.label,
              angle: -90,
              offset: -20,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
              },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={() => (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px 24px",
                  padding: "10px 40px 0 40px",
                  fontSize: "14px",
                }}
              >
                {industries.map((item, index) => {
                  const isActive = activeItems[item.value];
                  return (
                    <div
                      key={item.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        color: isActive ? "#000" : "#999",
                        fontWeight: isActive ? 500 : 400,
                      }}
                      onClick={() => handleLegendClick({ dataKey: item.value })}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          marginRight: 6,
                          backgroundColor: isActive
                            ? BAR_COLORS[index % BAR_COLORS.length]
                            : "#d3d3d3",
                        }}
                      ></div>
                      {item.label}
                    </div>
                  );
                })}
              </div>
            )}
          />

          {industries.map((industry, index) => (
            <Bar
              key={industry.value}
              dataKey={industry.value}
              name={industry.label}
              stackId="a"
              fill={BAR_COLORS[index % BAR_COLORS.length]}
              hide={!activeItems[industry.value]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransitSafetyBarChart;
