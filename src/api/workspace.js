import axios from 'axios'
import { API_ROOT } from '../utils/constants'

export const fetchWorkspaceByID = async (workspaceId) => {
    const response = await axios.get(`${API_ROOT}/workspace/workspaces/${workspaceId}`)
    return response.data
}

export const createSpace = async ({ name, description, workspaceId }) => {
    try {
      const response = await axios.post(`${API_ROOT}/space/spaces`, {
        name,
        description,
        createBy: 1,
        workspaceId,
      });
  
      return response.data;
    } catch (error) {
      console.error("Error creating space:", error);
      throw error;
    }
  };