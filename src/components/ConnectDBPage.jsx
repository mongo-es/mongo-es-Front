import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDatabaseStore from "../store/databaseStore.jsx";
import useConnectedUrlStore from "../store/connectUrlStore.jsx";
import { FaTrashAlt } from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { GoX } from "react-icons/go";

const ConnectDBPage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [recentlyUrlOpen, setRecentlyUrlOpen] = useState(false);
    const [savedUrl, setSavedUrl] = useState({});
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState(false);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        if (inputValue.trim() !== "") {
            setInputError(false);
        }
    }, [inputValue]);

    const connectCollection = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "http://ec2-13-125-76-129.ap-northeast-2.compute.amazonaws.com:3000/api/v1/db/connect-mongo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mongoUri: `${inputValue}`,
                    }),
                }
            );

            if (response.status === 403) {
                const errorData = await response.json();
                setError({
                    message: "해당 DB에 접근이 거부되었습니다.",
                    publicIp: errorData.publicIp,
                });
                setLoading(false);
                return;
            }
            if (response === 404 || response === 500) {
                alert("에러입니다~");
            }
            const data = await response.json();
            await setDatabase(data.treeData);
            await setConnectedUrl(inputValue);

            setLoading(false);
            navigate("/home");
        } catch (error) {
            console.error("Error:", error);
            alert(
                "서버에 연결할 수 없습니다. \nURL 또는 서버를 확인하고 다시 시도하세요."
            );
            setSavedUrl((prevUrls) => {
                const updatedUrls = {
                    ...prevUrls,
                    [`${inputValue}-mongo-es`]: inputValue,
                };
                return updatedUrls;
            });
            setLoading(false);
        }
    };

    const recentlyUrlToggle = () => {
        setRecentlyUrlOpen((prev) => !prev);
    };

    const saveUrlLocal = (value) => {
        const key = value + "-mongo-es";
        localStorage.setItem(key, JSON.stringify(value));
    };

    const hasSavedUrl = Object.keys(savedUrl).length > 0;

    const savedUrlClick = (value) => {
        setInputValue(value);
    };

    const deleteUrl = (key) => {
        localStorage.removeItem(key);
        setSavedUrl((prevUrls) => {
            const updatedUrls = { ...prevUrls };
            delete updatedUrls[key];
            return updatedUrls;
        });
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#a3e635] to-[#65a30d] text-white font-SCoreDream">
            <div className="space-y-8 text-center min-w-md w-full px-4">
                <h1 className="text-5xl font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                    Mongo Escalator
                </h1>
                <p className="text-xl font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,1)]">
                    MongoDB Aggregation Pipeline 학습 서비스
                </p>
                <div className="flex flex-col gap-4 items-center justify-center">
                    {inputError && (
                        <div className="text-danger-400 font-bold text-left w-1/3">
                            * 데이터베이스 주소를 입력해주세요.
                        </div>
                    )}
                    <input
                        spellCheck="false"
                        placeholder="Enter MongoDB URI"
                        type="text"
                        className="bg-white text-gray-900 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#65a30d] focus:border-transparent w-1/3"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="flex gap-4  justify-end w-1/3">
                        <button
                            className={`bg-white text-gray-900 hover:bg-gray-200 transition-colors px-8 py-3 rounded-md font-medium ${
                                loading ? "cursor-not-allowed" : ""
                            }`}
                            onClick={(e) => {
                                if (inputValue.trim() === "") {
                                    setInputError(true);
                                    return;
                                }
                                connectCollection(e);
                                saveUrlLocal(inputValue);
                            }}
                            disabled={loading}
                        >
                            {loading ? "Connecting..." : "Connect"}
                        </button>
                        <button
                            className="px-8 py-3 rounded-md font-medium text-black bg-white hover:bg-gray-200 transition-colors"
                            onClick={recentlyUrlToggle}
                            disabled={!hasSavedUrl}
                        >
                            <div className="flex items-center">
                                <span className="mr-2">Connect Recent</span>
                                <GoHistory style={{ color: "black" }} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Dialog */}
            {error && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white text-black p-8 rounded-md shadow-md max-w-lg w-full text-center">
                        <p>{error.message}</p>
                        <p>
                            <a
                                href="https://cloud.mongodb.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                Mongo Atlas
                            </a>{" "}
                            Network Access에서 {error.publicIp}를 허용시켜
                            주세요.
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setError(null)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 최근 URL 목록 */}
            {recentlyUrlOpen && (
                <div
                    className={`border border-gray-300 rounded-md bg-white shadow-md mt-4 w-full max-w-md px-4 py-2 transition-height duration-300`}
                >
                    {hasSavedUrl && (
                        <ul className="space-y-2">
                            {Object.entries(savedUrl).map(([key, value]) => (
                                <li
                                    key={key}
                                    className="flex justify-between items-center rounded-md p-2 bg-gray-100"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="cursor-pointer p-2 text-black hover:bg-gray-200 hover:rounded-md"
                                            style={{ wordWrap: "break-word" }}
                                            onClick={() => {
                                                savedUrlClick(value);
                                                recentlyUrlToggle();
                                            }}
                                        >
                                            {value}
                                        </div>
                                    </div>
                                    <button onClick={() => deleteUrl(key)}>
                                        <div className="p-3 hover:bg-gray-200 hover:rounded-md">
                                            <FaTrashAlt
                                                style={{ color: "gray" }}
                                            />
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {!hasSavedUrl && (
                        <p className="text-gray-500">
                            No recent URLs available.
                        </p>
                    )}
                </div>
            )}
        </main>
    );
};

export default ConnectDBPage;
