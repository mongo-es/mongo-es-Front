import React from "react";
import { useState } from "react";

const GuiEditorForm = () => {
    const [isGuiButtonOpen, setIsGuiButtonOpen] = useState(false);
    const guiButtonOpenToggle = () => {
        setIsGuiButtonOpen(prev => !prev);
    }
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
                    <button className="border border-1 border-slate-950" onClick={() => guiButtonOpenToggle()}>
                        asdf
                    </button>
                    {
                        isGuiButtonOpen && (
                            <div className="">
                                <ul className="border border-1 border-slate-950 w-20">
                                    <li className="hover:bg-gray-400">
                                        <a className="">
                                            asdf
                                        </a>
                                    </li>
                                    <li className="hover:bg-gray-400">
                                        <a className="">
                                            asdf
                                        </a>
                                    </li>
                                    <li className="hover:bg-gray-400">
                                        <a className="">
                                            asdf
                                        </a>
                                    </li>
                                    <li className="hover:bg-gray-400">
                                        <a className="">
                                            asdf
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
                    GUI버튼에 따른 파이프라인이 들어갈 자리입니다
                </div>
            </div>
        </div>
    )
}
export default GuiEditorForm;