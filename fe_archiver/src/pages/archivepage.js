import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";  

const ArchivesPage = () => {
    const [divisions, setDivisions] = useState([]);  
    const [selectedDivision, setSelectedDivision] = useState("");  
    const [archives, setArchives] = useState([]);  
    const [loading, setLoading] = useState(false); 
    const [selectedArchive, setSelectedArchive] = useState(null); 
    const [modalOpen, setModalOpen] = useState(false); 

    const userDivision = localStorage.getItem('division');  

    const getBaseUrl = () => {
        return "http://localhost:5001"; 
    };

    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                if (userDivision === 'admin') {
                    
                    const response = await axios.get(`${getBaseUrl()}/divisions`);
                    setDivisions(response.data);
                } else {
                    
                    setDivisions([{
                        id: 1,  
                        name: userDivision,
                    }]);
                    setSelectedDivision(userDivision); 
                }
            } catch (error) {
                console.error("Error fetching divisions:", error);
            }
        };
        fetchDivisions();
    }, [userDivision]);

    useEffect(() => {
        if (selectedDivision) {
            const fetchArchivesByDivision = async () => {
                setLoading(true); 
                try {
                    const response = await axios.get(
                        `${getBaseUrl()}/archives/d/${selectedDivision}/acc`
                    );
                    setArchives(response.data); 
                } catch (error) {
                    console.error("Error fetching archives:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchArchivesByDivision();
        }
    }, [selectedDivision]); 

    const openModal = (archive) => {
        setSelectedArchive(archive);
        setModalOpen(true);
    };

    const closeModal = (e) => {
        if (e.target.id === "modal") {
            setModalOpen(false);
        }
    };

    return (
        <div>
            <Header />
            <div id="wrapper" className="min-h-[76vh] p-6 bg-gray-200">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold text-center">Daftar Data Arsip</h1>

                    <div className="flex items-center justify-between mb-6">
                        <select
                            className="w-[30%] p-2 border rounded-md bg-white shadow-sm"
                            onChange={(e) => setSelectedDivision(e.target.value)} 
                            value={selectedDivision} 
                        >
                            <option value="">Pilih Bagian</option>
                            {divisions.map((division) => (
                                <option key={division.id} value={division.name}>
                                    {division.name}
                                </option>
                            ))}
                        </select>

                        <input
                            className="w-[30%] p-2 border rounded-md bg-white shadow-sm"
                            type="text"
                            placeholder="Cari Berkas"
                        />
                    </div>

                    {loading ? ( 
                        <div className="text-center">Loading archives...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-collapse border-gray-300 rounded-md shadow-md">
                                <thead>
                                    <tr className="text-gray-600 bg-gray-100">
                                        <th className="px-4 py-3 border-b">No</th>
                                        <th className="px-4 py-3 border-b">Kode Klasifikasi</th>
                                        <th className="px-4 py-3 border-b">Uraian</th>
                                        <th className="px-4 py-3 border-b">Kurun Waktu</th>
                                        <th className="px-4 py-3 border-b">Jumlah</th>
                                        <th className="px-4 py-3 border-b">Retensi Aktif</th>
                                        <th className="px-4 py-3 border-b">Retensi Inaktif</th>
                                        <th className="px-4 py-3 border-b">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {archives.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="py-4 text-center">No archives found</td>
                                        </tr>
                                    ) : (
                                        archives.map((archive, index) => (
                                            <tr
                                                key={archive.id}
                                                className={` ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-300'}`}
                                                onClick={() => openModal(archive)}
                                            >
                                                <td className="px-4 py-3 border-b">{index + 1}</td>
                                                <td className="px-4 py-3 border-b">{archive.kodeklasifikasi}</td>
                                                <td className="px-4 py-3 border-b">{archive.detail}</td>
                                                <td className="px-4 py-3 border-b">{archive.kurun}</td>
                                                <td className="px-4 py-3 border-b">{archive.jumlah}</td>
                                                <td className="px-4 py-3 border-b">{archive.retensiaktif}</td>
                                                <td className="px-4 py-3 border-b">{archive.retensiinaktif}</td>
                                                <td className="px-4 py-3 border-b">{archive.others}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {modalOpen && selectedArchive && (
                <div
                    id="modal"
                    className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50"
                    onClick={closeModal}
                >
                    <div className="w-3/4 max-w-2xl p-6 bg-white rounded-md">
                        <h2 className="text-2xl font-semibold">Archive Details</h2>
                        <p><strong>Kode Klasifikasi:</strong> {selectedArchive.kodeklasifikasi}</p>
                        <p><strong>Uraian:</strong> {selectedArchive.detail}</p>
                        <p><strong>Jumlah:</strong> {selectedArchive.jumlah}</p>
                        <p><strong>Kurun Waktu:</strong> {selectedArchive.kurun}</p>
                        <p><strong>Retensi Aktif:</strong> {selectedArchive.retensiaktif}</p>
                        <p><strong>Retensi Inaktif:</strong> {selectedArchive.retensiinaktif}</p>
                        <p><strong>Keterangan:</strong> {selectedArchive.others}</p>
                        <button
                            className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
                            onClick={() => setModalOpen(false)} 
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ArchivesPage;
