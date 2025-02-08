export default function SidebarHeader() {
  return (
    <div className="p-2 flex items-center gap-2 border-b bg-white sticky top-0 z-10">
      <div className="bg-red-500 px-3 py-2 text-white rounded">
        <span className="font-semibold">P</span>
      </div>
      <span className="font-medium">PTM-2025</span>
    </div>
  );
}
