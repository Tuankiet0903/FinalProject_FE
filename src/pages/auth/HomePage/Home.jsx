import React from "react";
import Recent from "../../../components/home/Recent";
import Agenda from "../../../components/home/Agenda";
import Work from "../../../components/home/Work";
import Assign from "../../../components/home/AssignedToMe";
export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-gray-100 min-h-screen">
    <Recent />
    <Agenda />
    <Work />
    <Assign />
  </div>
  );
}