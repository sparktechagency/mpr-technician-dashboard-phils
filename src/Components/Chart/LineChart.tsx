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

// Define the structure of each data point in the chart
interface ChartData {
  name: string;
  complete: number;
  pending: number;
}

const data: ChartData[] = [
  { name: "Jan", complete: 80, pending: 30 },
  { name: "Feb", complete: 70, pending: 20 },
  { name: "Mar", complete: 50, pending: 15 },
  { name: "Apr", complete: 60, pending: 18 },
  { name: "May", complete: 30, pending: 8 },
  { name: "Jun", complete: 20, pending: 5 },
  { name: "Jul", complete: 45, pending: 15 },
  { name: "Aug", complete: 36, pending: 20 },
  { name: "Sep", complete: 53, pending: 25 },
  { name: "Oct", complete: 69, pending: 35 },
  { name: "Nov", complete: 78, pending: 40 },
  { name: "Dec", complete: 36, pending: 15 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartData; complete: number; pending: number }[];
}

const Line_Chart: React.FC = () => {
  // Custom tooltip to display the information
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background-color shadow-md p-2 rounded-md border border-secondary-color">
          <p className="text-sm font-semibold text-base-color">
            {payload[0].payload.name}
          </p>
          <p className="text-xs text-base-color">
            Complete:{" "}
            <span className="font-semibold">{payload[0].payload.complete}</span>
          </p>
          <p className="text-xs text-base-color">
            Pending:{" "}
            <span className="font-semibold">{payload[0].payload.pending}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tick style for X and Y axes
  const tickStyle = { fill: "#fff", fontSize: 12 };

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <RechartsTooltip content={<CustomTooltip />} />
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis tick={{ ...tickStyle }} tickMargin={16} />
          {/* <CartesianGrid strokeDasharray="3 3" stroke="#E5E5EF" /> */}
          <Legend />
          {/* Reference lines to show certain value thresholds */}
          <ReferenceLine y={10} stroke="#E5E5EF" />
          <ReferenceLine y={20} stroke="#E5E5EF" />
          <ReferenceLine y={30} stroke="#E5E5EF" />
          <ReferenceLine y={40} stroke="#E5E5EF" />
          <ReferenceLine y={50} stroke="#E5E5EF" />
          <ReferenceLine y={60} stroke="#E5E5EF" />
          {/* Line for Complete */}
          <Line
            type="monotone"
            dataKey="complete"
            stroke="#2D9CDB" // Blue color for Complete
            strokeWidth={3}
            dot={false} // Disable the dots on the line
          />
          {/* Line for Pending */}
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#C70039" // Orange color for Pending
            strokeWidth={3}
            dot={false} // Disable the dots on the line
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Line_Chart;
