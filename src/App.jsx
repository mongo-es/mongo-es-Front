import './App.css'
import MainPage from './components/MainPage.jsx';
import ConnectDBPage from '../src/components/ConnectDBPage.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import GuiEduPage from './components/GuiPage/GuiEduPage.jsx';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<ConnectDBPage />} />
        <Route path="/home" element={< MainPage />} />
        <Route path="/gui" element={< GuiEduPage/>} />
      </Routes>
    </div>
  )
}

export default App