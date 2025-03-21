import { FC } from 'react';
import AdminSlidebar from '../components/layouts/admin/AdminSlidebar';

const SingleDiseasePage: FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Reusable Sidebar */}
            <AdminSlidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Diabetes</h2>
                    <div className="px-4 py-2 bg-[#008FFB] text-white rounded-lg">145 Total</div>
                </div>

                {/* Top Divisions Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Top Divisions</h3>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Number</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Divisions</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#2</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Kamburupitiya</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">#1</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Katugahahena</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SingleDiseasePage;
