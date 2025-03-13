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
import HouseholdPage from "./pages/HouseholdPage";
import ResidentProfilePage from "./pages/ResidentProfilePage";
import CreateResidentPage from "./pages/CreateResidentPage";
import ResidentLoginPage from "./pages/ResidentLoginPage";
import EditResidentProfilePage from "./pages/EditResidentProfilePage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import HouseholdLoginPage from "./pages/HouseholdLoginPage";
import HouseholdManagePage from "./pages/HouseholdManagePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>
          <Link to="/household-login" className="bg-gray-300">HouseHold</Link> <br />
          <Link to="/resident-login">Resident Login</Link><br />
          <Link to="/login">Staff</Link><br />

        </div>} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/division" element={<DivisionPage />} />
        <Route path="/single-division" element={<SingleDivisionPage />} />
        <Route path="/diseases" element={<DiseasesPage />} />
        <Route path="/single-diseases" element={<SingleDiseasePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/add-users" element={<AddUserPage />} />
        <Route path="/houses" element={<HouseholdPage />} />
        <Route path="/resident-profile" element={<ResidentProfilePage />} />
        <Route path="/resident-profile-edit" element={<EditResidentProfilePage />} />
        <Route path="/resident-forgotten-password" element={<ForgottenPasswordPage />} />
        <Route path="/resident-login" element={<ResidentLoginPage />} />
        <Route path="/create-resident" element={<CreateResidentPage />} />

        {/* household */}
        <Route path="/household-login" element={<HouseholdLoginPage />} />
        <Route path="/household-manage" element={<HouseholdManagePage />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
