import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const getCountAllUsers = async () => {
  try {
    const response = await axios.get(`${API_ROOT}/api/admin/getCountAllUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

export const fetchYearlyData = async () => {
  try {
    const response = await axios.get(
      `${API_ROOT}/api/admin/getCountAllWorkspaceByYear`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

export const fetchMonthlyData = async () => {
  try {
    const response = await axios.get(
      `${API_ROOT}/api/admin/getCountAllWorkspaceByMonth`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ", error);
    throw error;
  }
};

export const fetchCountAllWorkspaceType = async () => {
  try {
    const response = await axios.get(
      `${API_ROOT}/api/admin/getCountAllWorkspaceType`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ", error);
    throw error;
  }
};

export const handleVerifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_ROOT}/api/otp/verify-otp`, {
      email,
      otpCode: otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ", error);
    throw error;
  }
};

export const resendOtpAPI = async (email) => {
  try {
    const response = await axios.post(`${API_ROOT}/api/otp/resend-otp`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ", error);
    throw error;
  }
};

export const fetchCountAllActiveUsers = async () => {
  try {
    const response = await axios.get(
      `${API_ROOT}/api/admin/getCountAllActiveUsers`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ", error);
    throw error;
  }
};

export const fetchPremiumPlansAPI = async () => {
  try {
    const response = await axios.get(`${API_ROOT}/api/admin/getAllPremiumPlan`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ", error);
    throw error;
  }
};

export const deletePlanById = async (id) => {
  try {
    const response = await axios.delete(`${API_ROOT}/api/admin/plans/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ", error);
    throw error;
  }
};

export const deleteMultiplePlans = async (ids) => {
  if (!ids || ids.length === 0) {
    throw new Error("No plans selected for deletion.");
  }

  try {
    const response = await axios.delete(
      `${API_ROOT}/api/admin/plans/delete-multiple`,
      {
        data: { ids },
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete plans.");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting multiple plans:", error);
    throw error.response?.data?.message || "Server error while deleting plans.";
  }
};

export const updatePlanById= async (updatedPlan) => {
  try {
    const response = await axios.put(`${API_ROOT}/api/admin/plans/${updatedPlan.planId}`, {
      id: updatedPlan.planId,
      description: updatedPlan.description,
      price: updatedPlan.price,
      isPopular: updatedPlan.isPopular,
    });

    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error updating plan on server:", error);
    throw error.response?.data?.message || "Failed to update plan";
  }
};

export const createPlan= async (planData) => {
  try {
    const response = await axios.post(`${API_ROOT}/api/admin/plans`, planData);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to create plan");
    }

    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error creating plan on server:", error);
    throw error.response?.data?.message || "Failed to create plan";
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_ROOT}/api/admin/getAllUser`);

    if (!response.data) {
      throw new Error("No data received from server.");
    }

    return response.data.map((user) => ({
      userId: user.userId, // Required by Ant Design table
      avatar: user.avatar || "https://ui-avatars.com/api/?name=Avatar", // Default if null
      fullName: user.fullName,
      email: user.email,
      dateOfBirth: user.dateOfBirth || "N/A",
      active: user.active,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response?.data?.message || "Failed to fetch users";
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${API_ROOT}/api/admin/users/${id}`);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete user");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error.response?.data?.message || "Failed to delete user";
  }
};


export const deleteMultipleUsers = async (ids) => {
  try {
    const response = await axios.delete(`${API_ROOT}/api/admin/users/delete-multiple`, {
      data: { ids }, // Axios gửi dữ liệu trong `data` thay vì `body`
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete users");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting multiple users:", error);
    throw error.response?.data?.message || "Failed to delete users";
  }
};


export const updateUserBlockStatus = async (userId, isBlocked) => {
  try {
    const response = await axios.put(`${API_ROOT}/api/admin/users/update-block-status`, {
      id: userId,
      blockStatus: isBlocked,
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to update user status");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating user block status:", error);
    throw error.response?.data?.message || "Failed to update user status";
  }
};


export const fetchAllWorkspaces = async () => {
  try {
    const response = await axios.get(`${API_ROOT}/api/admin/getAllWorkspace`);

    if (!response.data) {
      throw new Error("No data received from server.");
    }

    return response.data.map((workspace) => ({
      id: workspace.workspaceId,
      name: workspace.name,
      type: workspace.type,
      email: workspace.User?.email || "N/A",
      owner: workspace.User?.fullName || "N/A",
      members: workspace.ManageMemberWorkSpaces?.length || 0,
      users:
        workspace.ManageMemberWorkSpaces?.map((member) => ({
          id: member.userId,
          fullName: member.User?.fullName || "Unknown",
          email: member.User?.email || "N/A",
          role: member.roleWorkSpace,
        })) || [],
    }));
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    throw error.response?.data?.message || "Failed to fetch workspaces";
  }
};

export const deleteWorkspaceById = async (id) => {
  try {
    const response = await axios.delete(`${API_ROOT}/api/admin/workspace/${id}`);

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete workspace");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting workspace:", error);
    throw error.response?.data?.message || "Failed to delete workspace";
  }
};


export const deleteMultipleWorkspaces = async (ids) => {
  try {
    const response = await axios.delete(`${API_ROOT}/api/admin/workspace/delete-multiple`, {
      data: { ids }, // Axios yêu cầu gửi dữ liệu trong `data`
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete workspaces");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting multiple workspaces:", error);
    throw error.response?.data?.message || "Failed to delete workspaces";
  }
};





