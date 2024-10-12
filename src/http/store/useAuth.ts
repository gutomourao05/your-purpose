// authStore.ts
import { create } from 'zustand';

type Props = {
    isAuthenticated: boolean;
    AddAuth: () => void;
    RemoveAuth: () => void;
}

const useAuthStore = create<Props>((set) => ({
    isAuthenticated: false,
    AddAuth: () => set({ isAuthenticated: true }),
    RemoveAuth: () => set({ isAuthenticated: false }),
}));

export default useAuthStore;
