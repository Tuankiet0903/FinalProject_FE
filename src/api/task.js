import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const fetchTasksByColumn = async (taskColumnId) => {
   const response = await axios.get(`${API_ROOT}/task/tasks/column/${taskColumnId}`);
   return response.data;
};

export const createTask = async (taskData) => {
   const response = await axios.post(`${API_ROOT}/task/tasks`, taskData);
   return response.data;
};

export const updateTask = async (taskId, updates) => {
   const response = await axios.put(`${API_ROOT}/task/tasks/${taskId}`, updates);
   return response.data;
};

export const deleteTask = async (taskId) => {
   const response = await axios.delete(`${API_ROOT}/task/tasks/${taskId}`);
   return response.data;
};
