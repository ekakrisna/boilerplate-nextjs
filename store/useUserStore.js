import create from 'zustand';

const useUserStore = create((set) => ({
  data: null,
  setData: (userData) => set({ data: userData }),
}));

export default useUserStore;
