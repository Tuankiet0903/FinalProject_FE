import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardLayout from "./layouts/BoardLayout"; // Layout chính
import SettingLayout from "./layouts/SettingLayout"; // Layout cho Settings
import Dashboard from "./pages/HomePage/DashBoards";
import Home from "./pages/HomePage/Home";
import Inbox from "./pages/HomePage/Inbox";
import UserProfile from "./pages/Settings/UserProfile";
import Settings from "./pages/Settings/Settings"; // Trang Settings

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
        </Route>
      </Routes>
    </Router>
  );
}
