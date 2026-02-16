// import type { PieChartProps } from "@/types/types";
import type { PieChartProps } from "@/types/types";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";



// #endregion
export default function PieChartWithPaddingAngle({
  isAnimationActive = true,
  data,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6699"],
}: PieChartProps) {
  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "800px",
        maxHeight: "50vh",
        aspectRatio: 1.618,
      }}
      responsive
    >
      <Pie
        data={data}
        innerRadius="50%"
        outerRadius="70%"
        // Corner radius is the rounded edge of each pie slice
        cornerRadius="50%"
        fill="#8884d8"
        // padding angle is the gap between each pie slice
        paddingAngle={4}
        dataKey="value"
        isAnimationActive={isAnimationActive}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Legend
        align="right"
        verticalAlign="middle"
        layout="vertical"
        wrapperStyle={{
          padding: "5px",
        }}
      />
      <Tooltip />
    </PieChart>
  );
}
