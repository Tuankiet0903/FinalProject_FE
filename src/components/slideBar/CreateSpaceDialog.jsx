import { CloseOutlined } from "@ant-design/icons"; // Import icon từ Ant Design
import { Button } from "antd"; // Thay vì shadcn/ui, dùng Ant Design
import { Modal, Input, Switch, Typography } from "antd"; // Dùng Modal thay cho Dialog
import { TextArea } from "antd/es/input"; // Textarea của Ant Design

const { Title, Paragraph } = Typography; // Ant Design Typography

export default function CreateSpaceDialog({ open = false, onOpenChange = () => {} }) {
  return (
    <Modal
      open={open}
      onCancel={() => onOpenChange(false)}
      footer={[
        <Button key="cancel" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90">
          Continue
        </Button>,
      ]}
    >
      <Paragraph className="text-gray-500">
        A Space represents teams, departments, or groups, each with its own Lists, workflows, and settings.
      </Paragraph>

      <div className="space-y-4">
        {/* Icon & Name */}
        <div>
          <label className="text-base font-medium">Icon & name</label>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <span className="text-lg">M</span>
            </div>
            <Input placeholder="e.g. Marketing, Engineering, HR" className="flex-1" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-base font-medium">Description <span className="text-gray-400">(optional)</span></label>
          <TextArea className="mt-2" />
        </div>

        {/* Make Private Switch */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">Make Private</label>
            <p className="text-sm text-gray-500">Only you and invited members have access</p>
          </div>
          <Switch />
        </div>

        {/* Use Templates */}
        <div>
          <label className="text-base font-medium">Use Templates</label>
        </div>
      </div>
    </Modal>
  );
}
