import { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Area,
} from "recharts";
import { fetchMonthlyData, fetchYearlyData } from "../../api/Admin";

export default function ComposedChartComponent() {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("year");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData;
        if (filter === "month") {
          fetchedData = await fetchMonthlyData();
        } else {
          fetchedData = await fetchYearlyData();
        }
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4 p-4 border-b border-gray-200">
        <div>
          <h3 className="font-medium">User Growth</h3>
          <p className="text-sm text-gray-500">
            Total workspaces and active workspaces trend over time
          </p>
        </div>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>
      <div className="p-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="workspaceMonth" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} workspaces`, null]} />
            <Legend />
            <Bar
              dataKey="totalWorkspace"
              name="Total Workspaces"
              fill="#3b82f6"
              barSize={30}
            />
            <Area
              type="monotone"
              dataKey="growth"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Line type="monotone" dataKey="totalWorkspace" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
