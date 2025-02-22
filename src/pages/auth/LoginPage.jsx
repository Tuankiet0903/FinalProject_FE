import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/user");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome back!</h2>
      <button onClick={() => window.location.href = "http://localhost:5000/auth/google"} className="w-full flex items-center justify-center gap-2 border rounded-lg py-2.5 hover:bg-gray-50 transition-colors mb-6">
        <img src="/placeholder.svg" alt="Google" className="w-6 h-6" />
        <span className="text-gray-700">Continue with Google</span>
      </button>
      <form className="space-y-4 text-black" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your work email" className="w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">Forgot Password?</Link>
          </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required />
        </div>
        <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">Login</button>
      </form>
      <p className="mt-6 text-center text-gray-600">Don't have an account? <Link to="/signup" className="text-purple-600 hover:text-purple-700">Sign up</Link></p>
    </div>
  );
}
