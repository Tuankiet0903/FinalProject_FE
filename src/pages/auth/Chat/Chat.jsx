"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Users,
  Hash,
  ImageIcon,
  File,
  AtSign,
} from "lucide-react";

const Chat = () => {
  // Mock data for users
  const USERS = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      role: "Product Manager",
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      role: "UI Designer",
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      role: "Frontend Developer",
    },
    {
      id: 4,
      name: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      role: "Backend Developer",
    },
    {
      id: 5,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      role: "QA Engineer",
    },
    {
      id: 6,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      role: "UX Researcher",
    },
    {
      id: 7,
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      role: "DevOps Engineer",
    },
  ];

  // Mock data for messages
  const INITIAL_MESSAGES = [
    {
      id: 1,
      sender: USERS[0],
      content: "Good morning team! Let's discuss the project timeline for this week.",
      timestamp: "09:30 AM",
      reactions: [{ emoji: "👍", count: 3 }],
    },
    {
      id: 2,
      sender: USERS[1],
      content: "I've finished the design mockups for the dashboard. I'll share them shortly.",
      timestamp: "09:32 AM",
      reactions: [],
    },
    {
      id: 3,
      sender: USERS[3],
      content: "The API endpoints for user authentication are now ready for testing.",
      timestamp: "09:45 AM",
      reactions: [{ emoji: "🎉", count: 2 }],
    },
    {
      id: 4,
      sender: USERS[4],
      content: "I found a bug in the login flow. Created a ticket #DEV-423 to track it.",
      timestamp: "10:15 AM",
      reactions: [],
    },
    {
      id: 5,
      sender: USERS[2],
      content: "Here are the updated component designs:",
      timestamp: "10:30 AM",
      attachment: { type: "image", url: "/placeholder.svg?height=200&width=300", name: "dashboard-components.png" },
      reactions: [{ emoji: "❤️", count: 4 }],
    },
  ];

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [showUserList, setShowUserList] = useState(true);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: USERS[0], // Current user (you)
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: [],
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleReaction = (messageId, emoji) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find((r) => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r)),
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, count: 1 }],
            };
          }
        }
        return msg;
      })
    );
  };

  return (
    <div className="flex h-full bg-gray-100">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start group">
              <img
                src={message.sender.avatar || "/placeholder.svg"}
                alt={message.sender.name}
                className="w-10 h-10 rounded-full mr-3 mt-1"
              />

              <div className="flex-1">
                <div className="flex items-baseline">
                  <h4 className="font-bold">{message.sender.name}</h4>
                  <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-1">
                  <p className="text-gray-800">{message.content}</p>

                  {message.attachment && (
                    <div className="mt-2 max-w-sm">
                      {message.attachment.type === "image" ? (
                        <div className="relative">
                          <img
                            src={message.attachment.url || "/placeholder.svg"}
                            alt={message.attachment.name}
                            className="rounded-md border border-gray-200 max-w-full"
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {message.attachment.name}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center p-3 bg-gray-100 rounded-md">
                          <File className="h-8 w-8 text-blue-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">{message.attachment.name}</p>
                            <p className="text-xs text-gray-500">Click to download</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {message.reactions.length > 0 && (
                    <div className="flex mt-2 space-x-2">
                      {message.reactions.map((reaction, index) => (
                        <button
                          key={index}
                          className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5 text-sm"
                          onClick={() => handleReaction(message.id, reaction.emoji)}
                        >
                          <span className="mr-1">{reaction.emoji}</span>
                          <span className="text-xs text-gray-600">{reaction.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex items-end max-w-4xl mx-auto">
            <div className="flex-1 bg-gray-100 rounded-lg p-3 relative">
              <div className="flex space-x-2 mb-2">
                <button type="button" className="p-1 rounded hover:bg-gray-200">
                  <AtSign className="h-5 w-5 text-gray-500" />
                </button>
                <button type="button" className="p-1 rounded hover:bg-gray-200">
                  <Hash className="h-5 w-5 text-gray-500" />
                </button>
                <button type="button" className="p-1 rounded hover:bg-gray-200">
                  <ImageIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-transparent focus:outline-none resize-none"
                rows={1}
                style={{ minHeight: "24px", maxHeight: "120px" }}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-2">
                  <button type="button" className="p-1 rounded hover:bg-gray-200">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </button>
                  <button type="button" className="p-1 rounded hover:bg-gray-200">
                    <Smile className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* User List Sidebar */}
      {showUserList && (
        <div className="w-64 border-l bg-white flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-700">Team Members</h3>
            <p className="text-sm text-gray-500">{USERS.length} members</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Online - {USERS.filter((u) => u.status === "online").length}
            </h4>
            <ul className="space-y-3">
              {USERS.filter((u) => u.status === "online").map((user) => (
                <li key={user.id} className="flex items-start">
                  <div className="relative mr-2">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                  </div>
                  <div>
                    <h5 className="font-medium">{user.name}</h5>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Offline - {USERS.filter((u) => u.status !== "online").length}
            </h4>
            <ul className="space-y-3">
              {USERS.filter((u) => u.status !== "online").map((user) => (
                <li key={user.id} className="flex items-start">
                  <div className="relative mr-2">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full opacity-70"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
                        user.status === "away" ? "bg-yellow-500" : "bg-gray-500"
                      } border-2 border-white`}
                    ></span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-600">{user.name}</h5>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;