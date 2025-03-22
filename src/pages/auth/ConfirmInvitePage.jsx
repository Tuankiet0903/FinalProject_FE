import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";  // Sử dụng useNavigate thay vì useHistory
import axios from "axios";

const ConfirmInvitePage = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();  // Thay vì useHistory, sử dụng useNavigate

  // Lấy các tham số từ URL
  const queryParams = new URLSearchParams(location.search);
  const inviteToken = queryParams.get("inviteToken");
  const userId = queryParams.get("userId");
  const spaceId = queryParams.get("spaceId");
  const workspaceId = queryParams.get("workspaceId");

  useEffect(() => {
    if (!inviteToken || !userId || !spaceId || !workspaceId) {
      setStatus("Missing parameters. Please check the invitation link.");
      setLoading(false);
      return;
    }

    // Gửi yêu cầu xác nhận lời mời đến backend
    const confirmInvite = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/auth/confirm-invite?inviteToken=${inviteToken}&userId=${userId}&spaceId=${spaceId}&workspaceId=${workspaceId}`
        );
        setStatus(response.data);  // Hiển thị thông báo thành công
        setLoading(false);

        // Redirect đến trang khác sau khi xác nhận thành công
        setTimeout(() => {
          navigate("/user"); // Ví dụ: chuyển đến trang dashboard
        }, 2000);
      } catch (error) {
        setStatus("Failed to confirm invitation.");
        setLoading(false);
      }
    };

    confirmInvite();
  }, [inviteToken, userId, spaceId, workspaceId, navigate]);

  return (
    <div>
      <h2>Confirm Invitation</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{status}</p>  // Hiển thị kết quả sau khi xác nhận
      )}
    </div>
  );
};

export default ConfirmInvitePage;
