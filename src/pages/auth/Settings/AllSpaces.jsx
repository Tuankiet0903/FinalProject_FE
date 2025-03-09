import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { useParams } from "react-router-dom"; // ✅ Lấy workspaceId từ URL
import Header from "../../../components/header/AllSpaceHeader";
import { getSpacesByWorkspaceId } from "../../../api/space"; // ✅ Import API mới
import CreateSpaceDialog from "../../../components/slideBar/CreateSpaceDialog";

export default function AllSpacesPage() {
  const { workspaceId } = useParams(); // ✅ Lấy workspaceId từ URL
  const [spaces, setSpaces] = useState([]);
  const [isCreateSpaceOpen, setIsCreateSpaceOpen] = useState(false);

  useEffect(() => {
    if (!workspaceId) return; // ✅ Kiểm tra workspaceId hợp lệ

    const loadSpaces = async () => {
      try {
        const spacesData = await getSpacesByWorkspaceId(workspaceId); // ✅ Fetch danh sách Spaces theo Workspace
        setSpaces(spacesData || []);
      } catch (error) {
        console.error("Failed to fetch spaces:", error);
      }
    };

    loadSpaces();
  }, [workspaceId]); // ✅ Fetch lại khi workspaceId thay đổi

  // ✅ Hàm tạo Space trong Workspace hiện tại
  const handleCreateSpace = async (spaceName, description) => {
    if (!workspaceId) return; // ✅ Tránh lỗi khi workspaceId chưa được load

    try {
      const newSpace = await createSpace({
        name: spaceName,
        description: description,
        workspaceId: workspaceId, // ✅ Truyền workspaceId hiện tại vào API
      });

      setSpaces((prevSpaces) => [...prevSpaces, newSpace]); // ✅ Cập nhật danh sách ngay lập tức
      setIsCreateSpaceOpen(false); // ✅ Đóng hộp thoại sau khi tạo thành công
    } catch (error) {
      console.error("Failed to create space:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Nội dung chính */}
      <div className="flex-1">
        <Header />
        <div className="m-10 mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-300 min-h-[calc(100vh-120px)]">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">All Spaces</h1>
            {/* ✅ Nút mở hộp thoại */}
            <button
              className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
              onClick={() => setIsCreateSpaceOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> New Space
            </button>
          </div>

          {/* Tìm kiếm + Sort */}
          <div className="flex items-center justify-between mt-4 border-b pb-2">
            <button className="text-gray-600 hover:text-black text-sm">
              Alphabetical A-Z ▾
            </button>
            <div className="flex items-center border rounded-md px-3 py-1 bg-gray-100 w-80">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent focus:outline-none text-sm w-full"
              />
            </div>
          </div>

          {/* ✅ Hiển thị danh sách Spaces của Workspace hiện tại */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-6">
            {spaces.map((space) => (
              <div key={space.spaceId} className="flex items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                <span className="w-8 h-8 flex items-center justify-center text-white bg-blue-500 rounded-full text-xs font-bold">
                  {space.name.charAt(0).toUpperCase()}
                </span>
                <span className="ml-2 text-sm font-medium">{space.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Hộp thoại Create Space dùng chung */}
      <CreateSpaceDialog 
        open={isCreateSpaceOpen} 
        onOpenChange={setIsCreateSpaceOpen} 
        workspaceId={workspaceId} // ✅ Truyền workspaceId hiện tại
        onSpaceCreated={handleCreateSpace} 
      />
    </div>
  );
}
