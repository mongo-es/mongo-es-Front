import React from "react";
import useOptimizeStore from "../../store/optimizeStore";
import { JSONTree } from "react-json-tree";
import theme from "../../JSONtheme.js";

const OptimizePipeline = () => {
    const { pipeOptimize } = useOptimizeStore();
    const optimizePipeline = pipeOptimize.optimizePipeline;

    return (
        <div className="border border-solid border-gray-400 rounded-md w-[47%] max-h-[28vw] overflow-auto overflow-x-hidden pl-2">

            <JSONTree
                data={optimizePipeline}
                hideRoot={true}
                theme={{ extend: theme }}
                invertTheme={true}
                shouldExpandNodeInitially={() => true}
            />
        </div>
    );
}

export default OptimizePipeline;