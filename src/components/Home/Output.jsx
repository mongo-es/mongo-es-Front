import React from "react";
import usePipelineStore from "../../store/pipelineResultStore.jsx";
import { JSONTree } from 'react-json-tree';
import theme from "../../JSONtheme.js";

const OutputForm = () => {
    const { pipelineResult } = usePipelineStore();

    return (
        <div className='pt-10 pb-20'>
            <div className="border border-1 border-solid border-slate-950 rounded-md w-[72vw] h-72 overflow-x-auto pl-4">
                <div className="flex space-x-4 pt-4">
                    {pipelineResult.length > 0 ? (
                        pipelineResult.map((item, index) => (
                            <div key={index} className="">
                                <div className="bg-white w-[475px] rounded-md border border-1 border-gray-100 shadow-md p-4 max-h-72 min-w-96 overflow-y-auto">
                                    <JSONTree data={item}
                                        hideRoot='true'
                                        invertTheme={true}
                                        theme={theme} />
                                </div>
                            </div>
                        ))
                    ) : (
                        null
                    )}
                    <div className="pr-[0.5px]">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OutputForm;