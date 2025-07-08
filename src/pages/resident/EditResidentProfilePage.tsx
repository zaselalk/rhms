import { FC, useState } from "react";
import { useNavigate } from "react-router";

const EditResidentProfilePage: FC = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    contact: "0711287298",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Validate contact number (only digits & exactly 10 characters)
      if (!/^\d{0,10}$/.test(value)) {
        return; // Prevents input if it's not a number or exceeds 10 digits
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Clear error message on change
  };

  const validateForm = () => {
    if (formData.contact.length !== 10) {
      setErrorMessage("Contact number must be exactly 10 digits.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Logic to save the updated contact and password
    console.log("Profile Updated:", formData);
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => navigate("/resident"), 2000);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#008FFB]">Edit Profile</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              placeholder="Contact"
              maxLength={10} // Prevents input beyond 10 digits
            />
            {errorMessage && (
              <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-[#00C1A7] focus:border-[#00C1A7] outline-none"
              placeholder="New Password"
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex justify-between">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
          >
            Back
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`px-6 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb] 
                            ${errorMessage ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!!errorMessage} // Disable button if error exists
          >
            Save Changes
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditResidentProfilePage;
