import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import { MapContainer, TileLayer, Popup, Marker, LayersControl } from 'react-leaflet'



import 'leaflet/dist/leaflet.css';

const { BaseLayer } = LayersControl;

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const AdminDashboard: React.FC = () => {
    // Data for the charts
    const residentsData = {
        labels: ['Yes', 'No'],
        datasets: [
            {
                data: [1243, 500], // Example data (1,243 Yes, 500 No)
                backgroundColor: ['#00C1A7', '#FF0000'], // Green for Yes, Red for No
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

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-lg p-6">
                <h2 className="text-xl font-semibold text-[#008FFB]">Hospital Management</h2>
                <div className="mt-8">
                    <ul className="space-y-4">
                        <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Dashboard</a></li>
                        <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Diseases</a></li>
                        <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Households</a></li>
                        <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Residents</a></li>
                        <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Clinic</a></li>
                        <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Division</a></li>
                        <li><a href="#" className="block py-2 text-sm text-gray-700 hover:bg-[#00C1A7]">Users</a></li>
                    </ul>
                </div>
                <div className="mt-8 flex items-center">
                    <div className="text-sm text-gray-700">Ravindu</div>
                    <div className="text-xs text-gray-500 ml-2">Admin</div>
                </div>
                <div className="mt-2">
                    <button className="w-full py-2 text-white bg-[#008FFB] rounded-md hover:bg-[#006fbb]">Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">Katugahahena Divisional Hospital</h2>
                <div>

                    {/* Map Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full ">
                        <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Hospital Location</h3>
                        <MapContainer center={[6.4893, 80.0847]} zoom={100} style={{ height: '400px', width: '100%' }}>
                            <LayersControl position="topright">
                                <BaseLayer checked name="Satellite View">
                                    <TileLayer

                                        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                                        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                                    />
                                </BaseLayer>
                                <BaseLayer name="Street View">
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                </BaseLayer>
                            </LayersControl>

                            <Marker position={[6.4893, 80.0847]}>
                                <Popup>
                                    Katugahahena Divisional Hospital
                                </Popup>
                            </Marker>



                        </MapContainer>
                    </div>






                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {/* Residents Pie Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Residents</h3>
                            <Pie data={residentsData} />
                        </div>

                        {/* Non-Communicable Diseases Pie Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Non Communicable Diseases</h3>
                            <Pie data={nonCommunicableDiseasesData} />
                        </div>


                    </div>
                    {/* Other Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-[#008FFB]">100 Houses</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-[#008FFB]">236 Members</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-[#008FFB]">12 Divisions</h3>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-[#008FFB]">5 Diseases</h3>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AdminDashboard;
