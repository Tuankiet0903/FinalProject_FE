import { Outlet } from "react-router-dom"; // Để render các route con
import Header from "../components/header/Header";
import Sidebar from "../components/slideBar/SideBar";

const BoardLayout = () => {
  return (
    <div className="bg-white flex flex-col h-screen">
          <Header />
      <div className="flex flex-grow "> 
        <div className="flex p-3 mt-1 fixed left-0  bg-white shadow-md">
          <Sidebar />
        </div>
        <div className="flex-grow bg-gray-100 p-5 ml-72 mt-0.5 text-black"> 
          <Outlet /> {/* Render component dựa trên route */}
        </div>
      </div>
    </div>
  );
};

export default BoardLayout;
