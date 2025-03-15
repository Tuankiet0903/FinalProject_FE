import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ActivateUser = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/activate/${token}`);
        console.log("🎉 Activation response:", response.data);

        const { workspaceId } = response.data;
        if (!workspaceId) throw new Error("Missing workspaceId!");

        alert("✅ Account activated successfully!");

        // 🔥 Điều hướng đúng cách
        navigate(`/setting/manage-people/${workspaceId}`);

      } catch (error) {
        console.error("❌ Activation error:", error.response?.data || error.message);
        if (error.response?.status === 400) {
          alert("❌ Activation failed. The link may be invalid or expired.");
        } else {
          alert("❌ Activation failed. Please try again later.");
        }
        navigate("/");
      }
    };

    activateAccount();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-600">Activating your account...</p>
    </div>
  );
};

export default ActivateUser;
