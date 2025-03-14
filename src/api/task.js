import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const fetchTasksByColumn = async (taskColumnId) => {
   try {
      const response = await axios.get(`${API_ROOT}/task/column/${taskColumnId}`, {
         withCredentials: true
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching tasks by column:", error);
      throw error;
   }
};

export const createTask = async (taskData) => {
   try {
      const response = await axios.post(`${API_ROOT}/task`, taskData, {
         withCredentials: true
      });
      return response.data;
   } catch (error) {
      console.error("Error creating task:", error);
      throw error;
   }
};

export const updateTask = async (taskId, updates) => {
   try {
      const response = await axios.put(`${API_ROOT}/task/${taskId}`, updates, {
         withCredentials: true
      });
      return response.data;
   } catch (error) {
      console.error("Error updating task:", error);
      throw error;
   }
};

export const deleteTask = async (taskId) => {
   try {
      const response = await axios.delete(`${API_ROOT}/task/${taskId}`, {
         withCredentials: true
      });
      return response.data;
   } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
   }
};

// Add new functions for other task operations
export const getAllTasks = async () => {
   try {
      const response = await axios.get(`${API_ROOT}/task`, {
         withCredentials: true
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching all tasks:", error);
      throw error;
   }
};

export const getTaskById = async (taskId) => {
   try {
      const response = await axios.get(`${API_ROOT}/task/${taskId}`, {
         withCredentials: true
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching task:", error);
      throw error;
   }
};

export const getTasksBySpace = async (spaceId) => {
   try {
      const response = await axios.get(`${API_ROOT}/task/space/${spaceId}`, {
         withCredentials: true
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching tasks by space:", error);
      throw error;
   }
};

export const getTasksByWorkspace = async (workspaceId) => {
   try {
      const response = await axios.get(`${API_ROOT}/task/workspace/${workspaceId}`, {
         withCredentials: true
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching tasks by workspace:", error);
      throw error;
   }
};
