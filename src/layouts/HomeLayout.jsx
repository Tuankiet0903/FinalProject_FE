import React from 'react';
import Header from "../components/Header";
import { useSidebar } from '../components/Sidebar/SidebarContext';
import { LAYOUT } from '../utils/constants';

const HEADER_HEIGHT = LAYOUT.HEADER_HEIGHT;

const Layout = ({ children, title, description, className }) => {
  const { sidebarWidth } = useSidebar();
  return (
    <div className={`min-h-screen bg-gray-50 ${className || ""}`}>
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
        <main className=""
          style={{
            marginLeft: `${sidebarWidth}px`,
            marginTop: `${HEADER_HEIGHT}px`,
          }}>
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
