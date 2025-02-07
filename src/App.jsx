// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardLayout from './layouts/BoardLayout';
import Dashboard from './pages/Dashboard';  // Example page component
import Settings from './pages/Settings';    // Another page component

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout */}
        <Route path="/" element={<BoardLayout />}>
          <Route index element={<Dashboard />} />  {/* Default route */}
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
