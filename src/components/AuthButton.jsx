import { useLocation, useNavigate } from "react-router-dom";

export default function AuthButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex gap-4 items-center">
      <p className="font-bold">
        {isLoginPage ? "Don't have an account?" : "Already playing with ClickUp?"}
      </p>
      <button
        onClick={() => navigate(isLoginPage ? "/signup" : "/login")}
        className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        {isLoginPage ? "Sign up" : "Log in"}
      </button>
    </div>
  );
}
