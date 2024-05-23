import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useNaturalExplainStore = create(
    persist(
        (set) => ({
            naturalExplain: null,
            setNaturalExplain: (naturalExplain) => {
                set({ naturalExplain: naturalExplain });
            },
        }),
        {
            name: "user-naturalExplain",
        }
    )

);

export default useNaturalExplainStore;