import React from "react";
import { useState } from "react";
import { HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { default_VALUE } from "../../constants.js"
import ConfigurationSchemeForm from "../Home/ConfigurationScheme.jsx";


const CodeEditorForm = () => {
    const [value, setValue] = useState("");
    return (
        <div className="pb-24">
            <HStack spacing={8}>
                <div>
                    <div className="pb-5">
                        <button className="border border-1 border-solid border-gray-100 rounded-md bg-gray-100 h-10 w-[110px] z-2">
                            <div className="text-black">
                                파이프라인
                            </div>
                        </button>
                    </div>

                    <div className="border border-1 border-slate-950">
                        <Editor
                            options={{
                                minimap: { enabled: false },
                            }}
                            theme="vs-white"
                            width="34vw"
                            height="60vh"
                            borderRadius={6}
                            language="bson"
                            defaultValue={default_VALUE["bson"]}
                            value={value}
                            onChange={(value) => { setValue(value) }}
                        />
                    </div>
                </div>
                <div className="pl-[2.5vw]">
                    <ConfigurationSchemeForm value={value} />
                </div>
            </HStack>
        </div>
    );
};
export default CodeEditorForm;