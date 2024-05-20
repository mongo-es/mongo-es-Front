import React from "react";
import usePipelineStore from "../../store/pipelineResultStore";
import { JSONTree } from 'react-json-tree';
import { Map } from 'immutable';

const OutputForm = () => {
    const { pipelineResult } = usePipelineStore();
    const theme = {
        scheme: 'summerfruit',
        author: 'christopher corley (http://cscorley.github.io/)',
        base00: '#151515',
        base01: '#202020',
        base02: '#303030',
        base03: '#505050',
        base04: '#B0B0B0',
        base05: '#D0D0D0',
        base06: '#E0E0E0',
        base07: '#FFFFFF',
        base08: '#FF0086',
        base09: '#FD8900',
        base0A: '#ABA800',
        base0B: '#00C918',
        base0C: '#1faaaa',
        base0D: '#3777E6',
        base0E: '#AD00A1',
        base0F: '#cc6633'
    };
    return (
        <div className='pt-10 pb-20'>
            <div className="border border-1 border-solid border-slate-950 rounded-md w-[1102px] h-72 overflow-x-auto pl-4">
                <div className="flex space-x-4 pt-4">
                    {pipelineResult.length > 0 ? (
                        pipelineResult.map((item, index) => (
                            <div key={index} className="">
                                <div className="bg-white w-[475px] rounded-md border border-1 border-gray-100 shadow-md p-4 max-h-72 min-w-96 overflow-y-auto">
                                    <JSONTree data={item}
                                        hideRoot='true'
                                        invertTheme={true}
                                        theme={{
                                            extend: theme,
                                        }} />
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