import { create } from 'zustand';
import { getUserFromAddress } from '../utils';
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

interface AccountState {
  account: string,
  userId: null | number,
  setAccount: (address: string) => void,
  deleteAccount: () => void,
}

const useAccountStore = create<AccountState>()(
  devtools(
    persist(
      (set, get) => ({
        account: '',
        userId: null,
        setAccount: async (account: string) => {
          set({ account })
          if (!get().userId) {
            const user = await getUserFromAddress(account)
            set({ userId: user?.id })
          }
        },
        deleteAccount: () => set({ account: '' }),
      }),
      {
        name: 'account-storage',
      }
    )
  )
);

export default useAccountStore;
