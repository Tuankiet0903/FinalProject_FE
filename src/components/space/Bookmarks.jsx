export default function Bookmarks() {
    return (
      <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
        <h2 className="font-semibold mb-2">Bookmarks</h2>
        <p className="text-gray-500 text-sm text-center">
          Bookmarks are the easiest way to save ClickUp items or URLs from anywhere on the web.
        </p>
        <button className="bg-purple-500 text-white px-3 py-1 rounded mt-2">Add Bookmark</button>
      </div>
    );
  }
  