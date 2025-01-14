import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/HomeLayout';
import Homepage from './pages/HomePage';
import Home from './pages/Home';
import HomeManager from './pages/HomeManager';
import Recent from './components/Recent';
import Dashboard from './pages/Dashboard';

// import Login from './pages/Login';
// import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Trang chủ */}
        <Route
          path="/"
          element={
           
            <Dashboard />
            
          }
        />

        {/* Các Route khác */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
