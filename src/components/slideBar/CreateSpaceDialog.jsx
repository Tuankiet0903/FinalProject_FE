import { useState } from "react";
import { Button, Modal, Input, Switch, Typography, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createSpace } from "../../api/workspace";

const { Paragraph } = Typography;

export default function CreateSpaceDialog({ open = false, onOpenChange = () => {}, workspaceId, onSpaceCreated  }) {
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [useTemplate, setUseTemplate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if(!spaceName.trim()){
      message.error("Space name is required");
      return;
    }

    setLoading(true);
    try {
      await createSpace({
        name: spaceName,
        description: description,
        workspaceId: workspaceId,
      });

      message.success("Space created successfully!");
      onOpenChange(false);
      setSpaceName("");
      setDescription("");
      setIsPrivate(false);
      setUseTemplate(false);
      onSpaceCreated();
    } catch (error) {
      message.error("Failed to create space!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={open}
      onCancel={() => onOpenChange(false)}
      width={600} // 🔥 Tăng kích thước modal (có thể thay đổi tùy ý)
      centered // 🔥 Canh giữa modal trên màn hình
      footer={[
        <Button key="cancel" onClick={() => onOpenChange(false)} disabled={loading}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90" onClick={handleSubmit} loading={loading}>
          Continue
        </Button>,
      ]}
    >
      <Paragraph className="text-gray-500">
        A Space represents teams, departments, or groups, each with its own Lists, workflows, and settings.
      </Paragraph>

      <div className="space-y-6">
        {/* Icon & Name */}
        <div>
          <label className="text-base font-medium">Icon & name</label>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200"> {/* 🔥 Tăng kích thước icon */}
              <span className="text-2xl">{spaceName ? spaceName[0].toUpperCase() : "M"}</span>
            </div>
            <Input
            placeholder="e.g. Marketing, Engineering, HR"
            className="flex-1 text-lg py-2"
            value={spaceName}
            onChange={(e) => setSpaceName(e.target.value)}
          />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-base font-medium">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <TextArea
          className="mt-2 text-lg"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>

        {/* Make Private Switch */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">Make Private</label>
            <p className="text-sm text-gray-500">Only you and invited members have access</p>
          </div>
          <Switch checked={isPrivate} onChange={setIsPrivate} />
        </div>

        {/* Use Templates */}
        <div className="flex items-center justify-between">
          <label className="text-base font-medium">Use Templates</label>
          <Switch checked={useTemplate} onChange={setUseTemplate} />
        </div>
      </div>
    </Modal>
  );
}
