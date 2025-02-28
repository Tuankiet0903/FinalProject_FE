import React, { useState, useEffect } from "react";
import { Avatar, Form, Input, Switch, Button, Typography, Row, Col, Divider, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    avatar: "/placeholder.svg",
  });
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userId, setUserId] = useState(null);
  const [file, setFile] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User Profile Data:", response.data);
        setUserData({
          fullName: response.data.fullName,
          email: response.data.email,
          avatar: response.data.avatar || "/placeholder.svg",
        });

        setUserId(response.data.userId);
      } catch (error) {
        console.error("❌ Lỗi khi fetch user profile:", error.response?.data || error);

        // Nếu lỗi 401 do token hết hạn, xóa token và yêu cầu đăng nhập lại
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveChanges = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      message.error("Passwords do not match."); // Show error message using Ant Design
      return;
    }

    if (!userId) {
      message.error("User ID not found."); // Show error message using Ant Design
      return;
    }

    const data = {
      fullName: userData.fullName,
      email: userData.email,
      newPassword: newPassword || undefined,  // Send new password if provided
    };

    try {
      const token = localStorage.getItem("token");

      // Use userId from state
      const response = await axios.put(`http://localhost:5000/api/user/users/${userId}`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        message.success("Profile updated successfully!"); // Show success message using Ant Design
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      message.error("Failed to save changes."); // Show error message using Ant Design
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("Vui lòng chọn một tệp!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("🔹 Token gửi lên:", token); // Debug token

      const response = await axios.post("http://localhost:5000/api/user/upload-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,  // 🔥 Đảm bảo token được gửi
        },
        withCredentials: true,  // 🔥 Nếu backend dùng cookie để xác thực
      });

      console.log("✅ Avatar uploaded:", response.data);
      message.success("Avatar uploaded successfully!");
      setAvatarUrl(response.data.avatarUrl);
    } catch (error) {
      console.error("❌ Lỗi upload avatar:", error.response?.data || error);
      message.error("Không thể upload avatar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Title level={2}>My Settings</Title>
          <Text type="secondary">Your personal information and account security settings.</Text>
        </div>

        <Form layout="vertical">
          {/* Profile Section */}
          <Divider orientation="left">Profile</Divider>

          <Form.Item className="flex justify-center">
            <Avatar size={100} src={userData.avatar} />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Button type="primary" loading={loading} onClick={handleUpload}>
              Upload Avatar
            </Button>
          </Form.Item>

          <Form.Item label="Full Name">
            <Input
              placeholder="Enter your full name"
              value={userData.fullName}  // Use `value` instead of `defaultValue`
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
              disabled={loading}
            />
          </Form.Item>

          <Form.Item label="Email">
            <Input
              type="email"
              value={userData.email}  // Use `value` instead of `defaultValue`
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              disabled={loading}
            />
          </Form.Item>

          {/* Change Password Section */}
          <Divider orientation="left">Change Password</Divider>

          <Form.Item label="New Password">
            <Input.Password
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Confirm New Password">
            <Input.Password
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && <Text type="danger">{passwordError}</Text>}
          </Form.Item>

          {/* 2FA Section */}
          <Divider orientation="left">Two-factor authentication (2FA)</Divider>
          <Text type="secondary">
            Keep your account secure by enabling 2FA via SMS or using an authenticator app.
          </Text>

          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>Text Message (SMS)</Text>
              <p>Receive a one-time passcode via SMS each time you log in.</p>
            </Col>
            <Col>
              <Switch />
            </Col>
          </Row>

          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>Authenticator App (TOTP)</Text>
              <p>Use an app to receive a temporary one-time passcode each time you log in.</p>
            </Col>
            <Col>
              <Switch />
            </Col>
          </Row>

          {/* Theme Section */}
          <Divider orientation="left">Theme color</Divider>
          <Text type="secondary">Choose a preferred theme for the app.</Text>
          <Row gutter={[10, 10]}>
            {["#7C5CFC", "blue", "pink", "purple", "indigo", "orange", "teal", "gray", "slate", "green"].map((color, index) => (
              <Col key={index}>
                <Button
                  shape="circle"
                  size="large"
                  style={{ backgroundColor: color, border: "none" }}
                />
              </Col>
            ))}
          </Row>

          {/* Appearance Section */}
          <Divider orientation="left">Appearance</Divider>
          <Text type="secondary">
            Choose light or dark mode, or switch based on your system settings.
          </Text>

          <Row gutter={16}>
            <Col span={8}>
              <Button block>Light Mode</Button>
            </Col>
            <Col span={8}>
              <Button block type="primary">
                Dark Mode
              </Button>
            </Col>
            <Col span={8}>
              <Button block>System</Button>
            </Col>
          </Row>

          {/* Save Button */}
          <Divider />
          <Row justify="end">
            <Button type="primary" onClick={handleSaveChanges} loading={loading}>
              Save Changes
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
