import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const ConnectDBPage = () => {
    const [value, setValue] = useState("");
    return (
        <div className="position: absolute top-[250px] left-[500px]">
            <div className="text-lg">
                mongo-es
            </div>
            <div className="flex">
                <input placeholder="url을 입력해주세요"
                    type="text" className="border border-1 border-slate-950"
                    onChange={(e) => { setValue(e.target.value) }} />
                <Link to='/home'>
                    <div className="pl-5">
                        <button className="border border-1 rounded-md border-slate-950" onClick={() => console.log(value)}>connect</button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ConnectDBPage;