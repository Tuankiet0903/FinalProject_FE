import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/Config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const PUBLIC_GOOGLE_CLIENT_ID = config.PUBLIC_GOOGLE_CLIENT_ID;

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    toast.success("Login attempted!");
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google login success:", response);
    toast.success("Google login successful!");
  };

  const handleGoogleError = () => {
    toast.error("Google login failed!");
  };

  return (
    <>
      <main className="flex-1 flex justify-center items-center px-4 mt-20">
        <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome back!</h2>

          {/* Google Login */}
          <GoogleOAuthProvider clientId={PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="100%"
              text="continue_with"
            />
          </GoogleOAuthProvider>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Work Email
              </label>
              <Input
                prefix={
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400 pr-2"
                  />
                }
                placeholder="Enter your work email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm text-gray-600">Password</label>
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Forgot Password?
                </a>
              </div>
              <Input.Password
                prefix={
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-gray-400 pr-2"
                  />
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Log In
            </button>

            <p className="text-center text-sm text-purple-600 hover:text-purple-700">
              <a href="#">or login with SSO</a>
            </p>
          </form>
        </div>
      </main>

      {/* Help Button */}
      <button
        className="fixed bottom-4 right-4 bg-white px-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        onClick={() => toast.info("Help system coming soon!")}
      >
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-purple-600 text-xl"
        />
      </button>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
