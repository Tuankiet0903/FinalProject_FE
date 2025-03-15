// mockData.js

export const mockWorkspaces = [
    {
      workspaceId: 1,
      name: "Workspace 1",
      description: "This is the first workspace",
    },
    {
      workspaceId: 2,
      name: "Workspace 2",
      description: "This is the second workspace",
    },
    {
      workspaceId: 3,
      name: "Workspace 3",
      description: "This is the third workspace",
    },
  ];
  
  export const mockMessages = [
    {
      messageId: 1,
      workspaceId: 1,
      userId: 1,
      content: "Hello, this is a text message!",
      type: "text",
      createdAt: "2023-10-01T12:00:00Z",
      isPinned: false,
    },
    {
      messageId: 2,
      workspaceId: 1,
      userId: 2,
      content: "👋",
      type: "emoji",
      createdAt: "2023-10-01T12:05:00Z",
      isPinned: false,
    },
    {
      messageId: 3,
      workspaceId: 1,
      userId: 1,
      content: "https://example.com",
      type: "link",
      createdAt: "2023-10-01T12:10:00Z",
      isPinned: true,
    },
    {
      messageId: 4,
      workspaceId: 1,
      userId: 2,
      content: "https://example.com/image.png",
      type: "image",
      attachmentUrl: "https://example.com/image.png",
      createdAt: "2023-10-01T12:15:00Z",
      isPinned: false,
    },
  ];