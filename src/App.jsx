import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/HomeLayout";
import Homepage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LoginLayout from "./layouts/LoginLayout";
import { SidebarProvider } from './components/Sidebar/SidebarContext';

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
            <SidebarProvider>
              <Layout>
                <Homepage />
              </Layout>
            </SidebarProvider>
          }
        />
        <Route
          path="/login"
          element={
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <LoginLayout>
              <SignUpPage />
            </LoginLayout>
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
