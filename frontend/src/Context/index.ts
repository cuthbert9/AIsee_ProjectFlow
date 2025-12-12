import { create } from "zustand";

import axios from "axios";

// Define the Project interface based on backend response
export interface Project {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  priority: string;
  usecases: string[];
  role: string;
  datasources: string[];
  socials: string[];
  dashboardMetrics: string[];
}

type SContextStore = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  formData: any;
  setFormData: (data: any) => void;
  submitAttempted: boolean;
  setSubmitAttempted: (attempted: boolean) => void;
  clearFormData: () => void;
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updatedProject: Project) => void;
  deleteProject: (projectId: string) => void;
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get("http://localhost:3000/projects");
    useSContextStore.setState({ projects: response.data });
  } catch (error) {
      console.error("Error fetching projects:", error);
  }
};

export const useSContextStore = create<SContextStore>()((set, get) => ({
  activeIndex: 1,
  setActiveIndex: (index: number) => set({ activeIndex: index }),

  formData: {},
  setFormData: (data: any) => set({ formData: data }),

  submitAttempted: false,
  setSubmitAttempted: (attempted: boolean) =>
    set({ submitAttempted: attempted }),

  clearFormData: () =>
    set({
      formData: {},
      activeIndex: 1,
      submitAttempted: false,
    }),

  // Projects list
  projects: [],

  // Add a project to array
  addProject: (project: Project) => {
    const current = get().projects || [];
    set({ projects: [...current, project] });
  },

  // Update an existing project by id (assuming id is the unique key now)
  updateProject: (projectId: string, updatedProject: Project) => {
    const current = get().projects || [];
    const updatedProjects = current.map((p) =>
      p.id === projectId ? updatedProject : p,
    );
    set({ projects: updatedProjects });
  },

  // Delete a project by id
  deleteProject: (projectId: string) => {
    const current = get().projects || [];
    const filteredProjects = current.filter((p) => p.id !== projectId);
    set({ projects: filteredProjects });
  },
}));
