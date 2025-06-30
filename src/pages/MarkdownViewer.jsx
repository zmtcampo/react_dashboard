import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import * as d3 from "d3";

// Custom component to render D3 charts
const D3Chart = ({ chartData, type }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (chartData && chartRef.current) {
      // Clear any existing charts
      d3.select(chartRef.current).selectAll("*").remove();

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      if (type === "bar") {
        // Create scales
        const x = d3
          .scaleBand()
          .range([0, width])
          .domain(chartData.data.map((d) => d.label))
          .padding(0.1);

        const y = d3
          .scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(chartData.data, (d) => d.value)]);

        // Add X axis
        svg
          .append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .style("fill", "white");

        // Add Y axis
        svg
          .append("g")
          .call(d3.axisLeft(y))
          .selectAll("text")
          .style("fill", "white");

        // Add bars
        svg
          .selectAll("rect")
          .data(chartData.data)
          .join("rect")
          .attr("x", (d) => x(d.label))
          .attr("width", x.bandwidth())
          .attr("y", (d) => y(d.value))
          .attr("height", (d) => height - y(d.value))
          .attr("fill", "#4f46e5");
      }
    }
  }, [chartData, type]);

  return <div ref={chartRef} className="w-full h-[300px]"></div>;
};

export default D3Chart;
