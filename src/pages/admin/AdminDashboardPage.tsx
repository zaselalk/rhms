import React, { use, useEffect } from "react";
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
const { BaseLayer } = LayersControl;

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const AdminDashboard: React.FC = () => {
  // Data for the charts
  const residentsData = {
    labels: ["Yes", "No"],
    datasets: [
      {
        data: [1243, 500], // Example data (1,243 Yes, 500 No)
        backgroundColor: ["#00C1A7", "#FF0000"], // Green for Yes, Red for No
      },
    ],
  };

  const nonCommunicableDiseasesData = {
    labels: ["Diabetes", "Mental", "Heart"],
    datasets: [
      {
        data: [250, 100, 106], // Example data for the diseases
        backgroundColor: ["#008FFB", "#FF0000", "#266874"], // Different colors for each disease
      },
    ],
  };

  //Markers
  const markers = [
    { position: [6.489720802, 80.084187593], popup: "DEYAGALA1" },
    { position: [6.4903325, 80.083685417], popup: "DEYAGALA2" },
    { position: [6.490475333, 80.083943417], popup: "DEYAGALA3" },
    { position: [6.490525152, 80.083716364], popup: "DEYAGALA4" },
    { position: [6.490402667, 80.084311667], popup: "DEYAGALA5" },
    { position: [6.4901975, 80.0845725], popup: "DEYAGALA6" },
    { position: [6.490591786, 80.084634245], popup: "DEYAGALA7" },
    { position: [6.490843, 80.083716], popup: "DEYAGALA8" },
    { position: [6.490886078, 80.083787108], popup: "DEYAGALA9" },
    { position: [6.490988333, 80.083746667], popup: "DEYAGALA10" },
    { position: [6.491178409, 80.083586288], popup: "DEYAGALA11" },
    { position: [6.491275, 80.083555], popup: "DEYAGALA12" },
    { position: [6.49152, 80.083192], popup: "DEYAGALA13" },
    { position: [6.491578333, 80.083619792], popup: "DEYAGALA14" },
    { position: [6.491763333, 80.083505], popup: "DEYAGALA15" },
    { position: [6.49181, 80.083600833], popup: "DEYAGALA16" },
    { position: [6.491963889, 80.083514444], popup: "DEYAGALA17" },
    { position: [6.492, 80.083713333], popup: "DEYAGALA18" },
    { position: [6.492091667, 80.083858333], popup: "DEYAGALA19" },
    { position: [6.492096667, 80.0840675], popup: "DEYAGALA20" },
  ];


  const [residentCount, setResidentCount] = React.useState<number>(0);
  const dashbordService = DashboardService;

  // Fetch resident count from the server
  const fetchdata = async () => {
    try {
      const data = await dashbordService.getresidentCount();
      setResidentCount(data.data);
    } catch (error) {
      console.error("Error fetching residents:", error);
    }
  };

  // Fetch data when loading the component
  useEffect(() => {
    fetchdata();
  }, []);


  const numberOfDiseases = 5; // Example data for the number of diseases
  const numberOfDivisions = 12;
  const numberOfHouses = 100;
  const numberOfClinics = 5;


  return (
    <DashboardContainer>
      <div>
        <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">
          Katugahahena Divisional Hospital
        </h2>
        <div>
          {/* Map Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full ">
            <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
              Hospital Location
            </h3>
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
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Residents Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
                Residents
              </h3>
              <Pie data={residentsData} />
            </div>

            {/* Non-Communicable Diseases Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
                Non Communicable Diseases
              </h3>
              <Pie data={nonCommunicableDiseasesData} />
            </div>
          </div>
          {/* Other Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#008FFB]">
                {numberOfHouses} Houses
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#008FFB]">
                {residentCount} Residents
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#008FFB]">
                {numberOfDivisions} Divisions
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#008FFB]">
                {numberOfDiseases} Diseases
              </h3>
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default AdminDashboard;
