import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Home from '../src/components/Home/Home.jsx'
import GuiEduPage from '../src/components/GuiPage/GuiEduPage.jsx'

function App() {

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

export default App