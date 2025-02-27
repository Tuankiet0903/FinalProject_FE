import mockFolders from "../../lib/mockFolders"; // Import mock data

export default function Folders() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Folders</h2>

      {/* Lặp qua danh sách mockFolders để hiển thị */}
      <div className="space-y-2">
        {mockFolders.map((folder) => (
          <div
            key={folder.folderId}
            className="flex items-center bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200"
          >
            <span className="text-gray-700">{folder.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
