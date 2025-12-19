import { create } from "zustand";

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
};

export const useSContextStore = create<SContextStore>()((set) => ({
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
}));
