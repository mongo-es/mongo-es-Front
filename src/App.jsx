import './App.css'
import MainPage from './components/MainPage.jsx';
import ConnectDBPage from '../src/components/ConnectDBPage.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

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