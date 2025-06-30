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
  "#579ac7",
  "#bccde7",
  "#ff9f4b",
  "#ffcc9a",
  "#88c580",
  "#d4e6d2",
  "#a65d57",
  "#dfb6b3",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid black",
          borderRadius: "4px",
        }}
      >
        <p style={{ color: "black", margin: "0 0 5px 0" }}>
          <strong>Year: {label}</strong>
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: "black", margin: "2px 0" }}>
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                backgroundColor: entry.color,
                marginRight: "5px",
              }}
            ></span>
            {entry.name}: {(entry.value * 100).toFixed(2)} %
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TransitSafetyBarChart = ({ dataPath, config }) => {
  const [data, setData] = useState([]);
  const [activeLocations, setActiveLocations] = useState(
    config.locations.reduce((acc, loc) => {
      acc[loc.value] = true;
      return acc;
    }, {})
  );

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = d3.csvParse(csvText);
        const years = [...new Set(parsed.map((d) => d.year))].sort();

        const transformed = years.map((year) => {
          const yearData = { year };
          config.locations.forEach((location) => {
            yearData[location.value] = parseFloat(
              parsed.find((d) => d.year === year)?.[location.value]
            );
          });
          return yearData;
        });

        setData(transformed);
      })
      .catch((err) => {
        console.error("Failed to load CSV", err);
      });
  }, [dataPath]);

  const handleLegendClick = (entry) => {
    setActiveLocations((prev) => ({
      ...prev,
      [entry.dataKey]: !prev[entry.dataKey],
    }));
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            stroke="#666"
            tick={{ fill: "#000", fontSize: 12 }}
          />
          <YAxis
            stroke="#666"
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            label={{
              value: config.yAxis.label,
              angle: -90,
              position: "insideLeft",
              offset: -10,
              style: {
                textAnchor: "middle",
                fill: "#000000",
                fontSize: 16,
              },
            }}
            tick={{ fill: "#000", fontSize: 12 }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            onClick={handleLegendClick}
            payload={config.locations.map((location, index) => ({
              value: location.name,
              type: "circle",
              id: location.value,
              color: activeLocations[location.value]
                ? BAR_COLORS[index % BAR_COLORS.length]
                : "gray",
              dataKey: location.value,
            }))}
          />

          {config.locations.map((location, index) => (
            <Bar
              key={location.value}
              dataKey={location.value}
              name={location.name}
              stackId="a"
              fill={BAR_COLORS[index % BAR_COLORS.length]}
              hide={!activeLocations[location.value]}
              isAnimationActive={true}
              animationDuration={500} // Optional: customize speed (ms)
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransitSafetyBarChart;
