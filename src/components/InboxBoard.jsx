import React, { useState, useEffect } from "react";
import { FiMail, FiCheck, FiUser } from "react-icons/fi"; // Import icons

// Mock Data for Tasks
const tasks = [
  { id: 1, title: "FE - Header Home, inbox, Dashboards", assignedBy: "Tú Nguyễn Văn", date: "Today", status: 3 },
  { id: 2, title: "BE-FE - Invite member WorkSpace", assignedBy: "Tú Nguyễn Văn", date: "Yesterday", status: 3 },
  { id: 3, title: "[FE] - Dash Board trang chủ", assignedBy: "Tú Nguyễn Văn", date: "January", overdue: "Jan 13, 11:15pm", status: 3 },
  { id: 4, title: "[FE] - Assigned comments", assignedBy: "Tú Nguyễn Văn", date: "January", status: 3 },
  { id: 5, title: "[FE] - Assigned to me", assignedBy: "Tú Nguyễn Văn", date: "January", status: 3 },
  { id: 6, title: "[FE] - My Work", assignedBy: "Tú Nguyễn Văn", date: "January", status: 3 },
  { id: 7, title: "[FE] - Agenda", assignedBy: "Tú Nguyễn Văn", date: "January", status: 3 },
  { id: 8, title: "[FE] - Recents", assignedBy: "Tú Nguyễn Văn", date: "January", status: 3 },
  { id: 9, title: "[FE] - Home", assignedBy: "Tú Nguyễn Văn", date: "January", status: 3 },
];

const InboxList = () => {
  const [selectedTab, setSelectedTab] = useState("inbox");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // Lọc các task có trạng thái là 3 (complete)
    const completedTasks = tasks.filter(task => task.status === 3);
    setTaskList(completedTasks);
  }, []);

  // Handle Clear Task (move to cleared)
  const handleClearTask = (id) => {
    const updatedTasks = [...taskList];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      updatedTasks[taskIndex].status = "cleared"; // Move to cleared state
      setTaskList(updatedTasks);
    }
  };

  // Handle Clear all Tasks (move all to cleared)
  const handleClearAll = () => {
    const updatedTasks = taskList.map(task => ({
      ...task,
      status: "cleared" // Set all tasks to cleared
    }));
    setTaskList(updatedTasks);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Tab navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-6 text-sm font-medium">
          {["inbox", "cleared"].map((tab) => (
            <button
              key={tab}
              className={`relative py-2 px-4 bg-white text-black transition-all ${
                selectedTab === tab
                  ? "font-semibold border-b-2 border-black"
                  : "hover:text-black"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Clear All Button */}
        {selectedTab === "inbox" && (
          <button
            className="bg-white text-black border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-100"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Task List */}
      <div>
        {selectedTab === "inbox" && (
          <>
            <h3 className="text-gray-700 font-semibold my-4">Inbox</h3>
            <div className="space-y-2">
              {taskList
                .filter((task) => task.status !== "cleared") // Filter out cleared tasks
                .map((task) => (
                  <div
                    key={task.id}
                    className={`group p-4 border rounded-lg hover:bg-gray-100 flex justify-between items-center relative ${task.status === "read" ? "font-semibold" : ""}`}
                  >
                    <div className="flex items-center space-x-4">
                      <FiCheck className="text-green-500" />
                      <div>
                        <p className={`font-medium ${task.status === "read" ? "text-gray-700" : "text-black"}`}>
                          {task.title}
                        </p>
                        {task.overdue && (
                          <p className="text-red-500 text-xs">Task is overdue. Due date was {task.overdue}</p>
                        )}
                        <p className="text-sm text-gray-500 flex items-center">
                          <FiUser className="mr-1" /> {task.assignedBy} assigned this task to you
                        </p>
                      </div>
                    </div>

                    {/* Hover to show icons */}
                    <div className="absolute right-4 opacity-0 group-hover:opacity-100 flex space-x-4">
                      <button
                        className="bg-white text-black p-2 rounded-md hover:bg-gray-100"
                        onClick={() => handleClearTask(task.id)}
                      >
                        <FiMail className="text-black" />
                      </button>

                      {/* Smaller "Clear" Button */}
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-sm flex items-center"
                        onClick={() => handleClearTask(task.id)}
                      >
                        <FiCheck className="mr-2" />
                        Clear
                      </button>
                    </div>

                    <p className="text-gray-500 text-sm">{task.date === "Yesterday" ? "Feb 11" : "Jan 10"}</p>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* Cleared Task List */}
        {selectedTab === "cleared" && (
          <>
            <h3 className="text-gray-700 font-semibold my-4">Cleared</h3>
            <div className="space-y-2">
              {taskList
                .filter((task) => task.status === "cleared") // Show only cleared tasks
                .map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg bg-gray-100 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <FiCheck className="text-green-500" />
                      <div>
                        <p className="font-medium text-gray-700">{task.title}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <FiUser className="mr-1" /> {task.assignedBy} assigned this task to you
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{task.date === "Yesterday" ? "Feb 11" : "Jan 10"}</p>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InboxList;