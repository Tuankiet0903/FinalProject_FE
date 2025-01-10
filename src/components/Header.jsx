import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faQuestionCircle, faCog, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Trạng thái để kiểm soát hiển thị input tìm kiếm

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Thay đổi trạng thái hiển thị ô tìm kiếm
  };

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-3">
      {/* Logo và Menu */}
      <div className="flex items-center space-x-6">
        <div className="text-blue-600 font-bold text-lg">TINHUYNH</div>

        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-600 border-b-2 border-blue-600 pb-1">
            Trang chủ
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Dự án
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Mục tiêu
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Nhóm
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Phản hồi
          </a>
        </nav>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
  <button
    onClick={toggleMenu}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
  >
    <FontAwesomeIcon icon={faBars} className="text-gray-600" />
  </button>
</div>
      </div>

      {/* Search và Icons */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <button
            onClick={toggleSearch}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
          </button>
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="absolute top-0 right-14 h-10 w-64 pl-4 pr-4 bg-white border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          )}
        </div>

        {/* Notification Icon */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
          <FontAwesomeIcon icon={faBell} className="text-gray-600" />
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
          <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-600" />
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
          <FontAwesomeIcon icon={faCog} className="text-gray-600" />
        </button>

        {/* Profile Icon */}
        <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
          HD
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-10">
          <a href="#" className="block text-gray-700 hover:text-blue-600 py-2 px-4 border-b">
            Trang chủ
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 py-2 px-4 border-b">
            Dự án
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 py-2 px-4 border-b">
            Mục tiêu
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 py-2 px-4 border-b">
            Nhóm
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600 py-2 px-4">
            Phản hồi
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
