import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Switch, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Paragraph } = Typography;

export default function CreateSpaceDialog({ open = false, onOpenChange = () => {} }) {
  return (
    <Modal
      open={open}
      onCancel={() => onOpenChange(false)}
      width={600} // 🔥 Tăng kích thước modal (có thể thay đổi tùy ý)
      centered // 🔥 Canh giữa modal trên màn hình
      footer={[
        <Button key="cancel" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90" onClick={() => onOpenChange(false)}>
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
              <span className="text-2xl">M</span>
            </div>
            <Input placeholder="e.g. Marketing, Engineering, HR" className="flex-1 text-lg py-2" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-base font-medium">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <TextArea className="mt-2 text-lg" rows={4} /> {/* 🔥 Tăng chiều cao của textarea */}
        </div>

        {/* Make Private Switch */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">Make Private</label>
            <p className="text-sm text-gray-500">Only you and invited members have access</p>
          </div>
          <Switch size="default" />
        </div>

        {/* Use Templates */}
        <div>
          <label className="text-base font-medium">Use Templates</label>
        </div>
      </div>
    </Modal>
  );
}
