import { useState, useEffect } from 'react';
import '../App.css';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Home from './Home/Home.jsx';
import GuiEduPage from './GuiPage/GuiEduPage.jsx';

// 모달 컴포넌트 정의
const Modal = ({ pages, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState('');

    const nextPage = () => {
        if (currentPage < pages.length - 1 && !isAnimating) {
            setDirection('right');
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setIsAnimating(false);
            }, 300);
        }
    };

    const prevPage = () => {
        if (currentPage > 0 && !isAnimating) {
            setDirection('left');
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setIsAnimating(false);
            }, 300);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[60rem] h-[30rem] relative overflow-hidden">
                <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl z-50"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                >
                    &lt;
                </button>
                <div className={`w-full h-full flex items-center justify-center relative`}>
                    <div
                        className={`absolute inset-0 flex transition-transform duration-300 transform ${direction === 'right' ? 'translate-x-[-100%]' : direction === 'left' ? 'translate-x-[100%]' : ''}`}
                        style={{ transform: `translateX(-${currentPage * 100}%)` }}
                    >
                        {pages.map((page, index) => (
                            <div className="w-full h-full flex-shrink-0 flex items-center justify-center" key={index}>
                                {page}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl"
                    onClick={nextPage}
                    disabled={currentPage === pages.length - 1}
                >
                    &gt;
                </button>
                <div className="absolute top-4 right-4">
                    <span>{`${currentPage + 1} / ${pages.length}`}</span>
                </div>
                <div className="absolute bottom-4 right-4">
                    <button className="text-blue-500" onClick={onClose}>Skip</button>
                </div>
            </div>
        </div>
    );
};

const MainPageForm = () => {
    const [openGuiPageToggle, setOpenGuiPageToggle] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('hasSeenModal');
        if (!hasSeenModal) {
            setShowModal(true);
            localStorage.setItem('hasSeenModal', 'true');
        }
    }, []);

    const OpenGuiPage = () => {
        setOpenGuiPageToggle(!openGuiPageToggle);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const pages = [
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl mb-4">좌측 사이드바에서 DB와 Collection을 선택해주세요</h2>
        </div>,
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl mb-4">선택한 Collection의 스키마 타입을 확인하세요</h2>
        </div>,
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl mb-4">나만의 파이프라인을 작성하고 실행 버튼을 눌러주세요</h2>
        </div>,
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl mb-4">구성 스키마와 Aggregate 결과값을 확인하세요</h2>
        </div>,
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl mb-4">Explain을 통해 최적화 발생을 확인하세요</h2>
        </div>,
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl mb-4">감사합니다</h2>
        </div>,
    ];

    return (
        <div className='grid-container grid grid-cols-[260px,1fr,1fr,1fr] grid-rows-[0.2fr,3fr] h-screen relative'>
            {showModal && <Modal pages={pages} onClose={closeModal} />}
            <Header OpenGuiPage={OpenGuiPage} openGuiPageToggle={openGuiPageToggle} setShowModal={setShowModal} />
            <Sidebar />
            {openGuiPageToggle ? <Home /> : <GuiEduPage />}
        </div>
    );
};

export default MainPageForm;