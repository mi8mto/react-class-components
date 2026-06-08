import { create } from 'zustand';
import type { Submission } from '../types/form';
import { countries } from '../constants/countries';

interface FormStore {
  submissions: Submission[];
  countries: string[];
  addSubmission: (submission: Submission) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  submissions: [],
  countries: [...countries],
  addSubmission: (submission) =>
    set((state) => ({
      submissions: [...state.submissions, submission],
    })),
}));
