import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Input, Progress, message } from "antd";
import { createWorkspace } from "../../api/workspace";

const StepOne = ({ onNext }) => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold text-center">What do you want to use ClickUp for?</h1>
    <div className="grid grid-cols-3 gap-4">
      {["personal", "team"].map((option) => (
        <Button key={option} onClick={() => onNext(option)} className="w-full py-4 border rounded-lg">
          {option}
        </Button>
      ))}
    </div>
  </div>
);

const StepTwo = ({ email, setEmail }) => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold text-center">Invite people to join your work environment:</h1>
    <Input
      type="text"
      placeholder="Enter email addresses (or paste multiple)"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full"
    />
  </div>
);

const StepThree = ({ workspaceName, setWorkspaceName, description, setDescription }) => (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold text-center">Give a name and description to your workspace</h1>
    <Input
      type="text"
      placeholder="Workspace Name"
      value={workspaceName}
      onChange={(e) => setWorkspaceName(e.target.value)}
      className="w-full"
    />
    <Input.TextArea
      placeholder="Workspace Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full"
      rows={4}
    />
  </div>
);

export default function CreateWorkspace({ onClose }) {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const totalSteps = 3;

  const handleNext = (selectedPurpose) => {
    if (step === 1 && selectedPurpose) {
      setPurpose(selectedPurpose);
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => step > 1 && setStep(step - 1);

  const handleSubmit = async () => {
    if (!workspaceName.trim()) {
      message.error("Space name is required");
      return;
    }

    try {
      await createWorkspace({
        name: workspaceName,
        description,
        type: purpose ? purpose : "team"
      });

      message.success("Workspace created successfully!");
      setWorkspaceName("");
      setDescription("");
      setEmail("");
      setPurpose("");
      onClose();
    } catch (error) {
      message.error("Failed to create space!");
    }
  };

  return (
    <div className="min-h-96 bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-8">
          <img src="/placeholder.svg?height=32&width=32" alt="ClickUp Logo" className="h-8 w-8" />
          <span className="text-xl font-semibold ml-2">ClickUp</span>
        </div>

        <div className="mb-8">
          {step === 1 && <StepOne onNext={handleNext} />}
          {step === 2 && <StepTwo email={email} setEmail={setEmail} />}
          {step === 3 && <StepThree workspaceName={workspaceName} setWorkspaceName={setWorkspaceName} description={description} setDescription={setDescription} />}
        </div>

        <Progress percent={(step / totalSteps) * 100} showInfo={false} />

        <div className="flex justify-between mt-4">
          <Button onClick={handleBack} disabled={step === 1} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={() => handleNext()} type="primary" className="flex items-center gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} type="primary" className="flex items-center gap-2">
              Create Workspace
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}