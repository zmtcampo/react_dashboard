import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { csv } from "d3";

const CHART_COLORS = [
  "#1565C0", // darker blue
  "#aec6e8", // darker red
  "#2E7D32", // darker green
  "#6A1B9A", // darker purple
];

const LOCATIONS = [
  { value: "northshore", label: "North shore" },
  { value: "waianae", label: "Waianae" },
  { value: "centralOahu", label: "Central Oahu" },
  { value: "ewa", label: "Ewa" },
  { value: "puc", label: "PUC" },
  { value: "EastHonolulu", label: "East Honolulu" },
  { value: "koolauloa", label: "Koolauloa" },
  { value: "koolaupoko", label: "Koolaupoko" },
];

const VIEW_TYPES = [
  { value: "total", label: "Total Formations" },
  { value: "percentage", label: "Percentage Change" },
];

const BusinessFormation = ({ dataPath, config }) => {
  const [data, setData] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState("northshore");
  const [viewType, setViewType] = React.useState("total");

  React.useEffect(() => {
    csv(dataPath).then((csvData) => {
      const processedData = csvData.map((row) => ({
        year: +row.year,
        total: parseFloat(row[`${selectedLocation}_total`]) || 0,
        percentage: parseFloat(row[`${selectedLocation}_cumu_perc_chng`]) || 0,
      }));

      const averagedData = processedData.map((d, i, arr) => {
        const window = arr.slice(Math.max(0, i - 4), i + 1);
        const avg = (key) =>
          window.reduce((sum, row) => sum + row[key], 0) / window.length;

        return {
          ...d,
          total_avg: avg("total"),
          percentage_avg: avg("percentage"),
        };
      });

      setData(averagedData);
    });
  }, [dataPath, selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  const selectStyle = {
    padding: "0.5rem",
    marginRight: "1rem",
    borderRadius: "4px",
    border: "1px solid #9E9E9E",
    backgroundColor: "#E3F2FD",
    cursor: "pointer",
    color: "#000000",
    fontWeight: "500",
  };

  const CustomTooltip = ({ active, payload, label, viewType }) => {
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
              {entry.name}:{" "}
              {viewType === "percentage"
                ? `${(entry.value * 100).toFixed(1)}%`
                : Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div
        style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
      >
        <label htmlFor="geo" className="mr-2">
          Select Geography:
        </label>
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          style={selectStyle}
        >
          {LOCATIONS.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </select>
        <label htmlFor="value" className="mr-2">
          Select Value Type:
        </label>
        <select
          value={viewType}
          onChange={handleViewTypeChange}
          style={selectStyle}
        >
          {VIEW_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="90%" height={500}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 60, bottom: 0 }}
          style={{ backgroundColor: "white" }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" fill="white" />

          <XAxis
            dataKey="year"
            tick={{ fill: "#000000", fontSize: 12 }}
            stroke="#666666"
            tickLine={{ stroke: "#666666" }}
          />

          <YAxis
            yAxisId="left"
            domain={
              viewType === "percentage"
                ? ["dataMin", "dataMax"]
                : ["auto", "auto"]
            }
            tick={{ fill: "#000000", fontSize: 12 }}
            stroke="#666666"
            tickLine={{ stroke: "#666666" }}
            tickFormatter={
              viewType === "percentage"
                ? (value) => `${(value * 100).toFixed(0)}%`
                : (value) => value.toLocaleString()
            }
          >
            <Label
              value={
                viewType === "percentage"
                  ? "Percent Difference from Base Year"
                  : "Annual Business Formations"
              }
              angle={-90}
              position="insideLeft"
              offset={-30}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>

          <YAxis
            yAxisId="right"
            orientation="right"
            mirror={true}
            hide={false}
            includeHidden={true}
            allowDataOverflow={true}
            domain={
              viewType === "percentage"
                ? ["dataMin", "dataMax"]
                : ["auto", "auto"]
            }
            tick={{ fill: "#000000", fontSize: 12 }}
            stroke="#666666"
            tickLine={{ stroke: "#666666" }}
            axisLine={{ stroke: "#666666" }}
            tickFormatter={
              viewType === "percentage"
                ? (value) => `${(value * 100).toFixed(0)}%`
                : (value) => value.toLocaleString()
            }
          />

          <Tooltip content={<CustomTooltip viewType={viewType} />} />
          <Legend />

          <Bar
            dataKey={viewType}
            fill={CHART_COLORS[0]}
            name={viewType === "Annual Business Formations (Left Axis)"}
            yAxisId="left"
          />

          <Line
            type="monotone"
            dataKey={viewType === "percentage" ? "percentage_avg" : "total_avg"}
            stroke={CHART_COLORS[1]}
            strokeWidth={2}
            dot={{ r: 2 }}
            name={
              viewType === "percentage"
                ? "5-year avg"
                : "5-year avg (Right Axis)"
            }
            yAxisId="left" // ← match the bar axis
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BusinessFormation;
