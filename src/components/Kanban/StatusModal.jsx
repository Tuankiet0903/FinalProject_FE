import { Modal, Radio, Button, Select, Tooltip, message, Dropdown, Input, Popconfirm } from 'antd';
import { X, Plus, MoreHorizontal, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { fetchTaskColumnsByList, updateTaskColumn, deleteTaskColumn } from '../../api/taskColumn';
import { useParams } from 'react-router-dom';

const sections = {
   notStarted: {
      title: "Not started",
      tooltip: "Tasks not started yet",
      status: 1,
      color: "gray"
   },
   active: {
      title: "Active",
      tooltip: "Tasks in progress",
      status: 2,
      color: "blue"
   },
   done: {
      title: "Done",
      tooltip: "Completed tasks",
      status: 3,
      color: "green"
   }
};

export default function StatusModal({ columnId, onClose, visible, onUpdateColumn }) {
   const { listId } = useParams();
   const [loading, setLoading] = useState(false);
   const [columns, setColumns] = useState([]);
   const [selectedColumn, setSelectedColumn] = useState(null);
   const [isEditingName, setIsEditingName] = useState(false);
   const [editingName, setEditingName] = useState('');

   const fetchColumnsData = async () => {
      try {
         setLoading(true);
         const fetchedColumns = await fetchTaskColumnsByList(listId);
         setColumns(fetchedColumns);
         const selected = fetchedColumns.find(col => col.columnId === columnId);
         setSelectedColumn(selected);
      } catch (error) {
         message.error('Failed to fetch columns');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (listId && visible) {
         fetchColumnsData();
      }
   }, [listId, visible]);

   const handleEditName = async () => {
      if (!editingName.trim()) {
         message.error('Column name cannot be empty');
         return;
      }

      try {
         setLoading(true);
         await updateTaskColumn(selectedColumn.columnId, {
            ...selectedColumn,
            name: editingName
         });

         await fetchColumnsData();
         onUpdateColumn();
         setIsEditingName(false);
         message.success('Column name updated successfully');
      } catch (error) {
         message.error('Failed to update column name');
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async () => {
      try {
         setLoading(true);
         await deleteTaskColumn(selectedColumn.columnId);
         onUpdateColumn();
         message.success('Column deleted successfully');
         onClose();
      } catch (error) {
         message.error('Failed to delete column');
      } finally {
         setLoading(false);
      }
   };

   const handleDragEnd = async (result) => {
      if (!result.destination || !selectedColumn) return;

      const sectionId = result.destination.droppableId;
      const newStatus = sections[sectionId].status;
      const newColor = sections[sectionId].color;

      try {
         setLoading(true);
         await updateTaskColumn(selectedColumn.columnId, {
            status: newStatus,
            color: newColor,
            name: selectedColumn.name
         });

         await fetchColumnsData();
         onUpdateColumn();
         message.success('Column status updated successfully');
      } catch (error) {
         message.error('Failed to update column status');
      } finally {
         setLoading(false);
      }
   };

   const dropdownItems = [
      {
         key: 'edit',
         label: 'Edit name',
         onClick: () => {
            setEditingName(selectedColumn.name);
            setIsEditingName(true);
         }
      },
      {
         key: 'delete',
         label: (
            <Popconfirm
               title="Delete column"
               description="Are you sure you want to delete this column?"
               onConfirm={handleDelete}
               okText="Yes"
               cancelText="No"
               okButtonProps={{ danger: true }}
            >
               <span className="text-red-500">Delete</span>
            </Popconfirm>
         )
      }
   ];

   return (
      <>
         <Modal
            open={visible}
            title={`Edit Status for ${selectedColumn?.name || ''}`}
            onCancel={onClose}
            footer={null}
            width={800}
            bodyStyle={{ maxHeight: '90vh', overflow: 'auto' }}
         >
            <DragDropContext onDragEnd={handleDragEnd}>
               <div className="grid grid-cols-[300px_1fr] divide-x">
                  {/* Left Side */}
                  <div className="p-6 space-y-6">
                     <div className="space-y-4">
                        <div className="flex items-center gap-2">
                           <span className="font-medium">Status type</span>
                           <Tooltip title="Choose the type of status for this column">
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                           </Tooltip>
                        </div>
                        <Radio.Group defaultValue="custom" className="space-y-2">
                           <Radio value="inherit">Inherit from Space</Radio>
                           <Radio value="custom">Use custom statuses</Radio>
                        </Radio.Group>
                     </div>

                     <div className="space-y-2">
                        <label className="font-medium">Status template</label>
                        <Select className="w-full" defaultValue="custom">
                           <Select.Option value="custom">Custom</Select.Option>
                        </Select>
                     </div>
                  </div>

                  {/* Right Side - Status Sections */}
                  <div className="p-6 space-y-6">
                     {Object.entries(sections).map(([sectionId, section]) => (
                        <Droppable key={sectionId} droppableId={sectionId}>
                           {(provided) => (
                              <div
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                                 className="space-y-3"
                              >
                                 <div className="flex items-center gap-2">
                                    <span className="font-medium">{section.title}</span>
                                    <Tooltip title={section.tooltip}>
                                       <HelpCircle className="h-4 w-4 text-gray-400" />
                                    </Tooltip>
                                 </div>

                                 <div className="space-y-2">
                                    {columns
                                       .filter(col => col.status === section.status)
                                       .map(col => (
                                          col.columnId === selectedColumn?.columnId ? (
                                             <Draggable
                                                key={col.columnId}
                                                draggableId={col.columnId.toString()}
                                                index={0}
                                             >
                                                {(provided) => (
                                                   <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      {...provided.dragHandleProps}
                                                      className="flex items-center gap-2 p-2 border rounded-md border-purple-500 bg-purple-50 cursor-move"
                                                   >
                                                      <div
                                                         className={`h-2 w-2 rounded-full bg-${section.color}-400`}
                                                      />
                                                      <span>{col.name}</span>
                                                      <Dropdown
                                                         menu={{ items: dropdownItems }}
                                                         trigger={['click']}
                                                      >
                                                         <MoreHorizontal className="h-5 w-5 ml-auto text-gray-400 cursor-pointer" />
                                                      </Dropdown>
                                                   </div>
                                                )}
                                             </Draggable>
                                          ) : (
                                             <div
                                                key={col.columnId}
                                                className="flex items-center gap-2 p-2 border rounded-md"
                                             >
                                                <div
                                                   className={`h-2 w-2 rounded-full bg-${section.color}-400`}
                                                />
                                                <span>{col.name}</span>
                                             </div>
                                          )
                                       ))}
                                 </div>
                                 {provided.placeholder}
                              </div>
                           )}
                        </Droppable>
                     ))}
                  </div>
               </div>
            </DragDropContext>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
               <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HelpCircle className="h-4 w-4" />
                  <a href="#" className="hover:underline">
                     Learn more about statuses
                  </a>
               </div>
               <div className="flex items-center gap-3">
                  <Button onClick={onClose}>
                     Cancel
                  </Button>
                  <Button
                     type="primary"
                     className="bg-purple-600 hover:bg-purple-700"
                     onClick={onClose}
                     loading={loading}
                  >
                     Done
                  </Button>
               </div>
            </div>
         </Modal>

         {/* Edit Name Modal */}
         <Modal
            title="Edit column name"
            open={isEditingName}
            onCancel={() => setIsEditingName(false)}
            footer={[
               <Button key="cancel" onClick={() => setIsEditingName(false)}>
                  Cancel
               </Button>,
               <Button
                  key="submit"
                  type="primary"
                  onClick={handleEditName}
                  loading={loading}
               >
                  Save
               </Button>
            ]}
         >
            <Input
               value={editingName}
               onChange={e => setEditingName(e.target.value)}
               placeholder="Enter column name"
            />
         </Modal>
      </>
   );
}