import { FC, useState } from 'react';
import Modal from '../../layouts/overlays/Modal';
import { createHousehold, getResidentById } from '../../../services/household.service';

interface HouseholdCreateModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const HouseholdCreateModal: FC<HouseholdCreateModalProps> = ({ isOpen, handleClose }) => {
  const [house_no, setHouseNo] = useState('');
  const [grama_division, setGramaDivision] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [residentId, setResidentId] = useState('');
  const [residentName, setResidentName] = useState('');

  const handleSearchResident = async () => {
    try {
      const data = await getResidentById(residentId);
      if (data?.name) {
        setResidentName(data.name);
      } else {
        console.error('Resident not found');
      }
    } catch (error) {
      console.error('Error fetching resident data:', error);
    }
  };

  const handleCreateHousehold = async () => {
    if (window.confirm('Are you sure you want to create this household?')) {
      try {
        const data = await createHousehold({
          house_no,
          grama_division,
          longitude,
          latitude,
          residentId,
        });
        alert(data.message || 'Household created successfully!');
        handleClose();
      } catch (error) {
        console.error('Error:', error);
        alert('Error creating household');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Create Household">
      <div className="space-y-4 p-4">
        {/* House No */}
        <div>
          <label htmlFor="house_no" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="grama_division" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="residentId" className="block text-sm font-medium text-gray-700">
            House Owner (Resident ID)
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="residentId"
              value={residentId}
              onChange={(e) => setResidentId(e.target.value)}
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
          {residentName && (
            <p className="mt-2 text-sm text-gray-600">Resident: {residentName}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCreateHousehold}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Create Household
          </button>
        </div>
      </div>
    </Modal>
  );
};
