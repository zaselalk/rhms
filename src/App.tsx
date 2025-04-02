import { BrowserRouter, Routes, Route, Link } from "react-router";
import RegistrationPage from "./pages/admin/ResidentRegistrationPage";
import LoginPage from "./pages/LoginPage";
import DivisionPage from "./pages/admin/DivisionPage";
import SingleDivisionPage from "./pages/admin/SingleDivisionPage";
import DiseasesPage from "./pages/admin/DiseasesPage";
import SingleDiseasePage from "./pages/admin/SingleDiseasePage";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/admin/AddUserPage";
import HouseholdPage from "./pages/admin/HouseholdPage";
import ResidentProfilePage from "./pages/admin/ResidentProfilePage";
import CreateResidentPage from "./pages/admin/CreateResidentPage";
import ResidentLoginPage from "./pages/resident/ResidentLoginPage";
import EditResidentProfilePage from "./pages/resident/EditResidentProfilePage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import HouseholdLoginPage from "./pages/household/HouseholdLoginPage";
import HouseholdManagePage from "./pages/admin/HouseholdManagePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ResidentLandingPage from "./pages/resident/ResidentLandingPage";
import CreateHouseholdPage from "./pages/admin/CreateHouseholdPage";
import LandingPage from "./pages/LandingPage";
import ClinicOverviewPage from "./pages/admin/ClinicOverviewPage";
import ClinicDetailPage from "./pages/admin/ClinicDetailPage";
import Resident from "./pages/admin/Resident";
import ResidentDashboard from "./pages/resident/ResidentDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Admin Users */}
        <Route path="/admin" >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* /admin/resident */}
          <Route path="residents" >
            <Route path="" element={<Resident />} />
            <Route path="profile/:id" element={<ResidentProfilePage />} />
          </Route>

          {/* /admin/diseases  */}
          <Route path="diseases" >
            <Route path="" element={<DiseasesPage />} />
            <Route path="single" element={<SingleDiseasePage />} />
          </Route>

          {/* /admin/users routs */}
          <Route path="users"  >
            <Route path="" element={<UsersPage />} />
            <Route path="add" element={<AddUserPage />} />
          </Route>

          <Route path="households" >
            <Route path="" element={<HouseholdPage />} />
            <Route path="new" element={<CreateHouseholdPage />} />
          </Route>

          {/* /admin/residents routes */}
          {/* <Route path="residents">
            <Route path="" element={<ResidentLandingPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="profile" element={<ResidentProfilePage />} />
          </Route> */}

          <Route path="residents" >
            <Route path="" element={<Resident />} />
            <Route path="create" element={<RegistrationPage />} />
            <Route path="profile/:id" element={<ResidentProfilePage />} />
          </Route>


          <Route path="division">
            <Route path="" element={<DivisionPage />} />
            <Route path=":id" element={<SingleDivisionPage />} />
          </Route>


          {/* Clinic Paths*/}
          <Route path="clinic">
            <Route path="" element={<ClinicOverviewPage />} />
            <Route path="diabetic" element={<ClinicDetailPage />} />
          </Route>


        </Route>

        {/* household paths*/}
        <Route path="/household">
          <Route path="login" element={<HouseholdLoginPage />} />
          <Route path="" element={<HouseholdManagePage />} />
        </Route>

        {/* Resident Paths*/}
        <Route path="/resident" >
          <Route path="" element={<ResidentDashboard />} />
          {/* <Route path="" element={<ResidentLandingPage />} /> */}
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="edit" element={<EditResidentProfilePage />} />
          <Route path="forgotten-password" element={<ForgottenPasswordPage />} />
          <Route path="login" element={<ResidentLoginPage />} />
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
