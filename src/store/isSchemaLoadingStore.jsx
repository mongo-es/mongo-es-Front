import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useIsSchemaLoadingStore = create(
    persist(
        (set) => ({
            isSchemaLoading: true,
            setIsSchemaLoading: (isSchemaLoading) => {
                set({ isSchemaLoading: isSchemaLoading });
            },
        }),
        {
            name: "schemaLoading",
        }
    )

);

export default useIsSchemaLoadingStore;