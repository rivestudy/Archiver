import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

// Custom Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        // Only close if the click is directly on the overlay
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-700 outline-none bg-opacity-20 focus:outline-none"
            onClick={handleOverlayClick}
        >
            <div className="relative w-auto max-w-3xl mx-auto my-6 bg-opacity-100">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                        <h3 className="text-3xl font-semibold">Detail Arsip</h3>
                        <button
                            className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-100 focus:outline-none"
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </div>
                    <div className="relative flex-auto p-6">{children}</div>
                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                        <button
                            className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                            type="button"
                            onClick={onClose}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReviewPage = () => {
    const [archives, setArchives] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedArchive, setSelectedArchive] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [divisions, setDivisions] = useState([]);
    const [users, setUsers] = useState([]);

    const getBaseUrl = () => {
        return "http://localhost:5001"; 
    };

    // Fetch archives and divisions
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch archives
                const archivesResponse = await axios.get(`${getBaseUrl()}/archives`);
                setArchives(archivesResponse.data);

                // Fetch divisions (you might want to adjust this based on your actual authentication)
                const userRole = localStorage.getItem('role');
                const userDivision = localStorage.getItem('division');

                if (userRole === 'admin') {
                    const divisionsResponse = await axios.get(`${getBaseUrl()}/divisions`);
                    setDivisions(divisionsResponse.data);
                } else {
                    setDivisions([{ id: 1, name: userDivision }]);
                    setSelectedDivision(userDivision);
                }

                setError(null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    // Handle archive status update
    const handleArchiveStatus = async (id, status) => {
        try {
            await axios.patch(`${getBaseUrl()}/archives/a/${id}`, {
                accepted: status
            });
            

            // Update local state
            setArchives(archives.map(archive =>
                archive.id === id ? { ...archive, accepted: status } : archive
            ));
        } catch (error) {
            console.error("Error updating archive status:", error);
            setError("Failed to update archive status.");
        }
    };

    // Open details modal
    const openDetailsModal = (archive) => {
        setSelectedArchive(archive);
        setIsModalOpen(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                
                const usersResponse = await axios.get(`${getBaseUrl()}/users`);
                setUsers(usersResponse.data);


                setError(null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const getUserName = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Unknown User";
    };

    const filteredArchives = archives.filter(archive =>
        (selectedDivision === "" || archive.divisionUser === selectedDivision) &&
        (searchQuery === "" ||
            archive.kodeklasifikasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
            archive.divisionUser.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div>
            <Header />
            <div id="wrapper" className="min-h-screen p-6 bg-gray-200 font-inter">
                <div className="container mx-auto">
                    <h1 className="mb-6 text-3xl font-semibold text-center">
                        DAFTAR DATA ARSIP
                    </h1>

                    <div className="flex justify-between mb-6">
                        <select
                            className="w-1/3 p-2 bg-white border rounded-md shadow-sm"
                            value={selectedDivision}
                            onChange={(e) => setSelectedDivision(e.target.value)}
                        >
                            <option value="">Semua Bagian</option>
                            {divisions.map(division => (
                                <option key={division.id} value={division.name}>
                                    {division.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Cari Berkas"
                            className="w-64 px-3 py-2 text-sm border rounded shadow placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div className="text-xl text-center">Memuat data...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-collapse border-gray-300 rounded-md shadow-md">
                                <thead>
                                    <tr className="text-gray-600 bg-gray-100">
                                        <th className="px-4 py-3 border-b">No</th>
                                        <th className="px-4 py-3 border-b">Kode Klasifikasi</th>
                                        <th className="px-4 py-3 border-b">Divisi</th>
                                        <th className="px-4 py-3 border-b">User</th>
                                        <th className="px-4 py-3 border-b">Detail</th>
                                        <th className="px-4 py-3 border-b">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredArchives.length > 0 ? (
                                        filteredArchives.map((archive, index) => (

                                            <tr
                                                key={archive.id}
                                                className={`hover:bg-gray-50`}
                                            >

                                                <td className={`px-4 py-3 text-center border-b ${archive.accepted ? 'bg-green-500' : 'bg-red-500'}`}>{index + 1} </td>
                                                <td className="px-4 py-3 text-center border-b">{archive.kodeklasifikasi}</td>
                                                <td className="px-4 py-3 text-center border-b">{archive.divisionUser}</td>
                                                <td className="px-4 py-3 text-center border-b">{getUserName(archive.userid)}</td>
                                                <td className="border-b">
                                                    <button
                                                        onClick={() => openDetailsModal(archive)}
                                                        className="my-1 w-[70%] bg-[#566861] rounded-md p-2 text-white font-semibold block mx-auto hover:bg-[#d0f0bf] active:bg-[#d0f0bf]"
                                                    >
                                                        Lihat Detail
                                                    </button>
                                                </td>
                                                <td className="flex border-b">
                                                    <button
                                                        disabled={archive.accepted}
                                                        onClick={() => handleArchiveStatus(archive.id, true)}
                                                        className="my-1 w-[45%] bg-[#21bb21] rounded-md p-2 text-white font-semibold block mx-auto hover:bg-[#d0f0bf] active:bg-[#d0f0bf]"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                    disabled={!archive.accepted}
                                                        onClick={() => handleArchiveStatus(archive.id, false)}
                                                        className="my-1 w-[45%] bg-[#aa2412] rounded-md p-2 text-white font-semibold block mx-auto hover:bg-[#d0f0bf] active:bg-[#d0f0bf]"
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-4 text-center">Tidak ada arsip ditemukan</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Details Modal */}
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    >
                        {selectedArchive && (
                            <div className="grid gap-4">
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Kode Klasifikasi:</label>
                                    <span className="col-span-3">{selectedArchive.kodeklasifikasi}</span>
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Divisi:</label>
                                    <span className="col-span-3">{selectedArchive.divisionUser}</span>
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Jumlah:</label>
                                    <span className="col-span-3">{selectedArchive.jumlah}</span>
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Kurun Waktu:</label>
                                    <span className="col-span-3">{selectedArchive.kurun}</span>
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Tipe:</label>
                                    <span className="col-span-3">{selectedArchive.tipe}</span>
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Detail:</label>
                                    <span className="col-span-3">{selectedArchive.detail}</span>
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Retensi Aktif:</label>
                                    <span className="col-span-3">{selectedArchive.retensiaktif} Tahun</span>
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Retensi Inaktif:</label>
                                    <span className="col-span-3">{selectedArchive.retensiinaktif} Tahun</span>
                                </div>
                                <div className="grid items-center grid-cols-4 gap-4">
                                    <label className="font-semibold text-right">Status:</label>
                                    <span className="col-span-3">
                                        {selectedArchive.accepted === null
                                            ? "Menunggu Review"
                                            : selectedArchive.accepted
                                                ? "Diterima"
                                                : "Ditolak"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReviewPage;