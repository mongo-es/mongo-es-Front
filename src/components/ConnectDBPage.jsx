import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const ConnectDBPage = () => {
    const [value, setValue] = useState("");

    return (
        <div>
            mongo-es
            <form action="#">
                <div className="position: absolute top-[250px] left-[500px]">
                    <input type="text" className="border border-1 border-slate-950" onChange={(e) => { setValue(e.target.value) }} />
                    <Link to='/home'>
                        <button className="border border-1 border-slate-950">asdf</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ConnectDBPage;