import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useSchemaTypeStore = create(
    persist(
        (set) => ({
            schemaType: {},
            setSchemaType: (schemaType) => {
                set({ schemaType: schemaType });
            },
        }),
        {
            name: "schemaType",
        }
    )

);

export default useSchemaTypeStore;