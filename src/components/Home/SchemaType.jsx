import React from "react";
import useSchemaTypeStore from "../../store/schemaTypeStore.jsx";
import { JSONTree } from "react-json-tree";
import theme from "../../JSONtheme.js";
const SchemaTypeForm = () => {
    const { schemaType } = useSchemaTypeStore();

    return (
        <div className="pb-5">
            <div className="border border-1 border-slate-950 rounded-md w-[34vw] h-[210px] overflow-auto">
                <JSONTree data={schemaType}
                    hideRoot='true'
                    invertTheme={true}
                    theme={theme} />
            </div>
        </div>
    )
}

export default SchemaTypeForm