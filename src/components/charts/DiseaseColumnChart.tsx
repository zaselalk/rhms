// src/components/Charts/DiseaseColumnChart.tsx
import React from "react";
import { Column } from "@ant-design/plots";

// type DataItem = {
//   name: string;
//   count: number;
// };

// interface Props {
//   data: DataItem[];
// }

const DiseaseColumnChart: React.FC<any> = ({ data }) => {
  const config = {
    data,
    height: 260,
    autoFit: false,
    xField: "name", // ← match the backend's "name"
    yField: "count", // ← match the backend's "count"
    colorField: "name",
    columnStyle: {
      radiusTopLeft: 6,
      radiusTopRight: 6,
    },
    columnWidthRatio: 0.5,
    label: {
      position: "top",
      style: {
        fill: "#4b5563",
        fontSize: 11,
        fontWeight: 600,
      },
    },
    xAxis: {
      label: {
        style: { fill: "#6b7280", fontSize: 12 },
      },
      line: { style: { stroke: "#e5e7eb" } },
    },
    yAxis: {
      label: {
        style: { fill: "#9ca3af", fontSize: 11 },
      },
      grid: {
        line: { style: { stroke: "#f3f4f6" } },
      },
    },
    legend: false,
    meta: {
      name: { alias: "Disease" },
      count: { alias: "Patients" },
    },
    scale: {
      color: {
        range: [
          "#008FFB",
          "#00C1A7",
          "#faad14",
          "#f4664a",
          "#722ed1",
          "#13c2c2",
          "#52c41a",
          "#2f54eb",
        ],
      },
    },
    tooltip: {
      domStyles: {
        "g2-tooltip": {
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      },
    },
  };

  return <Column {...config} />;
};

export default DiseaseColumnChart;
