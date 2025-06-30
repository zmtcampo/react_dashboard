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

const EDUCATION_LEVELS = [
  "Less than High School",
  "Some High School",
  "Graduated High School",
  "Some College",
  "Associates Degree",
  "Bachelors Degree",
  "Graduate/Professional Degree",
];
const CHART_COLORS = {
  "Less than High School": "#f28e2b", // orange
  "Some High School": "#ffbf00", // amber
  "Graduated High School": "#59a14f", // green
  "Some College": "#4e79a7", // blue
  "Associates Degree": "#af7aa1", // purple
  "Bachelors Degree": "#edc948", // yellow
  "Graduate/Professional Degree": "#e15759", // red
};

const Education1 = ({ dataPath, config }) => {
  const [data, setData] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(
    config.defaultOption
  );
  const [hiddenSeries, setHiddenSeries] = React.useState(new Set());

  React.useEffect(() => {
    d3.csv(dataPath).then((csvData) => {
      const transformedData = csvData.map((row) => {
        const yearData = { year: +row.year }; // Ensure year is numeric
        config.bars.forEach((bar) => {
          const key = `${selectedLocation}-${bar.key}`;
          yearData[bar.name] = +row[key] || 0;
        });
        return yearData;
      });
      setData(transformedData);
    });
  }, [dataPath, selectedLocation, config.bars]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleLegendClick = (entry) => {
    setHiddenSeries((prev) => {
      const newHidden = new Set(prev);
      if (newHidden.has(entry.value)) {
        newHidden.delete(entry.value);
      } else {
        newHidden.add(entry.value);
      }
      return newHidden;
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #666666",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <p
          style={{
            margin: "0 0 5px 0",
            fontSize: "12px",
            fontWeight: "600",
            color: "#000000",
          }}
        >
          Year: {label}
        </p>
        {payload.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "3px",
              color: "#000000",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: entry.color,
                borderRadius: "50%",
                marginRight: "5px",
              }}
            />
            <span>
              {entry.name}: {Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="locationSelect" style={{ marginRight: "0.5rem" }}>
          Select Geography:
        </label>
        <select
          id="locationSelect"
          value={selectedLocation}
          onChange={handleLocationChange}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #9E9E9E",
            color: "#000000",
            backgroundColor: "#ffffff",
          }}
        >
          {config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }} // Increased bottom margin
          style={{ backgroundColor: "white" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#000000", fontSize: 12 }}
            stroke="#666666"
            label={{
              value: "",
              position: "outsideBottom",
              offset: 25, // Increased offset for label
              fill: "#000000",
              fontSize: 12,
            }}
            tickMargin={10} // Added margin between ticks and axis line
            domain={["auto", "auto"]} // This ensures proper axis scaling
          />

          <YAxis
            tick={{ fill: "#000000", fontSize: 12 }}
            stroke="#666666"
            tickFormatter={(value) => value.toLocaleString()}
            label={{
              value: "Population 25 years and older (thousand)",
              angle: -90,
              position: "insideLeft",
              offset: -40,
              fill: "#000000",
              fontSize: 12,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            onClick={handleLegendClick}
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "11px", // Reduced font size for legend
            }}
            payload={EDUCATION_LEVELS.map((level) => ({
              value: level,
              type: "circle",
              color: hiddenSeries.has(level) ? "#d3d3d3" : CHART_COLORS[level],
              id: level,
            }))}
          />
          {EDUCATION_LEVELS.map((level) => (
            <Bar
              key={level}
              dataKey={level}
              name={level}
              stackId="a"
              fill={CHART_COLORS[level]}
              hide={hiddenSeries.has(level)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Education1;
