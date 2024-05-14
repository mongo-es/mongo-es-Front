import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useCollectionStore = create(
    persist(
        (set) => ({
            collection: {},
            setCollection: (data) => {
                set({ collection: data });
            },
        }),
        {
            name: "userCollection",
        }
    )

);


export default useCollectionStore;