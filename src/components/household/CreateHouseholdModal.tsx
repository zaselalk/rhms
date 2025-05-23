import { FC, useState } from "react";
import Modal from "../layouts/overlays/Modal";

interface CreateHouseholdModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CreateHouseholdModal: FC<CreateHouseholdModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [house_no, sethouse_no] = useState("");
  const [grama_division, setgrama_division] = useState("");
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("");
  const [owner_id, setowner_id] = useState("");

  const handleCreateHousehold = () => {
    
    console.log("Household Created:", {
      house_no,
      grama_division,
      longitude,
      latitude,
      owner_id,
    });
  };
  return (
    <Modal title="Create Household" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">
          Create Household
        </h2>

        {/* Create Household Form */}
        <div className="space-y-4">
          {/* Household Name */}
          <div>
            <label
              htmlFor="house_no"
              className="block text-sm font-medium text-gray-700"
            >
              House No
            </label>
            <input
              type="text"
              id="house_no"
              value={house_no}
              onChange={(e) => sethouse_no(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              placeholder="Enter household number"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="grama_division"
              className="block text-sm font-medium text-gray-700"
            >
              Grama Division
            </label>
            <textarea
              id="grama_division"
              value={grama_division}
              onChange={(e) => setgrama_division(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              placeholder="Enter grama division"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              value={longitude}
              onChange={(e) => setlongitude(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              placeholder="Enter Longitude"
            />
          </div>

          {/* Household Members */}
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              value={latitude}
              onChange={(e) => setlatitude(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              placeholder="Enter latitude"
            />
          </div>
          <div>
            <label
              htmlFor="owner_id"
              className="block text-sm font-medium text-gray-700"
            >
              Owner ID
            </label>
            <input
              type="text"
              id="owner_id"
              value={owner_id}
              onChange={(e) => setowner_id(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              placeholder="Enter owner ID"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCreateHousehold}
              className="w-full sm:w-auto px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
            >
              Create Household
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateHouseholdModal;
