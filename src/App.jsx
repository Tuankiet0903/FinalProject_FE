import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardLayout from "./layouts/BoardLayout"; // Layout chứa Sidebar & Header
import Home from "./pages/Home"; // Trang chính khi vào Home
import Inbox from "./pages/Inbox"; // Trang Settings khi bấm vào Inbox

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout - Layout chứa Sidebar & Header */}
        <Route path="/" element={<BoardLayout />}>
          {/* Trang mặc định khi truy cập "/" */}
          <Route index element={<Home />} />

          {/* Trang Settings khi truy cập "/settings" */}
          <Route path="settings" element={<Inbox />} />
        </Route>
      </Routes>
    </Router>
  );
}
