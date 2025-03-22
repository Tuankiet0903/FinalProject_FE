import { useState, useRef, useEffect } from "react"
import { format, isToday, isTomorrow, addDays, addWeeks, startOfWeek, endOfWeek, getDay } from "date-fns"
import { CalendarOutlined, RightOutlined, DownOutlined } from "@ant-design/icons"
import { Button, Input, Modal, Calendar, Divider, message } from "antd"

// Add these helper functions at the top of your component
const getNextWeekday = (date, dayIndex) => {
   const currentDay = getDay(date);
   const daysUntilNext = dayIndex - currentDay + (dayIndex <= currentDay ? 7 : 0);
   return addDays(date, daysUntilNext);
};

const getThisWeekend = () => {
   const today = new Date();
   const saturday = getNextWeekday(today, 6); // 6 is Saturday
   return saturday;
};

const getNextWeekend = () => {
   const today = new Date();
   const nextSaturday = getNextWeekday(addWeeks(today, 1), 6);
   return nextSaturday;
};

export default function DatePickerDialog({ open, onOpenChange, onDateSelect }) {
   const [startDate, setStartDate] = useState(null);
   const [dueDate, setDueDate] = useState(null);
   const [activeInput, setActiveInput] = useState('start');
   const modalRef = useRef(null);

   // Add click outside handler
   useEffect(() => {
      function handleClickOutside(event) {
         if (modalRef.current &&
            !modalRef.current.contains(event.target) &&
            !event.target.closest('.ant-modal') &&
            !event.target.closest('.ant-picker-dropdown')) {
            onOpenChange(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [onOpenChange]);

   const handleSave = () => {
      if (startDate && dueDate) {
         onDateSelect([startDate, dueDate]);
      }
      onOpenChange(false);
   };

   const handleCancel = () => {
      onOpenChange(false)
   }

   const handleDateSelect = (date) => {
      if (activeInput === 'start') {
         setStartDate(date)
      } else {
         if (date >= startDate) {
            setDueDate(date)
         } else {
            // If selected due date is before start date, show error or handle accordingly
            message.error('Due date must be after start date')
         }
      }
   }

   // Add this function to format the date display
   const formatDateDisplay = (date) => {
      if (!date) return "";
      if (isToday(date)) return "Today";
      if (isTomorrow(date)) return "Tomorrow";
      return format(date, "PPP");
   };

   const today = new Date();

   return (
      <Modal
         open={open}
         onCancel={handleCancel}
         footer={null}
         width={600}
         bodyStyle={{ padding: 0 }}
         style={{ top: "50%" }}
      >
         <div ref={modalRef} className="p-4">
            <div className="flex gap-4 mb-4">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <CalendarOutlined style={{ fontSize: "16px" }} />
                     <span className="text-sm font-medium">Start date</span>
                  </div>
                  <Input
                     placeholder="Start date"
                     className={`text-sm ${activeInput === 'start' ? 'border-[rgb(96,73,231)]' : ''}`}
                     value={formatDateDisplay(startDate)}
                     readOnly
                     onClick={() => setActiveInput('start')}
                  />
               </div>
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <CalendarOutlined style={{ fontSize: "16px" }} />
                     <span className="text-sm font-medium">Due date</span>
                  </div>
                  <Input
                     placeholder="Due date"
                     className={`text-sm ${activeInput === 'due' ? 'border-[rgb(96,73,231)]' : ''}`}
                     value={formatDateDisplay(dueDate)}
                     readOnly
                     onClick={() => setActiveInput('due')}
                     disabled={!startDate} // Disable if no start date is selected
                  />
               </div>
            </div>
            <div className="flex">
               <div className="w-[200px] space-y-2 pr-4">
                  <div className="flex justify-between items-center text-sm p-2">
                     <span>Today</span>
                     <span className="text-gray-500">{format(today, "EEE")}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm p-2">
                     <span>Now</span>
                     <span className="text-gray-500">{format(today, "h:mm a")}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm p-2">
                     <span>Tomorrow</span>
                     <span className="text-gray-500">{format(addDays(today, 1), "EEE")}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm p-2">
                     <span>This weekend</span>
                     <span className="text-gray-500">{format(getThisWeekend(), "EEE, MMM d")}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm p-2">
                     <span>Next week</span>
                     <span className="text-gray-500">{format(getNextWeekday(today, 1), "EEE, MMM d")}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm p-2">
                     <span>Next weekend</span>
                     <span className="text-gray-500">{format(getNextWeekend(), "EEE, MMM d")}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm p-2">
                     <span>2 weeks</span>
                     <span className="text-gray-500">{format(addWeeks(today, 2), "MMM d")}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm p-2">
                     <span>4 weeks</span>
                     <span className="text-gray-500">{format(addWeeks(today, 4), "MMM d")}</span>
                  </div>

                  <Button type="text" className="w-full mt-4 text-sm flex justify-between items-center text-gray-400">
                     <span>Set Recurring</span>
                     <RightOutlined style={{ fontSize: "12px" }} />
                  </Button>
               </div>
               <Divider type="vertical" className="h-auto mx-4" />
               <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-base font-medium">{format(new Date(), "MMMM yyyy")}</span>
                  </div>

                  <Calendar
                     fullscreen={false}
                     onSelect={handleDateSelect}
                     className="site-calendar-card"
                     style={{
                        borderRadius: "8px",
                        border: "1px solid #f0f0f0",
                     }}
                     disabledDate={activeInput === 'due' ? (current) => current < startDate : undefined}
                  />

                  <div className="mt-4 flex justify-end">
                     <Button type="primary" onClick={handleSave} style={{ backgroundColor: "rgb(96,73,231)" }}>
                        Apply
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   )
}