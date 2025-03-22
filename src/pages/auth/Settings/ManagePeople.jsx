import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMembersByWorkspace, inviteUserToWorkspace, getUserRoleInWorkspace, deleteUserFromWorkspace, resendInviteToWorkspace } from "../../../api/member"; // API gọi tới backend
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { getUserFromToken } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { fetchWorkspaceByID } from "../../../api/workspace";

const ManagePeople = () => {
  const [currentUser, setCurrentUser] = useState(null); 
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const [workspace, setWorkSpace] = useState(null);
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("Member");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(null); // Lưu role của user

useEffect(() => {
        // Hàm gọi API để lấy người dùng hiện tại từ token
        const fetchCurrentUser = async () => {
          const user = await getUserFromToken(); // Giả sử hàm này trả về thông tin người dùng
          setCurrentUser(user); // Lưu thông tin người dùng vào state
        };
    
        fetchCurrentUser(); // Gọi hàm khi component mount
      }, []);

  useEffect(() => {
    if (workspaceId) {
      fetchMembers(workspaceId);
      fetchUserRole(workspaceId);
    }
  }, [workspaceId]);

  useEffect(() => {
          const fetchSpace = async () => {
              try {
                  const data = await fetchWorkspaceByID(workspaceId);
                  console.log(data); // Kiểm tra dữ liệu trả về
                  setWorkSpace(data);
              } catch (error) {
                  console.error("Failed to fetch space details:", error);
              } finally {
                  setLoading(false);
              }
          };
      
          fetchSpace();
      }, [workspaceId]);

  // 🔹 Lấy danh sách thành viên trong workspace từ API
  const fetchMembers = async (workspaceId) => {
    try {
      setLoading(true);
      const data = await getMembersByWorkspace(workspaceId);
      setMembers(data);
    } catch (error) {
      console.error("❌ Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Lấy role của user trong workspace
  const fetchUserRole = async (workspaceId) => {
    try {
      const user = getUserFromToken(); // Lấy user từ token
      if (!user || !user.userId) {
        console.error("❌ Không tìm thấy userId trong token!");
        return;
      }

      const response = await getUserRoleInWorkspace(user.userId, workspaceId); // Gọi API lấy role
      if (response && response.role) {
        setCurrentUserRole(response.role);
      }
    } catch (error) {
      console.error("❌ Lỗi khi lấy role của user:", error);
    }
  };
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Bạn có chắc muốn xóa thành viên này?")) return;

    try {
      await deleteUserFromWorkspace(workspaceId, userId);
      toast.success("🗑️ Thành viên đã bị xóa!");

      // 🔄 Điều hướng đến lại cùng trang để refresh dữ liệu
      navigate(0);
    } catch (error) {
      toast.error("⚠️ Không thể xóa user!");
    }
  };
  const handleResendInvite = async (email) => {
    if (!window.confirm("Bạn có chắc muốn gửi lại Email mời người này vào Workspace?")) return;
    try {
      await resendInviteToWorkspace(workspaceId, email);
      toast.success(`📧 Đã gửi lại lời mời đến ${email}!`);
    } catch (error) {
      toast.error("⚠️ Không thể gửi lại lời mời!");
    }
  };

  // 🔹 Gửi lời mời tham gia workspace
  const handleInvite = async () => {
    if (!inviteEmail.trim()) return alert("Please enter an email!");

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail.trim())) {
      return alert("Invalid email format!");
    }

    try {
      await inviteUserToWorkspace(workspaceId, inviteEmail.trim(), selectedRole);
      alert(`Invitation email sent to ${inviteEmail.trim()}.`);
      fetchMembers(workspaceId);
      setInviteEmail(""); // Reset input email
    } catch (error) {
      if (error.response?.data?.error === "This email is already a member of this workspace.") {
        alert("This email is already a member of the workspace.");
      } else {
        alert("Failed to invite user. Please check the email address.");
      }
    }
  };

  // 🔹 Lọc danh sách thành viên theo email hoặc tên
  const filteredMembers = members.filter((member) => {
    const query = searchText.toLowerCase().trim();
    return (
      member.email.toLowerCase().includes(query) ||
      member.name.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 bg-white max-w-7xl mx-auto text-sm">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Manage People - Workspace Name : <span className="text-purple-600">{workspace ? workspace.name : 'Loading'}</span>
      </h1>

      {/* 🔹 Chỉ hiển thị phần mời nếu user có quyền "Owner" */}
      {currentUserRole === "Owner" && (
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-white pl-4 pr-3 py-1.5 border rounded-md text-sm"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Invite by email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="min-w-[250px] px-3 py-1.5 border rounded-md text-sm bg-white"
            />

            {/* Dropdown chọn vai trò */}
            <div className="relative">
              <button
                className="px-3 py-1.5 border rounded-md text-sm bg-white hover:bg-gray-100"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              >
                {selectedRole} ▼
              </button>
              {showRoleDropdown && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white border rounded-md shadow-lg z-10">
                  {["Member", "Leader"].map((role) => (
                    <div
                      key={role}
                      className="p-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedRole(role);
                        setShowRoleDropdown(false);
                      }}
                    >
                      {role}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700"
              onClick={handleInvite}
            >
              Invite
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Members Table */}
      <div className="bg-white rounded-lg shadow-lg border mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-left">Avatar</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-left">Name</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-left">Email</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-left">Role</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-left">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-center">Action</th>

            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-500" />
                  <p>Loading members...</p>
                </td>
              </tr>
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img src={member.avatar || "/default-avatar.png"} alt={member.name} className="w-10 h-10 rounded-full border" />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{member.name}</td>
                  <td className="p-4 text-gray-600">{member.email}</td>

                  {/* Màu cho Role */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-md ${member.role === "Owner"
                          ? "bg-red-100 text-red-700"
                          : member.role === "Leader"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {member.role}
                    </span>
                  </td>

                  {/* Màu cho Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-md ${member.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Thao tác - Xóa và Gửi lại Invite */}
                  {currentUserRole === "Owner" &&  member.id !== currentUser.userId && (
                    <td className="p-4 flex  justify-center item-center gap-3">
                      {/* Nút Xóa */}
                      <button
                        className="px-4 py-2 bg-red-400 text-white rounded-full text-xs shadow-md hover:bg-red-600 transition-all flex items-center gap-2"
                        onClick={() => handleDeleteUser(member.id)}
                      >
                        ❌ Xóa
                      </button>

                      {/* Nút Resend Invite */}
                      <button
                        className="px-4 py-2 bg-blue-400 text-white rounded-full text-xs shadow-md hover:bg-blue-600 transition-all flex items-center gap-2"
                        onClick={() => handleResendInvite(member.email)}
                      >
                        🔄 Gửi lại
                      </button>
                    </td>
                  )}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  <img src="/empty.svg" alt="No members" className="w-32 mx-auto mb-2" />
                  <p>Loading...</p>
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManagePeople;
