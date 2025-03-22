import axios from "axios";
import { API_ROOT } from '../utils/constants'
import { getUserId } from "./workspace";

const API_URL = API_ROOT;
const AUTH_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};

export const fetchMessages = async (workspaceId) => {
  try {
    const response = await axios.get(`${API_URL}/api/workspace/${workspaceId}/messages`, { headers: AUTH_HEADERS });
    return response;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
};

export const sendMessage = async (workspaceId, newMessage) => {
  try {
    const response = await axios.post(`${API_URL}/api/workspace/${workspaceId}/messages`, {
      content: newMessage,
      workspaceId,
      userId: getUserId(),
    }, { headers: AUTH_HEADERS });
    return response.data;
  } catch (error) {
    console.error("Failed to send message:", error);
    return null;
  }
};

export const addReaction = async (workspaceMessageId, reactionType) => {
  try {
    await axios.post(`${API_URL}/api/messages/${workspaceMessageId}/reactions`, { reactionType, userId: getUserId() }, { headers: AUTH_HEADERS });
  } catch (error) {
    console.error("Failed to add reaction:", error);
  }
};

export const removeReaction = async (workspaceMessageId, reactionId) => {
  try {
    await axios.delete(`${API_URL}/api/messages/${workspaceMessageId}/reactions/${reactionId}`, { headers: AUTH_HEADERS });
  } catch (error) {
    console.error("Failed to remove reaction:", error);
  }
};