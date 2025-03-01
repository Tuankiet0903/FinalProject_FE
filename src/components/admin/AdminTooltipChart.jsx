import {
    ComposedChart,
    Bar,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts"
  
  export default function ComposedChartComponent({ data, xAxisKey }) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Composed Chart</h3>
          <p className="text-sm text-gray-500">Combined chart types with custom tooltip</p>
        </div>
        <div className="p-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
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
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-4 border border-gray-200 rounded-md shadow-sm">
                        <p className="font-bold">{label}</p>
                        <p className="text-blue-500">Total: {payload[0].value} workspaces</p>
                        <p className="text-green-500">Active: {payload[1].value} workspaces</p>
                        <p className="text-purple-500">Growth Area: {payload[2].value} workspaces</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {Math.round((payload[1].value / payload[0].value) * 100)}% active rate
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="workspaces"
                name="Total Workspaces"
                fill="#3b82f680"
                stroke="#3b82f6"
                fillOpacity={0.3}
              />
              <Bar dataKey="active" name="Active Workspaces" barSize={20} fill="#10b981" />
              <Line
                type="monotone"
                dataKey="workspaces"
                name="Growth Area"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
  
  