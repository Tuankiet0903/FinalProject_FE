import React from 'react';
import Header from "../components/Header";


const Layout = ({ children, title, description, className }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className || ""}`}>
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="">
        {/* Title và Description (nếu có) */}
        {title && <h1 className="text-2xl font-semibold mb-4">{title}</h1>}
        {description && <p className="text-gray-500 mb-6">{description}</p>}
        {/* Children */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
