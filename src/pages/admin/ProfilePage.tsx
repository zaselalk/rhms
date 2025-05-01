import { FC } from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { Input, Button } from "antd";
import { useAppSelector } from "../../hooks/state/hooks";

import { UpdateUserFullName } from "../../components/features/profile-management/UpdateUserFullName";

const ProfilePage: FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  const handleInputChange = (key: string, value: string) => {
    // setUser((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardContainer>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">My Profile</h2>
        </div>

        <div className="bg-white shadow-md p-5 rounded-2xl">
          <div className=" rounded-lg">
            <UpdateUserFullName />

            <div className="mb-4">
              <p className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </p>
              <p>{user?.email}</p>
            </div>
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
