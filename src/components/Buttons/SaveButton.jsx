import React from "react";
import { useState } from "react";

const SaveButton = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div>
            <button onClick={() => toggleModal()} className="border border-solid border-green-600 rounded-md bg-green-400 w-20">
                Save
            </button>

            {
                modal && (
                    <div className="modal z-20 fixed inset-0">
                        <div className="absolute border border-1 border-slate-950 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg h-[300px] w-[420px] z-10">
                            <div className="pt-10 pl-12">
                                파이프라인 이름을 작성해 주세요
                            </div>
                            <div>
                                <button className="absolute top-5 right-5 bg-gray-200 border border-gray-400 rounded-md px-2 py-1" onClick={toggleModal}>
                                    CLOSE
                                </button>
                            </div>
                            <div className="flex pt-10 pl-8">
                                <input type="text" className="border border-1 border-slate-950 w-96" />
                                <div className="pl-5">
                                    <button className="border border-1 border-green-400 rounded-md bg-green-400 px-5">
                                        save
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default SaveButton;