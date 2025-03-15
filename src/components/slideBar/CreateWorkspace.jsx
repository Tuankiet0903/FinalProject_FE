"use client"

import { useState } from "react"
import { CheckCircleFilled, TeamOutlined, UserOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { Button, Input, message, Progress, Modal, Typography, Card, Spin } from "antd"
import { createWorkspace } from "../../api/workspace"

const { Title, Paragraph, Text } = Typography

// Step 1: Workspace type selection with improved cards
const StepOne = ({ onNext, selectedPurpose }) => (
  <div className="space-y-6">
    <Title level={4} className="text-center mb-6">
      What is your workspace for?
    </Title>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card
        hoverable
        className={`text-center cursor-pointer transition-all ${
          selectedPurpose === "Personal" ? "border-2 border-blue-500" : ""
        }`}
        onClick={() => onNext("Personal")}
        bodyStyle={{ padding: "24px" }}
      >
        <div className="flex flex-col items-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
          </div>
          <Title level={5} style={{ marginTop: 0 }}>
            Personal
          </Title>
          <Paragraph type="secondary">For your individual projects and tasks</Paragraph>
          {selectedPurpose === "Personal" && (
            <CheckCircleFilled style={{ color: "#1890ff", position: "absolute", top: "12px", right: "12px" }} />
          )}
        </div>
      </Card>

      <Card
        hoverable
        className={`text-center cursor-pointer transition-all ${
          selectedPurpose === "Team" ? "border-2 border-blue-500" : ""
        }`}
        onClick={() => onNext("Team")}
        bodyStyle={{ padding: "24px" }}
      >
        <div className="flex flex-col items-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <TeamOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
          </div>
          <Title level={5} style={{ marginTop: 0 }}>
            Team
          </Title>
          <Paragraph type="secondary">Collaborate with your team members</Paragraph>
          {selectedPurpose === "Team" && (
            <CheckCircleFilled style={{ color: "#1890ff", position: "absolute", top: "12px", right: "12px" }} />
          )}
        </div>
      </Card>
    </div>
  </div>
)

// Step 2: Name workspace with improved form layout
const StepTwo = ({ workspaceName, setWorkspaceName, description, setDescription }) => (
  <div className="space-y-6">
    <Title level={4} className="text-center mb-6">
      Set up your workspace
    </Title>

    <div className="space-y-4">
      <div>
        <Text strong className="block mb-2">
          Workspace Name <Text type="danger">*</Text>
        </Text>
        <Input
          placeholder="Enter a name for your workspace"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          size="large"
          className="rounded-md"
        />
      </div>

      <div>
        <Text strong className="block mb-2">
          Description <Text type="danger">*</Text>
        </Text>
        <Input.TextArea
          placeholder="What is this workspace about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="large"
          className="rounded-md"
          rows={4}
          showCount
          maxLength={200}
        />
        <Text type="secondary" className="text-xs mt-1 block">
          Briefly describe the purpose of this workspace
        </Text>
      </div>
    </div>
  </div>
)

export default function CreateWorkspace({ onClose, refreshWorkspaces, setCurrentWorkspace }) {
  const [step, setStep] = useState(1)
  const [workspaceName, setWorkspaceName] = useState("")
  const [description, setDescription] = useState("")
  const [purpose, setPurpose] = useState("")
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)
  const totalSteps = 2

  const handleNext = (selectedPurpose) => {
    if (step === 1 && selectedPurpose) setPurpose(selectedPurpose)
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step > 1 ? step - 1 : step)
  }

  const handleSubmit = async () => {
    if (!workspaceName.trim()) {
      message.error("Workspace name is required")
      return
    }

    try {
      setLoading(true)
      const newWorkspace = await createWorkspace({
        name: workspaceName,
        description,
        type: purpose || "team",
      })

      message.success({
        content: "Workspace created successfully!",
        icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      })

      refreshWorkspaces()
      setCurrentWorkspace(newWorkspace.workspace)
      onClose()
    } catch (error) {
      setNotification("Failed to create workspace")
      message.error(notification)
    } finally {
      setLoading(false)
    }
  }

  const isFormComplete = workspaceName.trim() && description.trim()

  return (
    <Modal
      open={true}
      onCancel={onClose}
      width={600}
      centered
      title={
        <Title level={3} className="text-center m-0 py-2">
          {step === 1 ? "Create a new workspace" : "Workspace details"}
        </Title>
      }
      footer={null}
      bodyStyle={{ padding: "24px" }}
    >
      <div className="space-y-6">
        <div className="mb-6">
          {step === 1 && <StepOne onNext={handleNext} selectedPurpose={purpose} />}
          {step === 2 && (
            <StepTwo
              workspaceName={workspaceName}
              setWorkspaceName={setWorkspaceName}
              description={description}
              setDescription={setDescription}
            />
          )}
        </div>

        <div className="mb-6">
          <Progress percent={(step / totalSteps) * 100} showInfo={false} strokeColor="#1890ff" className="mb-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{step === 1 ? "Choose type" : "Workspace details"}</span>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-200">
          <Button onClick={handleBack} disabled={step === 1} icon={<ArrowLeftOutlined />} size="large">
            Back
          </Button>

          {step < totalSteps ? (
            <Button type="primary" onClick={() => handleNext()} icon={<ArrowRightOutlined />} size="large">
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!isFormComplete || loading}
              size="large"
              className="min-w-[120px]"
            >
              {loading ? <Spin size="small" /> : "Create Workspace"}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

