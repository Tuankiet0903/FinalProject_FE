import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-opacity-50 backdrop-blur-md"
        style={{
          backgroundImage:
            "url('https://clickup.com/assets/experiments/workspace-builder-idle-blurred.png')",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-4 shadow-md bg-white bg-opacity-90">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg px-3 py-1 rounded-md">
              QuickTask
            </div>
            <span className="text-gray-600">The everything app, for work.</span>
          </div>
          {/* Buttons */}
          <div className="flex gap-4">
              <Link to={'/login'}>
              <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full shadow hover:opacity-90">
              Log In
            </button>
            </Link>
            <Link to={'/signup'}>
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full shadow hover:opacity-90">
              Sign Up
            </button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="text-center mt-20 px-6">
          <h1 className="text-6xl font-extrabold text-gray-800 leading-tight">
            The everything app, for work.
          </h1>
          <p className="text-lg text-gray-800 mt-6">
  One app for projects, knowledge, conversations, and more. <br />
  Get more done faster—together.
</p>

          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 mt-8 rounded-full text-lg font-bold shadow-lg hover:opacity-90">
            Get started. It's FREE!
          </button>
          <p className="text-gray-400 text-sm mt-2">
            Free Forever. No Credit Card.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Homepage;
