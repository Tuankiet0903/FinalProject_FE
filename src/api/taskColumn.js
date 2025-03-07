import axios from "axios";
import { API_ROOT } from "../utils/constants";

// Get all task columns for a specific list
export const fetchTaskColumnsByList = async (listId) => {
   try {
      const response = await axios.get(`${API_ROOT}/task-column/task-columns/list/${listId}`);
      return response.data;
   } catch (error) {
      console.error("Error fetching task columns:", error);
      throw error;
   }
};

// Add new task column (Add group)
export const addTaskColumn = async (listId, name, color, userId, status) => {
   try {
      const response = await axios.post(`${API_ROOT}/task-column/task-columns`, {
         listId: parseInt(listId),  // Ensure listId is a number
         name: name.trim(),
         color,
         userId: parseInt(userId),  // Ensure userId is a number
         status: parseInt(status),   // Ensure status is a number
         createdBy: parseInt(userId) 
      });
      return response.data;
   } catch (error) {
      console.error("Error adding task column:", error.response?.data || error.message);
      throw error;
   }
};

// Get task column by ID
export const getTaskColumnById = async (columnId) => {
   try {
      const response = await axios.get(`${API_ROOT}/task-column/task-columns/${columnId}`);
      return response.data;
   } catch (error) {
      console.error("Error fetching task column:", error);
      throw error;
   }
};

// Update task column
export const updateTaskColumn = async (columnId, updateData) => {
   try {
      const response = await axios.put(`${API_ROOT}/task-column/task-columns/${columnId}`, updateData);
      return response.data;
   } catch (error) {
      console.error("Error updating task column:", error);
      throw error;
   }
};

// Delete task column
export const deleteTaskColumn = async (columnId) => {
   try {
      const response = await axios.delete(`${API_ROOT}/task-column/task-columns/${columnId}`);
      return response.data;
   } catch (error) {
      console.error("Error deleting task column:", error);
      throw error;
   }
};

// Update column order
export const updateColumnOrder = async (listId, columnOrders) => {
   try {
      const response = await axios.patch(`${API_ROOT}/task-column/task-columns/list/${listId}/order`, {
         columnOrders
      });
      return response.data;
   } catch (error) {
      console.error("Error updating column order:", error);
      throw error;
   }
};