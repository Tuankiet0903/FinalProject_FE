import { Outlet } from "react-router-dom"; // Để render các route con
import Header from "../components/header/Header";
import SettingSidebar from "../components/settingSideBar/SettingsSidebar"; // Import Sidebar cho Setting

const SettingLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header cố định trên cùng */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Header />
      </div>

      {/* Layout chính dưới Header */}
      <div className="flex flex-grow mt-[72px]">
       
        <div className="w-1/12 bg-white shadow-md  fixed left-0">
          <SettingSidebar />
        </div>
        <div className="w-fit flex-grow ml-[13%] bg-gray-100 p-5 text-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
