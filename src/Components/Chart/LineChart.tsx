/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import { IMonthlyStats } from "../../types";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Line_Chart = ({ earningsData }: { earningsData: IMonthlyStats[] }) => {
  // Convert API → Chart Format
  const chartData = earningsData.map((item) => ({
    name: monthNames[item.month - 1], // convert month number
    completed: item.completed,
    inprogress: item.inprogress,
  }));

  // Custom Tooltip
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background-color shadow-md p-2 rounded-md border border-secondary-color">
          <p className="text-sm font-semibold text-base-color">
            {payload[0].payload.name}
          </p>
          <p className="text-xs text-base-color">
            Completed:{" "}
            <span className="font-semibold">
              {payload[0].payload.completed}
            </span>
          </p>
          <p className="text-xs text-base-color">
            In Progress:{" "}
            <span className="font-semibold">
              {payload[0].payload.inprogress}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const tickStyle = { fill: "#fff", fontSize: 12 };

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <RechartsTooltip content={<CustomTooltip />} />
          <XAxis dataKey="name" tick={tickStyle} />
          <YAxis tick={tickStyle} />

          <Legend />

          {/* Reference lines */}
          {[10, 20, 30, 40, 50, 60].map((v) => (
            <ReferenceLine key={v} y={v} stroke="#E5E5EF" />
          ))}

          {/* Completed Line */}
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#2D9CDB"
            strokeWidth={3}
            dot={false}
            name="Completed"
          />

          {/* In Progress Line */}
          <Line
            type="monotone"
            dataKey="inprogress"
            stroke="#C70039"
            strokeWidth={3}
            dot={false}
            name="In Progress"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Line_Chart;
