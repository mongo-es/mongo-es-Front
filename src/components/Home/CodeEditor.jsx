import React, { useState, useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { default_VALUE } from "../../constants.js";
import ConfigurationSchemeForm from "../Home/ConfigurationScheme.jsx";
import useOptimizeStore from "../../store/optimizeStore.jsx";
import OptimizePipeline from "../OptimizeModal.jsx/OptimizePipeline.jsx";
import OptimizePipelineExplain from "../OptimizeModal.jsx/OptimizePipelineExplain.jsx";

const CodeEditorForm = () => {
    const [value, setValue] = useState("");
    const { indexOptimize, pipeOptimize } = useOptimizeStore();
    const [modal, setModal] = useState(false);
    const [checked, setChecked] = useState(false);


    const toggleModal = () => {
        setModal(!modal);
    };

    // 조건에 따라 체크박스를 비활성화하기 위한 변수
    const isOptimizable = pipeOptimize.optimizeCategory.isMerged || pipeOptimize.optimizeCategory.isChangedOrder;

    useEffect(() => {
        setChecked(!isOptimizable);
    }, [isOptimizable]);

    const handleChange = () => {
        if (isOptimizable) {
            toggleModal();
        }
    };

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

                        <div className="float-right flex pt-2">
                            <div className="pr-2">
                                {isOptimizable ? <button>
                                    최적화가 발생하였습니다
                                </button> : <button>최적화가 발생하지 않았습니다</button>}

                            </div>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    disabled={!isOptimizable}
                                    checked={checked}
                                    onChange={handleChange}
                                />
                                <div
                                    className={`relative w-11 h-6 ${checked ? 'bg-green-500' : 'bg-danger-500'} peer-focus:outline-none rounded-full 
                                        peer peer-checked:after:translate-x-full 
                                        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                                        after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border 
                                        after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500`}
                                ></div>
                            </label>
                        </div>
                    </div>
                    {
                        modal && (
                            <div className="modal z-20 fixed inset-0">
                                <div onClick={toggleModal} className="overlay fixed inset-0 bg-black bg-opacity-50"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 line-height-[1.4] bg-white p-8 rounded-lg max-w-[1200px] min-w-[600px] h-3/4 w-3/4 z-10">
                                    <div className="text-lg">
                                        <div className="flex pb-2">
                                            <button className="border border-1 border-solid border-gray-100 rounded-md bg-gray-100 h-10 w-[220px] z-2">
                                                <div className="text-black">
                                                    최적화된 파이프라인
                                                </div>
                                            </button>
                                            <div className="pl-[350px]">
                                            </div>
                                            <button className="border border-1 border-solid border-gray-100 rounded-md bg-gray-100 h-10 w-[250px] z-2">
                                                <div className="text-black">
                                                    최적화된 파이프라인 설명
                                                </div>
                                            </button>
                                        </div>
                                        <div className="flex justify-between">
                                            <OptimizePipeline />
                                            <OptimizePipelineExplain />
                                        </div>
                                    </div>
                                    <button className="absolute top-5 right-[31px] bg-gray-100 border border-gray-400 rounded-md px-2 py-1" onClick={toggleModal}>
                                        CLOSE
                                    </button>
                                </div>
                            </div>
                        )
                    }

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
