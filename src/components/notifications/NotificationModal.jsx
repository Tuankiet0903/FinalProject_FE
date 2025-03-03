import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import * as Popover from '@radix-ui/react-popover';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { fetchUserNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../../api/Notification';

const NotificationModal = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const fetchedNotifications = await fetchUserNotifications(userId);
        setNotifications(fetchedNotifications.map(notification => ({
          id: notification.id,
          content: notification.content,
          time: formatDistanceToNow(new Date(notification.createdAt), { 
            addSuffix: true,
            locale: vi 
          }),
          read: notification.isRead
        })));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();
  }, [userId]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(
        notifications.map((notification) => 
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead(userId);
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <div className="relative">
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button className="p-2 bg-[#372C81] hover:bg-white/10 rounded-lg transition relative">
            <Bell className="w-5 h-5 text-white hover:text-gray-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="w-96 p-0 bg-white rounded-lg shadow-lg z-50" align="end" sideOffset={5}>
            <div className="border-0">
              <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
                <h2 className="text-lg font-semibold text-black">Thông báo</h2>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-black hover:text-gray-600"
                  >
                    Đánh dấu tất cả đã đọc
                  </button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.read ? "bg-blue-50" : "bg-white"
                        }`}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {!notification.read && (
                            <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          )}
                          <div className={`flex-1 ${notification.read ? "pl-5" : ""}`}>
                            <p className={`text-sm text-black ${!notification.read ? "font-medium" : ""}`}>
                              {notification.content}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-700">
                    Không có thông báo nào
                  </div>
                )}
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default NotificationModal;