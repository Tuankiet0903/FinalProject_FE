import axios from 'axios'
import { API_ROOT } from '../utils/constants'
import { jwtDecode } from "jwt-decode";
import { getUserFromToken } from './auth';

const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Người dùng chưa đăng nhập!");

    const decoded = jwtDecode(token);
    return decoded.userId;
}

export const fetchWorkspaceByID = async (workspaceId) => {
    const response = await axios.get(`${API_ROOT}/workspace/workspaces/${workspaceId}`)
    return response.data
}

export const getAllWorkspace = async () => {
    const response = await axios.get(`${API_ROOT}/workspace/workspaces`)
    return response.data
}

export const getAllWorkspaceByUserId = async () => {
    const response = await axios.get(`${API_ROOT}/workspace/workspaces/user/${getUserId()}`)
    return response.data
}

export const createWorkspace = async ({ name, description, type = 'personal' }) => {
    try {
        const response = await axios.post(`${API_ROOT}/workspace/create-with-defaults`, {
            name,
            description,
            type: type || 'personal', // Đảm bảo luôn có giá trị mặc định
            createdBy: getUserId(),
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('Workspace creation request:', {
            name,
            description,
            type,
            createdBy: getUserId()
        });

        return response.data;
    } catch (error) {
        console.error("Error creating workspace:", {
            message: error.message,
            data: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};

export const createSpace = async ({ name, description, workspaceId }) => {
    try {
        const response = await axios.post(`${API_ROOT}/space/spaces`, {
            name,
            description,
            createdBy: getUserId(),
            workspaceId,
        });

        return response.data;
    } catch (error) {
        console.error("Error creating space:", error);
        throw error;
    }
};

export const deleteSpace = async (spaceId) => {
    try {
        const response = await axios.delete(`${API_ROOT}/space/spaces/${spaceId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting space:", error);
        throw error;
    }
};

export const updateSpace = async (space) => {
    try {
        const response = await axios.put(`${API_ROOT}/space/spaces/${space.spaceId}`, space);
        return response.data;
    } catch (error) {
        console.error("Error updating space:", error);
        throw error;
    }
};

export const createFolder = async ({ name, description, spaceId }) => {
    try {
        const response = await axios.post(`${API_ROOT}/folder/folders`, {
            name,
            description,
            createdBy: getUserId(),
            spaceId,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating folder:", error);
        throw error;
    }
};

export const deleteFolder = async (folderId) => {
    try {
        const response = await axios.delete(`${API_ROOT}/folder/folders/${folderId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting folder:", error);
        throw error;
    }
};

export const updateFolder = async (folder) => {
    try {
        const response = await axios.put(`${API_ROOT}/folder/folders/${folder.folderId}`, folder);
        return response.data;
    } catch (error) {
        console.error("Error updating folder:", error);
        throw error;
    }
};

export const createList = async ({ name, description, folderId }) => {
    try {
        const response = await axios.post(`${API_ROOT}/list/lists`, {
            name,
            description,
            createdBy: getUserId(),
            folderId,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating list:", error);
        throw error;
    }
};

export const deleteList = async (listId) => {
    try {
        const response = await axios.delete(`${API_ROOT}/list/lists/${listId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting list:", error);
        throw error;
    }
};

export const updateList = async (list) => {
    try {
        const response = await axios.put(`${API_ROOT}/list/lists/${list.listId}`, list);
        return response.data;
    } catch (error) {
        console.error("Error updating list:", error);
        throw error;
    }
};

export const fetchUserWorkspacesInTeam = async () => {
    try {
      const user = getUserFromToken();
      if (!user || !user.userId) {
        console.warn("⚠ Không tìm thấy userId từ token.");
        return [];
      }
  
      console.log("📡 Fetching workspaces for userId:", user.userId);
      
      const response = await axios.get(`${API_ROOT}/workspace/workspaces/workspaceinteam/${user.userId}`, {
        withCredentials: true, // ✅ Gửi cookie
      });
  
      console.log("✅ Workspaces user tham gia:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi lấy workspace:", error);
      return [];
    }
  };

