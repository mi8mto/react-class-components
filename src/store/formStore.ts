import { create } from 'zustand';

export interface Submission {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

interface FormStore {
  submissions: Submission[];
  addSubmission: (submission: Submission) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  submissions: [],
  addSubmission: (submission) =>
    set((state) => ({
      submissions: [...state.submissions, submission],
    })),
}));