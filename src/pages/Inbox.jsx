
import InboxHeader from "../components/header/InboxHeader";
import InboxList from "../components/InboxBoard";



export default function Inbox() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Thêm Header ở trên cùng */}
      <InboxHeader />
      <div className="max-w-screen-xl mx-auto py-6 px-6">
      <InboxList />
      </div>
      </div>
  );
}
