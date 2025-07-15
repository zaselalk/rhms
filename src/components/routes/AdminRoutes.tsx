import { Route, Routes } from "react-router";
import ProtectedRoutesGuard from "../auth/ProtectedRoute";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/admin/ProfilePage";
import ResidentProfilePage from "../../pages/admin/ResidentProfilePage";
import DiseasesPage from "../../pages/admin/DiseasesPage";
import SingleDiseasePage from "../../pages/admin/SingleDiseasePage";
import UsersPage from "../../pages/admin/UsersPage";
import HouseholdPage from "../../pages/admin/HouseholdPage";
import HouseholdManagePage from "../../pages/admin/HouseholdManagePage";
import DivisionPage from "../../pages/admin/DivisionPage";
import SingleDivisionPage from "../../pages/admin/SingleDivisionPage";
import AdminDashboard from "../../pages/admin/AdminDashboardPage";
import ResidentPage from "../../pages/admin/ResidentPage";
import ResidentRegistrationPage from "../../pages/admin/ResidentRegistrationPage";
import ClinicOverviewPage from "../../pages/admin/ClinicOverviewPage";
import ClinicAttendancesPage from "../../pages/admin/ClinicAttendancesPage";
import ClinicDetailPage from "../../pages/admin/ClinicDetailPage";
import AuthProvider from "../auth/AuthProvider";
import { useAppSelector } from "../../hooks/state/hooks";

export const AdminRoutes = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <AuthProvider>
      <Routes>
        {/* /admin/login */}
        <Route path="admin/login" element={<LoginPage />} />

        {/* /admin/dashboard */}
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoutesGuard>
              <AdminDashboard />
            </ProtectedRoutesGuard>
          }
        />

        {/* /admin/profile */}
        <Route
          path="admin/profile"
          element={
            <ProtectedRoutesGuard>
              <ProfilePage />
            </ProtectedRoutesGuard>
          }
        />

        {/* /admin/resident */}
        <Route path="admin/residents">
          <Route
            path=""
            element={
              <ProtectedRoutesGuard>
                <ResidentPage />
              </ProtectedRoutesGuard>
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoutesGuard>
                <ResidentRegistrationPage />
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

        {/* /admin/diseases  */}
        <Route path="admin/diseases">
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
        {/* // if the user is super_admin */}
        {user?.role === "super_admin" && (
          <Route path="admin/users">
            <Route
              path=""
              element={
                <ProtectedRoutesGuard>
                  <UsersPage />
                </ProtectedRoutesGuard>
              }
            />
          </Route>
        )}

        {/* /admin/households routes */}
        <Route path="admin/households">
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

        {/* admin/division routes */}
        <Route path="admin/division">
          <Route
            path=""
            element={
              <ProtectedRoutesGuard>
                <DivisionPage />
              </ProtectedRoutesGuard>
            }
          />
          <Route
            path=":divisionId"
            element={
              <ProtectedRoutesGuard>
                <SingleDivisionPage />
              </ProtectedRoutesGuard>
            }
          />
        </Route>

        {/* admin/clinic Paths*/}
        <Route path="admin/clinic">
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
                <ClinicAttendancesPage />
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
      </Routes>
    </AuthProvider>
  );
};
