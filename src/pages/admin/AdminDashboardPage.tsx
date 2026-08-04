import React, { useEffect, useState } from "react";
import { Home, Users, LayoutGrid, Activity, MapPin, PieChart } from "lucide-react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { DashboardService } from "../../services/dashbord.service";
import residentDiseaseService from "../../services/residentDisease.service";
import DiseaseColumnChart from "../../components/charts/DiseaseColumnChart";

const { BaseLayer } = LayersControl;

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

type MarkerType = {
  position: [number, number];
  popup: string;
};

const AdminDashboard: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);



  const fetchMarkers = async () => {
    try {
      const result = await dashbordService.getlocations();
      // console.log("Markers data:", result); // Log the fetched data
      const transformedMarkers = result.data.map((item: any) => {
        const { house_no, grama_division, latitude, longitude, owner } = item;

        const popup = `
        🏠 House No: ${house_no}
        👤 Owner: ${owner.firstName} ${owner.lastName}
        🗺️ Division: ${grama_division}
        📞 Contact: ${owner.contactNumber}
      `;

        return {
          position: [longitude, latitude],
          popup,
        };
      });

      setMarkers(transformedMarkers); // ✅ Save to state
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  };

  const [diseaseChartData, setDiseaseChartData] = useState<
    { type: string; sales: number }[]
  >([]);

  const [residentCount, setResidentCount] = React.useState<number>(0);
  const [householdCount, setHouseholdCount] = React.useState<number>(0);
  const [divisionCount, setDivisionCount] = React.useState<number>(0);
  const [diseaseCount, setDiseaseCount] = React.useState<number>(0);
  const [PaitentCount, setPatientCount] = React.useState<number>(0);
  const [CancerPaitentCount, setCancerPaitentCount] = React.useState<number>(0);
  const dashbordService = DashboardService;

  // Fetch resident count from the server
  const fetchdata = async () => {
    try {
      const data = await dashbordService.getresidentCount();
      setResidentCount(data.count);
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
    try {
      const data = await dashbordService.getHouseholdCount();
      setHouseholdCount(data.count);
    } catch (error) {
      console.error("Error fetching households:", error);
    }
    try {
      const data = await dashbordService.getDiseaseCount();
      setDiseaseCount(data.count);
    } catch (error) {
      console.error("Error fetching diseases:", error);
    }

    try {
      const data = await dashbordService.getDivisionCount();
      setDivisionCount(data.count);
    } catch (error) {
      console.error("Error fetching division count:", error);
    }
    try {
      const data = await residentDiseaseService.getPatientsCountByDiseaseId(1);
      console.log("Patient count data:", data.data);

      setPatientCount(data.data.count);
    } catch (error) {
      console.error("Error fetching patient count:", error);
    }
    try {
      const data = await residentDiseaseService.getPatientsCountByDiseaseId(3);
      console.log("Patient count data:", data.data);

      setCancerPaitentCount(data.data.count);
    } catch (error) {
      console.error("Error fetching patient count:", error);
    }
  };

  // Fetch data when loading the component
  useEffect(() => {
    fetchdata();
    fetchMarkers();
    fetchDiseaseChartData(); // Fetch disease chart data
    // Fetch markers data
  }, []);

  const fetchDiseaseChartData = async () => {
    try {
      const response = await residentDiseaseService.getAllDiseasesWithPatientCount();
      setDiseaseChartData(response.data); // [{ type: "Diabetes", sales: 20 }, ...]
      console.log("Disease chart data:", response.data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };



  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        padding: 10,
        cornerRadius: 8,
        boxPadding: 4,
      },
    },
  };

  // Data for the charts
  const DiabetesData = {
    labels: ["Diabetes", "Non Diabetes"],
    datasets: [
      {
        data: [PaitentCount, residentCount - PaitentCount],
        backgroundColor: ["#f4664a", "#00C1A7"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };
  // Data for the charts
  const CancerData = {
    labels: ["Patients", "Non Patients"],
    datasets: [
      {
        data: [CancerPaitentCount, residentCount - CancerPaitentCount],
        backgroundColor: ["#faad14", "#00C1A7"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const diabetesPct = residentCount > 0 ? Math.round((PaitentCount / residentCount) * 100) : 0;
  const cancerPct = residentCount > 0 ? Math.round((CancerPaitentCount / residentCount) * 100) : 0;







  return (
    <DashboardContainer>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#008FFB] to-[#00C1A7] px-8 py-10 shadow-lg mb-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/10" />
          <p className="relative text-white/80 text-sm font-medium tracking-wide uppercase">
            Overview
          </p>
          <h2 className="relative text-2xl sm:text-3xl font-bold text-white mt-1">
            Katugahahena Divisional Hospital
          </h2>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <StatCard icon={<Home size={22} />} label="Houses" value={householdCount} accent="text-[#008FFB] bg-[#008FFB]/10" />
          <StatCard icon={<Users size={22} />} label="Residents" value={residentCount} accent="text-emerald-500 bg-emerald-50" />
          <StatCard icon={<LayoutGrid size={22} />} label="Divisions" value={divisionCount} accent="text-purple-500 bg-purple-50" />
          <StatCard icon={<Activity size={22} />} label="Diseases" value={diseaseCount} accent="text-rose-500 bg-rose-50" />
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-[#008FFB]" />
            <h3 className="text-lg font-semibold text-gray-800">
              Household Locations
            </h3>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <MapContainer
              center={[6.4893, 80.0847]}
              zoom={100}
              style={{ height: "400px", width: "100%" }}
            >
              <LayersControl position="topright">
                <BaseLayer checked name="Satellite View">
                  <TileLayer
                    url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                  // attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                  />
                </BaseLayer>
                <BaseLayer name="Street View">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  // attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
                  />
                </BaseLayer>
              </LayersControl>

              {markers.map((marker) => (
                <Marker position={marker.position as [number, number]}>
                  <Popup>{marker.popup}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Disease Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={20} className="text-[#008FFB]" />
            <h3 className="text-lg font-semibold text-gray-800">
              Disease Distribution
            </h3>
          </div>
          <p className="text-xs text-gray-400 mb-4 ml-7">
            Patient count by diagnosed condition
          </p>
          <DiseaseColumnChart data={diseaseChartData} />
        </div>

        {/* Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart size={20} className="text-[#008FFB]" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Diabetic Patients
                </h3>
              </div>
              <span className="text-xs font-medium text-gray-400">
                {PaitentCount} of {residentCount}
              </span>
            </div>
            <div className="relative mx-auto" style={{ width: 180, height: 180 }}>
              <Pie data={DiabetesData} options={pieOptions} />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{diabetesPct}%</span>
                <span className="text-xs text-gray-400">Diabetic</span>
              </div>
            </div>
            <ChartLegend
              items={[
                { label: "Diabetes", value: PaitentCount, color: "#f4664a" },
                { label: "Non Diabetes", value: residentCount - PaitentCount, color: "#00C1A7" },
              ]}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart size={20} className="text-[#008FFB]" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Cancer Patients
                </h3>
              </div>
              <span className="text-xs font-medium text-gray-400">
                {CancerPaitentCount} of {residentCount}
              </span>
            </div>
            <div className="relative mx-auto" style={{ width: 180, height: 180 }}>
              <Pie data={CancerData} options={pieOptions} />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{cancerPct}%</span>
                <span className="text-xs text-gray-400">Patients</span>
              </div>
            </div>
            <ChartLegend
              items={[
                { label: "Patients", value: CancerPaitentCount, color: "#faad14" },
                { label: "Non Patients", value: residentCount - CancerPaitentCount, color: "#00C1A7" },
              ]}
            />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

const ChartLegend: React.FC<{
  items: { label: string; value: number; color: string }[];
}> = ({ items }) => (
  <div className="flex items-center justify-center gap-5 mt-4">
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-xs text-gray-500">
          {item.label} <span className="font-medium text-gray-700">({item.value})</span>
        </span>
      </div>
    ))}
  </div>
);

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  accent: string;
}> = ({ icon, label, value, accent }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
    <div className={`flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${accent}`}>
      {icon}
    </div>
    <p className="text-2xl font-bold text-gray-800">{value.toLocaleString()}</p>
    <p className="text-sm text-gray-500 mt-0.5">{label}</p>
  </div>
);

export default AdminDashboard;
