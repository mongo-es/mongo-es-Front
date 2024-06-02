import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useOptimizeStore = create(
    persist(
        (set) => ({
            indexOptimize: null,
            pipeOptimize: null,
            setOptimizeResult: (indexOptimize, pipeOptimize) => {
                set({
                    indexOptimize: indexOptimize,
                    pipeOptimize: pipeOptimize
                });
            },
        }),
        {
            name: "optimize",
        }
    )

);

export default useOptimizeStore;