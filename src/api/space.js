import axios from 'axios'
import { API_ROOT } from '../utils/constants'
import { jwtDecode } from "jwt-decode";

const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Người dùng chưa đăng nhập!");

    const decoded = jwtDecode(token);
    return decoded.userId;
}

export const fetchSpaceById = async (spaceId) => {
    try {
        const response = await axios.get(`${API_ROOT}/space/spaces/${spaceId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching workspace by ID:", error);
        throw error;
    }
};

// export async function fetchFoldersBySpaceId(spaceId) {
//     try {
//       const response = await fetch(`/folder/folders/space/:spaceId`);
//       if (!response.ok) throw new Error("Failed to fetch folders");
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching folders:", error);
//       return [];
//     }
//   }

export async function fetchFoldersBySpaceId(spaceId) {
    try {
        const response = await fetch(`${API_ROOT}/folder/folders/space/${spaceId}`); // 🔥 Sửa URL theo backend

        if (!response.ok) {
            throw new Error(`API error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
}

export const getUserSpaces = async (userId) => {
    try {
      const response = await fetch(`${API_ROOT}/space/spaces?userId=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include" // Nếu có authentication bằng cookies
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user spaces");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching user spaces:", error);
      return [];
    }
  };
  



// ✅ Lấy workspaceId từ URL và fetch danh sách Spaces của nó
export const getSpacesByWorkspaceId = async (workspaceId) => {
  try {
    const response = await axios.get(`${API_ROOT}/space/spaces/workspace/${workspaceId}/allspaces`);
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching spaces for workspaceId ${workspaceId}:`, error);
    return [];
  }
};






  
  
  
