export default function Folders({ folders }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Folders</h2>

      {/* Kiểm tra nếu không có folder */}
      {folders.length === 0 ? (
        <p className="text-gray-500">No folders available</p>
      ) : (
        <div className="space-y-2">
          {folders.map((folder) => (
            <div
              key={folder.folderId}
              className="flex items-center bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200"
            >
              <span className="text-gray-700">{folder.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
