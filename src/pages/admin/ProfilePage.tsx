import { FC } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { Input, message } from "antd";
import { Button } from "../../components/common/Button";
import { useAppSelector } from "../../hooks/state/hooks";

const ProfilePage: FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  const handleInputChange = (key: string, value: string) => {
    // setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateProfile = () => {
    message.success("Profile updated successfully!");
  };

  return (
    <DashboardContainer>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">My Profile</h2>
        </div>

        <div className="bg-white shadow-md p-5 rounded-2xl">
          <div className=" rounded-lg">
            {/* User Info */}
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  value={user?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={user?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </div>
            <button
              className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
              onClick={handleUpdateProfile}
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md p-5 rounded-2xl mt-5">
          <div>
            <h3>Change Password</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                type="password"
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="mb-4">
              <Button children="Change Password" />
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default ProfilePage;
