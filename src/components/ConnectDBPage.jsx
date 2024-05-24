import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useDatabaseStore from "../store/databaseStore.jsx";
import useConnectedUrlStore from "../store/connectUrlStore.jsx";

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
            const response = await fetch('http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/db/connect-mongo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mongoUri: `${inputValue}`
                })
            })
            if (response === 404 || response === 500) {
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
        <div className="absolute top-1/3 left-1/4 p-8 bg-white rounded-lg shadow-lg w-[700px]">
            <div className="text-3xl font-bold mb-6 text-center">
                mongo-escalator
            </div>
            <div className="flex mb-4">
                <input
                    placeholder="URL을 입력해주세요"
                    type="text"
                    className="border border-gray-300 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className={`border border-gray-300 rounded-r-md p-2 bg-blue-500 text-white ${loading ? 'cursor-not-allowed' : ''}`}
                    onClick={(e) => { connectCollection(e); saveUrlLocal(inputValue); }}
                    disabled={loading}
                >
                    {loading ? 'Connecting...' : 'Connect'}
                </button>
            </div>

            <button
                className="border border-gray-300 rounded-md p-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                onClick={recentlyUrlToggle}
                disabled={!hasSavedUrl}
            >
                Recently URL
            </button>

            {recentlyUrlOpen && hasSavedUrl && (
                <div className="border border-gray-300 rounded-md bg-white shadow-md">
                    <ul>
                        {Object.entries(savedUrl).map(([key, value]) => (
                            <li key={key} className="hover:bg-gray-200 rounded-md p-2">
                                <div onClick={() => { savedUrlClick(value); recentlyUrlToggle(); }}>
                                    {value}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ConnectDBPage;