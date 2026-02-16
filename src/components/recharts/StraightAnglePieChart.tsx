import type { PieChartProps } from "@/types/types";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

// #region data
// interface DataProps {
//   name: string;
//   value: number;
//   fill: string;
// }

// #endregion
export default function StraightAnglePieChart({
  isAnimationActive = true,
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6699"],
}: PieChartProps) {
  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "800px",
        maxHeight: "30vh",
        aspectRatio: 1.618,
      }}
    >
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx="50%"
        cy="70%"
        outerRadius="100%"
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Legend align="right" layout="vertical" verticalAlign="bottom" />
      <Tooltip />
    </PieChart>
  );
}
