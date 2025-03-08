import { useEffect, useState } from "react";
import { Folder } from "lucide-react"; // Import icon thư mục

export default function Lists({ folders, lists, refreshLists }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [lists]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">📋 Lists</h2>
        <button
          onClick={refreshLists}
          className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-600 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading Lists...</p>
      ) : (
        <div className="space-y-6">
          {folders.map((folder) => (
            <div key={folder.folderId} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              {/* Header của mỗi Folder với icon 📂 ở trước */}
              <div className="flex items-center gap-2">
                <Folder size={18} className="text-gray-500" /> {/* Icon thư mục */}
                <h3 className="text-md font-medium text-gray-700">{folder.name}</h3>
              </div>

              {/* Danh sách các List */}
              <div className="mt-2 space-y-3">
                {lists[folder.folderId] && lists[folder.folderId].length > 0 ? (
                  lists[folder.folderId].map((list) => (
                    <div
                      key={list.listId}
                      className="flex justify-between items-center p-3 rounded-lg border bg-white shadow-sm hover:shadow-md transition"
                    >
                      <div>
                        <h4 className="text-gray-700 font-semibold">{list.name}</h4>
                        <p className="text-gray-500 text-sm">{list.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">No lists in this folder</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
