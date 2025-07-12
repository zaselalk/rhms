import React, { useEffect, useState } from "react";
import { Home, Users, LayoutGrid, Activity } from "lucide-react";
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

type MarkerType = {
  position: [number, number];
  popup: string;
};

const AdminDashboard: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerType[]>([]);


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
          position: [(longitude), (latitude)],
          popup,
        };
      });

      setMarkers(transformedMarkers); // ✅ Save to state
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  };


  const [residentCount, setResidentCount] = React.useState<number>(0);
  const [householdCount, setHouseholdCount] = React.useState<number>(0);
  const [divisionCount, setDivisionCount] = React.useState<number>(0);
  const [diseaseCount, setDiseaseCount] = React.useState<number>(0);
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
    }catch(error){
      console.error("Error fetching division count:", error);
    } 
  };

  // Fetch data when loading the component
  useEffect(() => {
    fetchdata();
    fetchMarkers(); // Fetch markers data
  }, []);



  return (
    <DashboardContainer>
      <div >
        <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">
          Katugahahena Divisional Hospital
        </h2>
        {/* Other Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-center items-center aspect-square">
            <Home className="text-[#008FFB]" size={40} />
            <h3 className="text-lg font-semibold text-[#008FFB] mt-2 text-center">
              {householdCount} Houses
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-center items-center aspect-square">
            <Users className="text-[#008FFB]" size={40} />
            <h3 className="text-lg font-semibold text-[#008FFB] mt-2 text-center">
              {residentCount} Residents
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-center items-center aspect-square">
            <LayoutGrid className="text-[#008FFB]" size={40} />
            <h3 className="text-lg font-semibold text-[#008FFB] mt-2 text-center">
              {divisionCount} Divisions
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-center items-center aspect-square">
            <Activity className="text-[#008FFB]" size={40} />
            <h3 className="text-lg font-semibold text-[#008FFB] mt-2 text-center">
              {diseaseCount} Diseases
            </h3>
          </div>
        </div>
        <div >
          {/* Map Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full ">
            <h3 className="text-xl font-semibold text-[#008FFB] mb-4">
              Locations
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

        </div>
      </div>
    </DashboardContainer>
  );
};

export default AdminDashboard;
