import React, { useState } from "react";
import { FaClinicMedical, FaPlus, FaTrash, FaClipboardList } from "react-icons/fa";

interface Patient {
  id: string;
  name: string;
}

interface ClinicEvent {
  id: string;
  eventName: string;
  date: string;
}

const ClinicAttendancePage: React.FC = () => {
  const [diabeticPatients, setDiabeticPatients] = useState<Patient[]>([
    { id: "DB001", name: "Ashfa" },
    { id: "DB002", name: "Asela" },
    { id: "DB003", name: "Ravindu" },
    { id: "DB004", name: "Dilukshi" },
    { id: "DB005", name: "Ashfa" },
    { id: "DB006", name: "Ashfa" },
  ]);

  const [clinicEvents, setClinicEvents] = useState<ClinicEvent[]>([
    { id: "event001", eventName: "Diabetes Awareness", date: "2025-04-01" },
    { id: "event002", eventName: "Free Check-up", date: "2025-04-10" },
  ]);

  // Function to get attendance (for now it just logs to console)
  const getAttendance = (eventId: string) => {
    console.log(`Getting attendance for event ${eventId}`);
    // You can replace this with actual functionality to get attendance
  };

  // Function to add a new clinic event
  const addClinicEvent = () => {
    const newEvent: ClinicEvent = {
      id: `event${clinicEvents.length + 1}`,
      eventName: "New Clinic Event",
      date: "2025-04-20", // you can make this dynamic
    };
    setClinicEvents([...clinicEvents, newEvent]);
  };

  // Function to remove a clinic event
  const removeClinicEvent = (eventId: string) => {
    setClinicEvents(clinicEvents.filter((event) => event.id !== eventId));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        {/* Sidebar content here */}
        Sidebar
      </div>

      {/* Main Content */}
      <div className="p-6 w-full bg-gray-100 min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow rounded-lg">
          <div className="flex items-center space-x-3">
            <FaClinicMedical className="text-blue-600 text-3xl" />
            <div>
              <h2 className="text-lg font-bold">Clinic Attendance</h2>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg shadow hover:bg-blue-600 transition"
              onClick={addClinicEvent}
            >
              <FaPlus className="mr-2" /> Add Event
            </button>
          </div>
        </div>

        {/* Diabetic Patient List */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Diabetic Patients</h3>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg p-6">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {diabeticPatients.map((patient, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{patient.id}</td>
                  <td className="p-2">{patient.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Clinic Events Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Clinic Events</h3>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg p-6">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Event Name</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinicEvents.map((event, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{event.eventName}</td>
                  <td className="p-2">{event.date}</td>
                  <td className="p-2 flex space-x-3">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                      onClick={() => getAttendance(event.id)}
                    >
                      <FaClipboardList className="mr-2" /> Get Attendance
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                      onClick={() => removeClinicEvent(event.id)}
                    >
                      <FaTrash className="mr-2" /> Remove Event
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClinicAttendancePage;
