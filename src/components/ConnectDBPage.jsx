import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useCollectionStore from "../store/collectionStore";

const ConnectDBPage = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const { setCollection, collection } = useCollectionStore();

    const connectCollection = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // const response = await fetch(`${value}`, {
            const response = await fetch('http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/db/connect-mongo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: 'mongodb+srv://kkwjdfo:9k2wNUnStGjzpYIH@cluster0.wqyssre.mongodb.net/'
                })
            })
            const data = await response.json();

            await setCollection(data.treeData);

            setLoading(false);
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    return (
        <div className="position: absolute top-[250px] left-[300px]">
            <div className="text-lg">
                mongo-es
            </div>
            <div className="flex">
                <input placeholder="url을 입력해주세요"
                    type="text" className="border border-1 border-slate-950 w-96"
                    onChange={(e) => { setValue(e.target.value) }} />
                <button className="border border-1 rounded-md border-slate-950" onClick={(e) => connectCollection(e)} disabled={loading}>
                    {loading ? 'Connecting...' : 'Connect'}
                </button>
            </div>
        </div>
    )
}

export default ConnectDBPage;