import { useRef, useState } from "react";
import { HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { default_VALUE } from "../../constants.js"
import ConfigurationSchemeForm from "../Home/ConfigurationScheme.jsx";


const CodeEditorForm = () => {
    const editorRef = useRef();
    const [value, setValue] = useState("");

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };


    return (

        <HStack spacing={8}>
            <div>
                <div className="pb-5">
                    <button className="border border-1 border-solid border-gray-100 rounded-md bg-gray-100 h-10 w-[110px]">
                        <div className="text-black font-bold">
                            파이프라인
                        </div>
                    </button>
                </div>
                <div className="border border-1 border-slate-950">
                    <Editor
                        options={{
                            minimap: {
                                enabled: false,
                            },
                        }}
                        width="34vw"
                        height="60vh"
                        theme="vs-white"
                        borderRadius={6}
                        language="json"
                        // defaultValue={default_VALUE["json"]}
                        onMount={onMount}
                        value={value}
                        onChange={(value) => setValue(value)}
                    />
                </div>
            </div>
            <div className="pl-8">
                <ConfigurationSchemeForm value={value} />
            </div>
        </HStack>

    );
};
export default CodeEditorForm;