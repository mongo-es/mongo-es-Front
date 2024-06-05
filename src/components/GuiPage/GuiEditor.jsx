import React from "react";
import { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { default_VALUE } from "../../constants.js";

const GuiEditorForm = () => {
    const [isGuiButtonOpen, setIsGuiButtonOpen] = useState(false);
    const [openKeys, setOpenKeys] = useState({});

    const toggleOpen = (key) => {
        setOpenKeys((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleStringToArray = (addBlock) => {
        const lastIndex = value.lastIndexOf(":");
        if (lastIndex === -1) {
            console.log("':' 문자가 문자열에 없습니다.");
            setValue(`[\n\t{\n\t\t${addBlock}:\n\t}\n]`);
            return;
        }
        let splitedText = value ? value.split('\n') : [];
      
        let lineNumber = line[0]; let column = line[1];
        var lineContent = splitedText[lineNumber.lineNumber - 1]; // 해당 열의 데이터 받아옴.

        let emptySpaceLength = lineContent.search(/\S/);
        if (emptySpaceLength === -1) {emptySpaceLength = 1;}

        const newStrPrefix = `{\n${"\t".repeat(emptySpaceLength + 1)}`;
        const newStrSuffix = `:\n${"\t".repeat(emptySpaceLength)}}`;

        const textToInsert = newStrPrefix + addBlock + newStrSuffix;
        splitedText[lineNumber.lineNumber - 1] = [lineContent.slice(0, lineNumber.column - 1), textToInsert, lineContent.slice(lineNumber.column - 1)].join('');
        
        setValue(splitedText.join('\n'));
      };
      
    const guiButtonOpenToggle = () => {
        setIsGuiButtonOpen(prev => !prev);
    }

    const queryConditions = {
        $match: {
            $gt: "",
            $gte: "",
            $lte: "",
            $lt: "",
            $in: [],
            $nin: [],
            $eq: "",
            $ne: "",
            $regex: "",
            $exists: true,
        },
        $lookup: {
            from: "",
            localField: "",
            foreignField: "",
            as: "",
        },
        $unwind: {
            path: "",
            preserveNullAndEmptyArrays: true,
        },
        $project: {
            project: "",
            include: [],
            exclude: [],
        },
        $group: {
            _id: "",
            count: { $sum: "", $test: "" },
            $avg: "",
            $min: "",
            $max: "",
        },
        $sort: {
            sortField: 1,
        },
        $skip: 10,
        $limit: 20,
    };

    const [value, setValue] = new useState("")
    const editorRef = useRef(null);
    const [line, setLine] = useState([]);

    function handleEditorDidMount(editor, monaco){
        setLine([editor.getPosition()]);
        editorRef.current = editor;
    }
 
    const renderButtons = (data, parentKey = '') => {
        return Object.keys(data).map((key) => {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            const isExpandable = typeof data[key] === 'object' && data[key] !== null;
 
            return (
                <div key={newKey} style={{ marginLeft: parentKey ? '20px' : '0' }}>
                    <button
                        className="border border-1 border-slate-950 m-1"
                        onClick={(e) => {
                            if (isExpandable) {
                                toggleOpen(newKey);
                            }
                            e.preventDefault(); // <a> 태그의 기본 동작 방지
                            // 클릭된 버튼의 텍스트 내용을 handleStringToArray 함수에 전달
                            handleStringToArray(e.target.textContent);
                        }}
                    >
                        {isExpandable ? key : `${key}${data[key]}`}
                    </button>
                    {isExpandable && openKeys[newKey] && (
                        <div style={{ marginLeft: '20px' }}>
                            {renderButtons(data[key], newKey)}
                        </div>
                    )}
                </div>
            );
        });
    };
 
    return (
        <div className="flex">
            <div>
                <div className="pb-5">
                    <button className="border border-1 border-solid border-gray-100 rounded-md bg-gray-100 h-10 w-[110px]">
                        <div className="text-black font-bold">
                            파이프라인
                        </div>
                    </button>
                </div>
                <div className="border border-1 border-solid border-slate-950 rounded-md w-[525px] h-96">
                    {renderButtons(queryConditions)}
 
                    <button className="border border-1 border-slate-950" onClick={(e) => {
                        guiButtonOpenToggle();
                        handleStringToArray(e.target.textContent);
                    }}>
                        asdf
                    </button>
                    {
                        isGuiButtonOpen && (
                            <div className="">
                                <ul className="border border-1 border-slate-950 w-20">
                                    <li className="hover:bg-gray-400">
                                        <div className="">
                                            asdf
                                        </div>
                                    </li>
                                    <li className="hover:bg-gray-400">
                                        <div className="">
                                            asdf
                                        </div>
                                    </li>
                                    <li className="hover:bg-gray-400">
                                        <div className="">
                                            asdf
                                        </div>
                                    </li>
                                    <li className="hover:bg-gray-400">
                                        <div className="">
                                            asdf
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
 
            <div className="pl-10"></div>
 
            <div>
                <div className="pb-5">
                    <button className="border border-1 border-solid border-green-600 rounded-md h-10 w-[110px]">
                        <div className="text-emerald-600">
                            Run Code
                        </div>
                    </button>
                </div>
 
                <div className="border border-1 border-solid border-slate-950 rounded-md w-[525px] h-96">
                    {/* GUI버튼에 따른 파이프라인이 들어갈 자리입니다 */}
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
                            onChange={(value) => { setValue(value);
                                setLine([editorRef.current.getPosition()]);
                             }}
                            onMount={handleEditorDidMount}
                        />
                </div>
            </div>
        </div>
    )
}
export default GuiEditorForm;
 
// import React from "react";
 
// const GuiEditorForm = () => {
//     return (
//         <div>
//             asdf
//         </div>
//     )
// }
// export default GuiEditorForm;