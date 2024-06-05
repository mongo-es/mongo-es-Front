import React from "react";
import useCollectionStore from "../../store/collectionStore";

const SelectedDCNameForm = () => {
    const { databaseName, collectionName } = useCollectionStore();

    const displayDatabaseName = databaseName || "DatabaseName";
    const displayCollectionName = collectionName || "CollectionName";

    return (
        <div className="border border-gray-300 rounded-md inline-block max-w-full bg-gray-50 shadow-sm">
            <button>
                <div className="p-4 text-xl font-semibold text-gray-800">
                    <span className="text-blue-500">{displayDatabaseName}</span>
                    <span className="text-gray-500">.</span>
                    <span className="text-green-500">{displayCollectionName}</span>
                </div>
            </button>
        </div>
    );
};

export default SelectedDCNameForm;