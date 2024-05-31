import React from "react";
import { useState, useEffect } from "react";
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
                    <div className="pb-5 jus">
                        <button className="border border-1 border-solid border-gray-100 rounded-md bg-gray-100 h-10 w-[110px] z-2">
                            <div className="text-black">
                                파이프라인
                            </div>
                        </button>

                        <div className="float-right flex pt-2">
                            <div className="pr-2">
                                <button>
                                    최적화 발생 유무
                                </button>
                            </div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-danger-500 peer-focus:outline-none rounded-full 
                            peer peer-checked:after:translate-x-full 
                            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                            after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border 
                            after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>
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