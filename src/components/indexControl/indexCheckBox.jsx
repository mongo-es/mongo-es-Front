import React, { useEffect } from "react";
import { CheckboxGroup } from "@radix-ui/themes";
import useSchemaTypeStore from "../../store/schemaTypeStore";

export const IndexCheckbox = ({ handlePlusClick }) => {
    const { schemaType } = useSchemaTypeStore();
    const keys = schemaType ? Object.keys(schemaType) : [];

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return (
        <div className="z-20 fixed inset-0">
            <div onClick={() => { handlePlusClick(); }} className="overlay fixed inset-0"></div>
            <div className="absolute top-[293px] left-[1007px] border border-gray-200 z-20 bg-white p-4 rounded-md shadow-md w-[300px] max-h-[400px] flex flex-col">
                <div className="flex-grow overflow-auto mb-4">
                    <CheckboxGroup.Root
                        className="CheckboxGroup flex flex-col gap-3"
                        variant="surface"
                        aria-label="Schema Types"
                    >
                        {keys.map((key) => (
                            <div key={key} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={key}
                                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor={key} className="text-gray-700">
                                    {key}
                                </label>
                            </div>
                        ))}
                    </CheckboxGroup.Root>
                </div>
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex-grow"
                        onClick={() => { console.log("create button clicked") }}
                    >
                        Create
                    </button>
                    <button
                        className="bg-danger-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex-grow"
                        onClick={() => { console.log("delete button clicked") }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IndexCheckbox;