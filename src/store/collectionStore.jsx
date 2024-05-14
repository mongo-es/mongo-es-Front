import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useCollectionStore = create(
    persist(
        (set) => ({
            databaseName: null,
            collectionName: null,
            setCollection: (databaseName, collectionName) => {
                set({
                    databaseName: databaseName,
                    collectionName: collectionName,
                });
            },
        }),
        {
            name: "userDatabase",
        }
    )

);

export default useCollectionStore;