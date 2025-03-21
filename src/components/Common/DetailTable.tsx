import React from "react";

const users = [
  { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" },
  { name: "Courtney Henry", title: "Designer", email: "courtney.henry@example.com", role: "Admin" },
  { name: "Tom Cook", title: "Director of Product", email: "tom.cook@example.com", role: "Member" },

];

interface DetailTableProps {
  TableName: string;
  Colunms: string | { title: string;}[];
}

const DetailTable: React.FC<DetailTableProps> = ({ TableName, Colunms, }) => {
  return (
    <div className="p-6rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">{TableName}</h2>
        <button className="px-4 py-2 bg-[#008FFB] text-white rounded-lg">Add</button>
      </div>
      <table className="w-full border-collapse">
        <thead>

          <tr className="border-b bg-gray-100">
            {Array.isArray(Colunms) ? (
              Colunms.map((colunm, index) => (
                <th key={index} className="p-3 text-left">{colunm.title}</th>
              ))
            ) : (
              <th className="p-3 text-left">{Colunms}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.title}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 text-blue-600 cursor-pointer">Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTable;
