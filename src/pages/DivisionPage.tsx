
import { FC } from 'react';
import AdminSlidebar from '../components/layouts/admin/AdminSlidebar';

const DivisionPage: FC = () => {
    return (
        <>

            <div className='flex'>


                    {/* Reusable Sidebar */}
                    <AdminSlidebar />
                


                <div className="flex-1 p-6 w-1/2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-[#008FFB]">Division Details</h2>
                        <button className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">New</button>
                    </div>

                    {/* Division Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Card 1 */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Katugahahena</p>
                                <p className="text-sm text-gray-600">236</p>
                            </div>
                            <button className="text-red-500">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Kotagedara</p>
                                <p className="text-sm text-gray-600">100</p>
                            </div>
                            <button className="text-red-500">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>

                        {/* Repeat for other cards */}
                        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Katugahahena</p>
                                <p className="text-sm text-gray-600">236</p>
                            </div>
                            <button className="text-red-500">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Kotagedara</p>
                                <p className="text-sm text-gray-600">100</p>
                            </div>
                            <button className="text-red-500">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Katugahahena</p>
                                <p className="text-sm text-gray-600">236</p>
                            </div>
                            <button className="text-red-500">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Kotagedara</p>
                                <p className="text-sm text-gray-600">100</p>
                            </div>
                            <button className="text-red-500">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">Katugahahena</p>
                                <p className="text-sm text-gray-600">236</p>
                            </div>
                            <button className="text-red-500">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );


};

export default DivisionPage;
