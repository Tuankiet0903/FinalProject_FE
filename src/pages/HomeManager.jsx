import React from 'react';

const HomeManager = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">YourLogo</div>
          <nav className="space-x-4">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Welcome to Our Service
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 mt-4">
            We provide the best solutions for your business needs.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          &copy; 2025 Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomeManager;
