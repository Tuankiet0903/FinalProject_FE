import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import mockSpaces from "../../../lib/mockSpaces";
import mockFolders from "../../../lib/mockFolders";
import mockLists from "../../../lib/mockLists";
import { fetchWorkspaceByID } from "../../../api/workspace";

export default function KanbanBoardPage() {
  const { workspaceId, spaceId, folderId, listId } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        setLoading(true);
        const workspaceData = await fetchWorkspaceByID(parseInt(workspaceId));
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

  const space = useMemo(() => workspace?.spaces?.find((s) => s.spaceId === Number(spaceId)), [workspace, spaceId]);
  const folder = useMemo(() => space?.folders?.find((f) => f.folderId === Number(folderId)), [space, folderId]);
  const list = useMemo(() => folder?.lists?.find((l) => l.listId === Number(listId)), [folder, listId]);

  if (loading) return <p className="text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-black mb-4">📌 Chi Tiết Danh Sách</h1>
      {space && folder && list ? (
        <Details space={space} folder={folder} list={list} />
      ) : (
        <p className="text-red-500">Không tìm thấy danh sách.</p>
      )}
    </div>
  );
}

function Details({ space, folder, list }) {
  return (
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
  );
}
