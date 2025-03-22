import { FC } from 'react';
import AdminSlidebar from '../../components/layouts/admin/AdminSlidebar';

const SingleDivisionPage: FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
             {/* Reusable Sidebar */}
             <AdminSlidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#008FFB]">Kotagedara</h2>
                </div>

                {/* Division Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                        <p className="text-lg font-semibold text-gray-800">50</p>
                        <p className="text-sm text-gray-600">Households</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                        <p className="text-lg font-semibold text-gray-800">564</p>
                        <p className="text-sm text-gray-600">Residents</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                        <p className="text-lg font-semibold text-gray-800">435</p>
                        <p className="text-sm text-gray-600">Patients</p>
                    </div>
                </div>

                {/* Diseases List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#008FFB] mb-4">Top Diseases</h3>
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Diseases</th>
                                <th className="text-left px-4 py-2 text-sm text-gray-600">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-gray-700">Diabetic</td>
                                <td className="px-4 py-2 text-sm text-gray-700">30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SingleDivisionPage;
