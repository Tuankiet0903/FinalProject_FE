import axios from 'axios';
import { API_ROOT } from '../utils/constants';

export const activateUser = async (token, fullName, avatar) => {
    try {
        const response = await axios.post(`${API_ROOT}/api/auth/activate`, { token, fullName, avatar });
        return response.data;
    } catch (error) {
        console.error("❌ Error activating user:", error.response?.data || error.message);
        throw error;
    }
};
export const getUserFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
  
      // ✅ Giải mã token (không cần gửi request lên server)
      const base64Url = token.split(".")[1]; // Lấy payload của JWT
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
  
      const decodedUser = JSON.parse(jsonPayload);
  
      return decodedUser;
    } catch (error) {
      console.error("❌ Lỗi khi giải mã token:", error);
      return null;
    }
  };
  