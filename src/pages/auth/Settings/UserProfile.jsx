import React from "react";
import { Avatar, Form, Input, Switch, Button, Typography, Row, Col, Divider } from "antd";

const { Title, Text } = Typography;

const UserProfile = () => {
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

          <div className="flex justify-center">
            <Avatar size={100} src="/placeholder.svg" />
          </div>

          <Form.Item label="Full Name">
            <Input placeholder="Enter your full name" defaultValue="Kiệt Tuấn" />
          </Form.Item>

          <Form.Item label="Email">
            <Input type="email" defaultValue="tuankieta4hbt@gmail.com" />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password placeholder="Enter New Password" />
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
            {[
              "#7C5CFC", "blue", "pink", "purple", "indigo", "orange", "teal",
              "gray", "slate", "green"
            ].map((color, index) => (
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
            <Button type="primary">Save Changes</Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
