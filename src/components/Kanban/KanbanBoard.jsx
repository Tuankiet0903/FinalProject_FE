import { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { fetchTasksByColumn } from "../../api/task";
import { fetchTaskColumnsByList, addTaskColumn } from "../../api/taskColumn";
import StatusModal from "./StatusModal";
import { MoreHorizontal, Plus, Flag } from "lucide-react"; // Import MoreHorizontal and other icons
import { Modal, Button, Input, message } from 'antd'; // Thêm modal để nhập tên cột
import { useParams } from 'react-router-dom';

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

   // Sau khi có các cột, lấy các task thuộc từng cột
   useEffect(() => {
      const fetchAllTasks = async () => {
         try {
            let allTasks = [];
            // Duyệt qua từng cột và lấy tasks tương ứng
            for (const column of columns) {
               const columnTasks = await fetchTasksByColumn(column.columnId);
               allTasks = [...allTasks, ...columnTasks];
            }
            setTasks(allTasks);
         } catch (error) {
            console.error("Failed to fetch tasks:", error);
         }
      };

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

   // Xử lý kéo & thả task
   const handleDragEnd = async (result) => {
      if (!result.destination) return; // Nếu kéo ra ngoài thì không làm gì cả

      const { source, destination, draggableId } = result;
      const movedTask = tasks.find(
         (task) => task.taskId.toString() === draggableId
      );

      if (movedTask) {
         try {
            await updateTask(movedTask.taskId, {
               taskColumnId: parseInt(destination.droppableId),
            });
            setTasks((prevTasks) =>
               prevTasks.map((task) =>
                  task.taskId === movedTask.taskId
                     ? { ...task, taskColumnId: parseInt(destination.droppableId) }
                     : task
               )
            );
         } catch (error) {
            console.error("Failed to update task column:", error);
         }
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
                        <button
                           className={`flex items-center gap-2 w-full p-2 text-gray-500 hover:bg-gray-200 rounded mb-2 ${getBackgroundColor(column.color)}`}
                        >
                           <Plus className="w-4 h-4" />
                           <span>Add Task</span>
                        </button>

                        {/* Danh sách task */}
                        <div className="space-y-3">
                           {tasks
                              .filter((task) => task.taskColumnId === column.columnId)
                              .map((task, index) => (
                                 <div
                                    key={task.taskId.toString()}
                                    className="bg-white p-3 rounded-lg shadow-sm mb-2"
                                 >
                                    <h3 className="font-medium mb-2">{task.title}</h3>
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-2">
                                          <div
                                             className="w-6 h-6 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center"
                                          >
                                             KT
                                          </div>
                                          <span className="text-sm text-gray-500">
                                             {task.startDate} - {task.endDate}
                                          </span>
                                       </div>
                                       <div className="flex items-center gap-1 text-sm text-gray-500">
                                          <Flag className="w-4 h-4" />
                                          <span>{task.priority}</span>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                        </div>
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
      </DragDropContext>
   );
}
