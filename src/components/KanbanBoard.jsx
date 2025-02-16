/* eslint-disable no-unused-vars */
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import mockTasks from "../lib/mockTasks";
import mockTaskColumns from "../lib/mockTaskColumns";

export default function KanbanBoard() {
   const [tasks, setTasks] = useState(mockTasks);

   // Hàm lấy màu nền nhạt của từng cột
   const getBackgroundColor = (color) => {
      const colors = {
         gray: "bg-gray-100",
         blue: "bg-blue-100",
         orange: "bg-orange-100",
         purple: "bg-purple-100",
         green: "bg-green-100",
      };
      return colors[color] || "bg-gray-100";
   };

   const getHeaderColor = (color) => {
      const colors = {
         gray: "bg-gray-500 text-white",
         blue: "bg-blue-500 text-white",
         orange: "bg-orange-500 text-white",
         purple: "bg-purple-500 text-white",
         green: "bg-green-500 text-white",
      };
      return colors[color] || "bg-gray-500 text-white";
   };

   // Xử lý kéo & thả
   const handleDragEnd = (result) => {
      if (!result.destination) return; // Nếu kéo ra ngoài thì không làm gì cả

      const { source, destination } = result;

      setTasks((prevTasks) => {
         const updatedTasks = [...prevTasks];
         const movedTask = updatedTasks.find((task) => task.taskId.toString() === result.draggableId);

         if (movedTask) {
            movedTask.taskColumnId = parseInt(destination.droppableId); // Cập nhật taskColumnId khi thả vào cột đích
         }

         return updatedTasks;
      });
   };

   return (
      <DragDropContext onDragEnd={handleDragEnd}>
         <div className="p-4 overflow-x-auto">
            <div className="flex space-x-4">
               {mockTaskColumns.map((column) => (
                  <Droppable key={column.columnId} droppableId={column.columnId.toString()}>
                     {(provided, snapshot) => (
                        <div
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                           className={`w-64 p-3 rounded-lg shadow-sm border border-gray-200 transition-colors ${snapshot.isDraggingOver ? "bg-gray-200" : getBackgroundColor(column.color)
                              }`}
                        >
                           {/* Tiêu đề cột */}
                           <div className={`flex items-center justify-between px-3 py-2 rounded-md font-semibold ${getHeaderColor(column.color)}`}>
                              <span>{column.name}</span>
                              <span className="text-xs">{tasks.filter((task) => task.taskColumnId === column.columnId).length}</span>
                           </div>

                           {/* Danh sách Task */}
                           <div className="space-y-3 mt-2">
                              {tasks
                                 .filter((task) => task.taskColumnId === column.columnId)
                                 .map((task, index) => (
                                    <Draggable key={task.taskId.toString()} draggableId={task.taskId.toString()} index={index}>
                                       {(provided) => (
                                          <div
                                             ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             className="bg-white p-3 rounded-md shadow-sm border border-gray-300 cursor-grab"
                                          >
                                             <p className="font-semibold text-black">{task.title}</p>
                                             <p className="text-xs text-gray-500 flex items-center">
                                                📅 {task.startDate} - {task.endDate}
                                             </p>
                                             <p className="text-xs text-gray-500 flex items-center">⚡ {task.priority}</p>
                                          </div>
                                       )}
                                    </Draggable>
                                 ))}
                              {provided.placeholder}
                           </div>

                           {/* Nút Thêm Task */}
                           <button className="mt-3 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm p-2 rounded-md">
                              + Add Task
                           </button>
                        </div>
                     )}
                  </Droppable>
               ))}
            </div>
         </div>
      </DragDropContext>
   );
}
