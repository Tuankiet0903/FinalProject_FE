import { Link } from "react-router-dom"
import { HelpCircle } from "lucide-react"

export default function LoginPage() {
  return (
    <>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome back!</h2>

        <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-2.5 hover:bg-gray-50 transition-colors mb-6">
          <img src="/placeholder.svg" alt="Google" className="w-6 h-6" />
          <span className="text-gray-700">Continue with Google</span>
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
            <input
              type="email"
              placeholder="Enter your work email"
              className="w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors">
            Log In
          </button>
        </form>

        <button className="w-full text-purple-600 hover:text-purple-700 text-sm mt-4">or login with SSO</button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-purple-600 hover:text-purple-700">
            Sign up
          </Link>
        </p>
      </div>

      {/* Help button */}
      <button
        className="fixed bottom-24 right-6 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Help"
      >
        <HelpCircle className="w-6 h-6 text-purple-600" />
      </button>
    </>
  )
}

