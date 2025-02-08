// Dashboard.jsx
import React from "react";
import Recent from "../components/Recent";
import Agenda from "../components/Agenda";
import Work from "../components/Work";
import Assign from "../components/Assign";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-gray-100 min-h-screen overflow-y-auto">
      <Recent />
      <Agenda />
      <Work />
      <Assign />
    </div>
  );
};

export default Dashboard;
