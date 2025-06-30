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
  bike: "#E65100",
  bus: "#2E7D32",
  ferry: "#00838F",
  mcyc: "#6A1B9A",
  mo: "#AD1457",
  nsov: "#827717",
  other: "#4E342E",
  pool: "#F9A825",
  rail: "#4527A0",
  sov: "#1565C0",
  subw: "#00695C",
  taxi: "#FF8F00",
  transit: "#C62828",
  troll: "#37474F",
  walk: "#6A1B9A",
  wfh: "#00838F",
};

const INITIAL_VISIBLE_MODES = ["sov", "transit", "pool", "walk", "wfh"];

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
      <p style={{ margin: "0 0 5px 0", fontWeight: "bold", color: "#000000" }}>
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
            {entry.name}: {entry.value.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

const CommuteChart = ({ dataPath, config }) => {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    config.locations[0]?.value
  );
  const [selectedValue, setSelectedValue] = useState(
    config.filters?.Value?.[0]?.value
  );
  const [hiddenSeries, setHiddenSeries] = useState(new Set());

  useEffect(() => {
    fetch(dataPath)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = d3.csvParse(csvText);
        // Only filter by Value if it exists in config
        const filtered = config.filters?.Value
          ? parsed.filter((d) => d.Value === selectedValue)
          : parsed;

        if (filtered.length === 0) {
          console.warn("No data matched the filters");
          return;
        }

        const years = [...new Set(filtered.map((d) => d.year))];
        const transformed = years.map((year) => {
          const row = { year };
          config.transportModes.options.forEach((mode) => {
            const col = `${selectedLocation}_${mode.value}`;
            const value = filtered.find((d) => d.year === year)?.[col];
            row[col] = value ? parseFloat(value) : 0;
          });
          return row;
        });

        const hidden = new Set(
          config.transportModes.options
            .filter((mode) => !INITIAL_VISIBLE_MODES.includes(mode.value))
            .map((mode) => `${selectedLocation}_${mode.value}`)
        );

        setData(transformed);
        setHiddenSeries(hidden);
      })
      .catch((err) => {
        console.error("Failed to load CSV", err);
      });
  }, [dataPath, selectedLocation, selectedValue]);

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
            Select Location:
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
        {config.filters?.Value && (
          <div>
            <label
              className="text-white"
              style={{ marginRight: "0.5rem", fontWeight: 500, color: "#000" }}
            >
              Select Value:
            </label>
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              style={selectStyle}
            >
              {config.filters.Value.map((val) => (
                <option key={val.value} value={val.value}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
        )}
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
            tickFormatter={(v) => `${v}%`}
            label={{
              value: config.yAxis.label,
              angle: -90,
              position: "insideLeft",
              offset: -40,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend onClick={handleLegendClick} />
          {config.transportModes.options.map((mode) => {
            const key = `${selectedLocation}_${mode.value}`;
            return (
              <Line
                key={key}
                type="cardinal"
                dataKey={key}
                name={mode.label}
                stroke={CHART_COLORS[mode.value] || "#8884d8"}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                hide={hiddenSeries.has(key)}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommuteChart;
