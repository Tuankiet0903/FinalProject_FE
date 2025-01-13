import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/Config";

export default function SignUpPage() {
  const PUBLIC_GOOGLE_CLIENT_ID = config.PUBLIC_GOOGLE_CLIENT_ID;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success("Sign up attempted!");
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google signup success:", response);
    toast.success("Google signup successful!");
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed!");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-fullpx-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Create your account!
        </h2>

        {/* Google Sign Up */}
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

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <Input
              prefix={
                <FontAwesomeIcon icon={faUser} className="text-gray-400 pr-2" />
              }
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="w-full h-10"
            />
          </div>

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
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="w-full h-10"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <Input.Password
              prefix={
                <FontAwesomeIcon icon={faLock} className="text-gray-400 pr-2" />
              }
              placeholder="Create password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              className="w-full h-10"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Confirm Password
            </label>
            <Input.Password
              prefix={
                <FontAwesomeIcon icon={faLock} className="text-gray-400 pr-2" />
              }
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              required
              className="w-full h-10"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:text-purple-700">
              Log in
            </a>
          </p>
        </form>
      </div>

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
    </div>
  );
}
