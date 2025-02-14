"use client";

import { create } from 'zustand';

type ErrorStore = {
  hasConnectionError: boolean;
  hasGenericError: boolean;
  setConnectionError: (value: boolean) => void;
  setGenericError: (value: boolean) => void;
  resetErrors: () => void;
};

export const useErrorStore = create<ErrorStore>((set) => ({
  hasConnectionError: false,
  hasGenericError: false,
  setConnectionError: (value) => set({ hasConnectionError: value }),
  setGenericError: (value) => set({ hasGenericError: value }),
  resetErrors: () => set({ hasConnectionError: false, hasGenericError: false }),
}));
