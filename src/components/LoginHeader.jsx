import { Link } from "react-router-dom";
import AuthButton from "./AuthButton"; 

export default function LoginHeader() {
  return (
    <header className="p-8 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src="/placeholder.svg?height=32&width=32" alt="ClickUp Logo" className="h-8" />
        <div>
          <h1 className="text-xl font-bold text-white">ClickUp</h1>
          <p className="text-xs text-white/80">The everything app for work.</p>
        </div>
      </Link>

      {/* Chỉ có 1 nút chuyển đổi giữa Login / Signup */}
      <AuthButton />
    </header>
  );
}
