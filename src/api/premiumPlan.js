import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const fetchPremiumPlansAPI = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/api/premium/plans`);
      return response.data;
    } catch (error) {
      console.error("Error fetching ", error);
      throw error;
    }
  };