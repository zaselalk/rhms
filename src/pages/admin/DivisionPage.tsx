import { FC, useEffect, useState } from "react";
import { Link } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { FiPlusCircle } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import Modal from "../../components/layouts/overlays/Modal";
import { DivisionService } from "../../services/division.service";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Division {
  divisionId: number;
  divisionName: string;
  residentCount?: number;
}

const DivisionPage: FC = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newDivisionName, setNewDivisionName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [divisionToDelete, setDivisionToDelete] = useState<Division | null>(null);
  const [loading, setLoading] = useState(true);

  // For confirmation popup inside Add Division modal
  const [isConfirmCreateOpen, setIsConfirmCreateOpen] = useState(false);

  useEffect(() => {
    fetchDivisionsWithCounts();
  }, []);

  const fetchDivisionsWithCounts = async () => {
    setLoading(true);
    try {
      const divisionsData: Division[] = await DivisionService.getAllDivisions();

      const divisionsWithCounts = await Promise.all(
        divisionsData.map(async (division) => {
          try {
            const countData = await DivisionService.getResidentCountByDivision(division.divisionId);
            return {
              ...division,
              residentCount: countData.residentCount ?? 0,
            };
          } catch (error) {
            console.error(`Failed to fetch resident count for division ${division.divisionName}`, error);
            return {
              ...division,
              residentCount: 0,
            };
          }
        })
      );

      setDivisions(divisionsWithCounts);
    } catch (error) {
      console.error("Failed to fetch divisions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const handleClose = () => {
    setIsOpen(false);
    setIsConfirmCreateOpen(false);
  };
  const handleOpen = () => {
    setNewDivisionName("");
    setIsConfirmCreateOpen(false);
    setIsOpen(true);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDivisionName.trim()) {
      setIsConfirmCreateOpen(true);
    }
  };

  const confirmCreateDivision = async () => {
    try {
      await DivisionService.createDivision({ divisionName: newDivisionName.trim() });
      await fetchDivisionsWithCounts();
      setIsOpen(false);
      setIsConfirmCreateOpen(false);
    } catch (error) {
      console.error("Failed to create division", error);
    }
  };

  const cancelCreateDivision = () => {
    setIsConfirmCreateOpen(false);
  };

  const handleDelete = (division: Division) => {
    setDivisionToDelete(division);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (divisionToDelete) {
        await DivisionService.deleteDivision(divisionToDelete.divisionId);
        await fetchDivisionsWithCounts();
      }
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsDeleteModalOpen(false);
      setDivisionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDivisionToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // Prepare chart data
  const generateChartData = () => {
    return {
      labels: divisions.map((d) => d.divisionName),
      datasets: [
        {
          label: "Resident Count",
          data: divisions.map((d) => d.residentCount ?? 0),
          backgroundColor: "#008FFB",
          borderRadius: 5,
        },
      ],
    };
  };

  return (
    <DashboardContainer>
      <div className="min-h-screen p-6">
        {/* Add Division Modal */}
        <Modal isOpen={isOpen} handleClose={handleClose} title="Add Division">
          <div className="p-6">
            {isConfirmCreateOpen ? (
              <>
                <p className="mb-4">
                  Are you sure you want to create the division <strong>"{newDivisionName.trim()}"</strong>?
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={confirmCreateDivision}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Yes, Create
                  </button>
                  <button
                    onClick={cancelCreateDivision}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={onFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">Division Name</label>
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
            )}
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={isDeleteModalOpen} handleClose={cancelDelete} title="Confirm Deletion">
          <div className="p-6">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong>{divisionToDelete?.divisionName}</strong>?
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

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">Division Details</h2>
          <button
            onClick={handleOpen}
            className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-blue-600 transition"
          >
            <FiPlusCircle className="mr-2" />
            New Division
          </button>
        </div>

        {loading ? (
          <p>Loading divisions...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {divisions.map((division) => (
                <Link
                  key={division.divisionId}
                  to={`/admin/division/${division.divisionId}`}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{division.divisionName}</p>
                    <p className="text-sm text-gray-600">{division.residentCount ?? 0} residents</p>
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

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Resident Counts by Division</h3>
              <Bar
                data={generateChartData()}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: {
                      display: true,
                      text: "Resident Counts in Divisions",
                      font: { size: 18 },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1 },
                    },
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </DashboardContainer>
  );
};

export default DivisionPage;
