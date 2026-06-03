import { create } from 'zustand';
import type { Submission } from '../types/form';

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
