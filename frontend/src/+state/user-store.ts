import { create } from "zustand";

interface InitialState {
  currentUser: null | {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  setCurrentUser: (user: InitialState["currentUser"]) => void;
  logout: () => void;
}

const useUserStore = create<InitialState>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  logout: () => set({ currentUser: null }),
}));

export default useUserStore;
