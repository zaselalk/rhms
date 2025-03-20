import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { MapContainer, TileLayer, Popup, Marker, LayersControl } from 'react-leaflet'
import { MapContainer, TileLayer, Popup, Marker, LayersControl } from 'react-leaflet';
import AdminSlidebar from '../components/layouts/admin/AdminSlidebar';
import 'leaflet/dist/leaflet.css';
import NavBar from '../components/SideBar';
import TopBar from '../components/TopBar';

const { BaseLayer } = LayersControl;

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const AdminDashboard: React.FC = () => {
    // Data for the charts
    const residentsData = {
        labels: ['Yes', 'No'],
        datasets: [
            {
                data: [12, 50, 43, 65], // Example data (1,243 Yes, 500 No)
                backgroundColor: ['#00C1A7', '#FF0000', '#A87C34', '#ACF542'], // Green for Yes, Red for No
            },
        ],
    };

    const nonCommunicableDiseasesData = {
        labels: ['Diabetes', 'Mental', 'Heart'],
        datasets: [
            {
                data: [250, 100, 106], // Example data for the diseases
                backgroundColor: ['#008FFB', '#FF0000', '#266874'], // Different colors for each disease
            },
        ],
    };


    //Markers
    const markers = [

        { position: [6.489720802, 80.084187593], popup: "DEYAGALA1" },
        { position: [6.490332500, 80.083685417], popup: "DEYAGALA2" },
        { position: [6.490475333, 80.083943417], popup: "DEYAGALA3" },
        { position: [6.490525152, 80.083716364], popup: "DEYAGALA4" },
        { position: [6.490402667, 80.084311667], popup: "DEYAGALA5" },
        { position: [6.490197500, 80.084572500], popup: "DEYAGALA6" },
        { position: [6.490591786, 80.084634245], popup: "DEYAGALA7" },
        { position: [6.490843000, 80.083716000], popup: "DEYAGALA8" },
        { position: [6.490886078, 80.083787108], popup: "DEYAGALA9" },
        { position: [6.490988333, 80.083746667], popup: "DEYAGALA10" },
        { position: [6.491178409, 80.083586288], popup: "DEYAGALA11" },
        { position: [6.491275000, 80.083555000], popup: "DEYAGALA12" },
        { position: [6.491520000, 80.083192000], popup: "DEYAGALA13" },
        { position: [6.491578333, 80.083619792], popup: "DEYAGALA14" },
        { position: [6.491763333, 80.083505000], popup: "DEYAGALA15" },
        { position: [6.491810000, 80.083600833], popup: "DEYAGALA16" },
        { position: [6.491963889, 80.083514444], popup: "DEYAGALA17" },
        { position: [6.492000000, 80.083713333], popup: "DEYAGALA18" },
        { position: [6.492091667, 80.083858333], popup: "DEYAGALA19" },
        { position: [6.492096667, 80.084067500], popup: "DEYAGALA20" },
    ];

return (
    <div className="min-h-screen bg-gray-100 flex">
        {/* Reusable Sidebar */}
        <AdminSlidebar />
                        {markers.map((marker, index) => (
                            <Marker position={marker.position as [number, number]}>
                                <Popup>{marker.popup}</Popup>
                            </Marker>
                        ))}

    return (


        <div className="min-h-screen bg-gray-100">


            {/* Main Content */}
            <div className="">
                {/* <NavBar></NavBar> */}
                {/* <TopBar></TopBar> */}
                <div className="grid grid-cols-2 w-full gap-5">

                    {/* // Map Section */}
                    <div className="bg-white p-5 rounded-lg shadow-md h-1.5/2">

                        <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Resident Location</h3>
                        <MapContainer center={[6.4893, 80.0847]} zoom={100} style={{ height: '90%', width: '100%' }}>
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

                            {markers.map((marker, index) => (
                                <Marker position={marker.position}>
                                    <Popup>{marker.popup}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                    {/* Non-Communicable Diseases Pie Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                        <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Residents</h3>
                        <Pie data={residentsData} />
                    </div>




                    {/* Other Stats */}
                    <div className="grid grid-cols-2 gap-6 ">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center align-middle flex-col flex items-center justify-center">
                            <h1 className="text-4xl font-semibold text-[#008FFB]">179 </h1>
                            <h2 className='text-2xl'>Houses</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center align-middle flex-col flex items-center justify-center">
                            <h1 className="text-4xl font-semibold text-[#008FFB]">1245 </h1>
                            <h2 className='text-2xl'>Members</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center align-middle flex-col flex items-center justify-center">
                            <h1 className="text-4xl font-semibold text-[#008FFB]">13 </h1>
                            <h2 className='text-2xl'>Division</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center align-middle flex-col flex items-center justify-center">
                            <h1 className="text-4xl font-semibold text-[#008FFB]">8 </h1>
                            <h2 className='text-2xl'>Diseaes</h2>
                        </div>
                        
                    </div>

                    {/* Non-Communicable Diseases Pie Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/2 h-auto">
                        <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Non Communicable Diseases</h3>
                        <Pie data={nonCommunicableDiseasesData} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
