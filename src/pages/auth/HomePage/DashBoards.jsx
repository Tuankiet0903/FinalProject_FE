import React from "react";
import Header from "../../../components/header/DashboardHeader"; // Import Header mới
import DashboardCreated from "../../../components/DashboardCreated";
import DashboardRecent from "../../../components/DashboardRecent.jsx";
import DashboardFavorites from "../../../components/DashboardFavorites";
import DashboardList from "../../../components/DashboardList";
import DashboardMembers from "../../../components/DashBoardMember.jsx";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Thêm Header ở trên cùng */}
      <Header />

      {/* Nội dung chính */}
      <div className="max-w-screen-xl mx-auto py-6 space-y-6">
        <DashboardMembers />
        <div className="grid grid-cols-3 gap-4">
          <DashboardRecent />
          <DashboardFavorites />
          <DashboardCreated />
        </div>
        <DashboardList />
        </div>
    </div>
  );
}
