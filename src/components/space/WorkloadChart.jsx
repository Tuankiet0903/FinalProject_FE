import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Backlog", value: 5, color: "#007bff" },
  { name: "To Do", value: 4, color: "#cccccc" },
];

export default function WorkloadChart() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Workload by Status</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
