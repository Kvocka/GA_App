import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Item {
    name: string;
    kcal: number;
}

interface ItemListState {
    items: Item[]
    add: (item: Item) => void
    remove: (item: Item) => void
    clear: () => void
}

export const useItemList = create<ItemListState>()(
    devtools(
        persist(
            (set) => ({
                items: [],
                add: (item: Item) => set((state) => ({ items: [...state.items, item] })),
                remove: (item: Item) => set((state) => ({ items: state.items.filter((i) => i.name !== item.name) })),
                clear: () => set(() => ({ items: [] })),
            }),
            {
                name: 'items-storage',
                storage: createJSONStorage(() => AsyncStorage),
            }
        )
    )
)