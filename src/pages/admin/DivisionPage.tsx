import { FC, useEffect, useState } from "react";
import Modal from "../../components/layouts/overlays/Modal";
import { Link } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DivisionService } from "../../services/division.service";

// Chart.js setup
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Updated Types
interface Division {
  divisionId: number;
  divisionName: string;
  population: number;
}

const DivisionPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [newDivisionName, setNewDivisionName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [divisionToDelete, setDivisionToDelete] = useState<Division | null>(null);

  useEffect(() => {
    fetchDivisions();
  }, []);

  const fetchDivisions = async () => {
    try {
      const data = await DivisionService.getAllDivisions();
      setDivisions(data);
    } catch (error) {
      console.error("Failed to load divisions");
    }
  };

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => {
    setNewDivisionName("");
    setIsOpen(true);
  };

const handleAddDivision = async (name: string) => {
  try {
    await DivisionService.createDivision({ divisionName: name }); // Fix here
    fetchDivisions();
    setIsOpen(false);
  } catch (error) {
    console.error("Failed to create division");
  }
};


  const handleDelete = (division: Division) => {
    setDivisionToDelete(division);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (divisionToDelete) {
        await DivisionService.deleteDivision(divisionToDelete.divisionId);
        fetchDivisions();
      }
    } catch (error) {
      console.error("Delete failed");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setDivisionToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const generateChartData = () => {
    return {
      labels: divisions.map((d) => d.divisionName),
      datasets: [
        {
          label: "Population by Division",
          data: divisions.map((d) => d.population),
          backgroundColor: "#008FFB",
          borderRadius: 5,
        },
      ],
    };
  };

  return (
    <DashboardContainer>
      <div className="min-h-screen flex">
        {/* Add Division Modal */}
        <Modal isOpen={isOpen} handleClose={handleClose} title="Add Division">
          <div className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newDivisionName.trim()) {
                  handleAddDivision(newDivisionName.trim());
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Division Name
                </label>
                <input
                  type="text"
                  value={newDivisionName}
                  onChange={(e) => setNewDivisionName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]"
                >
                  Add Division
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          handleClose={cancelDelete}
          title="Confirm Deletion"
        >
          <div className="p-6">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <strong>{divisionToDelete?.divisionName}</strong>?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-[#FF4C4C] text-white font-semibold rounded-lg hover:bg-[#d93636]"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 ml-2 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#008FFB]">
              Division Details
            </h2>
            <button
              onClick={handleOpen}
              className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-blue-600 transition"
            >
              <FiPlusCircle className="mr-2" />
              New Division
            </button>
          </div>

          {/* Division Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {divisions.map((division) => (
              <Link
                to={`${division.divisionId}`}
                key={division.divisionId}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {division.divisionName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {division.population} residents
                  </p>
                </div>
                <button
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(division);
                  }}
                >
                  <FaTrash />
                </button>
              </Link>
            ))}
          </div>

          {/* Population Chart */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Population of All Divisions
            </h3>
            <Bar data={generateChartData()} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default DivisionPage;
