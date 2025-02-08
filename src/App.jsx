import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardLayout from "./layouts/BoardLayout"; // Layout chứa Sidebar & Header
import DashBoard from "./pages/DashBoards";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardLayout />}>
          <Route path="home" element={<Home/>} />
          <Route path="inbox" element={<Inbox/>} />
          <Route path="dashBoard" element={<DashBoard />} />
        </Route>
      </Routes>
    </Router>
  );
}
