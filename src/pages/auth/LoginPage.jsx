import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken"); // 🔥 Lấy inviteToken từ URL nếu có

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** ✅ Hàm lưu user vào LocalStorage */
  const saveUserData = (user, token) => {
    if (!user || !token) {
      console.error("⚠ Lỗi: Không có dữ liệu user hoặc token!");
      return;
    }
    
    console.log("🔹 Lưu dữ liệu user vào localStorage:", user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  /** ✅ Xử lý đăng nhập thành công */
  const handleLoginSuccess = async (user, token) => {
    saveUserData(user, token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    // 🔥 Nếu có inviteToken thì gửi lên server để cập nhật thông tin user
    const storedInviteToken = localStorage.getItem("inviteToken");
    if (storedInviteToken) {
      try {
        console.log("🔥 Sending inviteToken to activate user...");
        await axios.post("http://localhost:5000/auth/activate-from-google", { inviteToken: storedInviteToken }, { withCredentials: true });
        localStorage.removeItem("inviteToken"); // ✅ Xóa inviteToken sau khi kích hoạt
      } catch (error) {
        console.error("❌ Error activating user with inviteToken:", error);
      }
    }

    navigate("/user"); // ✅ Điều hướng sau khi đăng nhập thành công
  };

  useEffect(() => {
    // 🔥 Nếu có inviteToken trên URL, lưu vào localStorage
    if (inviteToken) {
      console.log("📩 Invite Token Detected:", inviteToken);
      localStorage.setItem("inviteToken", inviteToken);
    }

    /** ✅ Kiểm tra user hiện tại từ localStorage */
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      console.log("✅ User đã có trong localStorage, không cần fetch lại.");
      return;
    }

    /** 🔥 Gọi API lấy thông tin user nếu chưa có trong localStorage */
    const checkGoogleLogin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/google/success", {
          withCredentials: true, // ✅ Gửi kèm cookie để backend nhận diện
        });

        console.log("✅ Google Login Response:", response.data);

        if (response.data?.token) {
          handleLoginSuccess(response.data.user, response.data.token);
        } else {
          console.error("❌ Không nhận được token từ backend.");
          navigate("/login");
        }
      } catch (error) {
        console.error("❌ Lỗi khi lấy token từ Google login:", error);
        navigate("/login");
      }
    };

    checkGoogleLogin();
  }, [inviteToken, navigate]);

  /** ✅ Xử lý đăng nhập bằng email */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        handleLoginSuccess(user, token);
      } else {
        alert(response.data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome back!</h2>
      <button 
        onClick={() => window.location.href = "http://localhost:5000/auth/google"} 
        className="w-full flex items-center justify-center gap-2 border rounded-lg py-2.5 hover:bg-gray-50 transition-colors mb-6"
      >
        <img src="/placeholder.svg" alt="Google" className="w-6 h-6" />
        <span className="text-gray-700">Continue with Google</span>
      </button>
      <form className="space-y-4 text-black" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your work email" 
            className="w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
            required 
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">Forgot Password?</Link>
          </div>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password" 
            className="w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" 
            required 
          />
        </div>
        <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600">Don't have an account? <Link to="/signup" className="text-purple-600 hover:text-purple-700">Sign up</Link></p>
    </div>
  );
}
