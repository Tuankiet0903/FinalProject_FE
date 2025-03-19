import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getUserFromToken } from "../../../api/auth";
import { fetchSpaceById } from "../../../api/space";
import { useNavigate } from "react-router-dom";
import { getMembersBySpace, getUserRoleInSpace, getMembersByWorkspace, inviteUserToSpace, deleteUserFromSpace } from "../../../api/member";


const ManagePeopleSpace = () => {
    const [currentUser, setCurrentUser] = useState(null); 
    const navigate = useNavigate();
    const [space, setSpace] = useState(null);
    const { workspaceId, spaceId } = useParams();
    const [members, setMembers] = useState([]); // Thành viên hiện có trong space
    const [workspaceMembers, setWorkspaceMembers] = useState([]); // Thành viên trong workspace
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState("Member");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState(null);

    useEffect(() => {
        // Hàm gọi API để lấy người dùng hiện tại từ token
        const fetchCurrentUser = async () => {
          const user = await getUserFromToken(); // Giả sử hàm này trả về thông tin người dùng
          setCurrentUser(user); // Lưu thông tin người dùng vào state
        };
    
        fetchCurrentUser(); // Gọi hàm khi component mount
      }, []);


    useEffect(() => {
        if (spaceId) {
            fetchMembers(spaceId); // Fetch thành viên trong space
            fetchUserRole(spaceId); // Fetch role của người dùng
        }
    }, [spaceId]);

    useEffect(() => {
        if (workspaceId) {
            fetchMembersWorkspace(workspaceId); // Lấy tất cả thành viên trong workspace
        }
    }, [workspaceId]);

    useEffect(() => {
        const fetchSpace = async () => {
            try {
                const data = await fetchSpaceById(spaceId);
                setSpace(data);
            } catch (error) {
                console.error("Failed to fetch space details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpace();
    }, [spaceId]);

    const fetchMembers = async (spaceId) => {
        try {
            setLoading(true);
            const data = await getMembersBySpace(spaceId);
            setMembers(data); // Thành viên trong space
        } catch (error) {
            console.error("❌ Error fetching members:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserRole = async (spaceId) => {
        try {
            const user = getUserFromToken();
            if (!user || !user.userId) {
                console.error("❌ Không tìm thấy userId trong token!");
                return;
            }

            const response = await getUserRoleInSpace(user.userId, spaceId);
            if (response && response.role) {
                setCurrentUserRole(response.role);
            }
        } catch (error) {
            console.error("Error fetching user role:", error);
        }
    };

    useEffect(() => {
        console.log("workspaceMembers updated:", workspaceMembers);
    }, [workspaceMembers]);

    const fetchMembersWorkspace = async (workspaceId) => {
        try {
            const data = await getMembersByWorkspace(workspaceId);
            setWorkspaceMembers(data); // Thành viên trong workspace
        } catch (error) {
            console.error("❌ Error fetching workspace members:", error);
        }
    };

    // Lọc thành viên trong modal invite (không bao gồm những thành viên đã có trong space)
    const filteredMembers = workspaceMembers.filter(
        (workspaceMember) => !members.some(existingMember => existingMember.id === workspaceMember.id)
    );

    // Đảm bảo rằng bạn cập nhật giá trị roleSpace của mỗi member trong danh sách đã lọc
    const handleRoleChange = (e, index) => {
        const updatedMembers = [...filteredMembers];
        updatedMembers[index].roleSpace = e.target.value; // Cập nhật roleSpace của thành viên tại index
        setWorkspaceMembers(updatedMembers); // Cập nhật lại state
    };

    const handleDeleteUser = async (workspaceId, spaceId, userId) => {
        if (!window.confirm("Bạn có chắc muốn xóa thành viên này?")) return;

        try {
              await deleteUserFromSpace(workspaceId, spaceId, userId);
            // 🔄 Điều hướng đến lại cùng trang để refresh dữ liệu
            navigate(0);
        } catch (error) {
            alert("⚠️ Không thể xóa user!");
        }
    };

    const handleInvite = (workspaceId, spaceId, memberId, roleSpace, email) => {
        // Gửi invite cho thành viên
        console.log(`Inviting member with id: ${memberId}, role: ${roleSpace}`);
        console.log(`Inviting member with id: ${memberId}, role: ${roleSpace}`);
        console.log(`Workspace ID: ${workspaceId}, Space ID: ${spaceId}`);
        console.log(`email: ${email}`);

        // Gọi API để mời người dùng vào space với roleSpace và status là 'pending'
        inviteUserToSpace(workspaceId, spaceId, memberId, roleSpace, email);
        fetchMembers(spaceId);
        fetchMembers(spaceId);

        setShowInviteModal(false); // Đóng modal sau khi gửi invite
    };

    return (
        <div className="p-6 bg-white max-w-7xl mx-auto text-sm">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                Manage People - Space Name:{" "}
                <span className="text-purple-600">{space ? space.name : "Loading..."}</span>
            </h1>
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
                        {/* Nút mời */}
                        <button
                            className="px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700"
                            onClick={() => setShowInviteModal(true)} // Mở modal invite khi nhấn vào nút

                        >

                            Invite
                        </button>
                    </div>
                </div>
            )}

            {/* Modal hiển thị danh sách thành viên workspace */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                        <h2 className="text-lg font-semibold mb-4">Select a member to invite</h2>

                        <ul className="max-h-64 overflow-y-auto">
                            {filteredMembers.map((member, index) => (
                                <li key={member.id} className="flex justify-between items-center py-4 border-b">
                                    <div className="flex items-center space-x-8">
                                        <img
                                            src={member.avatar || "/default-avatar.png"}
                                            alt={member.name}
                                            className="w-16 h-16 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{member.name}</p>
                                            <p className="text-xs text-gray-600">{member.email}</p>
                                        </div>
                                    </div>

                                    {/* Dropdown để chọn role */}
                                    <div className="relative ml-auto">
                                        <div className="relative ml-auto">
                                            <select
                                                className="px-6 py-3 bg-white border rounded-md text-xs w-40"
                                                onChange={(e) => handleRoleChange(e, index)} // Gọi hàm để thay đổi roleSpace
                                                value={member.roleSpace || "Member"} // Nếu member.roleSpace là undefined, chọn "Member" làm giá trị mặc định
                                            >
                                                <option value="Member">Member</option>
                                                <option value="Leader">Leader</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        className="px-6 py-3 bg-blue-500 text-white rounded-md text-xs ml-4"
                                        onClick={() => handleInvite(workspaceId, spaceId, member.id, member.roleSpace, member.email)} // Chuyển role cùng với memberId
                                    >
                                        Invite
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="mt-6 w-full px-6 py-3 bg-gray-300 text-black rounded-md"
                            onClick={() => setShowInviteModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Members Table */}
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
                        ) : members.length > 0 ? (
                            members.map((member) => (
                                <tr key={member.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        <img
                                            src={member.avatar || "/default-avatar.png"}
                                            alt={member.name}
                                            className="w-10 h-10 rounded-full border"
                                        />
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{member.name}</td>
                                    <td className="p-4 text-gray-600">{member.email}</td>

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
                                    {currentUserRole === "Owner" &&  member.id !== currentUser.userId && (
                                        <td className="p-4 flex  justify-center item-center gap-3">
                                            {/* Nút Xóa */}
                                            <button
                                                className="px-4 py-2 bg-red-400 text-white rounded-full text-xs shadow-md hover:bg-red-600 transition-all flex items-center gap-2"
                                                onClick={() => handleDeleteUser(workspaceId, spaceId, member.id)}
                                            >
                                                ❌ Xóa
                                            </button>

                                            {/* Nút Resend Invite */}

                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-6 text-center text-gray-500">
                                    <img src="/empty.svg" alt="No members" className="w-32 mx-auto mb-2" />
                                    <p>No members found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagePeopleSpace;
