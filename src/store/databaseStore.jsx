import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useDatabaseStore = create(
    persist(
        (set) => ({
            database: null,
            setDatabase: (data) => {
                set({ database: data });
            },
        }),
        {
            name: "userDatabase",
        }
    )

);

export default useDatabaseStore;