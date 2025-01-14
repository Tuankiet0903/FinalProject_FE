import React from "react";
import CardComponent from "../components/Card"; // Đảm bảo đường dẫn đúng
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import Sidebar from "../components/Sidebar/Sidebar";

const Homepage = () => {
  const apps = [
    { name: "Jira Service Management", icon: "⚙️", tag: "fpt-smart-prep" },
    { name: "Account settings", icon: "⚙️", tag: "" },
    { name: "Atlassian Support", icon: "❓", tag: "" },
    { name: "Atlassian Community", icon: "👥", tag: "" },
    { name: "Self-managed licensing", icon: "📑", tag: "" },
    { name: "Atlassian Documentation", icon: "📄", tag: "" },
  ];

  const recentViews = [
    { title: "FE", project: "SP25-1", context: "ĐỒ ÁN SP2025", time: "27 phút trước" },
  ];

  return (
      <div className="flex flex-col md:flex-row bg-white text-black min-h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Greeting */}
        <h1 className="text-2xl font-semibold mb-6">
          Chúc Huỳnh Van Tin (K17 DN) ngày mới tốt lành!
        </h1>

        {/* Applications Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Ứng dụng</h2>
          <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {apps.map((app, index) => (
              <CardComponent
                key={index}
                icon={app.icon}
                title={app.name}
                description={app.tag} // Nếu không cần description, bạn có thể bỏ prop này
              />
            ))}
          </div>
        </section>

        {/* Recent Views Section */}
        <section>
          <h2 className="text-lg font-bold mb-4">Mới xem</h2>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between mb-4">
              <div className="flex space-x-6">
                <span className="text-xl font-semibold text-gray-800">Công Việc Gần Đây</span>
              </div>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Lọc Theo Tiêu Đề "
                  className="w-64 h-8 pl-8 pr-4 py-1 bg-white border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <ul>
              {recentViews.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-4">
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-xs text-gray-600">
                        {item.project} • {item.context}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{item.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
