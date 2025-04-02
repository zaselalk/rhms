import React, { useState } from "react";
import { FaClinicMedical, FaEdit, FaTrash, FaClipboardList, FaPlus } from "react-icons/fa";
import AdminSidebar from "../../components/layouts/admin/AdminSlidebar";

interface Patient {
  id: string;
  name: string;
}

interface ClinicEvent {
  id: string;
  eventName: string;
  date: string;
}

const ClinicDetail: React.FC = () => {
  const clinicPatients: Patient[] = [
    { id: "DB001", name: "Ashfa" },
    { id: "DB002", name: "Asela" },
    { id: "DB003", name: "Ravindu" },
    { id: "DB004", name: "Dilukshi" },
    { id: "DB005", name: "Ashfa" },
    { id: "DB006", name: "Ashfa" },
  ];

  const patientDivisions = [
    { division: "Katugahahena", count: 20 },
    { division: "Diyagala", count: 34 },
    { division: "Kotagedara", count: 23 },
    { division: "Maddegadara", count: 32 },
    { division: "Nawutthuduwa", count: 23 },
    { division: "Kolahekada", count: 34 },
    { division: "Hempita", count: 34 },
    { division: "Karampathara", count: 23 },
    { division: "Katugoda", count: 12 },
    { division: "Delgoda", count: 56 },
  ];

  const [clinicEvents, setClinicEvents] = useState<ClinicEvent[]>([
    { id: "event001", eventName: "Diabetes Awareness", date: "2025-04-01" },
    { id: "event002", eventName: "Free Check-up", date: "2025-04-10" },
  ]);

  const [newEvent, setNewEvent] = useState({
    eventName: "",
    date: "",
  });

  const addClinicEvent = () => {
    if (newEvent.eventName && newEvent.date) {
      const newEventId = `event${clinicEvents.length + 1}`;
      const event = { id: newEventId, ...newEvent };
      setClinicEvents([...clinicEvents, event]);
      setNewEvent({ eventName: "", date: "" });
    }
  };

  const removeClinicEvent = (eventId: string) => {
    setClinicEvents(clinicEvents.filter((event) => event.id !== eventId));
  };

  return (
    // <div className="flex">
    //   <AdminSidebar />
    //   <div className="p-6 w-full bg-gray-100 min-h-screen">
    //     <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
    //       <div className="flex items-center space-x-3">
    //         <FaClinicMedical className="text-blue-600 text-3xl" />
    //         <h2 className="text-lg font-bold">Clinic Details</h2>
    //       </div>
    //       <div className="flex space-x-3">
    //         <button className="bg-green-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-green-600 transition">
    //           <FaEdit className="mr-2" /> Edit
    //         </button>
    //         <button className="bg-red-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-red-600 transition">
    //           <FaTrash className="mr-2" /> Delete
    //         </button>
    //       </div>
    //     </div>

    //     {/* Clinic Overview Section */}
    //     <div className="flex justify-center items-center bg-white p-6 shadow-md rounded-lg mb-6">
    //       <FaClinicMedical className="text-blue-500 text-5xl mr-4" />
    //       <div>
    //         <p className="text-4xl font-bold">236</p>
    //         <p className="text-gray-500">Diabetic</p>
    //       </div>
    //     </div>

    //     {/* Clinic Patients and Divisions Tables */}
    //     <div className="grid grid-cols-2 gap-6">
    //       {/* Clinic Patients Table */}
    //       <div className="bg-white p-6 shadow-md rounded-lg">
    //         <h3 className="text-xl font-semibold mb-4">Clinic Patients</h3>
    //         <table className="w-full border-collapse">
    //           <thead>
    //             <tr className="border-b">
    //               <th className="text-left p-2">ID</th>
    //               <th className="text-left p-2">Name</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {clinicPatients.map((patient, index) => (
    //               <tr key={index} className="border-b">
    //                 <td className="p-2">{patient.id}</td>
    //                 <td className="p-2">{patient.name}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>

    //       {/* Clinic Patient Divisions Table */}
    //       <div className="bg-white p-6 shadow-md rounded-lg">
    //         <h3 className="text-xl font-semibold mb-4">Clinic Patient Divisions</h3>
    //         <table className="w-full border-collapse">
    //           <thead>
    //             <tr className="border-b">
    //               <th className="text-left p-2">Division</th>
    //               <th className="text-left p-2">Count</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {patientDivisions.map((division, index) => (
    //               <tr key={index} className="border-b">
    //                 <td className="p-2">{division.division}</td>
    //                 <td className="p-2">{division.count}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>

    //     {/* Add Event Form Section */}
    //     <div className="bg-white p-6 shadow-md rounded-lg mt-6">
    //       <h3 className="text-xl font-semibold mb-4">Add Event</h3>
    //       <div className="mb-4">
    //         <input
    //           type="text"
    //           placeholder="Event Name"
    //           value={newEvent.eventName}
    //           onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
    //           className="border p-2 w-full rounded-lg mb-4"
    //         />
    //         <input
    //           type="date"
    //           value={newEvent.date}
    //           onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
    //           className="border p-2 w-full rounded-lg"
    //         />
    //       </div>
    //       <button
    //         onClick={addClinicEvent}
    //         className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-blue-600 transition"
    //       >
    //         <FaPlus className="mr-2" /> Add Event
    //       </button>
    //     </div>

    //     {/* Clinic Events Table */}
    //     <div className="bg-white p-6 shadow-md rounded-lg mt-6">
    //       <h3 className="text-xl font-semibold mb-4">Clinic Events</h3>
    //       <table className="w-full border-collapse">
    //         <thead>
    //           <tr className="border-b">
    //             <th className="text-left p-2">Event Name</th>
    //             <th className="text-left p-2">Date</th>
    //             <th className="text-left p-2">Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {clinicEvents.map((event, index) => (
    //             <tr key={index} className="border-b">
    //               <td className="p-2">{event.eventName}</td>
    //               <td className="p-2">{event.date}</td>
    //               <td className="p-2 flex space-x-3">
    //                 <button
    //                   className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
    //                 >
    //                   <FaClipboardList className="mr-2" /> Get Attendance
    //                 </button>
    //                 <button
    //                   className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
    //                   onClick={() => removeClinicEvent(event.id)}
    //                 >
    //                   <FaTrash className="mr-2" /> Remove Event
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
    <div>
      hi...
    </div>
  );
};

export default ClinicDetail;
