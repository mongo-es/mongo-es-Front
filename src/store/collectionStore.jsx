import { create } from 'zustand'
import { persist } from "zustand/middleware";

const useCollectionStore = create(

    persist(
        (set) => ({
            databaseName: null,
            collectionName: null,
            setCollection: (databaseName, collectionName) => {
                const parts = collectionName.split('-'); // '-'를 기준으로 문자열 분할
                const extractedName = parts[parts.length - 1];
                set({
                    databaseName: databaseName,
                    collectionName: extractedName,
                });
            },
        }),
        {
            name: "userDatabaseName",
        }
    )

);

export default useCollectionStore;