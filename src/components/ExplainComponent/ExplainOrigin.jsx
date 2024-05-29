import React from "react";
import useNaturalExplainStore from "../../store/naturalExplainStore.jsx";
import { JSONTree } from 'react-json-tree';
import theme from "../../JSONtheme.js"

const ExplainOrigin = () => {
    const { naturalExplain } = useNaturalExplainStore();
    return (

        <div className="border border-solid border-gray-400 rounded-md w-[47%] max-h-[28vw] overflow-auto">
            <div className="text-[16px]">
                {naturalExplain === null ?
                    (
                        <div className="pl-2 text-lg">run pipeline!</div>
                    ) : (
                        <div className="pl-2">
                            <JSONTree data={naturalExplain}
                                hideRoot={true}
                                invertTheme={true}
                                theme={theme} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ExplainOrigin;