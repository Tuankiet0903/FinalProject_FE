import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { fetchWorkspaceByID } from "../../../api/workspace";
import ListHeader from "../../../components/ListHeader";
import KanbanBoard from "../../../components/Kanban/KanbanBoard";
import { MoreHorizontal } from "lucide-react"; // Import MoreHorizontal
import StatusModal from "../../../components/Kanban/StatusModal"; // Modal Component for Sprint Status

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

  return (
    <div className="flex flex-col h-screen">
      {/* Header với Tabs */}
      <ListHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-6 bg-white shadow-md rounded-lg">
        {activeTab === "Board" ? (
          // Khi chọn tab "Board", hiển thị KanbanBoard
          <KanbanBoard />
        ) : activeTab === "Overview" && space && folder && list ? (
          // Khi chọn tab "Overview", hiển thị chi tiết danh sách
          <Details space={space} folder={folder} list={list} />
        ) : (
          <p className="text-red-500">Không tìm thấy danh sách.</p>
        )}
      </div>

      {/* Dấu 3 chấm ở dưới cùng */}
      <div className="absolute bottom-4 right-4">
        <MoreHorizontal
          className="h-8 w-8 text-gray-600 cursor-pointer"
          onClick={handleOpenModal}
        />
      </div>

      {/* Modal for Sprint Status */}
      {isModalOpen && <StatusModal onClose={handleCloseModal} />}
    </div>
  );
}

function Details({ space, folder, list }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-black mb-4">📌 Chi Tiết Danh Sách</h1>
      <h2 className="text-lg font-bold">🌌 Không gian: {space.name}</h2>
      <p className="text-gray-600">{space.description}</p>
      <h3 className="text-md font-semibold mt-3">📂 Thư mục: {folder.name}</h3>
      <p className="text-gray-600">{folder.description}</p>
      <p className="text-lg text-gray-700 mt-3">📌 Danh sách: {list.name}</p>
      <p className="text-gray-500">{list.description}</p>
      <p className="text-gray-500 text-sm mt-2">🆔 List ID: {list.listId}</p>
      <p className="text-gray-500 text-sm">🗂 Folder ID: {folder.folderId}</p>
      <p className="text-gray-500 text-sm">📦 Space ID: {space.spaceId}</p>
    </div>
  );
}
