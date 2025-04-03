import React from 'react';
import { useNavigate } from 'react-router';

const ResidentClinicDetail = () => {
    const navigate = useNavigate();

    const clinicRecords = [
        { clinicName: "Diabetic Awareness Session Clinic", date: "2024 Oct 02", status: "Attended" },
        { clinicName: "Free Diabetic Checkup", date: "2024 Oct 23", status: "Absent" },
        { clinicName: "Pressure Checkup", date: "2024 Apr 02", status: "Attended" },
        { clinicName: "Diabitic Checkup", date: "2024 Apr 06", status: "Attended" }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col px-4 sm:px-6 md:px-8">
            <button
                onClick={() => navigate(-1)}
                className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg w-32 hover:bg-gray-400"
            >
                Back
            </button>
            <h3 className="text-2xl font-semibold text-[#008FFB] mt-5">Clinic Details</h3>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse ">
                    <thead>
                        <tr className="bg-gray-100 text-left text-xl">
                            <th className="px-6 py-4 text-gray-600 ">Session</th>
                            <th className="px-6 py-4 text-gray-600 ">Date</th>
                            <th className="px-6 py-4 text-gray-600 ">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinicRecords.map((record, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-gray-700 ">{record.clinicName}</td>
                                <td className="px-6 py-4 text-gray-700 ">{record.date}</td>
                                <td className="px-6 py-4 ">
                                    <p className={`px-6 py-3 w-32 text-white font-semibold rounded-lg text-center ${record.status === "Attended" ? "bg-green-600" : "bg-red-600"}`}>
                                        {record.status}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResidentClinicDetail;