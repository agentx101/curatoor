import { create } from 'zustand';

const useAccountStore = create((set) => ({
  account: '',
  setAccount: (account: string) => set({ account }),
  deleteAccount: () => set({ account: '' }),
}));

export default useAccountStore;
