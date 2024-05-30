import './App.css'
import MainPageForm from './components/MainPage.jsx';
import ConnectDBPage from '../src/components/ConnectDBPage.jsx';
import {
  Routes,
  Route,
} from "react-router-dom";
import GuiEduPage from './components/GuiPage/GuiEduPage.jsx';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<ConnectDBPage />} />
        <Route path="/home" element={< MainPage />} />
      </Routes>
    </div>
  )
}

export default App