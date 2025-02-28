import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Registration from './pages/Registration';

function App() {


  return (
    <BrowserRouter>
      <Link to="/registration">Registration</Link>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
