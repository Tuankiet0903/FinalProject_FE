import { create } from "zustand";

export const useWorkspaceStore = create((set) => ({
  selectedWorkspaceId: null,
  setSelectedWorkspaceId: (id) => set({ selectedWorkspaceId: id }),
}));