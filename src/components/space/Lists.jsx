import mockLists from "../../lib/mockLists"; // Import mock data

export default function Lists() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Lists</h2>

      {/* Lặp qua danh sách mockLists để hiển thị */}
      <div className="space-y-3">
        {mockLists.map((list) => (
          <div key={list.listId} className="border p-3 rounded flex justify-between items-center">
            <div>
              <div className="text-gray-700 font-medium">{list.name}</div>
              <p className="text-gray-500 text-sm">{list.description}</p>
            </div>
            {/* Hiển thị màu tag */}
            <span className={`h-4 w-4 rounded-full bg-${list.colorTag}-500`} />
          </div>
        ))}
      </div>

      {/* Nút tạo danh sách mới */}
      <button className="text-blue-500 text-sm mt-4">+ New List</button>
    </div>
  );
}
