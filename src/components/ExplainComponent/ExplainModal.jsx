import React, { useState } from "react";
import ExplainOrigin from "../ExplainComponent/ExplainOrigin.jsx";
import ExplainTranslate from "../ExplainComponent/ExplainTranslate.jsx";


const ExplainModal = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };


    return (
        <>
            <button onClick={(e) => { toggleModal(); }} className="border border-1 border-solid border-gray-100 rounded-md bg-gray-100 h-10 w-[110px] z-2">
                Explain
            </button>

            {modal && (
                <div className="modal z-20 fixed inset-0">
                    <div onClick={toggleModal} className="overlay fixed inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 line-height-[1.4] bg-white p-8 rounded-lg max-w-[1200px] min-w-[600px] h-3/4 w-3/4 z-10">
                        <h1 className="font-bold text-3xl">Explain</h1>
                        <br />
                        <div className="text-lg">
                            <div className="flex justify-between">
                                <ExplainTranslate />
                                <ExplainOrigin />
                            </div>
                        </div>
                        <button className="absolute top-10 right-10 bg-gray-200 border border-gray-400 rounded-md px-2 py-1" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ExplainModal;