import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";

const HistoryPage = () => {
    const [archives, setArchives] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [divisions, setDivisions] = useState([]);

    useEffect(() => {
        const fetchDivisions = async () => {
            try {

                const response = await axios.get(`http://localhost:5001/divisions`);
                setDivisions(response.data);

            } catch (error) {
                console.error("Error fetching divisions:", error);
            }
        };
        fetchDivisions();
    }, [divisions]);
    useEffect(() => {
        const fetchArchives = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:5001/archives`
                );
                setArchives(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching archives:", error);
                setError("Failed to fetch archives. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchArchives();
    }, []);

    const filteredArchives = archives.filter(archive =>
        (selectedDepartment === "" || archive.divisionUser === selectedDepartment) &&
        (searchQuery === "" ||
            archive.kodeklasifikasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
            archive.divisionUser.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div>
            <Header />
            <div id="wrapper" className="min-h-screen p-6 bg-gray-200">
                <div className="container mx-auto">
                    <h1 className="mb-6 text-3xl font-semibold text-center">Daftar Data Arsip</h1>

                    <div className="flex items-center justify-between mb-6">
                        <select
                            className="w-[30%] p-2 border rounded-md bg-white shadow-sm"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
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
                                        <th className="px-4 py-3 border-b">Uraian</th>
                                        <th className="px-4 py-3 border-b">Kurun Waktu</th>
                                        <th className="px-4 py-3 border-b">Jumlah</th>
                                        <th className="px-4 py-3 border-b">Retensi Aktif</th>
                                        <th className="px-4 py-3 border-b">Retensi Inaktif</th>
                                        <th className="px-4 py-3 border-b">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredArchives.length > 0 ? (
                                        filteredArchives.map((archive, index) => (
                                            <tr key={archive.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 border-b">{index + 1}</td>
                                                <td className="px-4 py-3 border-b">{archive.kodeklasifikasi}</td>
                                                <td className="px-4 py-3 border-b">{archive.divisionUser}</td>
                                                <td className="px-4 py-3 border-b">{archive.detail}</td>
                                                <td className="px-4 py-3 border-b">{archive.kurun}</td>
                                                <td className="px-4 py-3 border-b">{archive.jumlah}</td>
                                                <td className="px-4 py-3 border-b">{archive.retensiaktif}</td>
                                                <td className="px-4 py-3 border-b">{archive.retensiinaktif}</td>
                                                <td className="px-4 py-3 border-b">{archive.others}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="py-4 text-center">Tidak ada arsip ditemukan</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HistoryPage;