import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/auth/LandingPage"; 
import BoardLayout from "./layouts/BoardLayout"; 
import KanbanBoardPage from "./pages/auth/KanbanList/KanbanBoardPage"; 
import SettingLayout from "./layouts/SettingLayout"; 
import LoginLayout from "./layouts/LoginLayout"; 
import Dashboard from "./pages/auth/HomePage/DashBoards";
import Home from "./pages/auth/HomePage/Home";
import Inbox from "./pages/auth/HomePage/Inbox";
import UserProfile from "./pages/auth/Settings/UserProfile";
import Settings from "./pages/auth/Settings/Settings";
import ManagePeople from "./pages/auth/Settings/ManagePeople";
import Upgrade from "./pages/auth/Settings/Upgrade";
import WorkspaceSettings from "./pages/auth/Settings/WorkspaceSettings";
import LoginPage from "./pages/auth/LoginPage"; 
import SignupPage from "./pages/auth/SignupPage"; 
import AdminDashboard from "./pages/auth/Admin/AdminDashBoard";
import AdminLayout from "./layouts/AdminLayout";
import WorkspaceListTable from "./pages/auth/Admin/AdminWorkspaceList";
import UserListTable from "./pages/auth/Admin/AdminUserList";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage />} />

        {/* Layout chính cho Board */}
        <Route path="/user" element={<BoardLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* 🔥 Cập nhật đường dẫn Kanban đầy đủ với `spaceId` */}
          <Route path="kanban/:workspaceId/:spaceId/:folderId/:listId" element={<KanbanBoardPage />} />
        </Route>

        {/* Layout riêng cho Settings */}
        <Route path="/setting" element={<SettingLayout />}>
          <Route index element={<Settings />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="manage-people" element={<ManagePeople />} />
          <Route path="upgrade" element={<Upgrade />} />
          <Route path="workspace-settings" element={<WorkspaceSettings />} />
        </Route>

        {/* Login và Signup có Layout riêng */}
        <Route path="/login" element={<LoginLayout><LoginPage /></LoginLayout>} />
        <Route path="/signup" element={<LoginLayout><SignupPage /></LoginLayout>} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminDashboard/>} />
          <Route path="users" element={<UserListTable/>}/>  
          <Route path="profile" element={<AdminDashboard/>} />
          <Route path="workspaces" element={<WorkspaceListTable/>} />
        </Route>
      </Routes>
      
    </Router>
  );
}
