import { create } from 'zustand';

type ProjectStoreType = {
  projectTitle: string;
  setProjectTitle: (projectTitle: string) => void;
};

export const useProjectStore = create<ProjectStoreType>()((set) => ({
  projectTitle: '',
  setProjectTitle: (projectTitle) => set({ projectTitle }),
}));
