import { BrowserRouter, Routes, Route } from "react-router";
import RegistrationPage from "./pages/admin/ResidentRegistrationPage";
import LoginPage from "./pages/LoginPage";
import DivisionPage from "./pages/admin/DivisionPage";
import SingleDivisionPage from "./pages/admin/SingleDivisionPage";
import UsersPage from "./pages/admin/UsersPage";
import HouseholdPage from "./pages/admin/HouseholdPage";
import ResidentProfilePage from "./pages/admin/ResidentProfilePage";
import ResidentLoginPage from "./pages/resident/ResidentLoginPage";
import EditResidentProfilePage from "./pages/resident/EditResidentProfilePage";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage";
import HouseholdLoginPage from "./pages/household/HouseholdLoginPage";
import HouseholdManagePage from "./pages/admin/HouseholdManagePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
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
import ProtectedRoutesGuard from "./components/auth/ProtectedRoute";
import AuthProvider from "./components/auth/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Admin Users */}
          <Route path="/admin">
            <Route
              path="dashboard"
              element={
                <ProtectedRoutesGuard>
                  <AdminDashboardPage />
                </ProtectedRoutesGuard>
              }
            />
            <Route path="login" element={<LoginPage />} />

            {/*Profile  */}
            <Route
              path="profile"
              element={
                <ProtectedRoutesGuard>
                  <ProfilePage />
                </ProtectedRoutesGuard>
              }
            />

            {/* /admin/resident */}
            <Route path="residents">
              <Route path="" element={<Resident />} />
              <Route
                path="profile/:id"
                element={
                  <ProtectedRoutesGuard>
                    <ResidentProfilePage />
                  </ProtectedRoutesGuard>
                }
              />
            </Route>

            {/* /admin/diseases  */}
            <Route path="diseases">
              <Route
                path=""
                element={
                  <ProtectedRoutesGuard>
                    <DiseasesPage />
                  </ProtectedRoutesGuard>
                }
              />
              <Route
                path=":diseaseName"
                element={
                  <ProtectedRoutesGuard>
                    <SingleDiseasePage />
                  </ProtectedRoutesGuard>
                }
              />
            </Route>

            {/* /admin/users routs */}
            <Route path="users">
              <Route
                path=""
                element={
                  <ProtectedRoutesGuard>
                    <UsersPage />
                  </ProtectedRoutesGuard>
                }
              />
              {/* <Route path="add" element={<AddUserPage />} /> */}
            </Route>

            {/* /admin/households routes */}
            <Route path="households">
              <Route
                path=""
                element={
                  <ProtectedRoutesGuard>
                    <HouseholdPage />
                  </ProtectedRoutesGuard>
                }
              />
              <Route
                path="manage/:householdId"
                element={
                  <ProtectedRoutesGuard>
                    <HouseholdManagePage />
                  </ProtectedRoutesGuard>
                }
              />
            </Route>

            <Route path="residents">
              <Route
                path=""
                element={
                  <ProtectedRoutesGuard>
                    <Resident />
                  </ProtectedRoutesGuard>
                }
              />
              <Route
                path="create"
                element={
                  <ProtectedRoutesGuard>
                    <RegistrationPage />
                  </ProtectedRoutesGuard>
                }
              />
              <Route
                path="profile/:id"
                element={
                  <ProtectedRoutesGuard>
                    <ResidentProfilePage />
                  </ProtectedRoutesGuard>
                }
              />
            </Route>

            <Route path="division">
              <Route
                path=""
                element={
                  <ProtectedRoutesGuard>
                    <DivisionPage />
                  </ProtectedRoutesGuard>
                }
              />
              <Route
                path="SingleDivisionPage"
                element={
                  <ProtectedRoutesGuard>
                    <SingleDivisionPage />
                  </ProtectedRoutesGuard>
                }
              />
            </Route>

            {/* Clinic Paths*/}
            <Route path="clinic">
              <Route
                path=""
                element={
                  <ProtectedRoutesGuard>
                    <ClinicOverviewPage />
                  </ProtectedRoutesGuard>
                }
              />
              <Route
                path=":clinicID/:sessionID/attendance"
                element={
                  <ProtectedRoutesGuard>
                    <ClinicAttendancePage />
                  </ProtectedRoutesGuard>
                }
              />
              <Route
                path=":clinicId"
                element={
                  <ProtectedRoutesGuard>
                    <ClinicDetailPage />
                  </ProtectedRoutesGuard>
                }
              />
            </Route>
          </Route>

          {/* household paths*/}
          <Route path="/household">
            <Route
              path="login"
              element={
                <ProtectedRoutesGuard>
                  <HouseholdLoginPage />
                </ProtectedRoutesGuard>
              }
            />
            <Route
              path=""
              element={
                <ProtectedRoutesGuard>
                  <HouseholdManagePage />
                </ProtectedRoutesGuard>
              }
            />
          </Route>

          {/* Resident Paths*/}
          <Route path="/resident">
            <Route path="" element={<ResidentDashboard />} />
            {/* <Route path="" element={<ResidentLandingPage />} /> */}
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="edit" element={<EditResidentProfilePage />} />
            <Route
              path="forgotten-password"
              element={<ForgottenPasswordPage />}
            />
            <Route path="login" element={<ResidentLoginPage />} />
            <Route path="clinicDetails" element={<ResidentClinicDetail />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
