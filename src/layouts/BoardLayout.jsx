import { Outlet } from "react-router-dom"; // Để render các route con
import Header from "../components/header/Header";
import Sidebar from "../components/slideBar/SideBar";

const BoardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header cố định trên cùng */}
      <Header />

      {/* Layout chính */}
      <div className="flex flex-grow">
        {/* Sidebar cố định bên trái */}
        <div className="w-72 h-screen fixed left-0 top-[72px] bg-white shadow-md border-r">
          <Sidebar />
        </div>

        {/* Nội dung chính có thể cuộn */}
        <div className="flex-grow bg-gray-100 p-5 ml-72 mt-0.5 text-black overflow-y-auto h-[calc(100vh-72px)]">
          <Outlet /> {/* Render component dựa trên route */}
        </div>
      </div>
    </div>
  );
};

export default BoardLayout;
