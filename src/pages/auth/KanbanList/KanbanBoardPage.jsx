import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListHeader from "../../../components/ListHeader";
import KanbanBoard from "../../../components/KanbanBoard";
import CalendarView from "../../../components/board/CalendarView";
import { fetchWorkspaceByID } from "../../../api/workspace";

export default function KanbanBoardPage() {
  // Lấy các params từ URL thông qua react-router-dom
  const { workspaceId, spaceId, folderId, listId } = useParams();
  
  // State quản lý tab đang active
  const [activeTab, setActiveTab] = useState("Overview");
  
  // State để lưu trữ dữ liệu
  const [workspace, setWorkspace] = useState(null);
  const [space, setSpace] = useState(null);
  const [folder, setFolder] = useState(null);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect để fetch dữ liệu khi component mount hoặc params thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch workspace data và tất cả data liên quan
        const workspaceData = await fetchWorkspaceByID(workspaceId);
        
        // Tìm space trong workspace
        const foundSpace = workspaceData.spaces.find(
          s => s.spaceId === parseInt(spaceId)
        );

        // Tìm folder trong space
        const foundFolder = foundSpace?.folders.find(
          f => f.folderId === parseInt(folderId)
        );

        // Tìm list trong folder
        const foundList = foundFolder?.lists.find(
          l => l.listId === parseInt(listId)
        );

        // Cập nhật state với dữ liệu tìm được
        setWorkspace(workspaceData);
        setSpace(foundSpace);
        setFolder(foundFolder);
        setList(foundList);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workspaceId, spaceId, folderId, listId]); // Dependencies cho useEffect

  // Hàm render nội dung theo tab active
  const renderTabContent = () => {
    // Nếu đang loading, hiển thị loading state
    if (loading) {
      return <div className="p-4">Đang tải dữ liệu...</div>;
    }

    // Nếu có lỗi, hiển thị error message
    if (error) {
      return <div className="p-4 text-red-500">{error}</div>;
    }

    // Render nội dung dựa trên tab đang active
    switch (activeTab) {
      case "Board":
        return <KanbanBoard listData={list} />;
      case "List":
        return <div className="p-4">Nội dung List View</div>;
      case "Dashboard":
        return <div className="p-4">Nội dung Dashboard View</div>;
      case "Calendar":
        return <CalendarView listData={list} />;
      case "Overview":
      default:
        return space && folder && list ? (
          <div>
            <h1 className="text-2xl font-semibold text-black mb-4">
              📌 Chi Tiết Danh Sách
            </h1>
            <h2 className="text-lg font-bold">
              🌌 Không gian: {space.name}
            </h2>
            <p className="text-gray-600">{space.description}</p>
            <h3 className="text-md font-semibold mt-3">
              📂 Thư mục: {folder.name}
            </h3>
            <p className="text-gray-600">{folder.description}</p>
            <p className="text-lg text-gray-700 mt-3">
              📌 Danh sách: {list.name}
            </p>
            <p className="text-gray-500">{list.description}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <p>🆔 List ID: {list.listId}</p>
              <p>🗂 Folder ID: {folder.folderId}</p>
              <p>📦 Space ID: {space.spaceId}</p>
              <p>🏢 Workspace ID: {workspace.id}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500">
            Không tìm thấy danh sách hoặc dữ liệu không hợp lệ.
          </p>
        );
    }
  };

  // Render component chính
  return (
    <div className="flex flex-col h-screen">
      <ListHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        listName={list?.name}
      />
      
      <div className="p-6 bg-white shadow-md rounded-lg">
        {renderTabContent()}
      </div>
    </div>
  );
}