import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, BarChart3, Building2, Users } from "lucide-react";
import BarChartComponent from "../../../components/admin/AdminBarChart";
import LineChartComponent from "../../../components/admin/AdminLineChart";
import PieChartComponent from "../../../components/admin/AdminPieChart";
import ComposedChartComponent from "../../../components/admin/AdminComposedChart";
import config from "../../../config/Config";

// Import chart components

export default function AdminDashboard() {
  const [period, setPeriod] = useState("year");
  const [userData, setUserData] = useState([]);

  const API_URL = config.API_URL;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/admin/getCountAllActiveUsers`)
        .then((response) => response.json())
        .then((fetchedData) => {
          setUserData(fetchedData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };
  
    fetchData();
    const interval = setInterval(fetchData, 30000); // Fetch every 30s
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  

  // Mock data for workspaces
  const monthlyData = [
    { month: "Jan", totalUser: 12, active: 10 },
    { month: "Feb", workspaces: 19, active: 15 },
    { month: "Mar", workspaces: 25, active: 20 },
    { month: "Apr", workspaces: 32, active: 25 },
    { month: "May", workspaces: 38, active: 30 },
    { month: "Jun", workspaces: 42, active: 35 },
    { month: "Jul", workspaces: 48, active: 40 },
    { month: "Aug", workspaces: 53, active: 45 },
    { month: "Sep", workspaces: 61, active: 50 },
    { month: "Oct", workspaces: 67, active: 55 },
    { month: "Nov", workspaces: 72, active: 60 },
    { month: "Dec", workspaces: 78, active: 65 },
  ];

  const quarterlyData = [
    { quarter: "Q1", workspaces: 25, active: 20 },
    { quarter: "Q2", workspaces: 42, active: 35 },
    { quarter: "Q3", workspaces: 61, active: 50 },
    { quarter: "Q4", workspaces: 78, active: 65 },
  ];

  const yearlyData = [
    { year: "2020", workspaces: 24, active: 18 },
    { year: "2021", workspaces: 42, active: 35 },
    { year: "2022", workspaces: 58, active: 48 },
    { year: "2023", workspaces: 67, active: 55 },
    { year: "2024", workspaces: 78, active: 65 },
  ];

  const getChartData = () => {
    switch (period) {
      case "month":
        return monthlyData;
      case "quarter":
        return quarterlyData;
      case "year":
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const data = getChartData();
  const currentTotal = data[data.length - 1].workspaces;
  const previousTotal = data[data.length - 2].workspaces;
  const percentageChange = Math.round(
    ((currentTotal - previousTotal) / previousTotal) * 100
  );
  const isPositiveChange = percentageChange >= 0;

  const getXAxisKey = () => {
    switch (period) {
      case "month":
        return "month";
      case "quarter":
        return "quarter";
      case "year":
        return "year";
      default:
        return "month";
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">DashBoard</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Workspaces Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-700">
                Total Active User
              </h3>
              <Users className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">{userData.active}</div>
            <div className="text-xs text-gray-500">
              {Math.round((userData.active / userData.totalUser) * 100)}%
              of total
            </div>
          </div>

          {/* Active Workspaces Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-700">
                Active Workspaces
              </h3>
              <Users className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">
              {data[data.length - 1].active}
            </div>
            <div className="text-xs text-gray-500">
              {Math.round((data[data.length - 1].active / currentTotal) * 100)}%
              of total
            </div>
          </div>

          {/* Average Users Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-700">
                Average Users per Workspace
              </h3>
              <Users className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">8.3</div>
            <div className="text-xs text-gray-500">
              +12% from previous {period}
            </div>
          </div>

          {/* Growth Rate Card */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-700">
                Workspace Growth Rate
              </h3>
              <BarChart3 className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">
              {isPositiveChange ? "+" : ""}
              {percentageChange}%
            </div>
            <div className="text-xs text-gray-500">Per {period}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bar Chart Component */}
          <BarChartComponent />

          {/* Line Chart Component */}
          <LineChartComponent data={data} xAxisKey={getXAxisKey()} />

          {/* Pie Chart Component */}
          <PieChartComponent />

          {/* Composed Chart Component (formerly Tooltip Chart) */}
          <ComposedChartComponent />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Workspace Distribution</h3>
              <p className="text-sm text-gray-500">
                Distribution of workspaces by size and activity
              </p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Small (1-5 users)</div>
                    <div className="text-sm text-gray-500">42%</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: "42%" }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      Medium (6-20 users)
                    </div>
                    <div className="text-sm text-gray-500">35%</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: "35%" }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      Large (21-50 users)
                    </div>
                    <div className="text-sm text-gray-500">18%</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: "18%" }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      Enterprise (50+ users)
                    </div>
                    <div className="text-sm text-gray-500">5%</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: "5%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Actions</h3>
              <p className="text-sm text-gray-500">
                Manage workspace analytics
              </p>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Export Report
              </button>
              <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Schedule Report
              </button>
              <button className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                View Detailed Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
