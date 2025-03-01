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
  
  export default function BarChartComponent({ data, xAxisKey }) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Bar Chart</h3>
          <p className="text-sm text-gray-500">
            Total workspaces and active workspaces over time
          </p>
        </div>
        <div className="p-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="workspaces"
                name="Total Workspaces"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="active"
                name="Active Workspaces"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  