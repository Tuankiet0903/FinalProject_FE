"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Hash,
  ImageIcon,
  File,
  AtSign,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { fetchMessages, addReaction, removeReaction, sendMessage } from "../../../api/workspaceMessage";
import { API_ROOT } from "../../../utils/constants";

// Ánh xạ giữa ENUM type và emoji
const reactionMap = {
  like: "👍",
  love: "❤️",
  hava: "😂",
  wow: "😮",
  sad: "😢",
  angry: "😡",
};

const Chat = () => {
  const { workspaceId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  // Connect to socket when component mounts
  useEffect(() => {
    const newSocket = io(API_ROOT, {
      auth: { token: localStorage.getItem("token") },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("join-workspace", { workspaceId });
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    newSocket.on("join-success", ({ workspaceId }) => {
    });

    newSocket.on("join-error", ({ message }) => {
      console.error("Join error:", message);
    });

    newSocket.on("new-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("update-message", (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.workspaceMessageId === updatedMessage.workspaceMessageId ? updatedMessage : msg
        )
      );
    });

    newSocket.on("delete-message", (workspaceMessageId) => {
      setMessages((prev) => prev.filter((msg) => msg.workspaceMessageId !== workspaceMessageId));
    });

    newSocket.on("new-reaction", ({ workspaceMessageId, reaction }) => {
      console.log("New reaction received:", reaction);
      setMessages((prev) => {
        console.log("Current messages state:", prev);
        const normalizedId = Number(workspaceMessageId); // Chuyển thành số
        const messageExists = prev.some((msg) => Number(msg.workspaceMessageId) === normalizedId);
        if (messageExists) {
          return prev.map((msg) =>
            Number(msg.workspaceMessageId) === normalizedId
              ? { ...msg, Reactions: [...(msg.Reactions || []), reaction] }
              : msg
          );
        }
        console.warn(`Message with ID ${workspaceMessageId} not found in state`);
        return prev;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [workspaceId]);

  // Fetch initial messages
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const response = await fetchMessages(workspaceId);
        console.log("✅ Fetched messages:", response);
        setMessages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchAllMessages();
  }, [workspaceId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await sendMessage(workspaceId, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleReaction = async (workspaceMessageId, reactionType) => {
    try {
      await addReaction(workspaceMessageId, reactionType); // Gửi ENUM như "love", "like"
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to add reaction";
      console.error("Failed to add reaction:", errorMsg);
    }
  };

  const handleRemoveReaction = async (workspaceMessageId, reactionId) => {
    try {
      await removeReaction(workspaceMessageId, reactionId);
    } catch (error) {
      console.error("Failed to remove reaction:", error);
    }
  };

  return (
    <div className="flex h-full bg-gray-100">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.workspaceMessageId} className="flex items-start group">
              <img
                src={message.User?.avatar || "/placeholder.svg"}
                alt={message.User?.username}
                className="w-10 h-10 rounded-full mr-3 mt-1"
              />

              <div className="flex-1">
                <div className="flex items-baseline">
                  <h4 className="font-bold">{message.User?.username}</h4>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-1">
                  <p className="text-gray-800">{message.content}</p>

                  {message.files && message.files.length > 0 && message.files.map((file) => (
                    <div key={file.fileId} className="mt-2 max-w-sm">
                      {file.fileType.startsWith("image/") ? (
                        <div className="relative">
                          <img
                            src={file.fileUrl}
                            alt={file.fileName}
                            className="rounded-md border border-gray-200 max-w-full"
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {file.fileName}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center p-3 bg-gray-100 rounded-md">
                          <File className="h-8 w-8 text-blue-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">{file.fileName}</p>
                            <p className="text-xs text-gray-500">Click to download</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {message.Reactions && message.Reactions.length > 0 && (
                    <div className="flex mt-2 space-x-2">
                      {message.Reactions.map((reaction) => (
                        <button
                          key={reaction.reactionId}
                          className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5 text-sm"
                          onClick={() => handleRemoveReaction(message.workspaceMessageId, reaction.reactionId)}
                        >
                          <span className="mr-1">{reactionMap[reaction.type]}</span>
                          <span className="text-xs text-gray-600">{reaction.User?.username}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Reaction buttons */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReaction(message.workspaceMessageId, "like")}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleReaction(message.workspaceMessageId, "love")}
                        className="text-gray-400 hover:text-red-500"
                      >
                        ❤️
                      </button>
                      <button
                        onClick={() => handleReaction(message.workspaceMessageId, "hava")}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        😂
                      </button>
                      <button
                        onClick={() => handleReaction(message.workspaceMessageId, "wow")}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        😮
                      </button>
                      <button
                        onClick={() => handleReaction(message.workspaceMessageId, "sad")}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        😢
                      </button>
                      <button
                        onClick={() => handleReaction(message.workspaceMessageId, "angry")}
                        className="text-gray-400 hover:text-red-500"
                      >
                        😡
                      </button>
                    </div>
                  </div>
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
            <p className="text-sm text-gray-500">{messages.length} members</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Online - {messages.filter((m) => m.User?.status === "online").length}
            </h4>
            <ul className="space-y-3">
              {messages.filter((m) => m.User?.status === "online").map((message) => (
                <li key={message.workspaceMessageId} className="flex items-start">
                  <div className="relative mr-2">
                    <img
                      src={message.User?.avatar || "/placeholder.svg"}
                      alt={message.User?.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                  </div>
                  <div>
                    <h5 className="font-medium">{message.User?.username}</h5>
                    <p className="text-xs text-gray-500">{message.User?.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Offline - {messages.filter((m) => m.User?.status !== "online").length}
            </h4>
            <ul className="space-y-3">
              {messages.filter((m) => m.User?.status !== "online").map((message) => (
                <li key={message.workspaceMessageId} className="flex items-start">
                  <div className="relative mr-2">
                    <img
                      src={message.User?.avatar || "/placeholder.svg"}
                      alt={message.User?.username}
                      className="w-8 h-8 rounded-full opacity-70"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${message.User?.status === "away" ? "bg-yellow-500" : "bg-gray-500"
                        } border-2 border-white`}
                    ></span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-600">{message.User?.username}</h5>
                    <p className="text-xs text-gray-500">{message.User?.role}</p>
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