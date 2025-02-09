import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderLanding = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <img src="/placeholder.svg" alt="ClickUp" className="h-8 w-8" />
              <div className="ml-2 text-sm text-gray-600 leading-tight">
                The everything
                <br />
                app, for work
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Product <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Solutions <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">Pricing</button>
              <button className="text-gray-600 hover:text-gray-900">Enterprise</button>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-600 hover:text-gray-900">Contact Sales</button>
            <Link to="/login" className="hidden md:block text-gray-600 hover:text-gray-900">Log In</Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLanding;
