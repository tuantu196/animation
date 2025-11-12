import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MotionChartProps = {
  data: { time: number; x: number }[];
  label?: string;
  strokeColor?: string;
};

export default function MotionChart({
  data,
  label,
  strokeColor = "#8884d8",
}: MotionChartProps) {
  return (
    <div className="w-full h-64 mb-6">
      <h3 className="text-lg font-semibold mb-2">{label || "Biểu đồ"}</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" label={{ value: "Time", position: "insideBottomRight" }} />
          <YAxis label={{ value: "X", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="x" stroke={strokeColor} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
