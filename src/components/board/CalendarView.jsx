import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import mockTasks from '../../lib/mockTasks';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [tasksByDate, setTasksByDate] = useState({});

  // Lấy ngày đầu tiên của tháng
  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  };

  // Lấy ngày cuối cùng của tháng
  const getLastDayOfMonth = (date) => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  };

  // Tạo mảng các ngày để hiển thị trên lịch
  const generateCalendarDays = (date) => {
    const firstDay = getFirstDayOfMonth(date);
    const lastDay = getLastDayOfMonth(date);
    
    // Lấy số ngày trong tháng
    const daysInMonth = lastDay.getDate();
    
    // Lấy ngày trong tuần của ngày đầu tiên (0 = Chủ Nhật, 1 = Thứ Hai, ...)
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Thêm ngày từ tháng trước
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(date.getFullYear(), date.getMonth() - 1, prevMonthLastDay - i);
      days.push({
        date: prevDate,
        isCurrentMonth: false
      });
    }
    
    // Thêm ngày trong tháng hiện tại
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      days.push({
        date: currentDate,
        isCurrentMonth: true
      });
    }
    
    // Thêm ngày từ tháng sau
    const remainingDays = 42 - days.length; // 6 hàng x 7 ngày = 42 ô
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // Tháng trước
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Tháng sau
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Chuyển về tháng hiện tại
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format date thành string YYYY-MM-DD
  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const groupTasksByDate = (tasks) => {
    const taskMap = {};
    
    tasks.forEach(task => {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      
      if (isNaN(start) || isNaN(end)) {
        console.error(`Invalid date for task ${task.taskId}:`, task.startDate, task.endDate);
        return;
      }
      
      let currentDay = new Date(start);
      while (currentDay <= end) {
        const dateStr = formatDateToString(currentDay);
        if (!taskMap[dateStr]) {
          taskMap[dateStr] = [];
        }
        taskMap[dateStr].push(task);
        currentDay.setDate(currentDay.getDate() + 1);
      }
    });
    
    return taskMap;
  };

  useEffect(() => {
    // Khởi tạo lịch khi component được mount hoặc khi currentDate thay đổi
    const days = generateCalendarDays(currentDate);
    setCalendarDays(days);
    
    const groupedTasks = groupTasksByDate(mockTasks);
    console.log('Grouped Tasks:', groupedTasks); // Kiểm tra dữ liệu
    setTasksByDate(groupedTasks);
  }, [currentDate]);

  // Hàm để xác định trạng thái task
  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return 'bg-yellow-100 border-yellow-300 text-yellow-800'; // Đang chờ
      case 2:
        return 'bg-blue-100 border-blue-300 text-blue-800'; // Đang thực hiện
      case 3:
        return 'bg-green-100 border-green-300 text-green-800'; // Hoàn thành
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  // Các tên thứ trong tuần
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">
            Tháng {currentDate.getMonth() + 1}, {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={goToToday}
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
          >
            Hôm nay
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 text-center py-2 border-b bg-gray-50">
        {weekDays.map((day, index) => (
          <div key={index} className="font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
      
      <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-px bg-gray-200">
        {calendarDays.map((dayInfo, index) => {
          const dateStr = formatDateToString(dayInfo.date);
          const tasks = tasksByDate[dateStr] || [];
          const isToday = formatDateToString(new Date()) === dateStr;
          
          return (
            <div 
              key={index} 
              className={`bg-white p-1 min-h-24 flex flex-col ${!dayInfo.isCurrentMonth ? 'text-gray-400' : ''}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : ''}`}>
                  {dayInfo.date.getDate()}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1 space-y-1">
                {tasks.slice(0, 3).map((task, tIndex) => (
                  <div 
                    key={`${task.taskId}-${tIndex}`} 
                    className={`text-xs p-1 border rounded truncate ${getStatusClass(task.status)}`}
                    title={`${task.title} - ${task.description}`}
                  >
                    {task.title}
                  </div>
                ))}
                {tasks.length > 3 && (
                  <div className="text-xs text-gray-500 pl-1">
                    +{tasks.length - 3} nhiệm vụ khác
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;