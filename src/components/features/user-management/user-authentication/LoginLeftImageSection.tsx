import { FC } from "react";
import { Link } from "react-router";

export const LoginLeftImageSection: FC = () => {
  return (
    <div className="w-1/2 bg-cover bg-center">
      <img src="/images/admin-login.svg" width={600} alt="Login Cover" />
      <div className=" bg-black opacity-50 p-4">
        <div className="flex items-center justify-center h-full">
          <h2 className="text-white text-2xl font-bold">
            Welcome to Katugahahena hospital Resident Health Monitoring System
          </h2>
        </div>
      </div>
      <Link to="/" className="text-black hover:underline">
        &lt; Back to Home
      </Link>
    </div>
  );
};
