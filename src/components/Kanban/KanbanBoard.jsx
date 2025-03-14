import { useEffect, useState, useCallback, useRef } from "react"; // Add useRef
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { fetchTasksByColumn, createTask, updateTask, deleteTask } from "../../api/task";
import { fetchTaskColumnsByList, addTaskColumn } from "../../api/taskColumn";
import StatusModal from "./StatusModal";
import { MoreHorizontal, Plus, Flag, User, Calendar } from "lucide-react"; // Import MoreHorizontal and other icons
import { Modal, Button, Input, message, Dropdown } from 'antd'; // Thêm modal để nhập tên cột
import { useParams } from 'react-router-dom';
import DatePickerDialog from './DatePickerDialog';
import dayjs from 'dayjs'; // Add this import

// Add this mapping constant at the top of your file after imports
const colorStatusMap = {
   gray: { status: 1, color: 'gray' },
   blue: { status: 2, color: 'blue' },
   green: { status: 3, color: 'green' }
};

export default function KanbanBoard() {
   const { listId } = useParams();
   const [tasks, setTasks] = useState([]);
   const [columns, setColumns] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isModalStatusOpen, setIsModalStatusOpen] = useState(false);
   const [modalColumnId, setModalColumnId] = useState(null);
   const [newColumnName, setNewColumnName] = useState("");
   const [newColumnColor, setNewColumnColor] = useState("gray");
   const [userId, setUserId] = useState(null);
   const [loading, setLoading] = useState(false);
   const [activeTaskForm, setActiveTaskForm] = useState(null);
   const [newTaskName, setNewTaskName] = useState("");
   const taskFormRef = useRef(null); // Add ref for task form
   const datePickerRef = useRef(null); // Add datePickerRef
   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
   const [taskDates, setTaskDates] = useState({
      startDate: null,
      endDate: null
   });
   const [activeColumnForDates, setActiveColumnForDates] = useState(null);
   const [selectedPriority, setSelectedPriority] = useState("")
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [selectedTaskId, setSelectedTaskId] = useState(null);
   const [isEditMode, setIsEditMode] = useState(false);
   const [editingTask, setEditingTask] = useState(null);
   const [editingTaskId, setEditingTaskId] = useState(null); // Add editingTaskId
   const editFormRef = useRef(null);

   const fetchColumns = useCallback(async () => {
      try {
         setLoading(true);
         const fetchedColumns = await fetchTaskColumnsByList(listId);
         // Sort columns by status (1 to 3)
         const sortedColumns = fetchedColumns.sort((a, b) => a.status - b.status);
         setColumns(sortedColumns);
      } catch (error) {
         message.error('Failed to fetch columns');
      } finally {
         setLoading(false);
      }
   }, [listId]);

   // Lấy danh sách các cột của list từ backend
   useEffect(() => {
      fetchColumns();
   }, [fetchColumns]);

   // Move fetchAllTasks outside of useEffect and make it a component function
   const fetchAllTasks = async () => {
      try {
         let allTasks = [];
         for (const column of columns) {
            const columnTasks = await fetchTasksByColumn(column.columnId);
            allTasks = [...allTasks, ...columnTasks];
         }
         setTasks(allTasks);
      } catch (error) {
         console.error("Failed to fetch tasks:", error);
         message.error('Failed to fetch tasks');
      }
   };

   // Update the useEffect that uses fetchAllTasks
   useEffect(() => {
      if (columns.length > 0) {
         fetchAllTasks();
      }
   }, [columns]);

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
         try {
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Giải mã token
            setUserId(decodedToken.userId); // Lưu userId vào state
         } catch (error) {
            console.error("Failed to decode token:", error);
         }
      }
   }, []);

   // Click outside handler
   useEffect(() => {
      function handleClickOutside(event) {
         if (taskFormRef.current &&
            !taskFormRef.current.contains(event.target) &&
            !event.target.closest('.ant-modal') && // Check for modal
            !event.target.closest('.ant-dropdown') && // check for dropdown menu
            !event.target.closest('.ant-dropdown-trigger') && // check for dropdown trigger
            !event.target.closest('.ant-picker-dropdown')) { // check for date picker dropdown
            setActiveTaskForm(null);
            setNewTaskName("");
            setTaskDates({ startDate: null, endDate: null });
            setSelectedPriority("");
         }

         if (editFormRef.current &&
            !editFormRef.current.contains(event.target) &&
            !event.target.closest('.ant-modal') &&
            !event.target.closest('.ant-dropdown') &&
            !event.target.closest('.ant-dropdown-trigger') &&
            !event.target.closest('.ant-picker-dropdown')) {
            // Reset Edit form
            setEditingTaskId(null);
            setEditingTask(null);
            setNewTaskName("");
            setSelectedPriority("");
            setTaskDates({ startDate: null, endDate: null });
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   // Add this handler
   const handleDateSelect = (dates) => {
      if (dates && dates.length === 2) {
         setTaskDates({
            startDate: dayjs(dates[0]),
            endDate: dayjs(dates[1])
         });
         setIsDatePickerOpen(false); // Close the date picker after selection
      }
   };

   // Add this to handle opening the date picker
   const handleOpenDatePicker = (columnId) => {
      setActiveColumnForDates(columnId);
      setIsDatePickerOpen(true);
   };

   // Update the handleAddColumn function
   const handleAddColumn = async (e) => {
      e.preventDefault();
      if (!userId) {
         message.error('Please login first');
         return;
      }

      if (!listId) {
         message.error('List ID is not available');
         return;
      }

      if (!newColumnName.trim()) {
         message.error('Column name cannot be empty');
         return;
      }

      try {
         setLoading(true);
         const { status } = colorStatusMap[newColumnColor];

         await addTaskColumn(
            listId,
            newColumnName.trim(),
            newColumnColor,
            userId,
            status
         );

         await fetchColumns(); // Refresh the columns
         setIsModalOpen(false);
         setNewColumnName('');
         setNewColumnColor('gray');
         message.success('Column added successfully');
      } catch (error) {
         const errorMessage = error.response?.data?.message || 'Failed to add column';
         message.error(errorMessage);
         console.error("Error adding task column:", error);
      } finally {
         setLoading(false);
      }
   };

   const priorityItems = [
      {
         key: "Urgent",
         label: "Urgent",
         icon: <Flag className="h-3 w-3 text-red-500" />,
         textColor: "text-red-500"
      },
      {
         key: "High",
         label: "High",
         icon: <Flag className="h-3 w-3 text-yellow-500" />,
         textColor: "text-yellow-500"
      },
      {
         key: "Normal",
         label: "Normal",
         icon: <Flag className="h-3 w-3 text-blue-500" />,
         textColor: "text-blue-500"
      }
   ];

   const handlePrioritySelect = (key) => {
      if (key === "clear") {
         setSelectedPriority("");
      } else {
         setSelectedPriority(key);
      }
   };

   // Hàm kéo thả
   const handleDragEnd = async (result) => {
      const { source, destination, draggableId } = result;

      // Return if dropped outside or in the same position
      if (!destination ||
         (source.droppableId === destination.droppableId &&
            source.index === destination.index)) {
         return;
      }

      try {
         // Find the task being moved
         const taskToMove = tasks.find(task => task.taskId.toString() === draggableId);

         // Find the destination column
         const destinationColumn = columns.find(
            column => column.columnId.toString() === destination.droppableId
         );

         if (!taskToMove || !destinationColumn) return;

         // Update task in backend
         await updateTask(taskToMove.taskId, {
            taskColumnId: parseInt(destination.droppableId),
            status: destinationColumn.status
         });

         // Update tasks in state
         setTasks(prevTasks =>
            prevTasks.map(task =>
               task.taskId.toString() === draggableId
                  ? {
                     ...task,
                     taskColumnId: parseInt(destination.droppableId),
                     status: destinationColumn.status
                  }
                  : task
            )
         );

         message.success('Task moved successfully');
      } catch (error) {
         console.error('Error moving task:', error);
         message.error('Failed to move task');
      }
   };

   const handleOpenStatusModal = (columnId) => {
      setModalColumnId(columnId); // Ghi nhận ID cột
      setIsModalStatusOpen(true); // Mở modal
   };

   const handleCloseStatusModal = () => {
      setIsModalStatusOpen(false); // Đóng modal
      setModalColumnId(null); // Reset ID cột
   };


   const handleOpenModal = () => {
      setIsModalOpen(true); // Mở modal
   };

   const handleCloseModal = () => {
      setIsModalOpen(false); // Đóng modal
   };

   // Hàm hỗ trợ hiển thị màu nền của cột dựa trên màu của cột (có thể điều chỉnh thêm)
   const getBackgroundColor = (color) => {
      const colors = {
         gray: "bg-gray-50",
         blue: "bg-blue-50",
         green: "bg-green-50",
      };
      return colors[color] || "bg-gray-50";
   };

   // Hàm hiển thị màu header dựa trên màu cột
   const getHeaderColor = (color) => {
      const colors = {
         gray: "bg-gray-400 text-white",
         blue: "bg-blue-500 text-white",
         green: "bg-green-500 text-white",
      };
      return colors[color] || "bg-gray-500 text-white";
   };

   const handleUpdateColumn = async () => {
      await fetchColumns();
   };

   const getPriorityIcon = () => {
      const selectedItem = priorityItems.find(item => item.key === selectedPriority);
      return selectedItem ? selectedItem.icon : <Flag className="h-3 w-3 text-gray-400" />;
   };

   // Thêm task
   const handleTaskSubmit = async () => {
      if (!newTaskName.trim()) {
         message.error('Task name cannot be empty');
         return;
      }

      try {
         const taskData = {
            title: newTaskName.trim(),
            priority: selectedPriority || 'normal',
            startDate: taskDates.startDate ? taskDates.startDate.format('YYYY-MM-DD') : null,
            endDate: taskDates.endDate ? taskDates.endDate.format('YYYY-MM-DD') : null,
            userId: userId,
            status: 1
         };

         if (isEditMode && editingTask) {
            await updateTask(editingTask.taskId, taskData);
            message.success('Task updated successfully');
         } else {
            taskData.taskColumnId = activeTaskForm;
            await createTask(taskData);
            message.success('Task created successfully');
         }

         await fetchAllTasks();

         // Reset form
         setNewTaskName('');
         setSelectedPriority('');
         setTaskDates({ startDate: null, endDate: null });
         setActiveTaskForm(null);
         setIsEditMode(false);
         setEditingTask(null);
      } catch (error) {
         const errorMessage = error.response?.data?.message || 'Failed to save task';
         message.error(errorMessage);
         console.error("Error saving task:", error);
      }
   };

   const handleTaskAction = (task, action) => {
      if (action === 'edit') {
         setEditingTaskId(task.taskId);
         setEditingTask(task);
         setNewTaskName(task.title);
         setSelectedPriority(task.priority);
         setTaskDates({
            startDate: task.startDate ? dayjs(task.startDate) : null,
            endDate: task.endDate ? dayjs(task.endDate) : null
         });
      } else if (action === 'delete') {
         setSelectedTaskId(task.taskId);
         setIsDeleteModalOpen(true);
      }
   };

   const handleDeleteTask = async () => {
      try {
         await deleteTask(selectedTaskId);
         await fetchAllTasks();
         setIsDeleteModalOpen(false);
         message.success('Task deleted successfully');
      } catch (error) {
         message.error('Failed to delete task');
         console.error('Error deleting task:', error);
      }
   };

   return (
      <DragDropContext onDragEnd={handleDragEnd}>
         <div className="p-4">
            <div className="flex gap-4">
               {columns.map((column) => (
                  <div
                     key={column.columnId}
                     className={`w-[300px] rounded-lg ${getBackgroundColor(column.color)} shadow-md`}
                  >
                     <div className="p-2">
                        {/* Header của cột */}
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-2">
                              <div
                                 className={`w-2 h-2 rounded-full ${getHeaderColor(column.color)}`}

                              />
                              <span className="font-medium">{column.name}</span>
                              <span className="text-sm text-gray-500">
                                 {tasks.filter((task) => task.taskColumnId === column.columnId).length}
                              </span>
                           </div>
                           <button
                              className="p-1 hover:bg-gray-200 rounded"
                              onClick={() => handleOpenStatusModal(column.columnId)} // Pass the columnId
                           >
                              <MoreHorizontal className="w-5 h-5 text-gray-500" />
                           </button>
                        </div>

                        {/* Nút thêm task */}
                        {column.columnId === activeTaskForm ? (
                           <div
                              ref={taskFormRef}
                              className="bg-white border border-[rgb(96,73,231)] rounded-md p-3 w-full"
                           >
                              <div className="flex items-center justify-between mb-2">
                                 <Input
                                    placeholder="Task Name..."
                                    className="flex-1 mr-2 h-7 text-sm"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                 />
                                 <Button
                                    size="sm"
                                    className="text-xs bg-[rgb(96,73,231)] hover:bg-[rgb(86,63,221)] text-white h-7 px-3 flex-shrink-0"
                                    onClick={handleTaskSubmit}
                                 >
                                    {isEditMode ? 'Update' : 'Save'}
                                 </Button>
                              </div>
                              <div className="flex flex-col w-full">
                                 <Button
                                    type="text"
                                    size="small"
                                    className="text-xs text-gray-400 p-1 h-auto w-full justify-start text-left"
                                 >
                                    <User className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">Add assignee</span>
                                 </Button>
                                 <Button
                                    type="text"
                                    size="small"
                                    className="text-xs text-gray-400 p-1 h-auto w-full justify-start mt-1 text-left"
                                    onClick={() => setIsDatePickerOpen(true)}
                                 >
                                    <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                                    <span className="truncate">
                                       {taskDates.startDate && taskDates.endDate
                                          ? `${taskDates.startDate.format('DD/MM')} - ${taskDates.endDate.format('DD/MM')}`
                                          : "Add dates"}
                                    </span>
                                 </Button>
                                 <Dropdown
                                    menu={{
                                       items: [
                                          ...priorityItems.map(item => ({
                                             key: item.key,
                                             label: (
                                                <div className="flex items-center text-xs">
                                                   {item.icon}
                                                   <span className={`ml-2 ${item.textColor}`}>{item.label}</span>
                                                </div>
                                             ),
                                             onClick: () => handlePrioritySelect(item.key)
                                          })),
                                          {
                                             type: 'divider'
                                          },
                                          {
                                             key: 'clear',
                                             label: (
                                                <div className="flex items-center text-xs">
                                                   <div className="w-3 h-3" />
                                                   <span className="ml-2">Clear</span>
                                                </div>
                                             ),
                                             onClick: () => handlePrioritySelect("clear")
                                          }
                                       ]
                                    }}
                                    trigger={['click']}
                                 >
                                    <Button
                                       type="text"
                                       size="small"
                                       className={`text-xs ${selectedPriority ? priorityItems.find(item => item.key === selectedPriority)?.textColor : "text-gray-400"} p-1 h-auto w-full justify-start mt-1 text-left`}
                                    >
                                       {getPriorityIcon()}
                                       <span className="truncate ml-1">
                                          {selectedPriority
                                             ? priorityItems.find((item) => item.key === selectedPriority)?.label
                                             : "Add priority"}
                                       </span>
                                    </Button>
                                 </Dropdown>
                              </div>
                           </div>
                        ) : (
                           <button
                              className={`flex items-center gap-2 w-full p-2 text-gray-500 hover:bg-gray-200 rounded mb-2 ${getBackgroundColor(column.color)}`}
                              onClick={() => setActiveTaskForm(column.columnId)}
                           >
                              <Plus className="w-4 h-4 flex-shrink-0" />
                              <span>Add Task</span>
                           </button>
                        )}

                        {/* Danh sách task */}
                        <Droppable droppableId={column.columnId.toString()}>
                           {(provided) => (
                              <div
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                                 className="space-y-3 min-h-[50px]" // Add min-height
                              >
                                 {tasks
                                    .filter((task) => task.taskColumnId === column.columnId)
                                    .map((task, index) => (
                                       <Draggable
                                          key={task.taskId.toString()}
                                          draggableId={task.taskId.toString()}
                                          index={index}
                                       >
                                          {(provided, snapshot) => (
                                             <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`bg-white p-3 rounded-lg shadow-sm mb-2 ${snapshot.isDragging ? 'opacity-50' : ''
                                                   }`}
                                             >
                                                {editingTaskId === task.taskId ? (
                                                   // Editing form
                                                   <div
                                                      ref={editFormRef}
                                                      className="bg-white rounded-md w-full">
                                                      <div className="flex items-center justify-between mb-2">
                                                         <Input
                                                            placeholder="Task Name..."
                                                            className="flex-1 mr-2 h-7 text-sm"
                                                            value={newTaskName}
                                                            onChange={(e) => setNewTaskName(e.target.value)}
                                                         />
                                                         <Button
                                                            size="sm"
                                                            className="text-xs bg-[rgb(96,73,231)] hover:bg-[rgb(86,63,221)] text-white h-7 px-3 flex-shrink-0"
                                                            onClick={async () => {
                                                               await handleTaskSubmit();
                                                               setEditingTaskId(null);
                                                            }}
                                                         >
                                                            Update
                                                         </Button>
                                                      </div>
                                                      <div className="flex flex-col w-full">
                                                         <Button
                                                            type="text"
                                                            size="small"
                                                            className="text-xs text-gray-400 p-1 h-auto w-full justify-start text-left"
                                                         >
                                                            <User className="w-3 h-3 mr-1 flex-shrink-0" />
                                                            <span className="truncate">Add assignee</span>
                                                         </Button>
                                                         <Button
                                                            type="text"
                                                            size="small"
                                                            className="text-xs text-gray-400 p-1 h-auto w-full justify-start mt-1 text-left"
                                                            onClick={() => setIsDatePickerOpen(true)}
                                                         >
                                                            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                                                            <span className="truncate">
                                                               {taskDates.startDate && taskDates.endDate
                                                                  ? `${taskDates.startDate.format('DD/MM')} - ${taskDates.endDate.format('DD/MM')}`
                                                                  : "Add dates"}
                                                            </span>
                                                         </Button>
                                                         <Dropdown
                                                            menu={{
                                                               items: [
                                                                  ...priorityItems.map(item => ({
                                                                     key: item.key,
                                                                     label: (
                                                                        <div className="flex items-center text-xs">
                                                                           {item.icon}
                                                                           <span className={`ml-2 ${item.textColor}`}>{item.label}</span>
                                                                        </div>
                                                                     ),
                                                                     onClick: () => handlePrioritySelect(item.key)
                                                                  })),
                                                                  {
                                                                     type: 'divider'
                                                                  },
                                                                  {
                                                                     key: 'clear',
                                                                     label: (
                                                                        <div className="flex items-center text-xs">
                                                                           <div className="w-3 h-3" />
                                                                           <span className="ml-2">Clear</span>
                                                                        </div>
                                                                     ),
                                                                     onClick: () => handlePrioritySelect("clear")
                                                                  }
                                                               ]
                                                            }}
                                                            trigger={['click']}
                                                         >
                                                            <Button
                                                               type="text"
                                                               size="small"
                                                               className={`text-xs ${selectedPriority ? priorityItems.find(item => item.key === selectedPriority)?.textColor : "text-gray-400"} p-1 h-auto w-full justify-start mt-1 text-left`}
                                                            >
                                                               {getPriorityIcon()}
                                                               <span className="truncate ml-1">
                                                                  {selectedPriority
                                                                     ? priorityItems.find((item) => item.key === selectedPriority)?.label
                                                                     : "Add priority"}
                                                               </span>
                                                            </Button>
                                                         </Dropdown>
                                                      </div>
                                                   </div>
                                                ) : (
                                                   // Normal task view
                                                   <>
                                                      <div className="flex justify-between items-start mb-2">
                                                         <h3 className="font-medium">{task.title}</h3>
                                                         <Dropdown
                                                            menu={{
                                                               items: [
                                                                  {
                                                                     key: 'edit',
                                                                     label: 'Update',
                                                                     onClick: () => handleTaskAction(task, 'edit')
                                                                  },
                                                                  {
                                                                     key: 'delete',
                                                                     label: 'Delete',
                                                                     danger: true,
                                                                     onClick: () => handleTaskAction(task, 'delete')
                                                                  }
                                                               ]
                                                            }}
                                                            trigger={['click']}
                                                         >
                                                            <Button
                                                               type="text"
                                                               className="p-0 h-auto"
                                                               icon={<MoreHorizontal className="w-4 h-4 text-gray-500" />}
                                                            />
                                                         </Dropdown>
                                                      </div>
                                                      <div className="flex items-center justify-between">
                                                         <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center">
                                                               KT
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                               {task.startDate && task.endDate
                                                                  ? `${dayjs(task.startDate).format('MMM D')} - ${dayjs(task.endDate).format('MMM D')}`
                                                                  : "No dates"}
                                                            </span>
                                                         </div>
                                                         <div className="flex items-center gap-1 text-sm">
                                                            {(() => {
                                                               const priorityItem = priorityItems.find(item =>
                                                                  item.key.toLowerCase() === task.priority?.toLowerCase()
                                                               );
                                                               return priorityItem ? (
                                                                  <>
                                                                     <Flag className={`w-4 h-4 ${priorityItem.textColor}`} />
                                                                     <span className={priorityItem.textColor}>
                                                                        {priorityItem.label}
                                                                     </span>
                                                                  </>
                                                               ) : (
                                                                  <>
                                                                     <Flag className="w-4 h-4 text-blue-500" />
                                                                     <span className="text-blue-500">Normal</span>
                                                                  </>
                                                               );
                                                            })()}
                                                         </div>
                                                      </div>
                                                   </>
                                                )}
                                             </div>
                                          )}
                                       </Draggable>
                                    ))}
                                 {provided.placeholder}
                              </div>
                           )}
                        </Droppable>
                     </div>
                  </div>
               ))}

               {/* Thêm cột "Add Group" */}
               <div className="w-[300px] bg-gray-50 rounded-lg shadow-md">
                  <div className="p-2">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-gray-400" />
                           <span className="font-medium">Add Group</span>
                        </div>
                     </div>
                     <button
                        className="flex items-center gap-2 w-full p-2 text-gray-500 hover:bg-gray-200 rounded mb-2"
                        onClick={handleOpenModal}
                     >
                        <Plus className="w-4 h-4" />
                        <span>Add Group</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Modal for Add Group */}
         {isModalOpen && (
            <Modal
               title="Add Group"
               open={isModalOpen}  // Changed from visible to open
               onCancel={handleCloseModal}
               footer={null}
            >
               <div className="space-y-4">
                  {/* Nhập tên nhóm */}
                  <div className="flex gap-2">
                     <Input
                        placeholder="Status name"
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                     />
                     <Button onClick={handleAddColumn} type="primary">
                        Save
                     </Button>
                  </div>

                  {/* Chọn màu */}
                  <div className="space-y-2">
                     <span className="font-medium">Color</span>
                     <div className="flex gap-2">
                        <button
                           className={`w-6 h-6 rounded-full ${newColumnColor === "gray" ? "ring-2 ring-offset-2" : ""}`}
                           style={{ backgroundColor: "gray" }}
                           onClick={() => setNewColumnColor("gray")}
                        />
                        <button
                           className={`w-6 h-6 rounded-full ${newColumnColor === "blue" ? "ring-2 ring-offset-2" : ""}`}
                           style={{ backgroundColor: "blue" }}
                           onClick={() => setNewColumnColor("blue")}
                        />
                        <button
                           className={`w-6 h-6 rounded-full ${newColumnColor === "green" ? "ring-2 ring-offset-2" : ""}`}
                           style={{ backgroundColor: "green" }}
                           onClick={() => setNewColumnColor("green")}
                        />
                     </div>
                  </div>
               </div>
            </Modal>
         )}

         {/* Modal for Sprint Status */}
         {isModalStatusOpen && (
            <StatusModal
               columnId={modalColumnId}
               onClose={handleCloseStatusModal}
               visible={isModalStatusOpen}
               onUpdateColumn={handleUpdateColumn}
            />
         )}

         {/* Add the DatePickerDialog component at the bottom of your return statement */}
         <DatePickerDialog
            open={isDatePickerOpen}
            onOpenChange={setIsDatePickerOpen}
            onDateSelect={handleDateSelect}
         />

         {/* Fix the Delete Task Modal */}
         <Modal
            title="Delete Task"
            open={isDeleteModalOpen}
            onCancel={() => setIsDeleteModalOpen(false)}
            footer={[
               <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>
                  No
               </Button>,
               <Button
                  key="submit"
                  type="primary"
                  danger
                  onClick={handleDeleteTask}
               >
                  Yes
               </Button>
            ]}
         >
            <p>Are you sure you want to delete this task?</p>
         </Modal>
      </DragDropContext>
   );
}
