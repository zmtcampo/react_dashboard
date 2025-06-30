import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Use mode.value as keys!
const CHART_COLORS = {
  "<20": "#E65100",
  "20-34": "#2E7D32",
  "35-49": "#00838F",
  "50-64": "#6A1B9A",
  "65+": "#AD1457",
};

const INITIAL_VISIBLE_MODES = ["<20", "20-34", "35-49", "50-64", "65+"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #666666",
        borderRadius: "4px",
        padding: "10px",
        fontSize: "12px",
      }}
    >
      <p style={{ fontWeight: "bold", marginBottom: "5px", color: "#000" }}>
        Year: {label}
      </p>
      {payload.map((entry, index) => (
        <div
          key={index}
          style={{
            color: "#000",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: entry.stroke,
              display: "inline-block",
            }}
          />
          <span style={{ marginRight: "8px" }}>{entry.name}:</span>
          <strong>{entry.value}</strong>
        </div>
      ))}
    </div>
  );
};

const PopulationGrowth1 = ({ dataPath, config }) => {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    config.locations[0]?.value
  );
  const [hiddenSeries, setHiddenSeries] = useState(new Set());

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = d3.csvParse(csvText);

        if (parsed.length === 0) {
          console.warn("No data found in CSV");
          return;
        }

        const transformed = parsed.map((row) => {
          const yearData = { year: row.Year };
          // Add data for each age group
          config.transportModes.options.forEach((mode) => {
            const columnKey = `${selectedLocation}_${mode.value}`;
            yearData[mode.value] = row[columnKey]
              ? parseFloat(row[columnKey])
              : 0;
          });
          return yearData;
        });

        setData(transformed);
        setHiddenSeries(new Set());
      })
      .catch((err) => {
        console.error("Failed to load CSV", err);
      });
  }, [dataPath, selectedLocation]);

  const handleLegendClick = (entry) => {
    setHiddenSeries((prev) => {
      const copy = new Set(prev);
      if (copy.has(entry.dataKey)) {
        copy.delete(entry.dataKey);
      } else {
        copy.add(entry.dataKey);
      }
      return copy;
    });
  };

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
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <div>
          <label
            className="text-white"
            style={{ marginRight: "0.5rem", fontWeight: 500, color: "#000" }}
          >
            Select Geography:
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={selectStyle}
          >
            {config.locations.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 50, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke="#666" />
          <YAxis
            stroke="#666"
            label={{
              value: config.yAxis.label,
              angle: -90,
              position: "insideLeft",
              offset: -40,
              style: {
                textAnchor: "middle",
                fill: "#000000",
                fontSize: 14,
              },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend onClick={handleLegendClick} />
          {config.transportModes.options.map((mode) => (
            <Line
              key={mode.value}
              type="cardinal"
              dataKey={mode.value}
              name={mode.label}
              stroke={CHART_COLORS[mode.value]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              hide={hiddenSeries.has(mode.value)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationGrowth1;
