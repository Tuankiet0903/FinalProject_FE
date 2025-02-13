import { useParams } from "react-router-dom";
import mockSpaces from "../../../lib/mockSpaces";
import mockFolders from "../../../lib/mockFolders";
import mockLists from "../../../lib/mockLists";

export default function KanbanBoardPage() {
  const { spaceId, folderId, listId } = useParams();

  // Tìm Space
  const space = mockSpaces.find((s) => s.spaceId === parseInt(spaceId));

  // Tìm Folder trong Space
  const folder = mockFolders.find((f) => f.folderId === parseInt(folderId) && f.spaceId === parseInt(spaceId));

  // Tìm List trong Folder
  const list = mockLists.find((l) => l.listId === parseInt(listId) && l.folderId === parseInt(folderId));

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-black mb-4">📌 Chi Tiết Danh Sách</h1>
      {space && folder && list ? (
        <div>
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
      ) : (
        <p className="text-red-500">Không tìm thấy danh sách.</p>
      )}
    </div>
  );
}
