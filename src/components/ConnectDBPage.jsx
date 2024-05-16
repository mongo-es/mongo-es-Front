import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useDatabaseStore from "../store/databaseStore";
import useConnectedUrlStore from "../store/connectUrlStore";

const ConnectDBPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [recentlyUrlOpen, setRecentlyUrlOpen] = useState(false);
    const [savedUrl, setSavedUrl] = useState({});
    const [inputValue, setInputValue] = useState('');

    const { setDatabase } = useDatabaseStore();
    const { setConnectedUrl } = useConnectedUrlStore();

    const loadUrlFromLocalStorage = () => {
        const savedUrl = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.includes("mongo-es")) {
                savedUrl[key] = JSON.parse(localStorage.getItem(key));
            }
        }
        return savedUrl;
    };

    useEffect(() => {
        const Url = loadUrlFromLocalStorage();
        if (Object.keys(Url).length > 0) {
            setSavedUrl(Url);
        }
    }, []);

    const connectCollection = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${inputValue}/api/v1/db/connect-mongo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: 'mongodb+srv://kkwjdfo:9k2wNUnStGjzpYIH@cluster0.wqyssre.mongodb.net/'
                })
            })
            if (response === 404) {
                alert("에러입니다~")
            }
            const data = await response.json();

            await setDatabase(data.treeData);

            await setConnectedUrl(inputValue);

            setLoading(false);
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const recentlyUrlToggle = () => {
        setRecentlyUrlOpen((prev) => (!prev));
    }

    const saveUrlLocal = (value) => {
        const key = value + "-mongo-es"
        localStorage.setItem(key, JSON.stringify(value));
    };

    const hasSavedUrl = Object.keys(savedUrl).length > 0;

    const savedUrlClick = (value) => {
        setInputValue(value);
    };


    return (
        <div className="position: absolute top-[250px] left-[300px]">
            <div className="text-lg">
                mongo-es
            </div>
            <div className="flex">
                <input placeholder="url을 입력해주세요"
                    type="text" className="border border-1 border-slate-950 w-96"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />

                <button className="border border-1 rounded-md border-slate-950" onClick={(e) => { connectCollection(e); saveUrlLocal(inputValue) }} disabled={loading}>
                    {loading ? 'Connecting...' : 'Connect'}
                </button>
            </div>

            <div className="">
                <button
                    className="border border-1 border-slate-950 px-2"
                    onClick={recentlyUrlToggle}
                    disabled={!hasSavedUrl}
                >
                    recently url
                </button>
            </div>
            {recentlyUrlOpen && hasSavedUrl && (
                <div className="">
                    <ul className="border border-1 border-slate-950">
                        {Object.entries(savedUrl).map(([key, value]) => (
                            <li key={key} className="hover:bg-gray-400">
                                <a href="#!" onClick={() => { savedUrlClick(value); recentlyUrlToggle() }}>
                                    {value}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ConnectDBPage;