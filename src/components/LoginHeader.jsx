import { Link } from "react-router-dom";

export default function LoginHeader() {
  const currentURL = window.location.href;

  return (
    <header className="p-8 flex justify-between items-center">
      <Link to={"/"} className="flex items-center gap-2">
        <img
          src="/placeholder.svg?height=32&width=32"
          alt="ClickUp Logo"
          className="h-8"
        />
        <div>
          <h1 className="text-xl font-bold text-white">ClickUp</h1>
          <p className="text-xs text-white/80">The everything app for work.</p>
        </div>
      </Link>
      <div className="flex gap-4">
        {currentURL.endsWith("/login") ? (
          <>
            <p className="font-bold flex items-center">
              {" "}
              Don't have an account?
            </p>
            <Link
              to={"/signup"}
              className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <p className="font-bold flex items-center">
            Already playing with ClickUp?
            </p>
            <Link
              to={"/login"}
              className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
