import axios from 'axios';
import { API_ROOT } from '../utils/constants';

export const getMembersByWorkspace = async (workspaceId) => {
    if (!workspaceId) throw new Error("workspaceId is required");

    try {
        const response = await axios.get(`${API_ROOT}/api/admin/manage-people/workspace/${workspaceId}`);

        return response.data; // ✅ Trả về danh sách thành viên
    } catch (error) {
        console.error("❌ Error fetching members:", error.response?.data || error.message);
        throw error;
    }
}

export const inviteUserToWorkspace = async (workspaceId, email, role) => {
    try {
        const response = await axios.post(`${API_ROOT}/api/admin/manage-people/invite`, {
            workspaceId,       
            email,            
            roleWorkSpace: role 
        });

        return response.data;
    } catch (error) {
        console.error("❌ Error inviting user:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Kích hoạt tài khoản khi người dùng nhấn vào link từ email
 */
export const activateUser = async (token, fullName, avatar) => {
    try {
        const response = await axios.post(`${API_ROOT}/api/admin/manage-people/activate`, {
            token, fullName, avatar
        });

        return response.data;
    } catch (error) {
        console.error("❌ Error activating user:", error.response?.data || error.message);
        throw error;
    }
};

export const resendInvite = async (workspaceId, email) => {
    try {
      const response = await axios.post(`${API_ROOT}/api/admin/manage-people/resend-invite`, {
        workspaceId,
        email
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error resending invite:", error.response?.data || error.message);
      throw error;
    }
  };

  export const getUserRoleInWorkspace = async (userId, workspaceId) => {
    if (!userId || !workspaceId) throw new Error("Missing userId or workspaceId");
  
    try {
      const response = await axios.get(`${API_ROOT}/api/admin/getRole/${userId}/${workspaceId}`);
      
      return response.data; // ✅ Trả về role của user
    } catch (error) {
      console.error("❌ Error fetching user role:", error.response?.data || error.message);
      throw error;
    }
  };
  export const updateUserRoleInWorkspace = async (workspaceId, userId, newRole) => {
    try {
      const response = await axios.put(`${API_ROOT}/api/admin/manage-people/update-role`, {
        workspaceId,
        userId,
        newRole,
      });
  
      return response.data;
    } catch (error) {
      console.error("❌ Error updating user role:", error.response?.data || error.message);
      throw error;
    }
  };
  
  /**
   * 🔹 Xóa user khỏi workspace
   */
  

  export const deleteUserFromWorkspace = async (workspaceId, userId) => {
    try {
      const response = await axios.delete(`${API_ROOT}/workspace/workspaces/${workspaceId}/delete/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error deleting user:", error.response?.data || error.message);
      throw error;
    }
};

export const resendInviteToWorkspace = async (workspaceId, email) => {
  try {
    const response = await axios.post(`${API_ROOT}/api/admin/resend-invite`, {
      workspaceId,
      email
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error resending invite:", error.response?.data || error.message);
    throw error;
  }
};