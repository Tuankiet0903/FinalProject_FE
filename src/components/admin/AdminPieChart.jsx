import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
  } from "recharts";
  
  export default function PieChartComponent({ data }) {
    // Colors for pie chart
    const COLORS = ["#10b981", "#d1d5db"];
  
    // Data for pie chart
    const pieData = [
      { name: "Active Workspaces", value: data[data.length - 1].active },
      {
        name: "Inactive Workspaces",
        value: data[data.length - 1].workspaces - data[data.length - 1].active,
      },
    ];
  
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Pie Chart</h3>
          <p className="text-sm text-gray-500">Active vs. Inactive workspaces</p>
        </div>
        <div className="p-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} workspaces`, null]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  