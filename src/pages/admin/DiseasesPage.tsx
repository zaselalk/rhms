import { FC, useEffect, useState } from "react";
import { Link } from "react-router";
import { Modal, Form, Input, Button, message, Spin } from "antd";
import { ExperimentOutlined, UsergroupAddOutlined , PlusOutlined} from "@ant-design/icons";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import diseaseService from "../../services/disease.service";
import residentDiseaseService from "../../services/residentDisease.service";

interface DiseaseData {
  name: string;
  patients: number;
}

interface Disease {
  diseaseId: number;
  diseaseName: string;
}

interface ResidentDisease {
  diseaseId: number;
  residentId: number;
}

const DiseasesPage: FC = () => {
  const [diseaseName, setDiseaseNames] = useState<string[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [residentDiseases, setResidentDiseases] = useState<ResidentDisease[]>(
    []
  );
  const [diseaseStats, setDiseaseStats] = useState<DiseaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  console.log(diseases, residentDiseases);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const diseaseListRaw = await diseaseService.getAllDiseases();

      const diseaseList: Disease[] = Array.isArray(diseaseListRaw)
        ? diseaseListRaw
        : diseaseListRaw?.data || [];

      const relationListRaw =
        await residentDiseaseService.getAllResidentDiseases();

      //  Correct parsing of the .data array
      const relationList: ResidentDisease[] = Array.isArray(
        relationListRaw?.data
      )
        ? relationListRaw.data
        : [];

      setDiseases(diseaseList);
      setResidentDiseases(relationList);

      const stats: DiseaseData[] = diseaseList.map((disease) => {
        const count = relationList.filter(
          (rel) => Number(rel.diseaseId) === Number(disease.diseaseId)
        ).length;

        return { name: disease.diseaseName, patients: count };
      });

      setDiseaseStats(stats);
    } catch (error) {
      console.error("Error fetching disease data:", error);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Calculate total diseases and patients only for displayed diseases
  const totalDiseases = diseaseStats.length;
  const totalPatients = diseaseStats.reduce((sum, d) => sum + d.patients, 0);

  // Handle modal actions
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const newDisease = values.disease.trim();
      if (!newDisease) return;

      // Case-insensitive duplicate check
      const lowerCaseExisting = diseaseName.map((name) => name.toLowerCase());

      if (lowerCaseExisting.includes(newDisease.toLowerCase())) {
        form.setFields([
          {
            name: "disease",
            errors: [`The disease "${newDisease}" already exists.`],
          },
        ]);
        return;
      }

      // Use Ant Design styled confirmation dialog
      Modal.confirm({
        title: "Confirm Add Disease",
        content: `Are you sure you want to add "${newDisease}"?`,
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          try {
            const addedDisease = await diseaseService.createDisease({
              diseaseName: newDisease,
            });

            setDiseaseNames((prev) => [...prev, addedDisease.diseaseName]);
            form.resetFields();
            setIsModalOpen(false);
            message.success({
              content: "Disease added successfully",
              duration: 3,
            });
          } catch (error: any) {
            const errMsg =
              error?.response?.data?.message ||
              "Failed to add disease. Please try again.";
            message.error({
              content: errMsg,
              duration: 2,
            });
          }
        },
      });
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        "Failed to validate disease. Please try again.";
      message.error({
        content: errMsg,
        duration: 2,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDeleteDisease = (diseaseName: string) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete "${diseaseName}"?`,
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      onOk: async () => {
        try {
          await diseaseService.deleteDisease(diseaseName);
          message.success(`"${diseaseName}" deleted successfully.`);
          fetchAllData(); // Refresh the data after deletion
        } catch (error) {
          console.error(error);
          message.error("Failed to delete disease.");
        }
      },
    });
  };

  return (
    <DashboardContainer>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#008FFB]">Diseases</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition duration-300 ease-in-out"
            onClick={() => setIsModalOpen(true)}
            
          >
            Add Disease
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
              rules={[
                { required: true, message: "Please enter the disease name" },
              ]}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 rounded-2xl shadow-md flex items-center justify-between transition transform hover:scale-105">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Diseases</p>
                  <h3 className="text-3xl font-bold text-yellow-800">{totalDiseases}</h3>
                </div>
                <div className="text-yellow-700 text-4xl">
                  <ExperimentOutlined />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl shadow-md flex items-center justify-between transition transform hover:scale-105">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Patients</p>
                  <h3 className="text-3xl font-bold text-green-800">{totalPatients}</h3>
                </div>
                <div className="text-green-700 text-4xl">
                  <UsergroupAddOutlined />
                </div>
              </div>
            </div>


            {/* Disease Table */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 text-sm text-gray-600">
                      Disease Name
                    </th>
                    <th className="text-left px-4 py-2 text-sm text-gray-600">
                      Patients
                    </th>
                    <th className="text-left px-4 py-2 text-sm text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diseaseStats.map(({ name, patients }) => (
                    <tr key={name}>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {patients}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        <Link
                          to={`${name}`}
                          className="text-[#008FFB] hover:text-[#00C1A7]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDeleteDisease(name)}
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
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Disease Statistics
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={diseaseStats}>
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
