import axios from 'axios'
import { API_ROOT } from '../utils/constants'

export const fetchWorkspaceByID = async (workspaceId) => {
    const response = await axios.get(`${API_ROOT}/workspace/workspaces/${workspaceId}`)
    return response.data
}

export const getAllWorkspace = async () => {
    const response = await axios.get(`${API_ROOT}/workspace/workspaces`)
    return response.data
}

export const createWorkspace = async ({ name, description, type }) => {
    try {
        const response = await axios.post(`${API_ROOT}/workspace/create-with-defaults`, {
            name,
            description,
            type,
            createBy: 1,
        });

        return response.data;
    } catch (error) {
        console.error("Error creating space:", error);
        throw error;
    }
};

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