import { FC, useEffect, useState } from "react";
import { Link } from "react-router";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { FiPlusCircle } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { LayoutGrid, Users, BarChart3 } from "lucide-react";
import Modal from "../../components/layouts/overlays/Modal";
import { DivisionService } from "../../services/division.service";

const avatarPalette = [
  "bg-[#008FFB]/10 text-[#008FFB]",
  "bg-emerald-100 text-emerald-600",
  "bg-purple-100 text-purple-600",
  "bg-amber-100 text-amber-600",
  "bg-rose-100 text-rose-600",
];

const avatarColor = (seed: string) => {
  const index = seed.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return avatarPalette[index % avatarPalette.length];
};

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
      <div className="min-h-screen max-w-7xl mx-auto">
        {/* Add Division Modal */}
        <Modal isOpen={isOpen} handleClose={handleClose} title="Add Division">
          <div className="p-6">
            {isConfirmCreateOpen ? (
              <>
                <p className="text-gray-600 mb-5">
                  Are you sure you want to create the division <strong>"{newDivisionName.trim()}"</strong>?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={cancelCreateDivision}
                    className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmCreateDivision}
                    className="px-5 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb] transition-colors"
                  >
                    Yes, Create
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={onFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Division Name</label>
                  <input
                    type="text"
                    value={newDivisionName}
                    onChange={(e) => setNewDivisionName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008FFB]/30 focus:border-[#008FFB] outline-none transition-all"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb] transition-colors"
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
            <p className="text-gray-600">
              Are you sure you want to delete <strong>{divisionToDelete?.divisionName}</strong>?
            </p>
            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-colors"
                onClick={confirmDelete}
              >
                Yes, Delete
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
          <div className="flex justify-center items-center h-64">
            <div className="h-10 w-10 rounded-full border-4 border-[#008FFB]/20 border-t-[#008FFB] animate-spin" />
          </div>
        ) : divisions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 flex flex-col items-center gap-2 text-gray-400">
            <LayoutGrid size={32} />
            <p className="text-sm">No divisions registered yet</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6">
              {divisions.map((division) => (
                <Link
                  key={division.divisionId}
                  to={`/admin/division/${division.divisionId}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between hover:shadow-md hover:border-[#008FFB]/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${avatarColor(
                        division.divisionId + division.divisionName
                      )}`}
                    >
                      <LayoutGrid size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{division.divisionName}</p>
                      <p className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                        <Users size={13} />
                        {division.residentCount ?? 0} residents
                      </p>
                    </div>
                  </div>
                  <button
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(division);
                    }}
                  >
                    <FaTrash size={14} />
                  </button>
                </Link>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={20} className="text-[#008FFB]" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Resident Count Distribution by Division
                </h3>
              </div>
              <Bar
                data={generateChartData()}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1, color: "#9ca3af" },
                      grid: { color: "#f3f4f6" },
                    },
                    x: {
                      ticks: { color: "#6b7280" },
                      grid: { display: false },
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
