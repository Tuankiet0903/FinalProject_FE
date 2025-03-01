import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPVerification from "../../components/OTP/OTPConfirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTPpopup, setOTPpopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setOTPpopup(true);
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred");
    }finally {
      setIsLoading(false); 
    }
  };

  return (
    <main className="flex justify-center items-center px-4 mt-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Seconds to sign up!
        </h1>

        <button
          onClick={() =>
            (window.location.href = "http://localhost:5000/auth/google")
          }
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 mb-6"
        >
          <img src="/placeholder.svg" alt="Google" className="w-5 h-5" />
          <span>Tiếp tục sử dụng dịch vụ bằng Google</span>
        </button>

        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@site.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="mr-2 h-4 w-4 animate-spin"
              />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>

      <OTPVerification
        isOpen={OTPpopup}
        onClose={() => setOTPpopup(false)}
        email={email}
      />
    </main>
  );
}
