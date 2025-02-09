import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardLayout from "./layouts/BoardLayout"; // Layout chính
import SettingLayout from "./layouts/SettingLayout"; // Layout cho Settings
import MainLayout from "./layouts/LoginLayout"; // Layout cho Login
import Dashboard from "./pages/auth/HomePage/DashBoards";
import Home from "./pages/auth/HomePage/Home";
import Inbox from "./pages/auth/HomePage/Inbox";
import UserProfile from "./pages/auth/Settings/UserProfile";
import Settings from "./pages/auth/Settings/Settings"; // Trang Settings
import ManagePeople from "./pages/auth/Settings/ManagePeople";
import Upgrade from "./pages/auth/Settings/Upgrade"; // Trang Upgrade
import WorkspaceSettings from "./pages/auth/Settings/WorkspaceSettings"; // Cài đặt workspace
import LoginPage from "./pages/auth/LoginPage"; // Trang Login

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout chính */}
        <Route path="/" element={<BoardLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Layout riêng cho Settings */}
        <Route path="/setting" element={<SettingLayout />}>
          <Route index element={<Settings />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="manage-people" element={<ManagePeople />} />
          <Route path="upgrade" element={<Upgrade />} /> 
          <Route path="workspace-settings" element={<WorkspaceSettings />} /> 
        </Route>

        {/* Layout riêng cho Login */}
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
      </Routes>
    </Router>
  );
}
