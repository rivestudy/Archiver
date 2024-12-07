import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const ViewPage = () => {
    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [acceptedArchives, setAcceptedArchives] = useState([]);
    const [nonAcceptedArchives, setNonAcceptedArchives] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
        
        setAcceptedArchives([]);
        setNonAcceptedArchives([]);

        if (selectedDivision) {
            const fetchArchives = async (status) => {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `${getBaseUrl()}/archives/d/${selectedDivision}/${status}`
                    );
                    if (status === 'acc') {
                        setAcceptedArchives(response.data);
                    } else {
                        setNonAcceptedArchives(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching archives:", error);
                    if (status === 'acc') {
                        setAcceptedArchives([]);
                    } else {
                        setNonAcceptedArchives([]);
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchArchives('acc');
           
            fetchArchives('dec');
        }
    }, [selectedDivision]);

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${getBaseUrl()}/archives/a/${id}`);
            alert('Archive deleted successfully');
            setAcceptedArchives(acceptedArchives.filter(archive => archive.id !== id));
            setNonAcceptedArchives(nonAcceptedArchives.filter(archive => archive.id !== id));
        } catch (error) {
            console.error("Error deleting archive:", error);
            alert('Error deleting archive');
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
                    </div>

                    {loading ? (
                        <div className="text-center">Loading archives...</div>
                    ) : (
                        <>
                            <h2 className="mb-4 text-xl font-semibold">Arsip Diterima</h2>
                            <div className="overflow-x-auto text-center">
                                <table className="min-w-full bg-white border border-collapse border-gray-300 rounded-md shadow-md">
                                    <thead>
                                        <tr className="text-gray-600 bg-gray-100">
                                            <th className="px-4 w-[5%] py-3 border-b">No</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Kode Klasifikasi</th>
                                            <th className="px-4 w-[20%] py-3 border-b">Uraian</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Kurun Waktu</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Jumlah</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Retensi Aktif</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Retensi Inaktif</th>
                                            <th className="px-4 w-[15%] py-3 border-b">Keterangan</th>
                                            <th className="px-4 w-[15%] py-3 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(selectedDivision && acceptedArchives.length === 0) ? (
                                            <tr>
                                                <td colSpan="9" className="py-4 text-center">No accepted archives found for {selectedDivision}</td>
                                            </tr>
                                        ) : (
                                            acceptedArchives.map((archive, index) => (
                                                <tr key={archive.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-300'}>
                                                    <td className="px-4 py-3 border-b">{index + 1}</td>
                                                    <td className="px-4 py-3 border-b">{archive.kodeklasifikasi}</td>
                                                    <td className="px-4 py-3 border-b">{archive.detail}</td>
                                                    <td className="px-4 py-3 border-b">{archive.kurun}</td>
                                                    <td className="px-4 py-3 border-b">{archive.jumlah}</td>
                                                    <td className="px-4 py-3 border-b">{archive.retensiaktif}</td>
                                                    <td className="px-4 py-3 border-b">{archive.retensiinaktif}</td>
                                                    <td className="px-4 py-3 border-b">{archive.others}</td>
                                                    <td className="px-4 py-3 space-x-2 border-b">
                                                        <button onClick={() => handleEdit(archive.id)} className="w-[45%] text-white bg-[#4d5d53] p-2 rounded-md">Edit</button>
                                                        <button onClick={() => handleDelete(archive.id)} className="w-[45%] bg-[#cc4312] p-2 text-white rounded-md">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="mt-8 mb-4 text-xl font-semibold">Arsip Ditolak</h2>
                            <div className="overflow-x-auto text-center">
                                <table className="min-w-full bg-white border border-collapse border-gray-300 rounded-md shadow-md">
                                    <thead>
                                        <tr className="text-gray-600 bg-gray-100">
                                            <th className="px-4 w-[5%] py-3 border-b">No</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Kode Klasifikasi</th>
                                            <th className="px-4 w-[20%] py-3 border-b">Uraian</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Kurun Waktu</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Jumlah</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Retensi Aktif</th>
                                            <th className="px-4 w-[5%] py-3 border-b">Retensi Inaktif</th>
                                            <th className="px-4 w-[15%] py-3 border-b">Keterangan</th>
                                            <th className="px-4 w-[15%] py-3 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(selectedDivision && nonAcceptedArchives.length === 0) ? (
                                            <tr>
                                                <td colSpan="9" className="py-4 text-center">No non-accepted archives found for {selectedDivision}</td>
                                            </tr>
                                        ) : (
                                            nonAcceptedArchives.map((archive, index) => (
                                                <tr key={archive.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-300'}>
                                                    <td className="px-4 py-3 border-b">{index + 1}</td>
                                                    <td className="px-4 py-3 border-b">{archive.kodeklasifikasi}</td>
                                                    <td className="px-4 py-3 border-b">{archive.detail}</td>
                                                    <td className="px-4 py-3 border-b">{archive.kurun}</td>
                                                    <td className="px-4 py-3 border-b">{archive.jumlah}</td>
                                                    <td className="px-4 py-3 border-b">{archive.retensiaktif}</td>
                                                    <td className="px-4 py-3 border-b">{archive.retensiinaktif}</td>
                                                    <td className="px-4 py-3 border-b">{archive.others}</td>
                                                    <td className="px-4 py-3 space-x-2 border-b">
                                                        <button onClick={() => handleEdit(archive.id)} className="w-[45%] text-white bg-[#4d5d53] p-2 rounded-md">Edit</button>
                                                        <button onClick={() => handleDelete(archive.id)} className="w-[45%] bg-[#cc4312] p-2 text-white rounded-md">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ViewPage;