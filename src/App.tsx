import { BrowserRouter, Routes, Route, Link } from "react-router";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home
          <Link to="/registration">Registration</Link>
          <Link to="/profile">Profile</Link>

        </div>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
