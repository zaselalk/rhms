
import React, { FC } from 'react';
import AdminSlidebar from '../../components/layouts/admin/AdminSlidebar';
import Modal from '../../components/layouts/overlays/Modal';

const DivisionPage: FC = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex">
                {/* Reusable Sidebar */}
                <AdminSlidebar />

                <Modal isOpen={isOpen} handleClose={handleClose} title="Add Division">
                    <div className="p-6">
                        <form action="" className="space-y-4">
                            <div>
                                <label htmlFor="division" className="block text-sm font-semibold text-gray-600">Division Name</label>
                                <input type="text" id="division" placeholder="Enter Division Name" className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div>
                                <label htmlFor="population" className="block text-sm font-semibold text-gray-600">Population</label>
                                <input type="number" id="population" placeholder="Enter Population" className="w-full border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="flex justify-end">
                                <button className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]">Add Division</button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-[#008FFB]">Division Details</h2>
                        <button className="px-4 py-2 bg-[#008FFB] text-white font-semibold rounded-lg hover:bg-[#006fbb]" onClick={handleOpen}>New</button>
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
