import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Modal, Form, Input, Button, message, Spin } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { DashboardContainer } from '../../components/layouts/overlays/DashboardContainer';
import diseaseService from '../../services/disease.service';

interface DiseaseData {
  name: string;
  patients: number;
}

const DiseasesPage: FC = () => {
  const [diseasesData, setDiseasesData] = useState<DiseaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchDiseaseNames = async () => {
    try {
      const data = await diseaseService.getAllDiseases(); 
      setDiseasesData(data);
    } catch (error) {
      console.error('Failed to load disease names:', error);
      message.error('Failed to load disease names');
      return [];
    }
  };

  // Fetch disease statistics
  const fetchDiseaseStats = async () => {
    try {
      setLoading(true);
      const data = await diseaseService.getDiseasePatientCounts();
      const formattedData = Object.entries(data).map(([name, patients]) => ({
        name: String(name),
        patients: Number(patients),
      }));
      setDiseasesData(formattedData);
    } catch (error) {
      console.error('Failed to load disease stats:', error);
      message.error('Failed to load disease stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiseaseNames();
    fetchDiseaseStats();
  }, []);

  const totalDiseases = diseasesData.length;
  const totalPatients = diseasesData.reduce((sum, disease) => sum + disease.patients, 0);

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newDisease = values.disease.trim();
      if (!newDisease) return;

      if (window.confirm(`Are you sure you want to add "${newDisease}"?`)) {
        const addedDisease = await diseaseService.createDisease({ diseaseName: newDisease });

        setDiseasesData((prev) => [
          ...prev,
          { name: addedDisease.diseaseName, patients: 0 },
        ]);
        form.resetFields();
        setIsModalOpen(false);
        message.success('Disease added successfully');
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message || 'Failed to add disease. Please try again.';
      message.error(errMsg);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDeleteDisease = async (diseaseName: string) => {
    if (window.confirm(`Are you sure you want to delete "${diseaseName}"?`)) {
      try {
        // Optional: Call backend delete if available
        // await diseaseService.deleteDisease(diseaseName);
        setDiseasesData((prev) =>
          prev.filter((disease) => disease.name !== diseaseName)
        );
        message.success(`"${diseaseName}" deleted.`);
      } catch (error) {
        message.error('Failed to delete disease.');
      }
    }
  };

  return (
    <DashboardContainer>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">Diseases</h2>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: '#008FFB' }}
          >
            + Add Disease
          </Button>
        </div>

        <Modal
          title="Add New Disease"
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" name="addDiseaseForm">
            <Form.Item
              name="disease"
              label="Disease Name"
              rules={[{ required: true, message: 'Please enter the disease name' }]}
            >
              <Input placeholder="Enter disease name" />
            </Form.Item>
          </Form>
        </Modal>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Diseases</h3>
                <p className="text-2xl font-bold text-[#008FFB]">{totalDiseases}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Total Patients</h3>
                <p className="text-2xl font-bold text-[#008FFB]">{totalPatients}</p>
              </div>
            </div>

            {/* Disease Table */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 text-sm text-gray-600">Disease Name</th>
                    <th className="text-left px-4 py-2 text-sm text-gray-600">Patients</th>
                    <th className="text-left px-4 py-2 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {diseasesData.map((disease) => (
                    <tr key={disease.name}>
                      <td className="px-4 py-2 text-sm text-gray-700">{disease.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{disease.patients}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        <Link
                          to={`${disease.name}`}
                          className="text-[#008FFB] hover:text-[#00C1A7]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteDisease(disease.name)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Disease Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Disease Statistics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={diseasesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#008FFB"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </DashboardContainer>
  );
};

export default DiseasesPage;
