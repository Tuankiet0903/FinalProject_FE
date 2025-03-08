import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MehOutlined } from "@ant-design/icons";
import config from "../../config/Config";
import { useEffect, useState } from "react";

export default function PieChartComponent() {
  const COLORS = [
    "#10b981",
    "#3b82f6",
    "#facc15",
    "#ef4444",
    "#8b5cf6",
    "#d1d5db",
  ];
  const [data, setData] = useState([]);
  const API_URL = config.API_URL;

  useEffect(() => {
    fetch(`${API_URL}/admin/getCountAllWorkspaceType`)
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const pieData = data.map((item) => ({
    name: item.workspaceType,
    value: Number(item.totalWorkspace),
  }));

  const totalWorkspaces = data.reduce((sum, item) => sum + Number(item.totalWorkspace), 0);
  
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-4 border-b border-gray-200 flex justify-between">
        <div>
          <h3 className="font-medium">Workspace Types Distribution</h3>
          <p className="text-sm text-gray-500">
            Breakdown of different workspace types
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">Total Workspaces:</p>
          <p className="text-lg font-bold text-blue-600">{totalWorkspaces}</p>
        </div>
      </div>

      <div className="p-4 h-[300px] flex justify-center items-center">
        {pieData.length === 0 || pieData.every((d) => d.value === 0) ? (
          <div className="flex flex-col items-center text-gray-500">
            <MehOutlined className="text-5xl mb-2" />
            <p>No workspace data available.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
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
        )}
      </div>
    </div>
  );
}
