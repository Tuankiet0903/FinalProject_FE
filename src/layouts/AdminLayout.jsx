import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <AdminHeader />

      {/* Main Layout - Add padding to prevent overlapping */}
      <div className="flex-grow bg-gray-100 p-5 text-black "> 
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
