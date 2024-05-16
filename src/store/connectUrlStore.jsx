import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useConnectedUrlStore = create(
    persist(
        (set) => ({
            connectedUrl: {},
            setConnectedUrl: (connectedUrl) => {
                set({ connectedUrl: connectedUrl });
            },
        }),
        {
            name: "user-connect-url",
        }
    )

);

export default useConnectedUrlStore;