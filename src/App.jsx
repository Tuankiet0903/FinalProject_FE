import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardLayout from "./layouts/BoardLayout"; // Layout chính
import SettingLayout from "./layouts/SettingLayout"; // Layout cho Settings
import Dashboard from "./pages/HomePage/DashBoards";
import Home from "./pages/HomePage/Home";
import Inbox from "./pages/HomePage/Inbox";
import UserProfile from "./pages/Settings/UserProfile";
import Settings from "./pages/Settings/Settings"; // Trang Settings
import ManagePeople from "./pages/Settings/ManagePeople";
import Upgrade from "./pages/Settings/Upgrade"; // Thêm trang Upgrade
import WorkspaceSettings from "./pages/Settings/WorkspaceSettings"; // Thêm trang Upgrade
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
      </Routes>
    </Router>
  );
}
