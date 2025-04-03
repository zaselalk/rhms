import { BrowserRouter, Routes, Route} from "react-router";
import RegistrationPage from "./pages/admin/ResidentRegistrationPage";
import LoginPage from "./pages/LoginPage";
import DivisionPage from "./pages/admin/DivisionPage";
import SingleDivisionPage from "./pages/admin/SingleDivisionPage";
import UsersPage from "./pages/admin/UsersPage";
import AddUserPage from "./pages/admin/AddUserPage";
import HouseholdPage from "./pages/admin/HouseholdPage";
import ResidentProfilePage from "./pages/admin/ResidentProfilePage";
import ResidentLoginPage from "./pages/resident/ResidentLoginPage";
import EditResidentProfilePage from "./pages/resident/EditResidentProfilePage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import HouseholdLoginPage from "./pages/household/HouseholdLoginPage";
import HouseholdManagePage from "./pages/admin/HouseholdManagePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import CreateHouseholdPage from "./pages/admin/CreateHouseholdPage";
import LandingPage from "./pages/LandingPage";
import ClinicOverviewPage from "./pages/admin/ClinicOverviewPage";
import ClinicDetailPage from "./pages/admin/ClinicDetailPage";
import Resident from "./pages/admin/Resident";
import ResidentDashboard from "./pages/resident/ResidentDashboard";
import ResidentClinicDetail from "./pages/resident/ResidentClinicDetail";
import ClinicAttendancePage from "./pages/admin/ClinicAttendances";
import DiseasesPage from "./pages/admin/DiseasesPage";
import SingleDiseasePage from "./pages/admin/SingleDiseasePage";
import ProfilePage from "./pages/admin/ProfilePage";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Admin Users */}
        <Route path="/admin" >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="login" element={<LoginPage />} />

          {/*Profile  */}
          <Route path="profile" element={<ProfilePage />} />

          {/* /admin/resident */}
          <Route path="residents" >
            <Route path="" element={<Resident />} />
            <Route path="profile/:id" element={<ResidentProfilePage />} />
          </Route>

          {/* /admin/diseases  */}
          <Route path="diseases" >
            <Route path="" element={<DiseasesPage />} />
            <Route path=":diseaseName" element={<SingleDiseasePage />} />
          </Route>

          {/* /admin/users routs */}
          <Route path="users"  >
            <Route path="" element={<UsersPage />} />
            <Route path="add" element={<AddUserPage />} />
          </Route>

          {/* /admin/households routes */}
          <Route path="households" >
            <Route path="" element={<HouseholdPage />} />
            <Route path="manage/:id" element={<HouseholdManagePage />} />
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
            <Route path="SingleDivisionPage" element={<SingleDivisionPage />} />
          </Route>


          {/* Clinic Paths*/}
          <Route path="clinic">
            <Route path="" element={<ClinicOverviewPage />} />
            <Route path=":clinic/attendance" element={<ClinicAttendancePage />} />
            <Route path=":clinic" element={<ClinicDetailPage />} />
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
          <Route path="clinicDetails" element={<ResidentClinicDetail/>} />
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
