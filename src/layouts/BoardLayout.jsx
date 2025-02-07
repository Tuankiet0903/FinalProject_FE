// components/layouts/BoardLayout.jsx
import { Outlet } from 'react-router-dom';  // To render child routes
import Header from "../components/header/Header";
import Sidebar from "../components/slideBar/SideBar";

const BoardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full ml-72"> {/* Sidebar width adjusted here */}
        <Header />
        <main className="flex-grow bg-gray-100 p-6">
          {/* Main content */}
          <Outlet />  {/* This will render the component based on the route */}
        </main>
      </div>
    </div>
  );
};

export default BoardLayout;
