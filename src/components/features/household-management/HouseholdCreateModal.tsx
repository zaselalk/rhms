import { FC, useState } from "react";
import Modal from "../../layouts/overlays/Modal";
import { createHousehold } from "../../../services/household.service";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import householdresidentService from "../../../services/householdresident.service";
import { message as antMessage } from "antd";


interface HouseholdCreateModalProps {
  isOpen: boolean;
  handleClose: () => void;
  refreshHouseholds: () => void; 
}

export const HouseholdCreateModal: FC<HouseholdCreateModalProps> = ({
  isOpen,
  handleClose,
  refreshHouseholds,
}) => {
  const [house_no, setHouseNo] = useState("");
  const [grama_division, setGramaDivision] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [residentSearchId, setResidentSearchId] = useState("");
  const [foundResidentName, setFoundResidentName] = useState("");
  const [owner_id, setOwnerId] = useState("");

  // Feedback state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

 

  // Function to search resident by ID
  const handleSearchResident = async () => {
    setMessage("");
    setError("");

    if (!residentSearchId || isNaN(Number(residentSearchId))) {
      setError("Please enter a valid numeric Resident ID");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3001/resident/id/${Number(residentSearchId)}`
      );
      const data = res.data.data; // Accessing the correct structure

      if (!data) {
        setFoundResidentName("");
        setOwnerId("");
        setError("Resident not found");
        return;
      }
      console.log("Fetched resident data:", data);
      setFoundResidentName(
        `${data.firstName} ${data.lastName}` || "Name not available"
      );
      setOwnerId(res.data.id); // Corrected: use 'id', not '_id'
    } catch (err) {
      console.error("Fetch error:", err);
      setFoundResidentName("");
      setOwnerId("");
      setError("Resident not found");
    }
  };

  // Function to create a household
  const handleCreateHousehold = async () => {
    setLoading(true);
    const parsedOwnerId = Number(residentSearchId); // convert once and reuse

    if (!residentSearchId || isNaN(parsedOwnerId)) {
      antMessage.error("Invalid owner ID");
      setLoading(false);
      return;
    }

   
    if (window.confirm("Are you sure you want to create this household?")) {
      try {
        const response = await createHousehold({
          house_no,
          grama_division,
          longitude,
          latitude,
          owner_id: parsedOwnerId,
        });

        const createdHouseholdId = response?.id; 

      if (!createdHouseholdId) {
        throw new Error("Household ID not returned after creation.");
      }

      // Step 2: Add owner to household as a resident with relation = 'Owner'
      await householdresidentService.addResidentToHousehold(
        createdHouseholdId,
        {
          residentId: parsedOwnerId,
          relation: "Owner",
        }
      );

        antMessage.success("Household created successfully!");

        refreshHouseholds(); // Call the passed function to refresh households
      
        handleClose(); // Close modal on success

        setTimeout(() => {
          navigate(location.pathname); // Redirect to the same page to refresh data
        }, 500);

      } catch (error) {
        antMessage.error("Error creating household");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Create Household">
      <div className="space-y-4 p-4">
        {/* House No */}
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
            onChange={(e) => setHouseNo(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter house number"
          />
        </div>

        {/* Grama Division */}
        <div>
          <label
            htmlFor="grama_division"
            className="block text-sm font-medium text-gray-700"
          >
            Grama Division
          </label>
          <select
            id="grama_division"
            value={grama_division}
            onChange={(e) => setGramaDivision(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select a division</option>
            <option value="kotagedara">Kotagedara</option>
            <option value="navuththuduwa">Navuththuduwa</option>
            <option value="bopitiya">Bopitiya</option>
            <option value="maddegedara">Maddegedara</option>
            <option value="pahalawela">Pahalawela</option>
            <option value="kolahekada">Kolahekada</option>
            <option value="naravila">Naravila</option>
            <option value="yatadola">Yatadola</option>
            <option value="henpita">Henpita</option>
            <option value="pallegoda">Pallegoda</option>
          </select>
        </div>

        {/* Longitude */}
        <div>
          <label
            htmlFor="longitude"
            className="block text-sm font-medium text-gray-700"
          >
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter longitude"
          />
        </div>

        {/* Latitude */}
        <div>
          <label
            htmlFor="latitude"
            className="block text-sm font-medium text-gray-700"
          >
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter latitude"
          />
        </div>

        {/* Resident Selection */}
        <div>
          <label
            htmlFor="residentId"
            className="block text-sm font-medium text-gray-700"
          >
            House Owner (Resident ID)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="residentSearchId"
              value={residentSearchId}
              onChange={(e) => setResidentSearchId(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter resident ID"
            />
            <button
              onClick={handleSearchResident}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Search
            </button>
          </div>
          {foundResidentName && (
            <p className="text-green-600 mt-2">
              Found: <strong>{foundResidentName}</strong>
            </p>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Feedback message */}
        {message && <p className="text-blue-600 mt-2">{message}</p>}

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCreateHousehold}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Creating..." : "Create Household"}
          </button>
        </div>
      </div>
    </Modal>
  );

};
function refreshHouseholds() {
  throw new Error("Function not implemented.");
}

