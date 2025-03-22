import axios from 'axios';
import { API_ROOT } from '../utils/constants';

// Fetch user profile
export const fetchUserProfile = async () => {
   try {
      // Lấy token từ localStorage trước
      let token = localStorage.getItem("token");

      // Nếu không có token trong localStorage, thử lấy từ cookies
      if (!token) {
         const cookieResponse = await axios.get(`${API_ROOT}/auth/google/success`, {
            withCredentials: true, // Quan trọng: Gửi cookies khi gọi API
         });

         if (cookieResponse.data?.token) {
            token = cookieResponse.data.token;
            localStorage.setItem("token", token); // Lưu vào localStorage để dùng lại sau
         } else {
            throw new Error("No token found in cookies.");
         }
      }

      // Gọi API lấy thông tin user
      const response = await axios.get(`${API_ROOT}/api/user/profile`, {
         headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
         },
         withCredentials: true, // Gửi cookies kèm request
      });
      if (!response.data || !response.data.userId) {
         throw new Error("Invalid user data");
      }

      return response.data;
   } catch (error) {
      console.error("❌ Failed to fetch user profile", error.response?.data || error.message);
      throw error;
   }
};