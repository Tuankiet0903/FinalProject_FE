import React from "react";
import Header from "../components/header/HomeHeader"; // Import Header mới
import Recent from "../components/Recent";
import Agenda from "../components/Agenda";
import Work from "../components/Work";
import Assign from "../components/Assign";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Thêm Header ở trên cùng */}
      <Header />

      {/* Nội dung chính */}
      <div className="grid grid-cols-2 gap-4 p-6">
        <Recent />
        <Agenda />
        <Work />
        <Assign />
      </div>
    </div>
  );
}
