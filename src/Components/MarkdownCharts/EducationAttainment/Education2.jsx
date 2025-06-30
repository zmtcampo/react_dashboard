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

const REGIONS = ["Core", "Developed", "Growing", "Rural"];

const CHART_COLORS = {
  Core: "#4e79a7",
  Developed: "#f28e2b",
  Growing: "#e15759",
  Rural: "#76b7b2",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  // Group all values for this year
  const yearData = {};
  payload.forEach((item) => {
    if (item.value !== null && item.value !== undefined) {
      yearData[item.name] = item.value;
    }
  });

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
      {REGIONS.map(
        (region) =>
          yearData[region] && (
            <div
              key={region}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "11px",
                marginTop: "3px",
                color: "#000000",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: CHART_COLORS[region],
                  marginRight: "5px",
                }}
              />
              <span>
                {region}: {yearData[region].toFixed(1)}%
              </span>
            </div>
          )
      )}
    </div>
  );
};

const Education2 = ({ dataPath, config }) => {
  const [data, setData] = React.useState([]);
  const [hiddenSeries, setHiddenSeries] = React.useState(new Set());

  React.useEffect(() => {
    d3.csv(dataPath).then((csvData) => {
      // Transform all years, including empty ones
      const transformedData = csvData
        .filter((row) => row.year)
        .map((row) => ({
          year: +row.year,
          Core: row.hsRateCore ? parseFloat(row.hsRateCore) * 100 : null,
          Developed: row.hsRateDeveloped
            ? parseFloat(row.hsRateDeveloped) * 100
            : null,
          Growing: row.hsRateGrowing
            ? parseFloat(row.hsRateGrowing) * 100
            : null,
          Rural: row.hsRateRural ? parseFloat(row.hsRateRural) * 100 : null,
        }));
      setData(transformedData);
    });
  }, [dataPath]);

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

  return (
    <div style={{ width: "100%", height: "550px" }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tick={{ fill: "#000000", fontSize: 12 }}
            label={{
              value: "",
              position: "outsideBottom",
              style: { textAnchor: "middle" },
              offset: 105, // Increased offset for label
              fill: "#000000",
              fontSize: 12,
            }}
            allowDataOverflow={true}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#000000", fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
            label={{
              value: config.yAxis.label,
              angle: -90,
              position: "insideLeft",
              offset: -40,
              style: { textAnchor: "middle" },
              fontSize: 12,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            onClick={handleLegendClick}
            iconType="circle"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "11px",
            }}
            iconSize={8}
          />
          {REGIONS.map((region) => (
            <Bar
              key={region}
              dataKey={region}
              name={region}
              fill={CHART_COLORS[region]}
              hide={hiddenSeries.has(region)}
              isAnimationActive={true}
              tooltipFormatter={(value) => `${(value || 0).toFixed(1)}%`}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Education2;
