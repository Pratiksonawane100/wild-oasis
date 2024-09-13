import PropTypes from "prop-types";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const startData = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur?.numNights;
      if (!num) return arr; // Safeguard for undefined numNights
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const data = prepareData(startData, confirmedStays);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Stay Duration Summary
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius="60%"
            outerRadius="80%"
            cx="50%"
            cy="50%"
            paddingAngle={5}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} key={entry.duration} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="20%"
            layout="vertical"
            iconSize={12}
            iconType="circle"
            className="text-sm"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

DurationChart.propTypes = {
  confirmedStays: PropTypes.arrayOf(
    PropTypes.shape({
      numNights: PropTypes.number, // Make numNights optional to prevent the warning
    })
  ),
};

export default DurationChart;
