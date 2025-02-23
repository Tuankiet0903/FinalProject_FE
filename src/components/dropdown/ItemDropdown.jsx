import React, { useState } from 'react';
import { Dropdown, Modal, Input, Button, message } from 'antd';
import { MoreOutlined, LoadingOutlined } from '@ant-design/icons';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

export default function ItemDropdown({ type, item, onDelete, onUpdate, onCreate, className = "" }) {
  const [newName, setNewName] = useState(item?.name || "");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!newName.trim()) return;

    setIsLoading(true);
    try {
      await onUpdate({ ...item, name: newName.trim() });
      setIsUpdateModalOpen(false);
      message.success(`${type} updated successfully`);
    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
      message.error(`Failed to update ${type}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setIsLoading(true);
    try {
      await onCreate(newName.trim());
      setIsCreateModalOpen(false);
      message.success(`${type} created successfully`);
    } catch (error) {
      console.error(`Failed to create ${type}:`, error);
      message.error(`Failed to create ${type}`);
    } finally {
      setIsLoading(false);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: `This will permanently delete the ${type.toLowerCase()} "${item?.name}". This action cannot be undone.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        setIsLoading(true);
        try {
          await onDelete(item);
          message.success(`${type} deleted successfully`);
        } catch (error) {
          console.error(`Failed to delete ${type}:`, error);
          message.error(`Failed to delete ${type}`);
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  const items = [
    (type !== "list"  ) && {
      key: 'create',
      label: `Create New ${type === "space" ? "Folder" : "List"}`,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setNewName("");
        setIsCreateModalOpen(true);
      }
    },
    {
      key: 'update',
      label: `Update ${type}`,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        setNewName(item?.name || "");
        setIsUpdateModalOpen(true);
      }
    },
    {
      key: 'delete',
      label: `Delete ${type}`,
      danger: true,
      onClick: (e) => {
        e.domEvent.stopPropagation();
        showDeleteConfirm();
      }
    }
  ].filter(Boolean);

  return (
    <>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        onClick={e => e.stopPropagation()}
      >
        <MoreOutlined className={`text-gray-500 hover:text-gray-700 text-lg cursor-pointer ${className}`} />
      </Dropdown>

      {/* Update Modal */}
      <Modal
        title={`Update ${type}`}
        open={isUpdateModalOpen}
        onCancel={(e) => {
          e.stopPropagation();
          setIsUpdateModalOpen(false);
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsUpdateModalOpen(false)} disabled={isLoading}>Cancel</Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={handleUpdate} disabled={!newName.trim()}>Update</Button>
        ]}
      >
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={`Enter new ${type} name`} />
      </Modal>

      {/* Create Modal */}
      <Modal
        title={`Create New ${type === "space" ? "Folder" : "List"}`}
        open={isCreateModalOpen}
        onCancel={(e) => {
          e.stopPropagation();
          setIsCreateModalOpen(false);
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalOpen(false)} disabled={isLoading}>Cancel</Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
        ]}
      >
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={`Enter new ${type === "folder" ? "folder" : "list"} name`} />
      </Modal>
    </>
  );
}