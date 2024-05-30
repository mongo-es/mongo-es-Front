import React from "react";
import { useState, useEffect } from "react";


const GuiEditorForm = () => {
    const [isGuiButtonOpen, setIsGuiButtonOpen] = useState(false);
    const [openKeys, setOpenKeys] = useState({});
    const toggleOpen = (key) => {
        setOpenKeys((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const guiButtonOpenToggle = () => {
        setIsGuiButtonOpen(prev => !prev);
    }
    // 초기 queryConditions 객체
    const queryConditions = {
        match:{
            gt : "",
            gte : ""
        },
        project:{
            project:"",
        },
            group:{
            _id:"",
            count:{ sum:"", test:"" },
        },
    };
    
    const [queryBuilder, setQueryBuilder] = new useState("")
    useEffect(() => {
        alert(JSON.stringify(queryBuilder, null, 2));
    }, [queryBuilder]);

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
                            // 클릭된 버튼의 텍스트 내용을 addStringToQueryBuilder 함수에 전달
                            addStringToQueryBuilder(e.target.textContent, '');
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
    const addStringToQueryBuilder = (str) => {
        const lastIndex = queryBuilder.lastIndexOf(":");
        if (lastIndex === -1) {
            console.log("':' 문자가 문자열에 없습니다.");
            setQueryBuilder(`[\n\t{\n\t\t${str}:\n\t}\n]`);
            return;
        }
    
        const beforeColon = queryBuilder.substring(0, lastIndex + 1);
        const colonCount = queryBuilder.split(":").length - 1;
        // const tab = "\t".repeat(colonCount + 1);
        const newStrPrefix = `{\n${"\t".repeat(colonCount + 2)}`;
        const newStrSuffix = `:\n${"\t".repeat(colonCount + 1)}}`;
        const afterColon = queryBuilder.substring(lastIndex + 1);
    
        const newStr = beforeColon + newStrPrefix + str + newStrSuffix + afterColon;
    
        // 로깅 부분은 필요에 따라 주석 처리하거나 제거할 수 있습니다.
        console.log("------BeforeColon-------\n" + beforeColon + "\n");
        console.log("------newStrPrefix-------\n" + newStrPrefix + "\n");
        console.log("------str-------\n" + str + "\n");
        console.log("------newStrSuffix-------\n" + newStrSuffix + "\n");
        console.log("------AfterColon-------\n" + afterColon + "\n");
    
        setQueryBuilder("");
        setQueryBuilder(newStr);
    };

    // const addStringToQueryBuilder = (str) => {
    //     let newStrPrefix = "{\n";
    //     let newStrSuffix ="";
    //     let newStr = "";
    //     // 맨 뒤에서부터 ":"의 위치 찾기
    //     const lastIndex = queryBuilder.lastIndexOf(":");
    //     // ":"을 구분자로 사용하여 문자열을 나누고, 그 결과 배열의 길이에서 1을 빼서 ":"의 개수를 구함
    //     if (lastIndex !== -1) {
    //         // ":"를 기준으로 ":"포함하여 앞에 있는 모든 문자열 추출
    //         let beforeColon = queryBuilder.substring(0, lastIndex + 1);
    //         //":"의 개수로 현재 존재하는 쿼리 레벨 확인
    //         let colonCount = queryBuilder.split(":").length + 1;
    //         for(let i = 0; i < colonCount ; i++){
    //             newStrPrefix += "\t"; // 각 반복마다 탭 문자 추가
    //         }
    //         // ":"를 기준으로 뒤에 있는 모든 문자열 추출
    //         newStrSuffix=":\n\t";
    //         for(let i = 0; i < colonCount - 2; i++) newStrSuffix+= "\t";
    //         newStrSuffix += "}";
    //         const afterColon = queryBuilder.substring(lastIndex + 1);
    //         newStr = beforeColon + newStrPrefix + str + newStrSuffix + afterColon;
    //         console.log("------BeforeColon-------\n"+beforeColon+"\n");
    //         console.log("------newStrPrefix-------\n"+newStrPrefix+"\n");
    //         console.log("------str-------\n"+str+"\n");
    //         console.log("------newStrSuffix-------\n"+newStrSuffix+"\n");
    //         console.log("------AfterColon-------\n"+afterColon+"\n");
    //     } else {
    //         console.log("':' 문자가 문자열에 없습니다.");
    //         newStr = "[\n\t{\n\t\t"+str+":\n\t}\n]"
    //     }
    //     setQueryBuilder("");
    //     setQueryBuilder(newStr);
    // };
      
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
                        addStringToQueryBuilder(e.target.textContent,'');
                    }}>
                        asdf
                    </button>
                    {
                        isGuiButtonOpen && (
                            <div className="">
                                <ul className="border border-1 border-slate-950 w-20">
                                    <li className="hover:bg-gray-400">
                                        <a 
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault(); // <a> 태그의 기본 동작 방지
                                                // const text = e.target.textContent; // 클릭된 <a> 태그의 텍스트
                                                addStringToQueryBuilder(e.target.textContent, ''); // 사용자가 원하는 키 값과 텍스트를 함수에 전달
                                            }}
                                        >
                                            asdf
                                        </a>
                                    </li>
                                    <li className="hover:bg-gray-400">
                                        <a 
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault(); // <a> 태그의 기본 동작 방지
                                                // const text = e.target.textContent; // 클릭된 <a> 태그의 텍스트
                                                addStringToQueryBuilder(e.target.textContent, ''); // 사용자가 원하는 키 값과 텍스트를 함수에 전달
                                            }}
                                        >
                                            1234
                                        </a>
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
                    {/* {JSON.stringify(queryBuilder, null, 2)} */}
                    <pre>{queryBuilder}</pre>
                    {/* <pre>{JSON.stringify(queryBuilder, null, 2)}</pre> */}
                </div>
            </div>
        </div>
    )
}
export default GuiEditorForm;