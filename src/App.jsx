import './App.css'
import MainPageForm from './components/MainPage.jsx';
import ConnectDBPage from '../src/components/ConnectDBPage.jsx';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<ConnectDBPage />} />
        <Route path="/home" element={< MainPageForm />} />
      </Routes>
    </div>
  )
}

export default App