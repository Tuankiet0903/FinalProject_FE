import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button, Input, message, Progress } from "antd";
import { createWorkspace } from "../../api/workspace";

const StepOne = ({ onNext }) => (
  <div className="space-y-6 text-center">
    <h1 className="text-xl font-semibold">What is your workspace for?</h1>
    <div className="flex justify-center gap-4">
      {["Personal", "Team"].map((option) => (
        <Button key={option} onClick={() => onNext(option)} className="py-3 px-6 rounded-lg shadow-md bg-white border border-gray-300 hover:border-purple-500 transition">
          {option}
        </Button>
      ))}
    </div>
  </div>
);

const StepTwo = ({ email, setEmail }) => (
  <div className="space-y-6 text-center">
    <h1 className="text-xl font-semibold">Invite team members</h1>
    <Input
      type="email"
      placeholder="Enter email addresses"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border rounded-md"
    />
  </div>
);

const StepThree = ({ workspaceName, setWorkspaceName, description, setDescription }) => (
  <div className="space-y-6 text-center">
    <h1 className="text-xl font-semibold">Name your workspace</h1>
    <Input
      placeholder="Workspace Name"
      value={workspaceName}
      onChange={(e) => setWorkspaceName(e.target.value)}
      className="w-full p-2 border rounded-md"
    />
    <Input.TextArea
      placeholder="Workspace Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full p-2 border rounded-md"
      rows={3}
    />
  </div>
);

export default function CreateWorkspace({ onClose, refreshWorkspaces, setCurrentWorkspace }) {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const totalSteps = 3;

  const handleNext = (selectedPurpose) => {
    if (step === 1 && selectedPurpose) setPurpose(selectedPurpose);
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => step > 1 && setStep(step - 1);

  const handleSubmit = async () => {
    if (!workspaceName.trim()) {
      message.error("Workspace name is required");
      return;
    }

    try {
      const newWorkspace = await createWorkspace({ name: workspaceName, description, type: purpose || "team" });
      message.success("Workspace created successfully!");
      refreshWorkspaces();
      setCurrentWorkspace(newWorkspace.workspace);
      onClose();
    } catch (error) {
      message.error("Failed to create workspace");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-[400px] rounded-lg p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          {step === 1 && <StepOne onNext={handleNext} />}
          {step === 2 && <StepTwo email={email} setEmail={setEmail} />}
          {step === 3 && <StepThree workspaceName={workspaceName} setWorkspaceName={setWorkspaceName} description={description} setDescription={setDescription} />}
        </div>

        <Progress percent={(step / totalSteps) * 100} showInfo={false} className="mb-4" />

        <div className="flex justify-between">
          <Button onClick={handleBack} disabled={step === 1} icon={<ChevronLeft />}>
            Back
          </Button>
          {step < totalSteps ? (
            <Button onClick={() => handleNext()} type="primary" icon={<ChevronRight />}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} type="primary">
              Create Workspace
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
