import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Đăng ký các component của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function DashboardSpace() {
  // Dữ liệu cho biểu đồ tròn
  const pieData = {
    labels: ["Unassigned", "Hoang Kiet", "Hà Trọng Tấn", "Tin Huỳnh", "Kiệt Tuấn", "Tú Nguyễn Văn"],
    datasets: [
      {
        data: [9.8, 7.84, 17.64, 19.6, 15.68, 29.41],
        backgroundColor: ["gray", "black", "red", "blue", "lightblue", "darkblue"],
      },
    ],
  };

  // Dữ liệu cho biểu đồ cột
  const barData = {
    labels: ["Hoang Kiet", "Hà Trọng Tấn", "Tú Nguyễn Văn", "Kiệt Tuấn", "Unassigned"],
    datasets: [
      {
        label: "Tasks",
        data: [1, 2, 8, 4, 1],
        backgroundColor: ["black", "red", "blue", "lightblue", "gray"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-3 gap-6">
        {/* Thống kê tổng */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Unassigned</h3>
          <p className="text-2xl font-bold">1</p>
          <span className="text-gray-500">Unassigned Tasks</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">In Progress</h3>
          <p className="text-2xl font-bold">3</p>
          <span className="text-gray-500">tasks in progress</span>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-2xl font-bold">36</p>
          <span className="text-gray-500">tasks completed</span>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Total Tasks by Assignee</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Open Tasks by Assignee</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
