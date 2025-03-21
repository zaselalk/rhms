import { BrowserRouter, Routes, Route, Link } from "react-router";
import RegistrationPage from "./pages/RegistrationPage";
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
import ResidentLandingPage from "./pages/ResidentLandingPage";
import CreateHouseholdPage from "./pages/CreateHouseholdPage";
import LandingPage from "./pages/LandingPage";
import ClinicOverviewPage from "./pages/ClinicOverviewPage";
import ClinicDetailPage from "./pages/ClinicDetailPage";
import Resident from "./pages/Resident";





function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />


        {/*Resident profiles*/}
        <Route path="/resident" element={<Resident />} />
        <Route path="/resident/profile/:id" element={<ResidentProfilePage />} />

        {/* Admin Users */}
        <Route path="/admin" >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* /admin/diseases  */}
          <Route path="diseases" >
            <Route path="" element={<DiseasesPage />} />
            <Route path="single" element={<SingleDiseasePage />} />
          </Route>

          {/* /admin/users routs */}
          <Route path="users">
            <Route path="" element={<UsersPage />} />
            <Route path="add" element={<AddUserPage />} />
          </Route>

          <Route path="households" >
            <Route path="" element={<HouseholdPage />} />
            <Route path="new" element={<CreateHouseholdPage />} />
          </Route>

          <Route path="resident-create" element={<CreateResidentPage />} />
          <Route path="division" element={<DivisionPage />} />
          <Route path="single-division" element={<SingleDivisionPage />} />


          {/* Clinic Paths*/}
        <Route path="clinic">
         <Route path="" element={<ClinicOverviewPage />} />
          <Route path="diabetic" element={<ClinicDetailPage />} />
        </Route>
  
        
        </Route>

        {/* household paths*/}
        <Route path="/household">
          <Route path="login" element={<HouseholdLoginPage />} />
          <Route path="manage" element={<HouseholdManagePage />} />
        </Route>

        {/* Resident Paths*/}
        <Route path="/resident" >
          <Route path="" element={<ResidentLandingPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="profile" element={<ResidentProfilePage />} />
          <Route path="profile-edit" element={<EditResidentProfilePage />} />
          <Route path="forgotten-password" element={<ForgottenPasswordPage />} />
          <Route path="login" element={<ResidentLoginPage />} />
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
