import { BrowserRouter, Routes, Route, Link } from "react-router";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import DivisionPage from "./pages/DivisionPage";
import SingleDivisionPage from "./pages/SingleDivisionPage";
import DiseasesPage from "./pages/DiseasesPage";
import SingleDiseasePage from "./pages/SingleDiseasePage";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home
          <Link to="/registration">Registration</Link>
          <Link to="/profile">Profile</Link>

        </div>} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/division" element={<DivisionPage />} />
        <Route path="/single-division" element={<SingleDivisionPage />} />
        <Route path="/diseases" element={<DiseasesPage />} />
        <Route path="/single-diseases" element={<SingleDiseasePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/add-users" element={<AddUserPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
