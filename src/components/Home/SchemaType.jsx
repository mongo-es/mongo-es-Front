import React from "react";
import useSchemaTypeStore from "../../store/schemaTypeStore.jsx";
import { JSONTree } from "react-json-tree";
import theme from "../../JSONtheme.js";
const SchemaTypeForm = () => {
    const { schemaType } = useSchemaTypeStore();

    return (
        <div className="pb-5">
            <button className="border border-1 border-solid border-gray-100 rounded-md bg-gray-100 h-10 w-[120px] z-2">
                <div className="text-md">
                    Schema Type
                </div>
            </button>
            <div className="pb-5">
            </div>
            <div className="border border-1 border-slate-950 rounded-md w-[34vw] h-[210px] overflow-auto">
                <div className="pl-2">
                    <JSONTree data={schemaType}
                        hideRoot='true'
                        invertTheme={true}
                        theme={theme} />
                </div>
            </div>
        </div>
    )
}

export default SchemaTypeForm