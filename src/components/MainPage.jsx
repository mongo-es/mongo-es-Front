import { useState } from 'react'
import '../App.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import Home from './Home/Home.jsx'
import GuiEduPage from './GuiPage/GuiEduPage.jsx'

const DefaultPage = () => {

    const [openGuiPageToggle, setOpenGuiPageToggle] = useState(true)

    const OpenGuiPage = () => {
        setOpenGuiPageToggle(!openGuiPageToggle)
    }

    return (
        <div className='grid-container grid grid-cols-[260px,1fr,1fr,1fr] grid-rows-[0.2fr,3fr] h-screen'>
            <Header OpenGuiPage={OpenGuiPage} openGuiPageToggle={openGuiPageToggle} />
            <Sidebar />
            {openGuiPageToggle ? <Home /> : <GuiEduPage />}
        </div>
    )
}

export default DefaultPage;