import { create } from 'zustand'
import { persist } from "zustand/middleware";

const usePipelineStore = create(
    persist(
        (set) => ({
            pipelineResult: {},
            setPipelineResult: (pipelineResult) => {
                set({ pipelineResult: pipelineResult });
            },
        }),
        {
            name: "pipeline-result",
        }
    )

);

export default usePipelineStore;