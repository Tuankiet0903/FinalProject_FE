// src/pages/KanbanBoardPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkspaceByID } from "../../../api/workspace";
import ListHeader from "../../../components/ListHeader";
import KanbanBoard from "../../../components/Kanban/KanbanBoard";
import { MoreHorizontal } from "lucide-react"; // Import MoreHorizontal
import StatusModal from "../../../components/Kanban/StatusModal"; // Modal Component for Sprint Status
import Details from "../../../components/Kanban/Details"; // Import newly created Details component
import TaskList from "../../../components/Kanban/TaskList"; // Import newly created TaskList component

export default function KanbanBoardPage() {
  const { workspaceId, spaceId, folderId, listId } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    if (!workspaceId || isNaN(Number(workspaceId))) return;

    const fetchWorkspace = async () => {
      try {
        setLoading(true);
        const workspaceData = await fetchWorkspaceByID(Number(workspaceId));
        setWorkspace(workspaceData);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch workspace:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  const selectedData = useMemo(() => {
    if (!workspace) return { space: null, folder: null, list: null };

    const space = workspace.spaces?.find((s) => s.spaceId === Number(spaceId));
    const folder = space?.folders?.find((f) => f.folderId === Number(folderId));
    const list = folder?.lists?.find((l) => l.listId === Number(listId));

    return { space, folder, list };
  }, [workspace, spaceId, folderId, listId]);

  const { space, folder, list } = selectedData;

  if (loading) return <p className="text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error.message || "Không thể tải dữ liệu"}</p>;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = () => {
    alert("Add Task clicked"); // Placeholder for add task functionality
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header with Tabs */}
      <ListHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        {activeTab === "Board" ? (
          <KanbanBoard />
        ) : activeTab === "Overview" && space && folder && list ? (
          <Details space={space} folder={folder} list={list} />
        ) : (
          <p className="text-red-500">Không tìm thấy danh sách.</p>
        )}
      </div>

      <div className="p-6 bg-white shadow-md rounded-lg mt-4">
        {/* Task List */}
        {list && (
          <TaskList tasks={list.tasks || []} title={list.name} statusColor="bg-[#0284c7]" onAddTask={handleAddTask} />
        )}
      </div>

      <div className="absolute bottom-4 right-4">
        <MoreHorizontal className="h-8 w-8 text-gray-600 cursor-pointer" onClick={handleOpenModal} />
      </div>

      {/* Modal for Sprint Status */}
      {isModalOpen && <StatusModal onClose={handleCloseModal} />}
    </div>
  );
}
