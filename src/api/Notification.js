import axios from 'axios';
import { API_ROOT } from '../utils/constants';

// Fetch all notifications for a user
export const fetchUserNotifications = async (userId) => {
   try {
      const response = await axios.get(`${API_ROOT}/notifications/user/${userId}`);
      return response.data;
   } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
   }
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
   try {
      await axios.put(`${API_ROOT}/notifications/${notificationId}/read`);
   } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
   }
};

// Mark a notification as unread
export const markNotificationAsUnread = async (notificationId) => {
   try {
      await axios.put(`${API_ROOT}/notifications/${notificationId}/unread`);
   } catch (error) {
      console.error('Error marking notification as unread:', error);
      throw error;
   }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId) => {
   try {
      const notifications = await fetchUserNotifications(userId);
      const markAsReadPromises = notifications.map(notification =>
         markNotificationAsRead(notification.id)
      );
      await Promise.all(markAsReadPromises);
   } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
   }
};

// Delete a notification
export const deleteNotification = async (notificationId) => {
   try {
      await axios.delete(`${API_ROOT}/notifications/${notificationId}`);
   } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
   }
};