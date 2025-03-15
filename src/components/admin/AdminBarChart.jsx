import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MehOutlined } from "@ant-design/icons";
import { getCountAllUsers } from "../../api/Admin";

export default function BarChartComponent() {
  const [filter, setFilter] = useState("year");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getCountAllUsers();
        const formattedData = fetchedData.map((item) => ({
          time: formatData(item.time, filter),
          totalUser: Number(item.totalUser),
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const formatToMonthYear = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const formatToYear = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}`;
  };

  const formatToQuarter = (dateString) => {
    const date = new Date(dateString);
    const quarter = Math.floor(date.getMonth() / 3) + 1;
    return `Q${quarter} ${date.getFullYear()}`;
  };

  const formatData = (dateString, filterType) => {
    switch (filterType) {
      case "year":
        return formatToYear(dateString);
      case "month":
        return formatToMonthYear(dateString);
      case "quarter":
        return formatToQuarter(dateString);
      default:
        return formatToMonthYear(dateString);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm border-b ">
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
          <option value="quarter">Quarterly</option>
          <option value="year">Yearly</option>
        </select>
      </div>

      <div className="h-[300px] flex justify-center items-center">
        {data.length === 0 ? (
          <div className="flex justify-center items-center flex-col">
            <MehOutlined className="text-4xl text-gray-500" />
            <p className="text-center text-gray-500">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="totalUser"
                name="Total Users"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
