import './App.css'
import DefaultPage from './components/DefaultPage.jsx';
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
        <Route path="/home" element={< DefaultPage />} />
      </Routes>

    </div>
  )
}

export default App